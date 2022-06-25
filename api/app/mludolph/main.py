from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_socketio import SocketManager

from loguru import logger

from mludolph import config
from mludolph.db import redis
from mludolph.log_config import init_logging
from mludolph.routes import checks, dns, repos

API_V1_PREFIX = "/api/v1"

app = FastAPI()
socket_manager = SocketManager(app=app, socketio_path="v1", cors_allowed_origins=[])
init_logging()

app.add_middleware(
    CORSMiddleware,
    allow_origins=config.ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(checks.router, prefix=API_V1_PREFIX)
app.include_router(repos.router, prefix=API_V1_PREFIX)
app.include_router(dns.router, prefix=API_V1_PREFIX)


@app.on_event("startup")
async def startup():
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")

    logger.info("initialization successful")
    logger.info(f"loaded {len(config.AUTH_API_KEYS)} api keys: {config.AUTH_API_KEYS}")


import mludolph.routes.ws  # noqa, typing: ignore
