# # # backend/app/seed.py
# # import os
# # from sqlalchemy.orm import Session, sessionmaker
# # from sqlalchemy import create_engine

# # # Absolute imports based on running the script from backend/app/
# # from settings.database import  Base
# # from models.models import User, Profile # Make sure profile.py defines the "Profile" class
# # from dependencies.security import BaseSecurity

# # RENDER_URL = "postgresql://admin:7BiifMMoCzEO0hSXUM5Cduxw5EOoDN8A@dpg-dam3i2ncgkoc73877ltg-a.frankfurt-postgres.render.com/portfolio_eeyu"

# # engine = create_engine(RENDER_URL)
# # SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# # def seed_database():
# #     print("Connecting to the production Render database...")
# #     db: Session = SessionLocal()
    
# #     try:
# #         # 1. Seed User Table
# #         user_exists = db.query(User).first()
# #         password = BaseSecurity.hash_password("password")
# #         if not user_exists:
# #             print("Seeding initial user...")
# #             new_user = User(
# #                 first_name="Frank",
# #                 last_name="Chukwubuike",
# #                 email="animesopulu@gmail.com",
# #                 password=password
# #                 # If your model needs a password, add it here
# #             )
# #             db.add(new_user)
# #             db.commit()
# #             db.refresh(new_user)
# #             print("✓ User seeded successfully.")
# #         else:
# #             print("ℹ User table already has data. Skipping.")

# #         # 2. Seed Profile Table
# #         profile_exists = db.query(Profile).first()
# #         if not profile_exists:
# #             print("Seeding initial profile...")
# #             new_profile = Profile(
# #                 image="media/profile/user_e195f890-952d-4966-ac7c-dceaff3924f3_4db9ccbabedb4dd0b570967359173b63.jpeg",
# #                 bio="I'm a graphics designer ",
# #                 address="Enugu",
# #                 phone="081255554",
# #                 facebook_link="https://facebook.com",
# #                 instagram_link="https://instagram.com",
# #                 linkedin_link="https://linkedin.com",
# #                 user_id=new_user.id
# #             )
# #             db.add(new_profile)
# #             db.commit()
# #             print("✓ Profile seeded successfully.")
# #         else:
# #             print("ℹ Profile table already has data. Skipping.")

# #     except Exception as e:
# #         db.rollback()
# #         print(f"❌ An error occurred while seeding: {e}")
# #     finally:
# #         db.close()
# #         print("Database connection cleanly closed.")

# # if __name__ == "__main__":
# #     seed_database()



# # backend/app/seed.py
# import os
# from sqlalchemy.orm import Session, sessionmaker
# from sqlalchemy import create_engine

# from settings.database import Base
# from models.models import User, Profile 
# from dependencies.security import BaseSecurity

# RENDER_URL = "postgresql://admin:7BiifMMoCzEO0hSXUM5Cduxw5EOoDN8A@dpg-dam3i2ncgkoc73877ltg-a.frankfurt-postgres.render.com/portfolio_eeyu"

# engine = create_engine(RENDER_URL)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# def seed_database():
#     print("Connecting to the production Render database...")
#     db: Session = SessionLocal()
    
#     try:
#         # 1. Handle User
#         current_user = db.query(User).first()
        
#         if not current_user:
#             print("Seeding initial user...")
#             password = BaseSecurity.hash_password("password")
#             current_user = User(
#                 first_name="Frank",
#                 last_name="Chukwubuike",
#                 email="animesopulu@gmail.com",
#                 password=password
#             )
#             db.add(current_user)
#             db.commit()
#             db.refresh(current_user)
#             print("✓ User seeded successfully.")
#         else:
#             print("ℹ User table already has data. Fetching existing user ID.")

#         # 2. Handle Profile
#         profile_exists = db.query(Profile).first()
#         if not profile_exists:
#             print("Seeding initial profile...")
#             new_profile = Profile(
#                 image="media/profile/user_e195f890-952d-4966-ac7c-dceaff3924f3_4db9ccbabedb4dd0b570967359173b63.jpeg",
#                 bio="I'm a graphics designer ",
#                 address="Enugu",
#                 phone="081255554",
#                 facebook_link="https://facebook.com",
#                 instagram_link="https://instagram.com",
#                 linkedin_link="https://linkedin.com",
#                 user_id=current_user.id 
#             )
#             db.add(new_profile)
#             db.commit()
#             print("✓ Profile seeded successfully.")
#         else:
#             print("ℹ Profile table already has data. Skipping.")

#     except Exception as e:
#         db.rollback()
#         print(f"❌ An error occurred while seeding: {e}")
#     finally:
#         db.close()
#         print("Database connection cleanly closed.")

# if __name__ == "__main__":
#     seed_database()






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
