"""
Creates DB engine
"""

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
#https://docs.sqlalchemy.org/en/21/orm/quickstart.html
from app.config import settings

# engine setup
engine = create_async_engine(
    settings.database_url,
    echo=True, # Lists sql queries
    pool_pre_ping=True, # checks connection
)

# Sets up session
SessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


async def get_db():
    """
    Gives db session to an endpoint and then later closes it
    """
    async with SessionLocal() as session:
        yield session