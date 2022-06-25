from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from mludolph import config
from starlette.status import HTTP_403_FORBIDDEN

bearer_token_auth = HTTPBearer()


def get_token(token: HTTPAuthorizationCredentials = Depends(bearer_token_auth)) -> str:
    if token.credentials not in config.AUTH_API_KEYS:
        raise HTTPException(
            status_code=HTTP_403_FORBIDDEN, detail="Invalid credentials"
        )

    return token.credentials
