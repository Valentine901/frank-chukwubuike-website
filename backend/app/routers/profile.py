# from fastapi import HTTPException, Depends, APIRouter, File, UploadFile
# from fastapi.responses import JSONResponse
# from settings.database import get_db 
# from sqlalchemy.orm import Session 
# from schemas.profile import ProfileResponseSchema, ProfileUpdateSchema, ProfileCreateSchema
# from dependencies.auth import BaseAuth 
# from crud.profile import BaseProfile
# from models.models import User
# import uuid, os, shutil
# from typing import Annotated, Optional
# import cloudinary  # type: ignore
# import cloudinary.uploader  # type: ignore


# os.makedirs("media/profile/", exist_ok=True)
# router = APIRouter(prefix="/api/admin/profile", tags=["Admin Profile"])
# cloudinary.config(
#     cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
#     api_key=os.getenv("CLOUDINARY_API_KEY"),
#     api_secret=os.getenv("CLOUDINARY_API_SECRET"),
#     secured=True
# )

# CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]
# DataBaseEngine = Annotated[Session, Depends(get_db)]

# @router.post("/create")
# async def create_profile(data: ProfileCreateSchema, db: DataBaseEngine, current_user: CurrentUser):
#     data_dict = data.model_dump()
#     data_dict["user_id"] = current_user.id
#     BaseProfile.create_profile(data=data_dict, db=db)
#     return {"message": "Profile created successful"}

# @router.put("/update", response_model=ProfileResponseSchema)
# async def update_profile(data: ProfileUpdateSchema, current_user: CurrentUser, db: DataBaseEngine):
#     profile = BaseProfile.update_profile(user_id=current_user.id, data=data, db=db)
#     return profile

# @router.get("/portfolio-visitors")
# async def get_portfolio_visitors(db: DataBaseEngine):
#     profile = BaseProfile.get_portfolio_profile(db=db)
#     return profile

# @router.get("/", response_model=ProfileResponseSchema)
# async def get_profile(current_user: CurrentUser, db: DataBaseEngine):
#     profile = BaseProfile.get_profile(current_user.id, db=db)
#     return profile


# @router.put("/update-image")
# async def upload_profile_image(current_user: CurrentUser, db: DataBaseEngine, file: Optional[UploadFile] = File(None)):

#     profile = BaseProfile.get_profile(user_id=current_user.id, db=db)
#     if profile.image and os.path.exists(profile.image): #type:ignore
#         try:
#             os.remove(profile.image) #type:ignore
#         except Exception as e:
#             raise HTTPException(status_code=500, detail=f"Error deleting old file {e}")

#     file_ext = file.filename.split(".")[-1]
#     unique_name = f"user_{current_user.id}_{uuid.uuid4().hex}.{file_ext}"
#     path = f"media/profile/{unique_name}"

#     try:
#         with open(path, "wb") as buffer:
#             shutil.copyfileobj(file.file, buffer)
#     except Exception:
#         raise HTTPException(status_code=500, detail="Could not save file")
#     finally:
#         file.file.close()

#     profile.image = path

#     db.commit()
#     db.refresh(profile)
#     return profile





from fastapi import HTTPException, Depends, APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
from settings.database import get_db 
from sqlalchemy.orm import Session 
from schemas.profile import ProfileResponseSchema, ProfileUpdateSchema, ProfileCreateSchema
from dependencies.auth import BaseAuth 
from crud.profile import BaseProfile
from models.models import User
import uuid
import os
import anyio
from typing import Annotated, Optional
import cloudinary  # type: ignore
import cloudinary.uploader  # type: ignore

router = APIRouter(prefix="/api/admin/profile", tags=["Admin Profile"])

# Initialize Cloudinary Configuration
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True  # Corrected configuration key parameter 'secure'
)

CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]
DataBaseEngine = Annotated[Session, Depends(get_db)]


# --- Synchronous Worker Functions for Thread Offloading ---

def sync_cloudinary_upload(file_bytes: bytes, folder_path: str) -> dict:
    """Blocks the active thread while transferring local bytes to Cloudinary."""
    return cloudinary.uploader.upload(file_bytes, folder=folder_path)

def sync_cloudinary_delete(public_id: str) -> dict:
    """Blocks the active thread while removing an asset from Cloudinary."""
    return cloudinary.uploader.destroy(public_id)

def extract_public_id(url: str) -> Optional[str]:
    """Helper to parse out the public_id from a full Cloudinary secure URL."""
    if not url or "://cloudinary.com" not in url:
        return None
    try:
        # Splits segments after the path version index (e.g. /v123456789/folder/file.jpg)
        parts = url.split("/")
        version_index = next(i for i, part in enumerate(parts) if part.startswith("v") and part[1:].isdigit())
        public_id_with_ext = "/".join(parts[version_index + 1:])
        return public_id_with_ext.rsplit(".", 1)[0]
    except Exception:
        return None


# --- FastAPI Dynamic Router Enpoints ---

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

@router.get("/portfolio-visitors")
async def get_portfolio_visitors(db: DataBaseEngine):
    profile = BaseProfile.get_portfolio_profile(db=db)
    return profile

@router.get("/", response_model=ProfileResponseSchema)
async def get_profile(current_user: CurrentUser, db: DataBaseEngine):
    profile = BaseProfile.get_profile(current_user.id, db=db)
    return profile

@router.put("/update-image", response_model=ProfileResponseSchema)
async def upload_profile_image(current_user: CurrentUser, db: DataBaseEngine, file: Optional[UploadFile] = File(None)):
    profile = BaseProfile.get_profile(user_id=current_user.id, db=db)
    
    if not file:
        raise HTTPException(status_code=400, detail="No file payload provided")
        
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be a valid image")

    # 1. Clean up old image asset from Cloudinary storage if it exists
    if profile.image: # type: ignore
        old_public_id = extract_public_id(profile.image) # type: ignore
        if old_public_id:
            try:
                await anyio.to_thread.run_sync(sync_cloudinary_delete, old_public_id)
            except Exception as e:
                # Log this error or suppress it depending on system priorities
                pass

    # 2. Upload new asset file asynchronously
    try:
        file_bytes = await file.read()
        
        # Safely offload blocking uploading tasks into a distinct background thread
        upload_result = await anyio.to_thread.run_sync(
            sync_cloudinary_upload, 
            file_bytes, 
            "media/profile"
        )
        
        # Acquire secure target production URL string returned by Cloudinary
        secure_url = upload_result.get("secure_url")
        if not secure_url:
            raise HTTPException(status_code=500, detail="Cloudinary did not return a valid secure URL")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error executing Cloudinary storage pipeline: {str(e)}")
    finally:
        await file.close()

    # 3. Synchronize secure remote asset paths to database tables
    profile.image = secure_url
    db.commit()
    db.refresh(profile)
    
    return profile
