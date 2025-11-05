from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # Server
    PORT: int = 4004
    ENVIRONMENT: str = "development"

    # PostgreSQL
    DATABASE_URL: str = "postgresql://airesearch:airesearch_dev_password@localhost:5432/airesearch"

    # S3/MinIO
    S3_ENDPOINT: str = "http://localhost:9000"
    S3_ACCESS_KEY_ID: str = "airesearch"
    S3_SECRET_ACCESS_KEY: str = "airesearch_dev_password"
    S3_BUCKET: str = "datasets"
    S3_REGION: str = "us-east-1"

    # JWT
    JWT_SECRET: str = "your-super-secret-jwt-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"

    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
