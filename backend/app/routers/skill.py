from fastapi import HTTPException, status, Depends, APIRouter
from sqlalchemy.orm import Session 
from schemas.skill import SkillResponseSchema, CreateSkillSchema
from dependencies.auth import BaseAuth
from crud.skill import BaseSkill
from typing import Annotated, List 
from settings.database import get_db
from models.models import User
import uuid 

router = APIRouter(prefix="/api/skill", tags=["Skill"])

DataBaseEngine = Annotated[Session, Depends(get_db)]
CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]


@router.get("/skills", response_model=List[SkillResponseSchema])
async def get_skills(db: DataBaseEngine, limit: int = 10, offset: int = 0):
    skills = BaseSkill.get_skills(db=db, limit=limit, offset=offset)
    if skills:
        return skills 
    return []

@router.post("/create-skill", response_model=SkillResponseSchema)
async def create_skill(data: CreateSkillSchema, current_user: CurrentUser, db: DataBaseEngine):
    data_dict = data.model_dump()
    data_dict["user_id"] = current_user.id
    skill = BaseSkill.create_skill(data=data_dict, db=db)
    return skill


@router.delete("/delete/{skill_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_skill(skill_id: uuid.UUID, db: DataBaseEngine, current_user: CurrentUser):
    is_deleted = BaseSkill.delete_skill(skill_id=skill_id, db=db)
    if is_deleted:
        return {"message": "Skill deleted succesfully!"}