import logging

from app.config import AUTHORIZED_USER_IDS, FIREBASE_PROJECT_ID
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_cloudauth.firebase import FirebaseClaims, FirebaseCurrentUser

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


@router.get("/healthcheck")
def healthcheck():
    return {"status": "OK"}


@router.get("/authcheck")
async def secure_user(
    current_user: FirebaseClaims = Depends(get_current_authorized_user),
):
    # ID token is valid and getting user info from ID token
    return {"detail": "success", "user_id": current_user.user_id}
