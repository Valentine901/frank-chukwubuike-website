from fastapi import HTTPException
from sqlalchemy.orm import Session 
from sqlalchemy import select
from models.models import Skill
import uuid 


class BaseSkill:

    @staticmethod
    def create_skill(data: dict, db: Session):
        # unpacking skills data
        new_skill = Skill(**data)
        db.add(new_skill)
        db.commit()
        db.refresh(new_skill)
        return new_skill


    @staticmethod
    def get_skill(skill_id: uuid.UUID, db: Session):
        query = select(Skill).where(Skill.id == skill_id)
        result = db.execute(query)
        skill = result.scalar_one_or_none()
        return skill 

    @staticmethod 
    def get_skills(db: Session, limit: int = 10, offset: int = 0):
        query = select(Skill).offset(offset).limit(limit)
        result = db.execute(query)
        skills = result.scalars().all()
        # reverse it to be ordered by latest
        return skills[::-1]


    @staticmethod
    def delete_skill(skill_id: uuid.UUID, db: Session):
        skill = BaseSkill.get_skill(skill_id=skill_id, db=db)

        if skill is None:
            raise HTTPException(status_code=404, detail="Skill not found")

        db.delete(skill)
        db.commit()
        return True
