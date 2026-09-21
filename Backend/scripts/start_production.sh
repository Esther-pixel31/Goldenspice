#!/usr/bin/env bash

set -e

cd "$(dirname "$0")/.."

echo "Running Goldenspice database migrations..."
alembic upgrade head

echo "Starting Goldenspice API..."
exec uvicorn app.main:app \
    --host 0.0.0.0 \
    --port "${PORT:-8000}" \
    --proxy-headers \
    --forwarded-allow-ips="${FORWARDED_ALLOW_IPS:-127.0.0.1}"
