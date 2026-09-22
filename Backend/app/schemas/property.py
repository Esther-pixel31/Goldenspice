from datetime import datetime
from decimal import Decimal
from typing import List, Literal, Optional

from pydantic import BaseModel, ConfigDict, Field


class PropertyBase(BaseModel):
    slug: str = Field(
        min_length=1,
        max_length=255,
    )

    title: str = Field(
        min_length=1,
        max_length=255,
    )

    location: str = Field(
        min_length=1,
        max_length=255,
    )

    property_type: str = Field(
        min_length=1,
        max_length=100,
    )

    listing_type: Literal[
        "FOR_SALE",
        "FOR_RENT",
    ]

    price: Decimal = Field(
        ge=0,
    )

    bedrooms: Optional[int] = Field(
        default=None,
        ge=0,
    )

    bathrooms: Optional[int] = Field(
        default=None,
        ge=0,
    )

    size: Optional[Decimal] = Field(
        default=None,
        ge=0,
    )

    description: Optional[str] = None

    features: List[str] = Field(
        default_factory=list,
    )

    image_url: Optional[str] = None

    featured: bool = False


class PropertyCreate(PropertyBase):
    status: Literal[
        "AVAILABLE",
        "SOLD",
        "RENTED",
        "UNAVAILABLE",
    ] = "AVAILABLE"

class PropertyUpdate(BaseModel):
    slug: Optional[str] = Field(
        default=None,
        min_length=1,
        max_length=255,
    )

    title: Optional[str] = Field(
        default=None,
        min_length=1,
        max_length=255,
    )

    location: Optional[str] = Field(
        default=None,
        min_length=1,
        max_length=255,
    )

    property_type: Optional[str] = Field(
        default=None,
        min_length=1,
        max_length=100,
    )

    listing_type: Optional[
        Literal[
            "FOR_SALE",
            "FOR_RENT",
        ]
    ] = None

    status: Optional[
        Literal[
            "AVAILABLE",
            "SOLD",
            "RENTED",
            "UNAVAILABLE",
        ]
    ] = None

    price: Optional[Decimal] = Field(
        default=None,
        ge=0,
    )

    bedrooms: Optional[int] = Field(
        default=None,
        ge=0,
    )

    bathrooms: Optional[int] = Field(
        default=None,
        ge=0,
    )

    size: Optional[Decimal] = Field(
        default=None,
        ge=0,
    )

    description: Optional[str] = None

    features: Optional[List[str]] = None

    image_url: Optional[str] = None

    featured: Optional[bool] = None

class PropertyResponse(PropertyBase):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int
    status: Literal[
        "AVAILABLE",
        "SOLD",
        "RENTED",
        "UNAVAILABLE",
    ]
    created_at: datetime
    updated_at: datetime