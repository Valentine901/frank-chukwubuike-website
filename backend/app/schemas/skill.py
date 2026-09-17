from pydantic import BaseModel 
from typing import Optional
import uuid 


class CreateSkillSchema(BaseModel):
    name: str 

class SkillResponseSchema(BaseModel):
    id: uuid.UUID 
    name: str

    class Config:
        from_attributes = True 