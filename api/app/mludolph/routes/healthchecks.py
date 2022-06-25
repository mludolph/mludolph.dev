from fastapi import APIRouter, Depends
from mludolph.config import settings
from mludolph.routes.deps import get_token
from mludolph.schemas.healthchecks import HealthcheckCallbackMessage
from mludolph.services import telegram

router = APIRouter(prefix="/healthcheck")


@router.get("/self")
def healthcheck():
    return {"status": "OK"}


@router.post("/callback")
def healthcheck_callback(
    message: HealthcheckCallbackMessage, token: str = Depends(get_token)
):
    if message.status == "down":
        msg = f"{telegram.EMOJI_HOT} {message.name} is {message.status}"

        telegram.send_telegram_message(
            msg, chat_id=settings.TELEGRAM_CHAT_ID, token=settings.TELEGRAM_TOKEN
        )
