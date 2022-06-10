import os

# AUTH_HOST = os.environ.get("AUTH_HOST", "https://auth.mludolph.dev/o/")
# AUTH_URL = os.environ.get("AUTH_URL", "https://auth.mludolph.dev/o/")
# AUTH_REALM = os.environ.get("AUTH_REALM")
# AUTH_CLIENT_ID = os.environ.get("AUTH_CLIENT_ID")
# AUTH_TOKEN_URL = f"{AUTH_HOST}/realms/{AUTH_REALM}/protocol/openid-connect/token"

AUTH_API_KEYS = []
_api_keys = os.environ.get("AUTH_API_KEYS")

if _api_keys:
    AUTH_API_KEYS = _api_keys.split(",")

REDIS_HOST = os.environ.get("REDIS_HOST", "redis://redis:6379")
_origins = os.environ.get("CORS_ORIGINS")

ORIGINS = []

if _origins:
    ORIGINS = _origins.split(",")
