from datetime import datetime
from decimal import Decimal
from typing import List, Optional

from sqlalchemy import (
    Boolean,
    CheckConstraint,
    DateTime,
    Integer,
    Numeric,
    String,
    Text,
    func,
)
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Property(Base):
    __tablename__ = "properties"

    __table_args__ = (
        CheckConstraint(
            "listing_type IN ('FOR_SALE', 'FOR_RENT')",
            name="ck_properties_listing_type",
        ),
        CheckConstraint(
            "status IN ('AVAILABLE', 'SOLD', 'RENTED', 'UNAVAILABLE')",
            name="ck_properties_status",
        ),
        CheckConstraint(
            "price >= 0",
            name="ck_properties_price_nonnegative",
        ),
        CheckConstraint(
            "bedrooms IS NULL OR bedrooms >= 0",
            name="ck_properties_bedrooms_nonnegative",
        ),
        CheckConstraint(
            "bathrooms IS NULL OR bathrooms >= 0",
            name="ck_properties_bathrooms_nonnegative",
        ),
        CheckConstraint(
            "size IS NULL OR size >= 0",
            name="ck_properties_size_nonnegative",
        ),
    )

    id: Mapped[int] = mapped_column(
        primary_key=True,
        autoincrement=True,
    )

    slug: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )

    title: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    location: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        index=True,
    )

    property_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        index=True,
    )

    listing_type: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        index=True,
    )

    status: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default="AVAILABLE",
        server_default="AVAILABLE",
        index=True,
    )

    price: Mapped[Decimal] = mapped_column(
        Numeric(14, 2),
        nullable=False,
    )

    bedrooms: Mapped[Optional[int]] = mapped_column(
        Integer,
        nullable=True,
    )

    bathrooms: Mapped[Optional[int]] = mapped_column(
        Integer,
        nullable=True,
    )

    size: Mapped[Optional[Decimal]] = mapped_column(
        Numeric(12, 2),
        nullable=True,
    )

    description: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    features: Mapped[List[str]] = mapped_column(
        ARRAY(Text),
        nullable=False,
        default=list,
        server_default="{}",
    )

    image_url: Mapped[Optional[str]] = mapped_column(
        Text,
        nullable=True,
    )

    featured: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        server_default="false",
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )