import getpass
import json
import urllib.error
import urllib.request


BASE_URL = "http://127.0.0.1:8000"

email = input("Admin email: ").strip().lower()
password = getpass.getpass("Admin password: ")


# --------------------------------------------------
# 1. Log in and obtain an access token
# --------------------------------------------------

login_payload = json.dumps(
    {
        "email": email,
        "password": password,
    }
).encode("utf-8")

login_request = urllib.request.Request(
    f"{BASE_URL}/api/auth/login",
    data=login_payload,
    headers={
        "Content-Type": "application/json",
    },
    method="POST",
)

try:
    with urllib.request.urlopen(
        login_request
    ) as response:
        login_data = json.loads(
            response.read().decode("utf-8")
        )

        access_token = login_data.get(
            "access_token"
        )

        print(
            "Login status:",
            response.status,
        )
        print(
            "Access token received:",
            bool(access_token),
        )

except urllib.error.HTTPError as exc:
    print(
        "Login failed:",
        exc.code,
        exc.read().decode("utf-8"),
    )
    raise SystemExit(1)


if not access_token:
    print("No access token received.")
    raise SystemExit(1)


# --------------------------------------------------
# 2. PATCH one property using the access token
# --------------------------------------------------

property_slug = "four-bedroom-house-karen"

patch_payload = json.dumps(
    {
        "featured": True,
    }
).encode("utf-8")

patch_request = urllib.request.Request(
    f"{BASE_URL}/api/properties/{property_slug}",
    data=patch_payload,
    headers={
        "Content-Type": "application/json",
        "Authorization": (
            f"Bearer {access_token}"
        ),
    },
    method="PATCH",
)

try:
    with urllib.request.urlopen(
        patch_request
    ) as response:
        property_data = json.loads(
            response.read().decode("utf-8")
        )

        print(
            "PATCH status:",
            response.status,
        )
        print(
            "Property slug:",
            property_data.get("slug"),
        )
        print(
            "Featured:",
            property_data.get("featured"),
        )

except urllib.error.HTTPError as exc:
    print(
        "PATCH failed:",
        exc.code,
        exc.read().decode("utf-8"),
    )
    raise SystemExit(1)