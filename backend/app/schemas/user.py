from pydantic import BaseModel, EmailStr, Field 
from typing import Optional
from datetime import datetime


class UserCreateSchema(BaseModel):
    first_name: str
    last_name: str 
    email: EmailStr 
    password: str

class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str

class UserUpdateSchema(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None

class UserResponseSchema(BaseModel):
    first_name: str
    last_name: str 
    email: EmailStr
    access_token_expires_at: Optional[datetime] = None 

    class config:
        from_attributes = True

class ForgotPasswordSchema(BaseModel):
    email: EmailStr

class PasswordResetSchema(BaseModel):
    email: EmailStr
    password: str

class OTPCodeVerification(BaseModel):
    code: str
