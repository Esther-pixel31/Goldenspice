from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field


class PartnerBase(BaseModel):
    name: str = Field(
        min_length=1,
        max_length=255,
    )

    website_url: Optional[str] = None

    logo_url: str = Field(
        min_length=1,
    )

    is_active: bool = True

    display_order: int = Field(
        default=0,
        ge=0,
    )


class PartnerCreate(PartnerBase):
    pass


class PartnerUpdate(BaseModel):
    name: Optional[str] = Field(
        default=None,
        min_length=1,
        max_length=255,
    )

    website_url: Optional[str] = None

    logo_url: Optional[str] = Field(
        default=None,
        min_length=1,
    )

    is_active: Optional[bool] = None

    display_order: Optional[int] = Field(
        default=None,
        ge=0,
    )


class PartnerResponse(PartnerBase):
    model_config = ConfigDict(
        from_attributes=True,
    )

    id: int
    created_at: datetime
    updated_at: datetime