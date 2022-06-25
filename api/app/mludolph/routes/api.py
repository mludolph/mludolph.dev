from fastapi import APIRouter
from mludolph.routes.api_v1 import dns, healthchecks, repos

api_router = APIRouter()

api_router.include_router(healthchecks.router, tags=["healtchecks"])
api_router.include_router(repos.router, tags=["repositories"])
api_router.include_router(dns.router, tags=["dns"])
