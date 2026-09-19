# from fastapi import Depends, HTTPException, status, APIRouter, File, UploadFile, Form
# from settings.database import get_db 
# from sqlalchemy.orm import Session 
# from schemas.project import ProjectResponseSchema, PaginationProjectResponse
# from dependencies.auth import BaseAuth
# from crud.project import BaseProject
# from typing import Annotated
# from datetime import datetime, timezone
# from models.models import User
# import os, shutil, uuid
# from typing import Optional, List

# router = APIRouter(prefix="/api/project", tags=["Project"])
# os.makedirs("media/project", exist_ok=True)

# CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]
# DataBaseEngine = Annotated[Session, Depends(get_db)]

# @router.post("/create-project", response_model=ProjectResponseSchema)
# async def api_create_project(
#     current_user: CurrentUser,
#     db: DataBaseEngine,
#     name: str = Form(...),
#     description: Optional[str] = Form(None),
#     image: UploadFile = File(...),

# ):
#     project = BaseProject.get_project_by_name(name=name, db=db)
#     if project is not None:
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Project name already existed")

#     file_ext = image.filename.split(".")[-1]
#     unique_path = f"project_{current_user.id}_{uuid.uuid4().hex}.{file_ext}"
#     path = f"media/project/{unique_path}"

#     try:
#         with open(path, "wb") as buffer:
#             shutil.copyfileobj(image.file, buffer)
#     except Exception:
#         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not save file.")
#     finally:
#         image.file.close()

#     data = {
#         "name": name,
#         "description": description,
#         "image": path,
#         "user_id": current_user.id,
#         "created_at": datetime.now(timezone.utc)
#     }
#     project = BaseProject.create_project(data=data, db=db)
#     return project


# @router.put("/update/{project_id}", response_model=ProjectResponseSchema)
# async def api_update_project(
#         current_user: CurrentUser,
#         db: DataBaseEngine,
#         project_id: uuid.UUID,
#         name: Optional[str] = File(None),
#         image: Optional[UploadFile] = File(None),
#         description: Optional[str] = Form(None)
# ):

#     path = None
#     if image and image.filename:
#         file_ext = image.filename.split(".")[-1]
#         unique_uuid = f"project_{current_user.id}_{uuid.uuid4().hex}.{file_ext}"
#         path = f"media/project/{unique_uuid}"

#         try:
#             with open(path, "wb") as buffer:
#                 shutil.copyfileobj(image.file, buffer)
#         except Exception:
#             raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not save file.")
#         finally:
#             image.file.close()

#     data = {
#         "name": name,
#         "description": description,
#         "image": path,
#         "user_id": current_user.id
#     }

#     updated_project = BaseProject.update_project(project_id=project_id, data=data, db=db)
#     return updated_project

# @router.get("/projects/ordered-by-created", response_model=List[ProjectResponseSchema])
# async def api_fetch_projects_ordered_by_created(db: DataBaseEngine):
#     projects = BaseProject.get_project_by_latest(db=db)
#     return projects 

# @router.get("/projects", response_model=List[ProjectResponseSchema])
# async def api_fetch_projects(db: DataBaseEngine, offset: int = 0, limit: int = 10):
#     projects = BaseProject.get_projects(db=db, offset=offset, limit=limit)
#     return projects

# @router.get("/paginated/projects", response_model=PaginationProjectResponse)
# async def api_paginated_projects(db: DataBaseEngine, offset: int = 0, limit: int = 10):
#     total_count = BaseProject.get_total_count(db=db)

#     projects = BaseProject.get_projects(db=db, offset=offset, limit=limit)
#     return {
#         "total": total_count,
#         "items": projects
#     }

# @router.get("/{project_id}", response_model=ProjectResponseSchema)
# async def api_fetch_project(project_id: uuid.UUID, db: DataBaseEngine):
#     project = BaseProject.get_project_by_id(project_id=project_id, db=db)
#     if project is None:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
#     return project

# @router.delete("/delete/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
# async def api_delete_project(project_id: uuid.UUID, current_user: CurrentUser, db: DataBaseEngine):
#     BaseProject.delete_project(project_id=project_id, db=db)
#     return {"message": "Project deleted sucessfully"}









from fastapi import Depends, HTTPException, status, APIRouter, File, UploadFile, Form
from settings.database import get_db 
from sqlalchemy.orm import Session 
from schemas.project import ProjectResponseSchema, PaginationProjectResponse
from dependencies.auth import BaseAuth
from crud.project import BaseProject
from typing import Annotated
from datetime import datetime, timezone
from models.models import User
import os, uuid
import cloudinary
import cloudinary.uploader
from typing import Optional, List

# Configure Cloudinary using environment variables
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

router = APIRouter(prefix="/api/project", tags=["Project"])

CurrentUser = Annotated[User, Depends(BaseAuth.get_current_user)]
DataBaseEngine = Annotated[Session, Depends(get_db)]

@router.post("/create-project", response_model=ProjectResponseSchema)
async def api_create_project(
    current_user: CurrentUser,
    db: DataBaseEngine,
    name: str = Form(...),
    description: Optional[str] = Form(None),
    image: UploadFile = File(...),
):
    project = BaseProject.get_project_by_name(name=name, db=db)
    if project is not None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Project name already existed")

    try:
        # Stream the image file stream straight to Cloudinary
        upload_result = cloudinary.uploader.upload(
            image.file,
            folder="portfolio/projects" # Organized path inside Cloudinary
        )
        permanent_url = upload_result.get("secure_url")
        if not permanent_url:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to get secure URL from Cloudinary.")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Cloudinary upload error: {str(e)}")
    finally:
        image.file.close()

    data = {
        "name": name,
        "description": description,
        "image": permanent_url, # Store the full web link in PostgreSQL
        "user_id": current_user.id,
        "created_at": datetime.now(timezone.utc)
    }
    project = BaseProject.create_project(data=data, db=db)
    return project


@router.put("/update/{project_id}", response_model=ProjectResponseSchema)
async def api_update_project(
        current_user: CurrentUser,
        db: DataBaseEngine,
        project_id: uuid.UUID,
        name: Optional[str] = Form(None), # Fixed: Changed from File(None) to Form(None) for text input fields
        image: Optional[UploadFile] = File(None),
        description: Optional[str] = Form(None)
):
    permanent_url = None
    if image and image.filename:
        try:
            # Stream the updated image to Cloudinary if provided
            upload_result = cloudinary.uploader.upload(
                image.file,
                folder="portfolio/projects"
            )
            permanent_url = upload_result.get("secure_url")
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Cloudinary upload error: {str(e)}")
        finally:
            image.file.close()

    data = {
        "name": name,
        "description": description,
        "user_id": current_user.id
    }
    
    # Only update the image link if a new image was uploaded
    if permanent_url:
        data["image"] = permanent_url

    updated_project = BaseProject.update_project(project_id=project_id, data=data, db=db)
    return updated_project

@router.get("/projects/ordered-by-created", response_model=List[ProjectResponseSchema])
async def api_fetch_projects_ordered_by_created(db: DataBaseEngine):
    projects = BaseProject.get_project_by_latest(db=db)
    return projects 

@router.get("/projects", response_model=List[ProjectResponseSchema])
async def api_fetch_projects(db: DataBaseEngine, offset: int = 0, limit: int = 10):
    projects = BaseProject.get_projects(db=db, offset=offset, limit=limit)
    return projects

@router.get("/paginated/projects", response_model=PaginationProjectResponse)
async def api_paginated_projects(db: DataBaseEngine, offset: int = 0, limit: int = 10):
    total_count = BaseProject.get_total_count(db=db)
    projects = BaseProject.get_projects(db=db, offset=offset, limit=limit)
    return {
        "total": total_count,
        "items": projects
    }

@router.get("/{project_id}", response_model=ProjectResponseSchema)
async def api_fetch_project(project_id: uuid.UUID, db: DataBaseEngine):
    project = BaseProject.get_project_by_id(project_id=project_id, db=db)
    if project is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    return project

@router.delete("/delete/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def api_delete_project(project_id: uuid.UUID, current_user: CurrentUser, db: DataBaseEngine):
    BaseProject.delete_project(project_id=project_id, db=db)
    return {"message": "Project deleted successfully"}
