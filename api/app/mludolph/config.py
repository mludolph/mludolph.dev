from typing import Any

from pydantic import AnyHttpUrl, BaseSettings, PostgresDsn, RedisDsn, validator


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    CORS_ORIGINS: list[AnyHttpUrl] = []

    @validator("CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: str | list[str]) -> str | list[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    AUTH_API_KEYS: list[str] = []

    @validator("AUTH_API_KEYS", pre=True)
    def assemble_auth_api_keys(cls, v: str | list[str]) -> str | list[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    REDIS_SERVER: str
    REDIS_URI: RedisDsn | None = None

    @validator("REDIS_URI", pre=True)
    def assemble_redis_connection(cls, v: str | None, values: dict[str, Any]) -> Any:
        if isinstance(v, str):
            return v
        return PostgresDsn.build(
            scheme="redis",
            host=values.get("REDIS_SERVER"),
            path=f"/{values.get('REDIS_DB') or ''}",
        )

    TELEGRAM_TOKEN: str
    TELEGRAM_CHAT_ID: str

    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()
