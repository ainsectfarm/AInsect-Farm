import os

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # App
    app_name: str = "AInsekt Farm API"
    debug: bool = False

    # Database
    database_url: str = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/ainsekt")

    # Redis
    redis_url: str = "redis://localhost:6379/0"

    # Auth
    secret_key: str = os.getenv("SECRET_KEY", "change-me-in-production")
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24  # 24h


settings = Settings()
