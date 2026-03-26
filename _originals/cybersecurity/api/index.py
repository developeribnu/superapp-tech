"""Vercel Serverless Entry Point — triple-fallback for maximum resilience."""

import json
import os
import sys
import traceback

# =============================================================================
# PATH SETUP FOR VERCEL ENVIRONMENT
# =============================================================================
# Vercel Python runtime uses /var/task as working directory
# We need to ensure all possible paths are in sys.path

# Get the directory of this file
_current_file_dir = os.path.dirname(os.path.abspath(__file__))

# Calculate project root (parent of api/ directory)
_project_root = os.path.dirname(_current_file_dir)

# Add paths in order of priority (most specific first)
_paths_to_add = [
    _project_root,                    # /var/task (project root)
    _current_file_dir,                # /var/task/api
    os.path.join(_project_root, 'src'),  # /var/task/src
]

for _path in _paths_to_add:
    if _path not in sys.path:
        sys.path.insert(0, _path)

# =============================================================================
# ERROR TRACKING
# =============================================================================
_errors = []

def _log_error(stage: str, exc: Exception) -> None:
    """Log error with full traceback for debugging."""
    _errors.append({
        "stage": stage,
        "error": str(exc),
        "traceback": traceback.format_exc(),
    })

# =============================================================================
# LEVEL 1: Try to load the real application
# =============================================================================
app = None

if app is None:
    try:
        from src.app import app as _real_app
        app = _real_app
    except ImportError as e:
        _log_error("src.app_import", e)
        app = None
    except Exception as e:
        _log_error("src.app_load", e)
        app = None

# =============================================================================
# LEVEL 2: FastAPI diagnostic fallback
# =============================================================================
if app is None:
    try:
        from fastapi import FastAPI
        from fastapi.responses import JSONResponse

        _diag_app = FastAPI(title="Cybersec KB - Diagnostic Mode")

        @_diag_app.get("/")
        async def _diag_root():
            return JSONResponse(
                status_code=200,
                content={
                    "status": "diagnostic_mode",
                    "message": "App running in diagnostic mode - main app failed to load",
                    "errors": _errors,
                    "environment": {
                        "python_version": sys.version,
                        "python_path": sys.path[:10],
                        "cwd": os.getcwd(),
                        "project_root": _project_root,
                    },
                },
            )

        @_diag_app.get("/{path:path}")
        async def _diag_catchall(path: str = ""):
            return JSONResponse(
                status_code=503,
                content={
                    "error": "App failed to start",
                    "path": path,
                    "errors": _errors,
                    "environment": {
                        "python_version": sys.version,
                        "python_path": sys.path[:10],
                        "cwd": os.getcwd(),
                        "project_root": _project_root,
                    },
                },
            )

        app = _diag_app

    except ImportError as e:
        _log_error("fastapi_import", e)
        app = None
    except Exception as e:
        _log_error("fastapi_fallback", e)
        app = None

# =============================================================================
# LEVEL 3: Pure ASGI fallback (zero dependencies)
# =============================================================================
if app is None:
    async def app(scope, receive, send):
        """Pure ASGI application - no external dependencies."""
        if scope["type"] == "http":
            _response_body = {
                "error": "Service Unavailable",
                "message": "Neither main app nor FastAPI could be loaded",
                "errors": _errors,
                "environment": {
                    "python_version": sys.version,
                    "python_path": sys.path[:10],
                    "cwd": os.getcwd(),
                    "project_root": _project_root,
                },
                "debug": {
                    "current_file_dir": _current_file_dir,
                    "paths_added": _paths_to_add,
                    "sys_path_0_5": sys.path[:5],
                },
            }
            
            body = json.dumps(_response_body, indent=2).encode("utf-8")
            
            await send({
                "type": "http.response.start",
                "status": 503,
                "headers": [
                    [b"content-type", b"application/json; charset=utf-8"],
                    [b"cache-control", b"no-store"],
                ],
            })
            await send({
                "type": "http.response.body",
                "body": body,
            })


# =============================================================================
# VERCEL HANDLER ALIAS
# =============================================================================
# Vercel looks for 'handler' or 'app' as the entry point
handler = app
