"""
Cybersec Knowledge Base - Main Application
FastAPI application entry point with middleware, CORS, and routing.
"""

from __future__ import annotations

from contextlib import asynccontextmanager
from typing import Any, AsyncGenerator

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse, PlainTextResponse
from fastapi.staticfiles import StaticFiles
from pathlib import Path

from src.api.routes import router

APP_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = APP_DIR.parent
STATIC_DIR = APP_DIR / "static"

# Graceful settings import — use defaults if pydantic-settings is missing
try:
    from config.settings import settings as _settings

    _cors_origins = _settings.cors_origins
    _rate_limit = _settings.rate_limit_per_minute
    _app_env = _settings.app_env
except Exception:
    _settings = None
    _cors_origins = ["*"]
    _rate_limit = 60
    _app_env = "production"


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Application startup and shutdown events."""
    print("=" * 60)
    print("  Cybersec Knowledge Base v4.0")
    print(f"  Environment: {_app_env}")
    print("=" * 60)
    yield
    print("Cybersec Knowledge Base shutting down...")


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    app = FastAPI(
        title="Cybersec Knowledge Base",
        description=(
            "Cybersecurity Knowledge Base & Tools — "
            "OWASP Top 10, MITRE ATT&CK, certification paths, "
            "security tools, and threat intelligence."
        ),
        version="4.0.0",
        lifespan=lifespan,
        docs_url="/docs",
        redoc_url="/redoc",
    )

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=_cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Middleware — imported lazily so app starts even if middleware has issues
    try:
        from src.api.middleware import RateLimitMiddleware, SecurityHeadersMiddleware

        app.add_middleware(SecurityHeadersMiddleware)
        app.add_middleware(
            RateLimitMiddleware,
            requests_per_minute=_rate_limit,
        )
    except Exception:
        pass  # App works without custom middleware

    # API routes
    app.include_router(router, prefix="/api/v1")

    # Static assets for the public library page
    app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

    # Robots.txt route
    @app.get("/robots.txt", response_class=PlainTextResponse)
    async def robots_txt() -> str:
        robots_file = PROJECT_ROOT / "robots.txt"
        if robots_file.exists():
            return robots_file.read_text()
        return "User-agent: *\nAllow: /api/v1/\nDisallow: /api/v1/admin/"

    # Sitemap.xml route
    @app.get("/sitemap.xml", response_class=PlainTextResponse)
    async def sitemap_xml() -> str:
        sitemap_file = PROJECT_ROOT / "sitemap.xml"
        if sitemap_file.exists():
            return sitemap_file.read_text()
        return '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>'

    # Public library page
    @app.get("/books", include_in_schema=False)
    async def books_page() -> FileResponse:
        return FileResponse(STATIC_DIR / "books.html")

    @app.get("/library", include_in_schema=False)
    async def library_page() -> FileResponse:
        return FileResponse(STATIC_DIR / "books.html")

    # Root route
    @app.get("/")
    async def root() -> dict[str, Any]:
        return {
            "name": "Cybersec Knowledge Base",
            "version": "4.0.0",
            "status": "running",
            "docs": "/docs",
            "endpoints": {
                "health": "/api/v1/health",
                "knowledge": {
                    "owasp": "/api/v1/knowledge/owasp",
                    "certifications": "/api/v1/knowledge/certifications",
                    "killchain": "/api/v1/knowledge/killchain",
                },
                "tools": {
                    "hash": "/api/v1/tools/hash",
                    "password": "/api/v1/tools/password/analyze",
                    "encode": "/api/v1/tools/encode",
                    "encrypt": "/api/v1/tools/encrypt",
                    "decrypt": "/api/v1/tools/decrypt",
                    "ports": "/api/v1/tools/ports/analyze",
                },
                "threat_intel": {
                    "news": "/api/v1/threat-intel/news",
                    "cve": "/api/v1/threat-intel/cve/{cve_id}",
                    "kev": "/api/v1/threat-intel/kev",
                },
                "pages": {
                    "books": "/books",
                    "catalog_api": "/api/v1/library/books",
                },
            },
        }

    # Global exception handler
    @app.exception_handler(Exception)
    async def global_exception_handler(
        request: Request, exc: Exception
    ) -> JSONResponse:
        return JSONResponse(
            status_code=500,
            content={
                "detail": "Internal server error",
                "path": str(request.url.path),
            },
        )

    # 404 handler
    @app.exception_handler(404)
    async def not_found_handler(request: Request, exc: Exception) -> JSONResponse:
        return JSONResponse(
            status_code=404,
            content={
                "detail": "Resource not found",
                "path": str(request.url.path),
            },
        )

    return app


app = create_app()


if __name__ == "__main__":
    import uvicorn

    host = _settings.app_host if _settings else "0.0.0.0"
    port = _settings.app_port if _settings else 8000
    debug = _settings.app_debug if _settings else True
    uvicorn.run("src.app:app", host=host, port=port, reload=debug)
