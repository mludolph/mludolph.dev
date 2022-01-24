import logging
import logging.config

import aioredis
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend

from app.config import REDIS_HOST
from app.log_config import LOG_CONFIG, update_loggers
from app.routes import router

logging.config.dictConfig(LOG_CONFIG)
logger = logging.getLogger("api")

app = FastAPI(title="mludolph.dev API")
origins = ["https://www.mludolph.dev", "https://mludolph.dev", "http://localhost"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router, prefix="/api/v1")


@app.on_event("startup")
async def startup():
    update_loggers()

    redis = aioredis.from_url(REDIS_HOST, encoding="utf8", decode_responses=True)
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")

    logger.info("initialization successful")
