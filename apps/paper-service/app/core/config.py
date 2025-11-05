from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # Server
    PORT: int = 4003
    ENVIRONMENT: str = "development"

    # MongoDB
    MONGODB_URL: str = "mongodb://airesearch:airesearch_dev_password@localhost:27017/airesearch?authSource=admin"

    # Elasticsearch
    ELASTICSEARCH_URL: str = "http://localhost:9200"

    # S3/MinIO
    S3_ENDPOINT: str = "http://localhost:9000"
    S3_ACCESS_KEY_ID: str = "airesearch"
    S3_SECRET_ACCESS_KEY: str = "airesearch_dev_password"
    S3_BUCKET: str = "papers"
    S3_REGION: str = "us-east-1"

    # JWT
    JWT_SECRET: str = "your-super-secret-jwt-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"

    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000"]

    # OpenAI
    OPENAI_API_KEY: str = ""

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
