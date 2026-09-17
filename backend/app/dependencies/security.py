from fastapi import HTTPException, status
from settings.config import Setting
from datetime import timedelta, datetime, timezone
from passlib.context import CryptContext

import jwt


context_pwd = CryptContext(schemes=["argon2"], deprecated="auto")

class BaseSecurity:


    @staticmethod
    def hash_password(password: str) -> str:
        return context_pwd.hash(password)
    
    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        return context_pwd.verify(plain_password, hashed_password)

    @staticmethod
    def create_token(data: dict, expires_delta: timedelta):
        to_encode = data.copy()
        expire = datetime.now(timezone.utc) + expires_delta

        to_encode.update({"exp": expire})
        # payload = {"sub": "user_id", "exp": expire}

        encoded_jwt = jwt.encode(to_encode, Setting.SECRET_KEY, algorithm=Setting.ALGORITHM)
        return encoded_jwt

    @staticmethod
    def decode_token(token: str):
        try:
            payload = jwt.decode(token, Setting.SECRET_KEY, algorithms=[Setting.ALGORITHM])
            # payload = {"sub": "user_id", "exp": expire}
            return payload
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token has expired")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")