from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import uvicorn

from app.api import papers
from app.database.mongodb import connect_to_mongo, close_mongo_connection
from app.database.elasticsearch import connect_to_elasticsearch, close_elasticsearch_connection
from app.core.config import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await connect_to_mongo()
    await connect_to_elasticsearch()
    yield
    # Shutdown
    await close_mongo_connection()
    await close_elasticsearch_connection()


app = FastAPI(
    title="AI Research Platform - Paper Service",
    description="Paper management and search service",
    version="1.0.0",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(papers.router, prefix="/papers", tags=["papers"])


@app.get("/")
async def root():
    return {"message": "AI Research Platform - Paper Service", "status": "running"}


@app.get("/health")
async def health():
    return {"status": "healthy"}


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=settings.PORT,
        reload=settings.ENVIRONMENT == "development"
    )
