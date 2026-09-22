import os
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from sqlalchemy import select

from app.database import SessionLocal
from app.models.admin_user import AdminUser
from app.core.security import hash_password


def main():
    email = os.environ.get(
        "INITIAL_ADMIN_EMAIL", ""
    ).strip().lower()

    password = os.environ.get(
        "INITIAL_ADMIN_PASSWORD", ""
    )

    if not email:
        raise RuntimeError(
            "INITIAL_ADMIN_EMAIL is not configured."
        )

    if not password:
        raise RuntimeError(
            "INITIAL_ADMIN_PASSWORD is not configured."
        )

    db = SessionLocal()

    try:
        existing_admin = db.execute(
            select(AdminUser).where(
                AdminUser.email == email
            )
        ).scalar_one_or_none()

        if existing_admin is not None:
            print(
                "Admin already exists: "
                f"{existing_admin.email}"
            )
            return

        admin = AdminUser(
            email=email,
            password_hash=hash_password(password),
            is_active=True,
        )

        db.add(admin)
        db.commit()
        db.refresh(admin)

        print("Production admin created successfully.")
        print(f"Admin ID: {admin.id}")
        print(f"Email: {admin.email}")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    main()
