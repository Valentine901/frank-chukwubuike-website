from fastapi import HTTPException, status, Depends, APIRouter, Form, File, UploadFile
from sqlalchemy.orm import Session 
from schemas.testimonial import TestimonialResponseSchema
from dependencies.auth import BaseAuth
from crud.testimonial import BaseTestimonial
from typing import Annotated, List, Optional 
from settings.database import get_db
from models.models import User
import uuid , os, shutil 

router = APIRouter(prefix="/api/testimonial", tags=["Testimonials"])
CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]
DataBaseEngine = Annotated[Session, Depends(get_db)]

os.makedirs("media/testimonial/", exist_ok=True)

@router.post("/create-testimonial", response_model=TestimonialResponseSchema)
async def api_create_testimonial(
    current_user: CurrentUser, 
    db: DataBaseEngine,
    client_name: str = Form(...),
    project_type: str = Form(...),
    client_image: Optional[UploadFile] = File(None),
    description: Optional[str] = Form(None)
):

    path = None 
    if client_image and client_image.filename:
        file_ext = client_image.filename.split(".")[-1]
        unique_uuid = f"{current_user.id}_{uuid.uuid4().hex}.{file_ext}"
        path = f"media/testimonial/${unique_uuid}"

        try:
            with open(path, "wb") as buffer:
                shutil.copyfileobj(client_image.file, buffer)
        except Exception:
            raise HTTPException(status_code=500, detail="Could not save file.")
        finally:
            client_image.file.close()
    data = {
        "client_name":client_name, 
        "project_type":project_type,
        "client_image": path,
        "description":description,
        "user_id": current_user.id
    }
    testimonial = BaseTestimonial.create_testimonial(data=data, db=db)
    return testimonial  


@router.put("/update/{testimonial_id}", response_model=TestimonialResponseSchema)
async def api_update_testimonial(
        current_user: CurrentUser,
        db: DataBaseEngine,
        testimonial_id: uuid.UUID,
        client_name: Optional[str] = Form(None),
        project_type: Optional[str] = Form(None),
        client_image: Optional[UploadFile] = File(None),
        description: Optional[str] = Form(None)
):

    path = None
    if client_image and client_image.filename:
        file_ext = client_image.filename.split(".")[-1]
        unique_uuid = f"testimonial_{current_user.id}_{uuid.uuid4().hex}.{file_ext}"
        path = f"media/testimonial/{unique_uuid}"

        try:
            with open(path, "wb") as buffer:
                shutil.copyfileobj(client_image.file, buffer)
        except Exception:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not save file.")
        finally:
            client_image.file.close()

    data = {
        "client_name":client_name,
        "project_type": project_type, 
        "client_image": path,
        "description":description,
        "user_id": current_user.id
    }
    updated_testimonial = BaseTestimonial.update_testimonial(data_id=testimonial_id, data=data, db=db)
    return updated_testimonial



@router.get("/testimonials", response_model=List[TestimonialResponseSchema])
async def api_fetch_testimonials(db: DataBaseEngine, offset: int = 0, limit: int = 10):
    testimonials = BaseTestimonial.get_testimonials(db=db, offset=offset, limit=limit)
    return testimonials

@router.get("/{testimonial_id}", response_model=TestimonialResponseSchema)
async def api_fetch_testimonial(testimonial_id: uuid.UUID, db: DataBaseEngine):
    testimonial = BaseTestimonial.get_testimonial(data_id=testimonial_id, db=db)
    if testimonial is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Testimonial not found")
    return testimonial

@router.delete("/delete/{testimonial_id}", status_code=status.HTTP_204_NO_CONTENT)
async def api_delete_testimonial(testimonial_id: uuid.UUID, current_user: CurrentUser, db: DataBaseEngine):
    BaseTestimonial.delete_testimonial(data_id=testimonial_id, db=db)
    return {"message": "Testimonial deleted sucessfully"}