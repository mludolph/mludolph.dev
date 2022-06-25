from loguru import logger
from fastapi import APIRouter, Depends
from fastapi_utils.api_model import APIMessage
from mludolph.routes.deps import get_token
from mludolph.schemas.dns import DNSEntry, DNSEntryIn
from mludolph.services import dns

router = APIRouter(prefix="/dns")


@router.get("/{hostname}", response_model=DNSEntry)
async def get_dns_lookup(hostname: str, token: str = Depends(get_token)):
    return await dns.get_dns_lookup(hostname)


@router.post("/{hostname}", response_model=APIMessage)
async def set_dns_entry(
    hostname: str, dns_entry: DNSEntryIn, token: str = Depends(get_token)
):
    await dns.set_dns_entry(hostname, dns_entry)

    return APIMessage(detail="OK")
