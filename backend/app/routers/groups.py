from fastapi import APIRouter
from app.models.group import Group


router = APIRouter(
    prefix="/groups",
    tags=["groups"],
)

"""
@router.post("/", tags=["groups"])
async def create_group(name: str):
"""