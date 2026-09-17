import getpass

from sqlalchemy import select

from app.database import SessionLocal
from app.models.admin_user import AdminUser
from app.core.security import hash_password


def main():
    email = input("Admin email: ").strip().lower()

    if not email:
        print("Error: Email cannot be empty.")
        return

    password = getpass.getpass("Admin password: ")
    password_confirmation = getpass.getpass(
        "Confirm admin password: "
    )

    if not password:
        print("Error: Password cannot be empty.")
        return

    if password != password_confirmation:
        print("Error: Passwords do not match.")
        return

    db = SessionLocal()

    try:
        existing_admin = db.execute(
            select(AdminUser).where(
                AdminUser.email == email
            )
        ).scalar_one_or_none()

        if existing_admin is not None:
            print(
                "Error: An admin with this email already exists."
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

        print("Admin account created successfully.")
        print(f"Admin ID: {admin.id}")
        print(f"Email: {admin.email}")

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    main()