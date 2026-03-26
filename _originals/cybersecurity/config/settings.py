"""
Cybersec Knowledge Base - Application Settings
Global configuration using pydantic-settings for validation.
"""

from __future__ import annotations

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # Application
    app_env: str = "development"
    app_host: str = "0.0.0.0"
    app_port: int = 8000
    app_debug: bool = True
    log_level: str = "INFO"

    # Threat Intelligence Keys
    otx_api_key: str = ""
    virustotal_api_key: str = ""
    shodan_api_key: str = ""

    # Security
    cors_origins: list[str] = Field(
        default=[
            "http://localhost:3000",
            "https://heyibnu.com",
            "https://cybersecurity-silk.vercel.app",
        ]
    )
    rate_limit_per_minute: int = 60

    @property
    def is_production(self) -> bool:
        return self.app_env == "production"


settings = Settings()
