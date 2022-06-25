from loguru import logger

from mludolph import config
from mludolph.main import socket_manager as sm


@sm.on("connect")
async def connect(sid, environ, auth):
    auth = environ.get("HTTP_AUTHORIZATION")
    logger.info(f"socket connected (sid={sid})")
    if not auth:
        logger.warning(f"socket missing auth, disconnect (sid={sid})")
        await sm.disconnect(sid)
        return False

    scheme, token = auth.split(" ")
    sub = ""
    # if scheme.lower() == "bearer":
    #     try:
    #         verified_token = await verify_token(token)
    #         sub = verified_token["sub"]
    #     except Exception as e:
    #         logger.warning(
    #             f"bearer token verification failed (sid={sid}, reason={str(e)})"
    #         )
    #         await sm.disconnect(sid)
    #         return False
    if scheme.lower() == "api-key":
        if token not in config.AUTH_API_KEYS:
            logger.warning(
                f"api-key verification failed (sid={sid}, \
                  reason=unknown_api_key('{token}'))"
            )
            await sm.disconnect(sid)
            return False
        sub = "service_account"
    else:
        logger.warning(f"socket invalid auth scheme {scheme}, disconnect (sid={sid})")
        await sm.disconnect(sid)
        return False

    logger.info(f"socket authenticated (sid={sid}, sub={sub})")
    await sm.save_session(sid, {"sub": sub})
    return True


@sm.on("disconnect")
async def disconnect(sid):
    logger.info(f"socket disconnected (sid={sid})")


@sm.on("notification")
async def notification_handler(sid, data):
    session = await sm.get_session(sid)
    if not session.get("sub"):
        return False

    await sm.emit("notification", data)
    return True
