import redis.asyncio as aioredis

from mludolph.config import settings

redis = aioredis.from_url(settings.REDIS_URI, encoding="utf8", decode_responses=True)
