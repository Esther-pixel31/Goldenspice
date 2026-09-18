from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.api.routes.auth import router as auth_router
from app.api.routes.properties import router as properties_router
from app.core.config import (
    APP_NAME,
    APP_VERSION,
    CORS_ORIGINS,
)
from app.database import engine


app = FastAPI(
    title=APP_NAME,
    description="Backend API for the Goldenspice website.",
    version=APP_VERSION,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(properties_router)


@app.get("/")
def root():
    return {
        "message": "{} is running".format(APP_NAME),
    }


@app.get("/api/health")
def health():
    return {
        "status": "ok",
    }


@app.get("/api/ready")
def readiness():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
    except SQLAlchemyError:
        raise HTTPException(
            status_code=503,
            detail="Database unavailable.",
        )

    return {
        "status": "ready",
        "database": "connected",
    }