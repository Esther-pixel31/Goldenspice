import json
import urllib.error
import urllib.request

from app.core.security import create_access_token


BASE_URL = "http://127.0.0.1:8000"


# Admin ID 1 is our development administrator.
expired_token = create_access_token(
    subject="1",
    expires_minutes=-1,
)


patch_payload = json.dumps(
    {
        "featured": False,
    }
).encode("utf-8")


request = urllib.request.Request(
    (
        f"{BASE_URL}/api/properties/"
        "four-bedroom-house-karen"
    ),
    data=patch_payload,
    headers={
        "Content-Type": "application/json",
        "Authorization": (
            f"Bearer {expired_token}"
        ),
    },
    method="PATCH",
)


try:
    with urllib.request.urlopen(request) as response:
        print(
            "Expired token status:",
            response.status,
        )

except urllib.error.HTTPError as exc:
    body = exc.read().decode("utf-8")

    print(
        "Expired token status:",
        exc.code,
    )
    print(
        "Response:",
        body,
    )
