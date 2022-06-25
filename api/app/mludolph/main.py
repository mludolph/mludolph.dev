from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend

# from fastapi_socketio import SocketManager

from loguru import logger

from mludolph.config import settings
from mludolph.db import redis
from mludolph.log_config import init_logging
from mludolph.routes import dns, healthchecks, repos

app = FastAPI(title="mludolph.dev API", prefix=settings.API_V1_STR)
# socket_manager = SocketManager(app=app, socketio_path="v1", cors_allowed_origins=[])
init_logging()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(healthchecks.router, tags=["healtchecks"])
app.include_router(repos.router, tags=["repositories"])
app.include_router(dns.router, tags=["dns"])


@app.on_event("startup")
async def startup():
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")

    logger.info("initialization successful")
    logger.info(f"loaded {len(settings.AUTH_API_KEYS)} api keys")


# import mludolph.routes.ws  # noqa, typing: ignore
