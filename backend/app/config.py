"""
Loads variables from .env
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str
    session_secret: str
    postgres_db: str
    postgres_user: str
    postgres_password: str
    google_client_id: str
    google_client_secret: str

    # Source of the variables
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


settings = Settings()
