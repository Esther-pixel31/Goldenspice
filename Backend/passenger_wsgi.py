from a2wsgi import ASGIMiddleware
from app.main import app as fastapi_app


def application(environ, start_response):
    return ASGIMiddleware(fastapi_app)(
        environ,
        start_response,
    )
