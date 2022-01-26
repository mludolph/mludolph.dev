import logging

from mludolph import config
from mludolph.main import socket_manager as sm
from mludolph.services.auth import verify_token

logger = logging.getLogger("api")


@sm.on("connect")
async def connect(sid, environ, auth):
    auth = environ.get("HTTP_AUTHORIZATION")
    logger.info(f"socket connected (sid={sid})")
    if not auth:
        logger.warning(f"socket missing auth, disconnect (sid={sid})")
        await sm.disconnect(sid)
        return

    scheme, token = auth.split(" ")

    if scheme.lower() == "bearer":
        try:
            verified_token = await verify_token(token)
            sub = verified_token["sub"]
            logger.info(f"socket authenticated (sid={sid}, sub={sub})")
        except Exception as e:
            logger.warning(
                f"bearer token verification failed (sid={sid}, reason={str(e)})"
            )
            await sm.disconnect(sid)
            return
    elif scheme.lower() == "api-key":
        if token in config.AUTH_API_KEYS:
            logger.info(f"socket authenticated (sid={sid}, sub=service_account)")
        else:
            logger.warning(
                f"api-key verification failed (sid={sid}, \
                  reason=unknown_api_key('{token}'))"
            )
            await sm.disconnect(sid)
            return


@sm.on("disconnect")
async def disconnect(sid):
    logger.info(f"socket disconnected (sid={sid})")
