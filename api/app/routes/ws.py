from typing import Dict, List, Optional
from fastapi import APIRouter

from starlette.websockets import WebSocket, WebSocketDisconnect

from app.config import AUTHORIZED_RECEIVERS, AUTHORIZED_SENDERS

authorized_senders = AUTHORIZED_SENDERS.split(",")
authorized_receivers = AUTHORIZED_RECEIVERS.split(",")

router = APIRouter()


def verify_sender_token(token: Optional[str]) -> bool:
    return token in authorized_senders


def verify_receiver_token(token: Optional[str]) -> bool:
    return token in authorized_receivers


class Notifier:
    def __init__(self):
        self.connections: List[WebSocket] = []
        self.generator = self.get_notification_generator()

    async def get_notification_generator(self):
        while True:
            message = yield
            await self._notify(message)

    async def push(self, msg: Dict):
        await self.generator.asend(msg)

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.connections.append(websocket)

    def remove(self, websocket: WebSocket):
        self.connections.remove(websocket)

    async def _notify(self, payload: Dict):
        living_connections = []
        while len(self.connections) > 0:
            # Looping like this is necessary in case a disconnection is handled
            # during await websocket.send_text(message)
            websocket = self.connections.pop()
            await websocket.send_json({"type": "broadcast", **payload})
            living_connections.append(websocket)
        self.connections = living_connections


notifier = Notifier()


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    try:
        while True:
            data: Dict = await websocket.receive_json()
            cmd = data.get("cmd")
            if cmd == "subscribe":
                token = data.get("token")
                if verify_receiver_token(token):
                    await notifier.connect(websocket)
                    websocket.send_json({"type": "subscribe", "status": "success"})
                else:
                    websocket.send_json(
                        {"type": "subscribe", "status": "invalid_credentials"}
                    )
            elif cmd == "publish":
                token = data.get("token")
                payload = data.get("payload")
                if verify_sender_token(token) and payload is not None:
                    notifier.push(payload)
                    websocket.send_json({"type": "publish", "status": "success"})
                else:
                    websocket.send_json(
                        {
                            "type": "publish",
                            "status": "missing_payload"
                            if payload is None
                            else "invalid_credentials",
                        }
                    )

    except WebSocketDisconnect:
        notifier.remove(websocket)
