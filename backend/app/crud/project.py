from fastapi import status, HTTPException
from sqlalchemy.orm import Session 
from sqlalchemy import select 
from models.models import Project
import uuid


class BaseProject:

    @staticmethod
    def get_project_by_id(project_id: uuid.UUID, db: Session):
        query = select(Project).where(Project.id == project_id)
        result = db.execute(query)
        project = result.scalar_one_or_none()
        return project

    @staticmethod
    def get_project_by_name(name: str, db: Session):
        query = select(Project).where(Project.name == name)
        result = db.execute(query)
        project = result.scalar_one_or_none()
        return project
    
    @staticmethod 
    def get_project_by_latest(db: Session):
        query = select(Project).order_by(Project.created_at.desc()).limit(4)
        result = db.execute(query)
        projects = result.scalars().all()
        return projects

    @staticmethod
    def get_projects(db: Session, offset: int, limit: int):
        query = select(Project).order_by(Project.created_at.desc()).offset(offset).limit(limit)
        result = db.execute(query)
        projects  = result.scalars().all()
        return projects 

    @staticmethod 
    def get_total_count(db: Session):
        query = select(Project)
        result = db.execute(query)
        projects = result.scalars().all()
        total_count = len(projects)
        return total_count
    
    @staticmethod
    def create_project(data: dict, db: Session):
        new_project = Project(**data)
        db.add(new_project)
        db.commit()
        db.refresh(new_project)
        return new_project 

    @staticmethod
    def update_project(project_id: uuid.UUID, data: dict, db: Session):
        project = BaseProject.get_project_by_id(project_id=project_id, db=db)

        if project is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
        
        for key, value in data.items():
            if value is not None:
                setattr(project, key, value)
                db.commit()
                db.refresh(project)
        return project

    @staticmethod
    def delete_project(project_id: uuid.UUID, db: Session):
        project = BaseProject.get_project_by_id(project_id=project_id, db=db)

        if project is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
        
        db.delete(project)
        db.commit()
        return True