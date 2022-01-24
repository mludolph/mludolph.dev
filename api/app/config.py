import os

REDIS_HOST = os.environ.get("REDIS_HOST", "redis://redis:6379")
AUTHORIZED_USER_IDS = os.environ.get("AUTHORIZED_USER_IDS", "")
FIREBASE_PROJECT_ID = os.environ.get("FIREBASE_PROJECT_ID", "")
