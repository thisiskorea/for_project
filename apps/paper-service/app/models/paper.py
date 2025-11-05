from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
        field_schema.update(type="string")


class Author(BaseModel):
    name: str
    affiliation: Optional[str] = None
    email: Optional[str] = None


class PaperBase(BaseModel):
    title: str
    authors: List[Author]
    abstract: Optional[str] = None
    keywords: Optional[List[str]] = []
    categories: Optional[List[str]] = []
    arxiv_id: Optional[str] = None
    doi: Optional[str] = None
    pdf_url: Optional[str] = None
    published_date: Optional[datetime] = None
    venue: Optional[str] = None


class PaperCreate(PaperBase):
    pass


class PaperUpdate(BaseModel):
    title: Optional[str] = None
    abstract: Optional[str] = None
    keywords: Optional[List[str]] = None
    categories: Optional[List[str]] = None


class Paper(PaperBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    pdf_path: Optional[str] = None
    full_text: Optional[str] = None
    citations_count: int = 0
    references: List[str] = []
    cited_by: List[str] = []
    view_count: int = 0
    download_count: int = 0
    bookmark_count: int = 0
    uploaded_by: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    indexed_at: Optional[datetime] = None

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
