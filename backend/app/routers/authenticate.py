"""
Google oauth
"""
from fastapi import APIRouter, Form, HTTPException, Request, Depends
from google.oauth2 import id_token
from google.auth.transport import requests
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.config import settings
from app.database import get_db
from app.models import User


router = APIRouter(
    prefix="/authenticate",
    tags=["authenticate"],
)


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
        # Specify the WEB_CLIENT_ID of the app that accesses the backend:
        # noinspection PyTypeChecker
        idinfo = id_token.verify_oauth2_token(credential, requests.Request(), settings.google_client_id)

        # Or, if multiple clients access the backend server:
        # idinfo = id_token.verify_oauth2_token(token, requests.Request())
        # if idinfo['aud'] not in [WEB_CLIENT_ID_1, WEB_CLIENT_ID_2, WEB_CLIENT_ID_3]:
        #     raise ValueError('Could not verify audience.')

        # If the request specified a Google Workspace domain
        # if idinfo['hd'] != DOMAIN_NAME:
        #     raise ValueError('Wrong domain name.')

        # ID token is valid. Get the user's Google Account ID from the decoded token.
        # This ID is unique to each Google Account, making it suitable for use as a primary key
        # during account lookup. Email is not a good choice because it can be changed by the user.
        userid = idinfo['sub']
        email = idinfo.get('email')
        name = idinfo.get('given_name')
        surname = idinfo.get('family_name')
        avatar_url = idinfo.get('picture')



        result = await db.execute(select(User).where(User.google_id == userid))
        if result.scalar() is None:
            user = User(
                google_id=userid,
                email=email,
                display_name=name,
                family_name=surname,
                avatar_url=avatar_url,
            )
            db.add(user)
            await db.commit()

    except ValueError as e:
        # Invalid token
        raise HTTPException(status_code=400, detail=f"Invalid authentication token: {e}")
    return {
        "return": idinfo,
        "stauts": "success",
        "user_id": userid,
        "email": email
    }
