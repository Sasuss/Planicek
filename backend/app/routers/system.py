from fastapi import APIRouter
from sqlalchemy import text

from app.database import engine

router = APIRouter(tags=["system"])


@router.get("/health")
async def health() -> dict:
    """

    :return:
    """
    db_ok = False
    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        db_ok = True
    except Exception:
        pass
    return {"status": "api zije", "db": "ok" if db_ok else "error"}
