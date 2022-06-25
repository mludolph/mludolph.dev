import aioredis
from mludolph import config

redis = aioredis.from_url(config.REDIS_HOST, encoding="utf8", decode_responses=True)
