"""
Environment healthcheck endpoint
"""
from fastapi import APIRouter, Response
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



@router.post("/logout", tags=["system"])
async def logout(response: Response):
    """

    :param response:
    """

    response.delete_cookie("login_session", httponly=True, samesite="lax", path="/")
    return {"success": True}
