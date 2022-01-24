from fastapi import APIRouter
from fastapi_cache.decorator import cache

from app.services.github import get_github_repository

router = APIRouter()


@router.get("/repos/{repository_name:path}")
@cache(expire=24 * 60 * 60)
async def get_repos(repository_name: str):
    return get_github_repository(repository_name=repository_name)
