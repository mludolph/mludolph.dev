import json
import time

from fastapi import HTTPException
from mludolph.db import redis
from mludolph.schemas.dns import DNSEntry, DNSEntryIn
from starlette.status import HTTP_404_NOT_FOUND


async def set_dns_entry(hostname: str, dns_entry: DNSEntryIn):
    entry = DNSEntry(hostname=hostname, ip=dns_entry.ip, ts=int(time.time()))
    await redis.set(hostname, entry.json())


async def get_dns_lookup(hostname: str) -> DNSEntry:
    res = await redis.get(hostname)
    if res is None:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND, detail=f"No entry for '{hostname}'"
        )

    return DNSEntry.parse_obj(json.loads(res))
