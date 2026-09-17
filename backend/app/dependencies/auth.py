from fastapi import Request, HTTPException, status, Depends 
from settings.database import get_db
from sqlalchemy.orm import Session
from sqlalchemy import select
from dependencies.security import BaseSecurity
from crud.user import BaseUser
from models.models import VerificationToken
from datetime import timedelta, timezone, datetime
import uuid, random 

class BaseAuth:

    @staticmethod
    def generate_random_code() -> str:
        code = random.randint(100000, 999999)
        return str(code)

    @staticmethod 
    def create_credentials_reset_code(user_id: uuid.UUID, expires_at: timedelta, db: Session):
        code = BaseAuth.generate_random_code()
        expire = datetime.now(timezone.utc) + expires_at
        token_data = VerificationToken(token_code=code, expires_at=expire, user_id=user_id)
        db.add(token_data)
        db.commit()
        db.refresh(token_data)
        return token_data.token_code 

    @staticmethod
    def verify_credentials_reset_code(code: str, db: Session):
        query = select(VerificationToken).where(
            VerificationToken.token_code == code
        )
        
        result = db.execute(query)
        token_data = result.scalar_one_or_none()

        if not token_data:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid verification token")
        
        MAX_OTP_ATTEMPTS = 3

        if token_data.otp_attempts >= MAX_OTP_ATTEMPTS:
            db.delete(token_data)
            db.commit()
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Too many incorrect attempts. Resend new OTP code")
        
        if token_data.token_code != code:
            token_data.otp_attempts += 1

            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Incorrect 6-digit verification code.")

        if datetime.now(timezone.utc) > token_data.expires_at:
            db.delete(token_data)
            db.commit()
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="This code has expired. Please request a new one.")
        return token_data

    @staticmethod
    def get_current_user(request: Request, db: Session = Depends(get_db)):
        token = request.cookies.get("access_token")

        if not token or token is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Access token is missing")
        
        payload = BaseSecurity.decode_token(token)
        user_id_str = payload.get("sub")
        user_id = uuid.UUID(user_id_str)


        user = BaseUser.get_user_by_id(user_id=user_id, db=db)
        if user is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return user

    