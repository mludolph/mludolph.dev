import os

REDIS_CACHE = os.environ.get("REDIS_HOST", "redis://redis:6379")
