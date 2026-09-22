from fastapi import (
    Depends,
    HTTPException,
    status,
)
from fastapi.security import (
    HTTPAuthorizationCredentials,
    HTTPBearer,
)
from sqlalchemy.orm import Session

from app.core.security import decode_access_token
from app.database import get_db
from app.models.admin_user import AdminUser


bearer_scheme = HTTPBearer(
    auto_error=False,
)


def get_current_admin(
    credentials: HTTPAuthorizationCredentials = Depends(
        bearer_scheme
    ),
    db: Session = Depends(get_db),
) -> AdminUser:
    unauthorized_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Authentication required.",
        headers={
            "WWW-Authenticate": "Bearer",
        },
    )

    if credentials is None:
        raise unauthorized_exception

    if credentials.scheme.lower() != "bearer":
        raise unauthorized_exception

    try:
        payload = decode_access_token(
            credentials.credentials
        )
    except ValueError:
        raise unauthorized_exception

    subject = payload.get("sub")

    try:
        admin_id = int(subject)
    except (TypeError, ValueError):
        raise unauthorized_exception

    admin = db.get(
        AdminUser,
        admin_id,
    )

    if admin is None:
        raise unauthorized_exception

    if not admin.is_active:
        raise unauthorized_exception

    return admin
