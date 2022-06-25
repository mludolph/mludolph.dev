from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from loguru import logger

from mludolph.config import settings
from mludolph.db import redis
from mludolph.log_config import init_logging
from mludolph.routes.api import api_router

# from fastapi_socketio import SocketManager


app = FastAPI(title="mludolph.dev API")
# socket_manager = SocketManager(app=app, socketio_path="v1", cors_allowed_origins=[])
init_logging()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.on_event("startup")
async def startup():
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")

    logger.info("initialization successful")
    logger.info(f"loaded {len(settings.AUTH_API_KEYS)} api keys")


# import mludolph.routes.ws  # noqa, typing: ignore
