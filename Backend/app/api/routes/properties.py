from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.property import Property
from app.schemas.property import (
    PropertyCreate,
    PropertyResponse,
    PropertyUpdate,
)
from app.api.dependencies import get_current_admin
from app.models.admin_user import AdminUser

router = APIRouter(
    prefix="/api/properties",
    tags=["Properties"],
)


@router.get(
    "",
    response_model=List[PropertyResponse],
)
def get_properties(
    db: Session = Depends(get_db),
):
    statement = select(Property).order_by(
        Property.created_at.desc()
    )

    properties = db.execute(
        statement
    ).scalars().all()

    return properties


@router.post(
    "",
    response_model=PropertyResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_property(
    property_data: PropertyCreate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(
        get_current_admin
    ),
):
    existing_property = db.execute(
        select(Property).where(
            Property.slug == property_data.slug
        )
    ).scalar_one_or_none()

    if existing_property is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A property with this slug already exists.",
        )

    new_property = Property(
        **property_data.model_dump()
    )

    db.add(new_property)
    db.commit()
    db.refresh(new_property)

    return new_property


@router.get(
    "/{slug}",
    response_model=PropertyResponse,
)
def get_property_by_slug(
    slug: str,
    db: Session = Depends(get_db),
):
    property_item = db.execute(
        select(Property).where(
            Property.slug == slug
        )
    ).scalar_one_or_none()

    if property_item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found.",
        )

    return property_item


@router.patch(
    "/{slug}",
    response_model=PropertyResponse,
)
def update_property(
    slug: str,
    property_data: PropertyUpdate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(
        get_current_admin
    ),
):
    property_item = db.execute(
        select(Property).where(
            Property.slug == slug
        )
    ).scalar_one_or_none()

    if property_item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found.",
        )

    update_data = property_data.model_dump(
        exclude_unset=True
    )

    new_slug = update_data.get("slug")

    if new_slug is not None and new_slug != slug:
        existing_property = db.execute(
            select(Property).where(
                Property.slug == new_slug
            )
        ).scalar_one_or_none()

        if existing_property is not None:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="A property with this slug already exists.",
            )

    for field, value in update_data.items():
        setattr(property_item, field, value)

    db.commit()
    db.refresh(property_item)

    return property_item