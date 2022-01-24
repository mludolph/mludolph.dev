import logging

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_cache.decorator import cache
from fastapi_cloudauth.firebase import FirebaseClaims, FirebaseCurrentUser

from app.config import AUTHORIZED_USER_IDS, FIREBASE_PROJECT_ID
from app.services.github import get_github_repository

logger = logging.getLogger("api")

get_current_user = FirebaseCurrentUser(project_id=FIREBASE_PROJECT_ID)
authorized_user_ids = AUTHORIZED_USER_IDS.split(",")

router = APIRouter()


def get_current_authorized_user(
    user: FirebaseClaims = Depends(get_current_user),
) -> FirebaseClaims:
    if user.user_id not in authorized_user_ids:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Unauthorized user"
        )
    return user


@router.get("/repos/{repository_name:path}")
@cache(expire=24 * 60 * 60)
async def get_repos(repository_name: str):
    return get_github_repository(repository_name=repository_name)


@router.get("/user/")
async def secure_user(current_user: FirebaseClaims = Depends(get_current_user)):
    # ID token is valid and getting user info from ID token
    return f"Hello, {current_user.user_id}"
