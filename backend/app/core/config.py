from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file="../.env", extra="ignore")

    environment: str = "development"

    # Server
    backend_host: str = "0.0.0.0"
    backend_port: int = 8000
    backend_cors_origins: str = "http://localhost:3000"

    # Database
    database_url: str

    # Auth
    secret_key: str = "change-me"
    access_token_expire_minutes: int = 60

    # Socket.IO
    socketio_cors_origin: str = "http://localhost:3000"

    # LangChain / LLM
    openai_api_key: str | None = None
    anthropic_api_key: str | None = None

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.backend_cors_origins.split(",")]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
