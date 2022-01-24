import aioredis
from fastapi import FastAPI
from starlette.requests import Request
from starlette.responses import Response
from fastapi import FastAPI

from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache

from app.config import REDIS_HOST

app = FastAPI(title="mludolph.dev API")


@cache()
async def get_cache():
    return 1


@app.get("/")
@cache(expire=60)
async def index(request: Request, response: Response):
    return dict(hello="world")


@app.on_event("startup")
async def startup():
    redis = aioredis.from_url(REDIS_HOST, encoding="utf8", decode_responses=True)
    FastAPICache.init(RedisBackend(redis), prefix="fastapi-cache")
