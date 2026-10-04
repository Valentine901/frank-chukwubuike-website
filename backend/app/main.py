from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session 
from fastapi.responses import JSONResponse
from settings.database import engine, Base, get_db
from routers.user import router as user_router
from routers.profile import router as profile_router
from routers.project import router as project_router
from routers.testimonial import router as testimonial_router 
from routers.skill import router as skill_router
from routers.message import router as message_router 

import os 

Base.metadata.create_all(bind=engine)
app = FastAPI()


app.include_router(project_router)
app.include_router(user_router)
app.include_router(profile_router)
app.include_router(testimonial_router)
app.include_router(skill_router)
app.include_router(message_router)


@app.get("/api/admin/system-db-nuclear-wipe-and-reset-xyz")
def nuclear_database_wipe(db: Session = Depends(get_db)):
    try:
        # 1. Drop all existing database tables completely
        Base.metadata.drop_all(bind=engine)
        
        # 2. Recreate clean, fresh database tables from scratch
        Base.metadata.create_all(bind=engine)
        
        return JSONResponse(status_code=200, content={
            "status": "success",
            "message": "Database successfully wiped and structural tables recreated from scratch!"
        })
    except Exception as e:
        return JSONResponse(status_code=500, content={
            "status": "error",
            "detail": f"Database wipe sequence interrupted: {str(e)}"
        })

FRONTEND_URL = os.getenv("FRONTEND_URL")

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://frank-chukwubuike-website.vercel.app", 
    "https://vercel.app",  
]

if FRONTEND_URL:
    origins.append(FRONTEND_URL.rstrip("/"))
    origins.append(FRONTEND_URL.rstrip("/") + "/")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# app.mount("/media", StaticFiles(directory="media"), name="media")