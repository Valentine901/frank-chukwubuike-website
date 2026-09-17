from fastapi import HTTPException, Depends, APIRouter, File, UploadFile
from settings.database import get_db 
from sqlalchemy.orm import Session 
from schemas.profile import ProfileResponseSchema, ProfileUpdateSchema, ProfileCreateSchema
from dependencies.auth import BaseAuth 
from crud.profile import BaseProfile
from models.models import User
import uuid, os, shutil
from typing import Annotated, Optional


os.makedirs("media/profile/", exist_ok=True)
router = APIRouter(prefix="/api/admin/profile", tags=["Admin Profile"])

CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]
DataBaseEngine = Annotated[Session, Depends(get_db)]

@router.post("/create")
async def create_profile(data: ProfileCreateSchema, db: DataBaseEngine, current_user: CurrentUser):
    data_dict = data.model_dump()
    data_dict["user_id"] = current_user.id
    BaseProfile.create_profile(data=data_dict, db=db)
    return {"message": "Profile created successful"}

@router.put("/update", response_model=ProfileResponseSchema)
async def update_profile(data: ProfileUpdateSchema, current_user: CurrentUser, db: DataBaseEngine):
    profile = BaseProfile.update_profile(user_id=current_user.id, data=data, db=db)
    return profile

@router.get("/portfolio-visitors", response_model=ProfileResponseSchema)
async def get_portfolio_visitors(db: DataBaseEngine):
    profile = BaseProfile.get_portfolio_profile(db=db)
    return profile

@router.get("/", response_model=ProfileResponseSchema)
async def get_profile(current_user: CurrentUser, db: DataBaseEngine):
    profile = BaseProfile.get_profile(current_user.id, db=db)
    return profile


@router.put("/update-image")
async def upload_profile_image(current_user: CurrentUser, db: DataBaseEngine, file: Optional[UploadFile] = File(None)):

    profile = BaseProfile.get_profile(user_id=current_user.id, db=db)
    if profile.image and os.path.exists(profile.image): #type:ignore
        try:
            os.remove(profile.image) #type:ignore
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error deleting old file {e}")

    file_ext = file.filename.split(".")[-1]
    unique_name = f"user_{current_user.id}_{uuid.uuid4().hex}.{file_ext}"
    path = f"media/profile/{unique_name}"

    try:
        with open(path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception:
        raise HTTPException(status_code=500, detail="Could not save file")
    finally:
        file.file.close()

    profile.image = path

    db.commit()
    db.refresh(profile)
    return profile