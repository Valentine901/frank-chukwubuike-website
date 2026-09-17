from pydantic import BaseModel, field_validator
from typing import Optional
import uuid 


class ProfileCreateSchema(BaseModel):
    user_id: uuid.UUID
    bio: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    facebook_link: Optional[str] = None
    instagram_link: Optional[str] = None
    linkedin_link: Optional[str] = None

class ProfileUpdateSchema(BaseModel):
    bio: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    facebook_link: Optional[str] = None
    instagram_link: Optional[str] = None
    linkedin_link: Optional[str] = None

    @field_validator("bio", "address", "phone", "facebook_link", "instagram_link", "linkedin_link", mode="before")
    @staticmethod
    def empty_string_to_none(cls, value):
        if isinstance(value, str) and value.strip() == "":
            return None
        return value
    
class ProfileResponseSchema(BaseModel):
    image: Optional[str] = None
    bio: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    facebook_link: Optional[str] = None
    instagram_link: Optional[str] = None
    linkedin_link: Optional[str] = None

    class Config:
        from_attributes = True