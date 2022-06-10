import logging
import requests  # type: ignore

logger = logging.getLogger("api")

GITHUB_API_URL = "https://api.github.com/repos"


def get_github_repository(repository_name: str) -> dict:
    logger.info(f"cache miss when retrieving repository '{repository_name}'")
    res = requests.get(f"{GITHUB_API_URL}/{repository_name}")
    res.raise_for_status()

    return res.json()
