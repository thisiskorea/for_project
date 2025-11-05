from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from sqlalchemy import Column, String, BigInteger, Integer, ARRAY, DateTime, Text
from sqlalchemy.dialects.postgresql import UUID
import uuid

from app.database.db import Base


class DatasetDB(Base):
    __tablename__ = "datasets"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    owner_id = Column(UUID(as_uuid=True), nullable=False)
    visibility = Column(String(20), default="private")
    size_bytes = Column(BigInteger, default=0)
    file_count = Column(Integer, default=0)
    format = Column(String(50), nullable=True)
    license = Column(String(100), nullable=True)
    tags = Column(ARRAY(String), default=[])
    download_count = Column(Integer, default=0)
    star_count = Column(Integer, default=0)
    version = Column(String(20), default="1.0.0")
    storage_path = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class DatasetBase(BaseModel):
    name: str
    description: Optional[str] = None
    visibility: str = "private"
    format: Optional[str] = None
    license: Optional[str] = None
    tags: List[str] = []
    version: str = "1.0.0"


class DatasetCreate(DatasetBase):
    pass


class DatasetUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    visibility: Optional[str] = None
    tags: Optional[List[str]] = None


class Dataset(DatasetBase):
    id: uuid.UUID
    owner_id: uuid.UUID
    size_bytes: int
    file_count: int
    download_count: int
    star_count: int
    storage_path: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
