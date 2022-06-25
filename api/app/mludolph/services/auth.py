# from typing import Dict
# from fastapi.security import OAuth2AuthorizationCodeBearer
# from keycloak import KeycloakOpenID
# from mludolph import config
# from fastapi import Depends, Security, HTTPException, status
from fastapi import HTTPException, status
from mludolph.config import settings

# This is just for fastapi docs
# oauth2_scheme = OAuth2AuthorizationCodeBearer(
#     authorizationUrl=config.AUTH_HOST,
#     tokenUrl=config.AUTH_TOKEN_URL,
# )

# keycloak_openid = KeycloakOpenID(
#     server_url=config.AUTH_HOST,
#     client_id=config.AUTH_CLIENT_ID,
#     realm_name=config.AUTH_REALM,
#     verify=True,
# )


# async def get_idp_public_key():
#     return (
#         "-----BEGIN PUBLIC KEY-----\n"
#         f"{keycloak_openid.public_key()}"
#         "\n-----END PUBLIC KEY-----"
#     )


# async def verify_token(token: str) -> Dict:
#     return keycloak_openid.decode_token(
#         token,
#         key=await get_idp_public_key(),
#         options={"verify_signature": True, "verify_aud": True, "exp": True},
#     )


# async def get_auth(token: str = Security(oauth2_scheme)) -> Dict:
#     try:
#         return await verify_token(token)
#     except Exception as e:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail=str(e),
#             headers={"WWW-Authenticate": "Bearer"},
#         )


# async def get_current_user_id(identity: Dict = Depends(get_auth)) -> str:
#     return identity["sub"]


def verify_token(token: str):
    if token not in settings.AUTH_API_KEYS:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid credentials"
        )
