from fastapi import HTTPException, status
from sqlalchemy.orm import Session 
from pydantic import EmailStr
from sqlalchemy import select
from models.models import User
from schemas.user import UserCreateSchema, UserUpdateSchema
import uuid


class BaseUser:

    @staticmethod
    def get_user_by_id(user_id: uuid.UUID, db: Session):
        query = select(User).where(User.id == user_id)
        result = db.execute(query)
        user = result.scalar_one_or_none()
        return user 

    @staticmethod 
    def get_user_visitor_view(db: Session):
        return db.query(User).first()

    @staticmethod
    def get_user_by_email(email: EmailStr, db: Session):
        query = select(User).where(User.email == email)
        result = db.execute(query)
        user = result.scalar_one_or_none()
        return user 

    @staticmethod
    def create_user(data: dict, db: Session) -> User:
        user = User(**data)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    

    @staticmethod
    def update_user(user_id: uuid.UUID, data: UserUpdateSchema, db: Session):
        user = BaseUser.get_user_by_id(user_id=user_id, db=db)
        if user is None:
            return ModuleNotFoundError
        data_dict = data.model_dump(exclude_unset=True)

        for key, value in data_dict.items():
            setattr(user, key, value)
        db.commit()
        db.refresh(user)
        return user


