import logging

import uvicorn

LOG_CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "default": {
            "()": "uvicorn.logging.DefaultFormatter",
            "fmt": "%(levelprefix)s %(asctime)s (%(name)s) %(message)s",
            "datefmt": "%Y-%m-%d %H:%M:%S",
        },
    },
    "handlers": {
        "default": {
            "formatter": "default",
            "class": "logging.StreamHandler",
            "stream": "ext://sys.stderr",
        },
    },
    "loggers": {
        "api": {"handlers": ["default"], "level": "DEBUG"},
    },
}


def update_loggers():
    console_formatter = uvicorn.logging.ColourizedFormatter(
        "{levelprefix} {asctime} ({name}) {message}", style="{", use_colors=True
    )
    for logger_name in [
        "api",
        "uvicorn",
        "uvicorn.error",
        "uvicorn.access",
        "uvicorn.asgi",
        "fastapi",
    ]:
        lg = logging.getLogger(logger_name)
        if lg.handlers:
            lg.handlers[0].setFormatter(console_formatter)
