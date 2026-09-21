import imghdr
from pathlib import Path
from typing import Dict
from uuid import uuid4

from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
    status,
)

from app.api.dependencies import get_current_admin
from app.models.admin_user import AdminUser


router = APIRouter(
    prefix="/api/uploads",
    tags=["uploads"],
)

UPLOAD_DIRECTORY = (
    Path(__file__).resolve().parents[3]
    / "uploads"
    / "properties"
)

MAX_IMAGE_SIZE = 5 * 1024 * 1024

ALLOWED_IMAGE_TYPES = {
    "jpeg": ".jpg",
    "png": ".png",
    "webp": ".webp",
}


@router.post(
    "/property-image",
    status_code=status.HTTP_201_CREATED,
)
async def upload_property_image(
    image: UploadFile = File(...),
    current_admin: AdminUser = Depends(
        get_current_admin
    ),
) -> Dict[str, str]:
    del current_admin

    contents = await image.read(
        MAX_IMAGE_SIZE + 1
    )

    if len(contents) > MAX_IMAGE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="Image must be 5 MB or smaller.",
        )

    if not contents:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded image is empty.",
        )

    detected_type = imghdr.what(
        None,
        h=contents,
    )

    if detected_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=(
                "Only JPG, PNG and WebP "
                "images are allowed."
            ),
        )

    extension = ALLOWED_IMAGE_TYPES[
        detected_type
    ]

    filename = "{}{}".format(
        uuid4().hex,
        extension,
    )

    UPLOAD_DIRECTORY.mkdir(
        parents=True,
        exist_ok=True,
    )

    destination = (
        UPLOAD_DIRECTORY / filename
    )

    destination.write_bytes(contents)

    return {
        "image_url": (
            "/uploads/properties/{}"
        ).format(filename),
    }
