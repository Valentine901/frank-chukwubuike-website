from pydantic import BaseModel, EmailStr 
from datetime import datetime
import uuid 

class CreateMessageSchema(BaseModel):
    sender_name: str
    sender_email: EmailStr
    sender_subject: str
    sender_message: str 


class MessageResponse(CreateMessageSchema):
    id: uuid.UUID 
    sent_at: datetime

    class Config:
        from_attributes = True
