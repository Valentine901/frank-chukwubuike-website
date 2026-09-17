from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from routers.user import router as user_router
from routers.profile import router as profile_router
from routers.project import router as project_router
from routers.testimonial import router as testimonial_router 
from routers.skill import router as skill_router
from routers.message import router as message_router 
from settings.database import engine, Base
import os 

Base.metadata.create_all(bind=engine)
app = FastAPI()


app.include_router(project_router)
app.include_router(user_router)
app.include_router(profile_router)
app.include_router(testimonial_router)
app.include_router(skill_router)
app.include_router(message_router)

# origins = [
#     "http://localhost:5173", 
#     "http://localhost:3000",  
# ]

# FRONTEND_URL = os.getenv("FRONTEND_URL")
# if FRONTEND_URL:
#     origins.append(FRONTEND_URL)

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://frank-chukwubuike-website.vercel.app",
]

FRONTEND_URL = os.getenv("FRONTEND_URL")
if FRONTEND_URL:
    origins.append(FRONTEND_URL)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.mount("/media", StaticFiles(directory="media"), name="media")