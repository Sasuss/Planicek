"""
Google oauth
"""
from datetime import datetime

from fastapi import APIRouter, HTTPException, Depends, Response, Cookie
from google.oauth2 import id_token
from google.auth.transport import requests
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from app.config import settings
from app.database import get_db
from app.models import User
from app.models import Session
from app.models.session import SESSION_LIFETIME

import secrets
# TODO: REJECT DELETED USERS

router = APIRouter(
    prefix="/authenticate",
    tags=["authenticate"],
)


class GoogleLogin(BaseModel):
    """
    Body of the login request sent by the frontend after Google returns the credential
    """
    credential: str


@router.post("/verify_user", tags=["authenticate"])
async def verify_user(login_session: str | None = Cookie(default=None), db: AsyncSession = Depends(get_db)):
    """

    :param login_session:
    :param db:
    :return:
    """
    if login_session is None:
        raise HTTPException(status_code=401, detail="Not logged in")

    session_token = await db.execute(select(Session.user_id).where(Session.session_id == login_session))
    user_id = session_token.scalar_one_or_none()
    if user_id is None:
        raise HTTPException(status_code=401, detail="Not logged in")

    user = await db.execute(select(User).where(User.id == user_id))
    user = user.scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=401, detail="Not logged in")

    return {
        "email": user.email,
        "display_name": user.display_name,
        "family_name": user.family_name,
        "avatar_url": user.avatar_url,
    }


@router.post("")
async def authenticate(
        body: GoogleLogin,
        response: Response,
        login_session: str | None = Cookie(default=None),
        db: AsyncSession = Depends(get_db),
):
    """
    Called by the frontend (fetch) with the credential from Google Sign-In.
    Same-origin request, so the browser sends the existing login_session cookie
    and the old session of this browser can be replaced by a new one.

    :param body: credential returned by Google, used for verifying the user
    :param response: used for setting the cookie
    :param login_session: session cookie of this browser, if it has one
    :param db: database session
    :return: success: True if the login went through
    """
    try:
        # noinspection PyTypeChecker
        idinfo = id_token.verify_oauth2_token(body.credential, requests.Request(), settings.google_client_id)
    except ValueError as e:
        # Invalid token
        raise HTTPException(status_code=400, detail=f"Invalid authentication token: {e}")

    userid = idinfo['sub']
    email = idinfo.get('email')
    name = idinfo.get('given_name')
    surname = idinfo.get('family_name')
    avatar_url = idinfo.get('picture')

    result = await db.execute(select(User).where(User.google_id == userid))
    user = result.scalar_one_or_none()
    if user is None:
        user = User(
            google_id=userid,
            email=email,
            display_name=name,
            family_name=surname,
            avatar_url=avatar_url,
        )
        db.add(user)
        await db.flush()

    if login_session:
        await db.execute(delete(Session).where(Session.session_id == login_session))

    await db.execute(
        delete(Session).where(Session.user_id == user.id,
                              Session.expires_at < datetime.now())
    )

    token = secrets.token_urlsafe(32)
    db.add(Session(user_id=user.id, session_id=token,
                   expires_at=datetime.now() + SESSION_LIFETIME))
    await db.commit()

    response.set_cookie(
        "login_session",
        token,
        max_age=int(SESSION_LIFETIME.total_seconds()),
        httponly=True,
        samesite="lax",
        path="/",
    )
    return {"success": True}
