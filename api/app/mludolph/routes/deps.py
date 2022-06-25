from fastapi import Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from mludolph.services import auth

bearer_token_auth = HTTPBearer()


def get_token(token: HTTPAuthorizationCredentials = Depends(bearer_token_auth)) -> str:
    auth.verify_token(token.credentials)

    return token.credentials
