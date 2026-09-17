from schemas.profile import ProfileUpdateSchema
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from models.models import Profile, User
from sqlalchemy import select 
import uuid


class BaseProfile:

    @staticmethod
    def create_profile(data: dict, db: Session):
        profile = Profile(**data)
        db.add(profile)
        db.commit()
        db.refresh(profile)
        return profile

# admin profile fetch and use only
    @staticmethod
    def get_profile(user_id: uuid.UUID, db: Session):
        query = select(Profile).where(Profile.user_id == user_id)
        result = db.execute(query)
        profile = result.scalar_one_or_none()
        return profile 

    @staticmethod
    def get_portfolio_profile(db: Session):
        profile = db.query(Profile).first()
        return profile 
    
    @staticmethod
    def update_profile(user_id: uuid.UUID, data: ProfileUpdateSchema, db: Session):
        profile = BaseProfile.get_profile(user_id=user_id, db=db)

        if profile is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Profile not found")

        for key, value in data.dict().items():
            if value is not None:
                setattr(profile, key, value)        
        db.commit()
        db.refresh(profile)
        return profile


{
  "bio": "I am a backend developer",
  "address": "Omor",
  "phone": "84746474",
  "facebook_link": "facebook.com",
  "instagram_link": "instagram.com",
  "linkedin_link": "linkedin.com"
}

{
  "email": "animesopulu@gmail.com",
  "password": "password"
}