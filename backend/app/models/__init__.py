"""
Here SQL tables will be imported for alembic to registrate
"""


from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """
    Class for registering DB models, one table = one model
    """
    pass


from .user import User
from .session import Session

__all__ = ["Base", "User", "Session"]
