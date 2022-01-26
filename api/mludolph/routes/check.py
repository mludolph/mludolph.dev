import logging

from fastapi import APIRouter

logger = logging.getLogger("api")

router = APIRouter()


@router.get("/healthcheck")
def healthcheck():
    return {"status": "OK"}
