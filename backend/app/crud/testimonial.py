from fastapi import HTTPException
from sqlalchemy.orm import Session 
from sqlalchemy import select 
from models.models import Testimonial
import uuid 

class BaseTestimonial:

    @staticmethod
    def create_testimonial(data: dict, db: Session):
        new_testimonial = Testimonial(**data)
        db.add(new_testimonial)
        db.commit()
        db.refresh(new_testimonial)
        return new_testimonial
    
    @staticmethod 
    def get_testimonial(data_id: uuid.UUID, db: Session):
        query = select(Testimonial).where(Testimonial.id == data_id)
        result = db.execute(query)
        testimonial = result.scalar_one_or_none()
        return testimonial

    @staticmethod
    def get_testimonials(db: Session, limit: int, offset: int):
        query = select(Testimonial).offset(offset).limit(limit)
        result = db.execute(query)
        testimonials = result.scalars().all()
        return testimonials[::-1]

    
    @staticmethod 
    def update_testimonial(data_id: uuid.UUID, data: dict, db: Session):
        testimonial = BaseTestimonial.get_testimonial(data_id=data_id, db=db)
        if testimonial is None:
            raise HTTPException(status_code=404, detail="Testimonial not found")

        for key, value in data.items():
            if value is not None:
                setattr(testimonial, key, value)
        db.commit()
        db.refresh(testimonial)
        return testimonial 

    @staticmethod
    def delete_testimonial(data_id: uuid.UUID, db: Session):
        testimonial = BaseTestimonial.get_testimonial(data_id=data_id, db=db)
        if testimonial is None:
            raise HTTPException(status_code=404, detail="Testimonial not found")

        db.delete(testimonial)
        db.commit()
        return True