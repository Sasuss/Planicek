"""
User Table model
"""
from datetime import datetime

from sqlalchemy import DateTime, String
from sqlalchemy.orm import Mapped, mapped_column
from . import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, nullable=False)
    google_id: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    email: Mapped[str|None] = mapped_column(String, unique=True, nullable=True)
    display_name: Mapped[str|None] = mapped_column(String, nullable=True)
    family_name: Mapped[str|None] = mapped_column(String, nullable=True)
    avatar_url: Mapped[str|None] = mapped_column(String, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=datetime.now)

