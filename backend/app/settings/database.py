# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker, DeclarativeBase
# from settings.config import Setting


# class Base(DeclarativeBase):
#     pass 

# engine = create_engine(Setting.DATABASE_URL)

# SessionLocal = sessionmaker(autoflush=False, autocommit=False, bind=engine)

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db 
#     finally:
#         db.close()





import os  # 👈 Make sure to import os at the top
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from settings.config import Setting

class Base(DeclarativeBase):
    pass 

# 1. 🚀 DYNAMIC OVERRIDE: Check Render environment first, fallback to your config class
DATABASE_URL = os.getenv("DATABASE_URL", Setting.DATABASE_URL)

# 2. ⚠️ THE SQLALCHEMY REPLACEMENT FIX:
# SQLAlchemy 2.0+ strictly requires "postgresql://" and crashes on "postgres://"
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Connect using the standardized production URL string
engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autoflush=False, autocommit=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db 
    finally:
        db.close()






