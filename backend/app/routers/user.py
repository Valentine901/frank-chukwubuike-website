from fastapi import APIRouter, Depends, HTTPException, Response, status, BackgroundTasks, Request
from fastapi_mail import MessageType, MessageSchema, FastMail #type: ignore
from sqlalchemy.orm import Session
from datetime import timedelta
from sqlalchemy.exc import IntegrityError
from pydantic import EmailStr
from settings.database import get_db
from schemas.user import UserCreateSchema, PasswordResetSchema, ForgotPasswordSchema
from schemas.user import UserResponseSchema, UserLoginSchema, OTPCodeVerification
from utils.credentials_templates import get_password_reset_email_html
from dependencies.security import BaseSecurity
from schemas.user import UserUpdateSchema, UserResponseSchema
from models.models import User
from crud.user import BaseUser
from dependencies.auth import BaseAuth
from utils.mail import Config
from datetime import datetime, timezone, timedelta
from typing import Annotated
from settings.config import Setting


router = APIRouter(prefix="/api/auth", tags=["Admin"])

CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]
DataBaseEngine = Annotated[Session, Depends(get_db)]

@router.put("/change-password")
async def change_password(data: PasswordResetSchema, db: DataBaseEngine):
    user = BaseUser.get_user_by_email(email=data.email, db=db)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    if user.is_verified != True:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email verification request failed")
    
    user.password = BaseSecurity.hash_password(data.password)

    user.is_verified = False
    db.commit()
    db.refresh(user)
    return {"message": "Password reset successfully"}


@router.post("/verify-otp")
async def verify_otp_code(data: OTPCodeVerification, db: DataBaseEngine):
    token_data = BaseAuth.verify_credentials_reset_code(code=data.code, db=db)
    user = BaseUser.get_user_by_id(user_id=token_data.user_id, db=db)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    user.is_verified = True
    db.commit()
    db.refresh(user)

@router.post("/reset-password")
async def reset_password(data: ForgotPasswordSchema, bg_tasks: BackgroundTasks,  db: DataBaseEngine):
    
    user = BaseUser.get_user_by_email(email=data.email, db=db)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Email does not exist")
    
    code = BaseAuth.create_credentials_reset_code(user_id=user.id, expires_at=timedelta(minutes=15), db=db)

    username = user.first_name + " " + user.last_name
    html_content = get_password_reset_email_html(username=username, code=code)

    message = MessageSchema(
        subject="My website - Verify Your Email Address",
        recipients=[data.email],
        body=html_content,
        subtype=MessageType.html  
    )
    
    fm = FastMail(Config.conf)
    bg_tasks.add_task(fm.send_message, message)
    
    return {
        "message":"OTP code has been sent to your email address",
        "code": code
    }

@router.put("/admin-update-user", response_model=UserResponseSchema)
async def update_user(data: UserUpdateSchema, current_user: CurrentUser, db: DataBaseEngine):
    user = BaseUser.update_user(user_id=current_user.id, data=data, db=db)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

    
@router.post("/register", response_model=UserResponseSchema)
async def register(data: UserCreateSchema, db: DataBaseEngine):
    data_dict = data.model_dump()
    data_dict["password"] = BaseSecurity.hash_password(data.password)
    try:
        user = BaseUser.create_user(data_dict, db=db)
        return user
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Registration closed. An administrator account already existed on this platform.")



@router.post("/login", response_model=UserResponseSchema)
async def login(response: Response, data: UserLoginSchema, db: DataBaseEngine):
    user = BaseUser.get_user_by_email(email=data.email, db=db)
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid user credentials")
    
    if not BaseSecurity.verify_password(plain_password=data.password, hashed_password=user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect password")

    payload = {"sub": str(user.id)}

    access_delta = timedelta(minutes=Setting.ACCESS_TOKEN_EXPIRES_MINUTES)
    access_expiry = datetime.now(timezone.utc) + access_delta

    access_token = BaseSecurity.create_token(data=payload, expires_delta=access_delta)
    refresh_token = BaseSecurity.create_token(data=payload, expires_delta=timedelta(days=Setting.REFRESH_TOKEN_EXPIRES_DAYS))

    response.set_cookie(
        key="access_token",
        value=str(access_token),
        secure=True,
        httponly=True,
        samesite="lax",
        max_age=60 * 20
    )

    response.set_cookie(
        key="refresh_token",
        value=str(refresh_token),
        secure=True,
        httponly=True,
        samesite="lax",
        max_age=7 * 24 * 60 * 60
    )

    response_data = {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "access_token_expires_at": access_expiry
    }

    return response_data

# @router.get("/me-visitors")
# async def api_get_user_visitor(db: DataBaseEngine):
#     user = BaseUser.get_user_visitor_view(db=db)
#     if user is None:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
#     return {
#         "first_name": user.first_name,
#         "last_name": user.last_name,
#         "email": user.email
#     }

@router.get("/me-visitors")
async def api_get_user_visitor(db: DataBaseEngine):
    try:
        user = BaseUser.get_user_visitor_view(db=db)
    except Exception:
        user = None

    # Fallback instead of throwing a 404 error!
    if user is None:
        return {
            "first_name": "Franklin",
            "last_name": "Chukwubuike",
            "email": "valentinedinyelu7@gmail.com"
        }
        
    return {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email
    }


@router.get("/me", response_model=UserResponseSchema)
async def current_user(user: CurrentUser):
    return user

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(
        key="access_token",
        secure=True,
        httponly=True
    )
    response.delete_cookie(
        key="refresh_token",
        secure=True,
        httponly=True
    )

    return {"message": "logged out successfully"}



@router.post("/refresh-token")
async def refresh(request: Request, response: Response):
   refresh_token = request.cookies.get("refresh_token")
   if not refresh_token:
       raise HTTPException(status_code=401, detail="Refresh token missin. Please log in again")

   payload = BaseSecurity.decode_token(refresh_token)

   user_id = payload.get("sub")
   new_payload = {"sub": user_id}

   access_delta = timedelta(minutes=30)
   new_access_expiry = datetime.now(timezone.utc) + access_delta

   new_access_token = BaseSecurity.create_token(data=new_payload, expires_delta=access_delta)

   response.set_cookie(
        key="access_token", 
        value=str(new_access_token),
        secure=True, httponly=True, 
        samesite="lax", 
        max_age=20 * 60
    )

   return {"access_token_expires_at": new_access_expiry}