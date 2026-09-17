from sqlalchemy import select

from app.database import SessionLocal
from app.models.property import Property


KAREN_SLUG = "four-bedroom-house-karen"


def sync_karen_property():
    db = SessionLocal()

    try:
        property_item = db.execute(
            select(Property).where(
                Property.slug == KAREN_SLUG
            )
        ).scalar_one_or_none()

        if property_item is None:
            print(
                "Karen property was not found. "
                "No changes were made."
            )
            return

        property_item.title = "Four Bedroom House"
        property_item.location = "Karen, Nairobi"
        property_item.property_type = "House"
        property_item.listing_type = "FOR_SALE"
        property_item.status = "AVAILABLE"
        property_item.price = 32000000
        property_item.bedrooms = 4
        property_item.bathrooms = 4
        property_item.size = 320

        property_item.image_url = (
            "https://images.unsplash.com/"
            "photo-1600585154340-be6161a56a0c"
            "?auto=format&fit=crop&w=1600&q=85"
        )

        property_item.featured = True

        property_item.description = (
            "A spacious four bedroom home in Karen offering "
            "comfortable family living, generous indoor spaces "
            "and a peaceful residential setting."
        )

        property_item.features = [
            "Four bedrooms",
            "Four bathrooms",
            "Spacious living area",
            "Private garden",
            "Parking",
            "Secure compound",
        ]

        db.commit()
        db.refresh(property_item)

        print("Karen property synchronized successfully.")
        print("ID:", property_item.id)
        print("Slug:", property_item.slug)
        print("Image configured:", bool(property_item.image_url))

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    sync_karen_property()