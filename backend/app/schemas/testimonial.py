from pydantic import BaseModel 
from typing import Optional
import uuid 


class TestimonialResponseSchema(BaseModel):
    id: uuid.UUID 
    client_name: str
    project_type: str
    client_image: Optional[str] = None 
    description: Optional[str] = None
    