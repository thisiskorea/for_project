from typing import List, Optional
from datetime import datetime
from bson import ObjectId
import PyPDF2
import pdfplumber
from io import BytesIO

from app.models.paper import Paper, PaperCreate
from app.database.mongodb import get_database
from app.database.elasticsearch import get_elasticsearch


class PaperService:
    def __init__(self):
        self.collection_name = "papers"

    async def create_paper(self, paper_data: PaperCreate, user_id: str) -> Paper:
        db = get_database()
        collection = db[self.collection_name]

        paper_dict = paper_data.model_dump()
        paper_dict["uploaded_by"] = user_id
        paper_dict["created_at"] = datetime.utcnow()
        paper_dict["updated_at"] = datetime.utcnow()
        paper_dict["view_count"] = 0
        paper_dict["download_count"] = 0
        paper_dict["bookmark_count"] = 0
        paper_dict["citations_count"] = 0
        paper_dict["references"] = []
        paper_dict["cited_by"] = []

        result = await collection.insert_one(paper_dict)
        paper_dict["_id"] = result.inserted_id

        # Index in Elasticsearch
        await self._index_paper(paper_dict)

        return Paper(**paper_dict)

    async def get_paper(self, paper_id: str) -> Optional[Paper]:
        db = get_database()
        collection = db[self.collection_name]

        paper = await collection.find_one({"_id": ObjectId(paper_id)})
        if paper:
            # Increment view count
            await collection.update_one(
                {"_id": ObjectId(paper_id)},
                {"$inc": {"view_count": 1}}
            )
            return Paper(**paper)
        return None

    async def list_papers(
        self,
        skip: int = 0,
        limit: int = 20,
        category: Optional[str] = None
    ) -> List[Paper]:
        db = get_database()
        collection = db[self.collection_name]

        query = {}
        if category:
            query["categories"] = category

        cursor = collection.find(query).skip(skip).limit(limit).sort("created_at", -1)
        papers = await cursor.to_list(length=limit)

        return [Paper(**paper) for paper in papers]

    async def search_papers(self, query: str, limit: int = 20) -> List[Paper]:
        es = get_elasticsearch()

        search_query = {
            "query": {
                "multi_match": {
                    "query": query,
                    "fields": ["title^3", "abstract^2", "full_text", "authors"]
                }
            },
            "size": limit
        }

        result = await es.search(index="papers", body=search_query)

        paper_ids = [hit["_id"] for hit in result["hits"]["hits"]]

        # Fetch full papers from MongoDB
        db = get_database()
        collection = db[self.collection_name]

        papers = []
        for paper_id in paper_ids:
            paper = await collection.find_one({"_id": ObjectId(paper_id)})
            if paper:
                papers.append(Paper(**paper))

        return papers

    async def update_paper(
        self,
        paper_id: str,
        update_data: dict,
        user_id: str
    ) -> Optional[Paper]:
        db = get_database()
        collection = db[self.collection_name]

        # Check ownership
        paper = await collection.find_one({"_id": ObjectId(paper_id)})
        if not paper or paper.get("uploaded_by") != user_id:
            return None

        update_data["updated_at"] = datetime.utcnow()

        await collection.update_one(
            {"_id": ObjectId(paper_id)},
            {"$set": update_data}
        )

        # Re-index in Elasticsearch
        updated_paper = await collection.find_one({"_id": ObjectId(paper_id)})
        await self._index_paper(updated_paper)

        return Paper(**updated_paper)

    async def delete_paper(self, paper_id: str, user_id: str) -> bool:
        db = get_database()
        collection = db[self.collection_name]

        # Check ownership
        paper = await collection.find_one({"_id": ObjectId(paper_id)})
        if not paper or paper.get("uploaded_by") != user_id:
            return False

        await collection.delete_one({"_id": ObjectId(paper_id)})

        # Remove from Elasticsearch
        es = get_elasticsearch()
        try:
            await es.delete(index="papers", id=paper_id)
        except:
            pass

        return True

    async def extract_text_from_pdf(self, pdf_bytes: bytes) -> str:
        """Extract text from PDF file"""
        try:
            text = ""
            with pdfplumber.open(BytesIO(pdf_bytes)) as pdf:
                for page in pdf.pages:
                    text += page.extract_text() or ""
            return text
        except Exception as e:
            print(f"Error extracting text from PDF: {e}")
            return ""

    async def _index_paper(self, paper: dict):
        """Index paper in Elasticsearch"""
        es = get_elasticsearch()

        doc = {
            "title": paper.get("title"),
            "abstract": paper.get("abstract"),
            "full_text": paper.get("full_text"),
            "authors": " ".join([author.get("name", "") for author in paper.get("authors", [])]),
            "keywords": paper.get("keywords", []),
            "categories": paper.get("categories", []),
            "published_date": paper.get("published_date"),
            "arxiv_id": paper.get("arxiv_id"),
            "doi": paper.get("doi")
        }

        await es.index(
            index="papers",
            id=str(paper["_id"]),
            body=doc
        )

        # Update indexed_at timestamp
        db = get_database()
        collection = db[self.collection_name]
        await collection.update_one(
            {"_id": paper["_id"]},
            {"$set": {"indexed_at": datetime.utcnow()}}
        )
