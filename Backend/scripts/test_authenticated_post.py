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
# 2. Create a temporary property
# --------------------------------------------------

property_payload = json.dumps(
    {
        "slug": "temporary-auth-test-property",
        "title": "Temporary Authentication Test Property",
        "location": "Test Location",
        "property_type": "Apartment",
        "listing_type": "FOR_SALE",
        "status": "AVAILABLE",
        "price": 1000000,
        "bedrooms": 2,
        "bathrooms": 1,
        "size": 100,
        "description": (
            "Temporary property used to test "
            "authenticated property creation."
        ),
        "features": [
            "Authentication Test"
        ],
        "image_url": None,
        "featured": False,
    }
).encode("utf-8")

post_request = urllib.request.Request(
    f"{BASE_URL}/api/properties",
    data=property_payload,
    headers={
        "Content-Type": "application/json",
        "Authorization": (
            f"Bearer {access_token}"
        ),
    },
    method="POST",
)

try:
    with urllib.request.urlopen(
        post_request
    ) as response:
        property_data = json.loads(
            response.read().decode("utf-8")
        )

        print(
            "POST status:",
            response.status,
        )
        print(
            "Property ID:",
            property_data.get("id"),
        )
        print(
            "Property slug:",
            property_data.get("slug"),
        )
        print(
            "Property status:",
            property_data.get("status"),
        )

except urllib.error.HTTPError as exc:
    print(
        "POST failed:",
        exc.code,
        exc.read().decode("utf-8"),
    )
    raise SystemExit(1)
