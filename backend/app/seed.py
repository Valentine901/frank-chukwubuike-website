from fastapi import HTTPException
from sqlalchemy.orm import Session
from fastapi.responses import JSONResponse

# Make sure these match the actual names of your models and security helper
from models.models import User, Profile 
from dependencies.security import BaseSecurity
from settings.database import SessionLocal, engine, Base

@app.get("/api/secret-database-reset-xyz")
async def force_database_reset():
    """
    Secret endpoint to wipe the live Render database and create your admin user.
    You will delete this code after running it once.
    """
    try:
        # 1. Clear out all tables completely
        Base.metadata.drop_all(bind=engine)
        
        # 2. Rebuild the tables brand new
        Base.metadata.create_all(bind=engine)
        
        # 3. Connect and insert the admin data assets
        db: Session = SessionLocal()
        
        TARGET_EMAIL = "animesopulu@gmail.com"
        password_hash = BaseSecurity.hash_password("password")
        
        # Create user record
        new_admin = User(
            first_name="Frank",
            last_name="Chukwubuike",
            email=TARGET_EMAIL,
            password=password_hash
        )
        db.add(new_admin)
        db.commit()
        db.refresh(new_admin)
        
        # Create corresponding profile record
        new_profile = Profile(
            image="media/profile/user_e195f890-952d-4966-ac7c-dceaff3924f3_4db9ccbabedb4dd0b570967359173b63.jpeg",
            bio="I'm a graphics designer",
            address="Enugu",
            phone="081255554",
            facebook_link="https://facebook.com",
            instagram_link="https://instagram.com",
            linkedin_link="https://linkedin.com",
            user_id=new_admin.id
        )
        db.add(new_profile)
        db.commit()
        db.close()
        
        return JSONResponse(content={
            "status": "success",
            "message": f"Database completely wiped and admin user '{TARGET_EMAIL}' created successfully!"
        })
        
    except Exception as e:
        return JSONResponse(status_code=500, content={
            "status": "error",
            "message": str(e)
        })
