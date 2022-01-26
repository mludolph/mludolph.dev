import logging
import logging.config

import aioredis
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_socketio import SocketManager

from mludolph import config
from mludolph.log_config import LOG_CONFIG, update_loggers
from mludolph.routes import checksRouter, reposRouter

logging.config.dictConfig(LOG_CONFIG)
logger = logging.getLogger("api")

app = FastAPI()
socket_manager = SocketManager(app=app, socketio_path="v1", cors_allowed_origins=[])


app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(checksRouter, prefix="/api/v1")
app.include_router(reposRouter, prefix="/api/v1")


@app.on_event("startup")
async def startup():
    update_loggers()

    redis = aioredis.from_url(config.REDIS_HOST, encoding="utf8", decode_responses=True)
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")

    logger.info("initialization successful")


import mludolph.routes.ws  # noqa, typing: ignore
