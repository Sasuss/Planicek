"""
Environment healthcheck endpoint
"""
from fastapi import APIRouter, Response, Depends, HTTPException
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update

from app.database import engine, get_db
from app.models import Session
from app.models import User

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

async def delete_user(login_session, db: AsyncSession = Depends(get_db)):
    user_id = await db.execute(select(Session.user_id).where(Session.session_id == login_session))
    user_id = user_id.scalar_one_or_none()
    if user_id is None:
        raise HTTPException(status_code=404, detail="User not found")
    else:
        await db.execute(update(User).where(User.id == user_id).values(status="deleted"))
