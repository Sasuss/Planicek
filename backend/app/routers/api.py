"""

"""
from fastapi import APIRouter

from app.routers import authenticate, system

router = APIRouter(prefix="/api")

router.include_router(system.router)
router.include_router(authenticate.router)
