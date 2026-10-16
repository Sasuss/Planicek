"""
Google oauth
"""

from fastapi import APIRouter, Form, HTTPException, Request, Depends, Response, Cookie
from google.oauth2 import id_token
from google.auth.transport import requests
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from starlette.responses import RedirectResponse

from app.config import settings
from app.database import get_db
from app.models import User
from app.models import Session

import secrets

router = APIRouter(
    prefix="/authenticate",
    tags=["authenticate"],
)


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
        request: Request,
        credential: str = Form(...),
        g_csrf_token: str = Form(...),
        db: AsyncSession = Depends(get_db),
):
    """
    :param request: cookie request
    :param credential: return from Google oauth2 used for verifying user credentials
    :param g_csrf_token: return from Google oauth2 currently unused
    :param db: database session
    :return:
        status: success - if verification went through
        user_id: user_id - user id from Google oauth2
        email: email - user email
    """
    try:
        if request.cookies.get("g_csrf_token") != g_csrf_token:
            raise HTTPException(status_code=400, detail="Invalid CSRF token")
        # noinspection PyTypeChecker
        idinfo = id_token.verify_oauth2_token(credential, requests.Request(), settings.google_client_id)
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
            await db.commit()
            token = secrets.token_urlsafe(32)

            session = Session(
                user_id=user.id,
                session_id=token,
            )
            db.add(session)
            await db.commit()
        else:
            token = await db.execute(select(Session.session_id).where(Session.user_id == user.id).limit(1))
            token = token.scalar_one_or_none()
            if token is None:
                raise HTTPException(status_code=400, detail="Invalid session id, try logging in again")

        response = RedirectResponse(url="/dashboard", status_code=302)

        response.set_cookie(
            "login_session",
            token,
            60 * 60 * 24 * 30,
            httponly=True,
            samesite="lax",
        )

        response.set_cookie(
            "user_name",
            str(name) if name is not None else "Uživatel",
            60 * 60 * 24 * 30,
            samesite="lax",
        )

        return response


    except ValueError as e:
        # Invalid token
        raise HTTPException(status_code=400, detail=f"Invalid authentication token: {e}")
