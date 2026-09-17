from pydantic import BaseModel
from typing import Optional, List 
from datetime import datetime
import uuid 

class ProjectResponseSchema(BaseModel):
    id: uuid.UUID
    name: str
    description: Optional[str] = None
    image: str 
    created_at: datetime

class PaginationProjectResponse(BaseModel):
    total: int 
    items: List[ProjectResponseSchema]