import sys
from pathlib import Path

from sqlalchemy import select


PROJECT_ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(PROJECT_ROOT))

from app.database import SessionLocal
from app.models.property import Property


PROPERTIES = [
    {
        "slug": "four-bedroom-house-karen",
        "title": "Four Bedroom House",
        "location": "Karen, Nairobi",
        "property_type": "House",
        "listing_type": "FOR_SALE",
        "status": "AVAILABLE",
        "price": 32000000,
        "bedrooms": 4,
        "bathrooms": 4,
        "size": 320,
        "image_url": (
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            "?auto=format&fit=crop&w=1600&q=85"
        ),
        "featured": True,
        "description": (
            "A spacious four bedroom home in Karen offering comfortable "
            "family living, generous indoor spaces and a peaceful "
            "residential setting."
        ),
        "features": [
            "Four bedrooms",
            "Four bathrooms",
            "Spacious living area",
            "Private garden",
            "Parking",
            "Secure compound",
        ],
    },
    {
        "slug": "three-bedroom-apartment-kilimani",
        "title": "Three Bedroom Apartment",
        "location": "Kilimani, Nairobi",
        "property_type": "Apartment",
        "listing_type": "FOR_SALE",
        "status": "AVAILABLE",
        "price": 18500000,
        "bedrooms": 3,
        "bathrooms": 3,
        "size": 185,
        "image_url": (
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
            "?auto=format&fit=crop&w=1600&q=85"
        ),
        "featured": False,
        "description": (
            "A modern three bedroom apartment located in Kilimani with "
            "spacious interiors and convenient access to the surrounding "
            "business and lifestyle amenities."
        ),
        "features": [
            "Three bedrooms",
            "Three bathrooms",
            "Modern kitchen",
            "Parking",
            "Security",
            "Spacious living area",
        ],
    },
    {
        "slug": "two-bedroom-apartment-westlands",
        "title": "Two Bedroom Apartment",
        "location": "Westlands, Nairobi",
        "property_type": "Apartment",
        "listing_type": "FOR_RENT",
        "status": "AVAILABLE",
        "price": 150000,
        "bedrooms": 2,
        "bathrooms": 2,
        "size": 120,
        "image_url": (
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d"
            "?auto=format&fit=crop&w=1600&q=85"
        ),
        "featured": True,
        "description": (
            "A contemporary two bedroom apartment available for rent in "
            "Westlands, offering convenient city living and well-designed "
            "interior spaces."
        ),
        "features": [
            "Two bedrooms",
            "Two bathrooms",
            "Modern kitchen",
            "Parking",
            "Security",
            "Convenient location",
        ],
    },
    {
        "slug": "commercial-office-upper-hill",
        "title": "Commercial Office Space",
        "location": "Upper Hill, Nairobi",
        "property_type": "Commercial",
        "listing_type": "FOR_RENT",
        "status": "AVAILABLE",
        "price": 280000,
        "bedrooms": None,
        "bathrooms": 2,
        "size": 250,
        "image_url": (
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72"
            "?auto=format&fit=crop&w=1600&q=85"
        ),
        "featured": False,
        "description": (
            "A professional commercial office space in Upper Hill suitable "
            "for businesses looking for a convenient and established "
            "Nairobi business location."
        ),
        "features": [
            "250 m² office space",
            "Two bathrooms",
            "Reception area",
            "Parking",
            "Security",
            "Business location",
        ],
    },
    {
        "slug": "family-home-runda",
        "title": "Five Bedroom Family Home",
        "location": "Runda, Nairobi",
        "property_type": "House",
        "listing_type": "FOR_SALE",
        "status": "AVAILABLE",
        "price": 68000000,
        "bedrooms": 5,
        "bathrooms": 5,
        "size": 480,
        "image_url": (
            "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde"
            "?auto=format&fit=crop&w=1600&q=85"
        ),
        "featured": False,
        "description": (
            "A large five bedroom family residence in Runda with generous "
            "living spaces and a layout suited to comfortable residential "
            "living."
        ),
        "features": [
            "Five bedrooms",
            "Five bathrooms",
            "Large living spaces",
            "Private garden",
            "Parking",
            "Secure compound",
        ],
    },
    {
        "slug": "three-bedroom-townhouse-kiambu-road",
        "title": "Three Bedroom Townhouse",
        "location": "Kiambu Road",
        "property_type": "Townhouse",
        "listing_type": "FOR_RENT",
        "status": "AVAILABLE",
        "price": 120000,
        "bedrooms": 3,
        "bathrooms": 3,
        "size": 190,
        "image_url": (
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154"
            "?auto=format&fit=crop&w=1600&q=85"
        ),
        "featured": False,
        "description": (
            "A three bedroom townhouse available for rent along Kiambu "
            "Road, providing practical family accommodation in a "
            "convenient residential area."
        ),
        "features": [
            "Three bedrooms",
            "Three bathrooms",
            "Living and dining area",
            "Parking",
            "Security",
            "Family-friendly setting",
        ],
    },
]


def seed_properties():
    db = SessionLocal()

    created_count = 0
    skipped_count = 0

    try:
        for property_data in PROPERTIES:
            slug = property_data["slug"]

            existing_property = db.execute(
                select(Property).where(
                    Property.slug == slug
                )
            ).scalar_one_or_none()

            if existing_property is not None:
                print("SKIP:", slug)
                skipped_count += 1
                continue

            new_property = Property(
                **property_data
            )

            db.add(new_property)

            print("ADD: ", slug)
            created_count += 1

        db.commit()

        print()
        print("Seed complete.")
        print("Created:", created_count)
        print("Skipped:", skipped_count)

    except Exception:
        db.rollback()
        raise

    finally:
        db.close()


if __name__ == "__main__":
    seed_properties()