from sqlalchemy import String, ForeignKey, UUID, Integer, CheckConstraint, DateTime, Boolean, func 
from sqlalchemy.orm import mapped_column, Mapped, relationship 
from settings.database import  Base
from datetime import datetime
from typing import List
import uuid 


class User(Base):
    __tablename__ = "user"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, unique=True, index=True, default=uuid.uuid4)

    first_name: Mapped[str] = mapped_column(String, nullable=False)
    last_name: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String, nullable=False)

    enforce_single_row: Mapped[int] = mapped_column(Integer, default=1, unique=True, nullable=False)

    __table_args__ = (
        CheckConstraint("enforce_single_row = 1", name="only_one_admin_allowed"),
    )
    is_verified: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    verification_codes: Mapped[List["VerificationToken"]] = relationship("VerificationToken", back_populates="user")
    projects: Mapped[List["Project"]] = relationship("Project", back_populates="user")
    skills: Mapped[List["Skill"]] = relationship("Skill", back_populates="user")
    testimonials: Mapped[List["Testimonial"]] = relationship("Testimonial", back_populates="user")
    profile: Mapped["Profile"] = relationship("Profile", back_populates="user", uselist=False)


class VerificationToken(Base):
    __tablename__ = "verification_tokens"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    token_code: Mapped[str] = mapped_column(String(6), nullable=False)
    expires_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    otp_attempts: Mapped[int] = mapped_column(Integer, default=0)
    user: Mapped["User"] = relationship("User", back_populates="verification_codes")
    user_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("user.id", ondelete="CASCADE"), nullable=False)


class Profile(Base):
    __tablename__ = "profile"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, unique=True, index=True, default=uuid.uuid4)
    image: Mapped[str] = mapped_column(String, nullable=True)
    bio: Mapped[str] = mapped_column(String, nullable=True)
    address: Mapped[str] = mapped_column(String, nullable=True)
    phone: Mapped[str] = mapped_column(String, nullable=True)
    facebook_link: Mapped[str] = mapped_column(String, nullable=True)
    instagram_link: Mapped[str] = mapped_column(String, nullable=True)
    linkedin_link: Mapped[str] = mapped_column(String, nullable=True)

    enforce_single_row: Mapped[int] = mapped_column(Integer, default=1, unique=True, nullable=False)

    __table_args__ = (
        CheckConstraint("enforce_single_row = 1", name="only_one_admin_allowed"),
    )

    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id"), unique=True)
    user: Mapped["User"] = relationship("User", back_populates="profile")

class Project(Base):
    __tablename__ = "projects"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, unique=True, index=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=True)
    image: Mapped[str] = mapped_column(String, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, server_default=func.now())

    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship("User", back_populates="projects")

class Skill(Base):
    __tablename__ = "skills"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, unique=True, index=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String, nullable=False) 

    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship("User", back_populates="skills")

class Testimonial(Base):
    __tablename__ = "testimonials"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, unique=True, index=True, default=uuid.uuid4)
    client_name: Mapped[str] = mapped_column(String, nullable=False) 
    client_image: Mapped[str] = mapped_column(String, nullable=True)
    project_type: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=True)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship("User", back_populates="testimonials")


class Message(Base):
    __tablename__ = "messages"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, unique=True, index=True, default=uuid.uuid4)
    sender_name: Mapped[str] = mapped_column(String, nullable=False)
    sender_subject: Mapped[str] = mapped_column(String, nullable=False)
    sender_email: Mapped[str] = mapped_column(String, nullable=False)
    sender_message: Mapped[str] = mapped_column(String, nullable=False)
    sent_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

