# Goldenspice Backend Deployment

## Runtime

Goldenspice uses:

- Python
- FastAPI
- Uvicorn
- SQLAlchemy
- Alembic
- PostgreSQL

Python 3.11 is recommended for production.

## Required environment variables

The production environment must define:

- `DATABASE_URL`
- `JWT_SECRET_KEY`
- `APP_ENV=production`
- `CORS_ORIGINS`

Optional application settings:

- `APP_NAME`
- `APP_VERSION`
- `JWT_ALGORITHM`
- `ACCESS_TOKEN_EXPIRE_MINUTES`
- `PORT`
- `FORWARDED_ALLOW_IPS`

Do not commit production secrets to Git.

## Production CORS

For the Goldenspice website:

```text
CORS_ORIGINS=https://goldenspice.co.ke,https://www.goldenspice.co.ke
```

Do not use `*` for production CORS.

## Database migrations

Before starting the production API, apply the current Alembic migrations:

```bash
alembic upgrade head
```

The production start script performs this step automatically.

## Production start command

The included production script is:

```bash
./scripts/start_production.sh
```

It applies database migrations and then starts Uvicorn.

The server listens on the `PORT` environment variable when supplied by the hosting platform. Otherwise it defaults to port `8000`.

## Reverse proxy

Goldenspice may run behind a hosting provider's reverse proxy.

`FORWARDED_ALLOW_IPS` controls which proxy IP addresses are trusted when processing forwarded headers.

Do not configure this as `*` unless the hosting environment specifically requires it and the security implications are understood.

The correct production value depends on the hosting provider's proxy configuration.

## Property image uploads

Admin property images are uploaded through:

```text
POST /api/uploads/property-image
```

Uploaded property images are stored under:

```text
Backend/uploads/properties/
```

The application serves them publicly under:

```text
/uploads/properties/
```

The upload directory must be writable by the production application process.

Uploaded property images are runtime data and are intentionally excluded from Git.

## Persistent storage requirement

`Backend/uploads/` must use persistent storage in production.

A deployment must not erase this directory when the application is restarted, rebuilt, or redeployed. Otherwise property records may continue to reference image URLs whose files no longer exist.

Before production deployment, confirm with the hosting provider that the application directory or configured upload directory persists across deployments and is writable by the Python application.

If the hosting platform does not provide reliable persistent local storage, property images should be moved to persistent object/media storage before enabling production uploads.

## Production verification

After deployment, verify:

```text
GET /api/health
GET /api/ready
GET /api/properties
```

Also verify:

- admin authentication
- protected property creation and editing
- property image upload
- public access to an uploaded image
- frontend access from `https://goldenspice.co.ke`
- CORS behavior
- database persistence after application restart
- image persistence after application restart or redeployment

## Security

Production must use:

- HTTPS
- a strong unique `JWT_SECRET_KEY`
- production PostgreSQL credentials
- restricted CORS origins
- appropriately restricted forwarded-header trust
- writable but persistent upload storage

Never commit `.env` or production credentials to Git.
