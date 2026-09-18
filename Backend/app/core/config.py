import os
from pathlib import Path


from dotenv import load_dotenv


BACKEND_DIR = Path(__file__).resolve().parents[2]
ENV_FILE = BACKEND_DIR / ".env"


# Load Backend/.env when it exists.
#
# Existing environment variables take precedence over values in .env,
# which allows production hosting platforms to provide configuration
# directly through their environment.
load_dotenv(
    dotenv_path=ENV_FILE,
    override=False,
)


def require_env(name: str) -> str:
    value = os.getenv(name)

    if not value:
        raise RuntimeError(
            "{} environment variable is not configured.".format(name)
        )

    return value


DATABASE_URL = require_env("DATABASE_URL")

JWT_SECRET_KEY = require_env("JWT_SECRET_KEY")

JWT_ALGORITHM = os.getenv(
    "JWT_ALGORITHM",
    "HS256",
)

try:
    ACCESS_TOKEN_EXPIRE_MINUTES = int(
        os.getenv(
            "ACCESS_TOKEN_EXPIRE_MINUTES",
            "30",
        )
    )
except ValueError as exc:
    raise RuntimeError(
        "ACCESS_TOKEN_EXPIRE_MINUTES must be an integer."
    ) from exc

if ACCESS_TOKEN_EXPIRE_MINUTES <= 0:
    raise RuntimeError(
        "ACCESS_TOKEN_EXPIRE_MINUTES must be greater than zero."
    )
DEFAULT_CORS_ORIGINS = (
    "http://localhost:5173,"
    "http://127.0.0.1:5173"
)

CORS_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ORIGINS",
        DEFAULT_CORS_ORIGINS,
    ).split(",")
    if origin.strip()
]
APP_NAME = os.getenv(
    "APP_NAME",
    "Goldenspice API",
)

APP_ENV = os.getenv(
    "APP_ENV",
    "development",
).strip().lower()

APP_VERSION = os.getenv(
    "APP_VERSION",
    "1.0.0",
)

VALID_APP_ENVIRONMENTS = {
    "development",
    "testing",
    "staging",
    "production",
}

if APP_ENV not in VALID_APP_ENVIRONMENTS:
    raise RuntimeError(
        "APP_ENV must be one of: {}".format(
            ", ".join(
                sorted(VALID_APP_ENVIRONMENTS)
            )
        )
    )