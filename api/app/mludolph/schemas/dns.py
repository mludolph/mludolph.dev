from ipaddress import IPv4Address

from fastapi_utils.api_model import APIModel


class DNSEntryIn(APIModel):
    ip: IPv4Address


class DNSEntry(APIModel):
    hostname: str
    ip: IPv4Address
    ts: int
