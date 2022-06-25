from datetime import datetime

from fastapi_utils.api_model import APIModel


class HealthcheckCallbackMessage(APIModel):
    id: str
    name: str
    status: str
    ts: datetime
