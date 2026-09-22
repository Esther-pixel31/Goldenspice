from pathlib import Path
from typing import List

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_admin
from app.database import get_db
from app.models.admin_user import AdminUser
from app.models.partner import Partner
from app.schemas.partner import (
    PartnerCreate,
    PartnerResponse,
    PartnerUpdate,
)


router = APIRouter(
    prefix="/api/partners",
    tags=["Partners"],
)


PARTNER_UPLOAD_DIRECTORY = (
    Path(__file__).resolve().parents[3]
    / "uploads"
    / "partners"
)


def delete_local_partner_logo(
    logo_url: str,
) -> None:
    prefix = "/uploads/partners/"

    if not logo_url.startswith(prefix):
        return

    filename = logo_url[len(prefix):]

    if not filename:
        return

    safe_filename = Path(filename).name

    if safe_filename != filename:
        return

    logo_path = (
        PARTNER_UPLOAD_DIRECTORY
        / safe_filename
    )

    try:
        logo_path.unlink()
    except FileNotFoundError:
        pass


@router.get(
    "",
    response_model=List[PartnerResponse],
)
def get_public_partners(
    db: Session = Depends(get_db),
):
    statement = (
        select(Partner)
        .where(Partner.is_active.is_(True))
        .order_by(
            Partner.display_order.asc(),
            Partner.name.asc(),
        )
    )

    return db.execute(
        statement
    ).scalars().all()


@router.get(
    "/admin/all",
    response_model=List[PartnerResponse],
)
def get_admin_partners(
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(
        get_current_admin
    ),
):
    del current_admin

    statement = select(Partner).order_by(
        Partner.display_order.asc(),
        Partner.name.asc(),
    )

    return db.execute(
        statement
    ).scalars().all()


@router.post(
    "",
    response_model=PartnerResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_partner(
    partner_data: PartnerCreate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(
        get_current_admin
    ),
):
    del current_admin

    partner = Partner(
        **partner_data.model_dump()
    )

    db.add(partner)
    db.commit()
    db.refresh(partner)

    return partner


@router.get(
    "/{partner_id}",
    response_model=PartnerResponse,
)
def get_public_partner(
    partner_id: int,
    db: Session = Depends(get_db),
):
    partner = db.execute(
        select(Partner).where(
            Partner.id == partner_id,
            Partner.is_active.is_(True),
        )
    ).scalar_one_or_none()

    if partner is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Partner not found.",
        )

    return partner


@router.patch(
    "/{partner_id}",
    response_model=PartnerResponse,
)
def update_partner(
    partner_id: int,
    partner_data: PartnerUpdate,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(
        get_current_admin
    ),
):
    del current_admin

    partner = db.get(
        Partner,
        partner_id,
    )

    if partner is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Partner not found.",
        )

    update_data = partner_data.model_dump(
        exclude_unset=True
    )

    old_logo_url = partner.logo_url

    for field, value in update_data.items():
        setattr(
            partner,
            field,
            value,
        )

    db.commit()
    db.refresh(partner)

    new_logo_url = update_data.get(
        "logo_url"
    )

    if (
        new_logo_url is not None
        and new_logo_url != old_logo_url
    ):
        delete_local_partner_logo(
            old_logo_url
        )

    return partner


@router.delete(
    "/{partner_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_partner(
    partner_id: int,
    db: Session = Depends(get_db),
    current_admin: AdminUser = Depends(
        get_current_admin
    ),
):
    del current_admin

    partner = db.get(
        Partner,
        partner_id,
    )

    if partner is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Partner not found.",
        )

    logo_url = partner.logo_url

    db.delete(partner)
    db.commit()

    delete_local_partner_logo(
        logo_url
    )

    return None