import getpass
import json
import urllib.error
import urllib.request


email = input("Admin email: ").strip().lower()
password = getpass.getpass("Admin password: ")

payload = json.dumps(
    {
        "email": email,
        "password": password,
    }
).encode("utf-8")

request = urllib.request.Request(
    "http://127.0.0.1:8000/api/auth/login",
    data=payload,
    headers={
        "Content-Type": "application/json",
    },
    method="POST",
)

try:
    with urllib.request.urlopen(request) as response:
        data = json.loads(
            response.read().decode("utf-8")
        )

        token = data.get("access_token")

        print("HTTP status:", response.status)
        print(
            "Access token received:",
            bool(token),
        )
        print(
            "Token type:",
            data.get("token_type"),
        )
        print(
            "Expires in:",
            data.get("expires_in"),
        )

except urllib.error.HTTPError as exc:
    body = exc.read().decode("utf-8")

    print("HTTP status:", exc.code)
    print("Response:", body)