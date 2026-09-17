from sqlalchemy.orm import Session 
from sqlalchemy import select
from models.models import Message 
import uuid 

class BaseMessage:

    @staticmethod 
    async def create_message(data: dict, db: Session):
        message = Message(**data)
        db.add(message)
        db.commit()
        db.refresh(message)
        return message 

    @staticmethod 
    async def get_messages(db: Session):
        query = select(Message)
        result = db.execute(query)
        messages = result.scalars().all()
        return messages[::-1]


    @staticmethod
    def get_message_by_id(id: uuid.UUID, db: Session):
        query = select(Message).where(Message.id == id)
        result = db.execute(query)
        message = result.scalar_one_or_none()
        return message

    @staticmethod 
    def delete_message(id: uuid.UUID, db: Session):
        message = BaseMessage.get_message_by_id(id=id, db=db)
        db.delete(message)
        db.commit()
        return True