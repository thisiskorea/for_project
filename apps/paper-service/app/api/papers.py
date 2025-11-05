from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Query
from typing import List, Optional

from app.models.paper import Paper, PaperCreate, PaperUpdate
from app.services.paper_service import PaperService
from app.api.dependencies import get_current_user

router = APIRouter()
paper_service = PaperService()


@router.post("/", response_model=Paper, status_code=status.HTTP_201_CREATED)
async def create_paper(
    paper: PaperCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create a new paper"""
    return await paper_service.create_paper(paper, current_user["user_id"])


@router.get("/", response_model=List[Paper])
async def list_papers(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    category: Optional[str] = None
):
    """List all papers"""
    return await paper_service.list_papers(skip, limit, category)


@router.get("/search", response_model=List[Paper])
async def search_papers(
    q: str = Query(..., min_length=1),
    limit: int = Query(20, ge=1, le=100)
):
    """Search papers"""
    return await paper_service.search_papers(q, limit)


@router.get("/{paper_id}", response_model=Paper)
async def get_paper(paper_id: str):
    """Get a paper by ID"""
    paper = await paper_service.get_paper(paper_id)
    if not paper:
        raise HTTPException(status_code=404, detail="Paper not found")
    return paper


@router.patch("/{paper_id}", response_model=Paper)
async def update_paper(
    paper_id: str,
    paper_update: PaperUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update a paper"""
    paper = await paper_service.update_paper(
        paper_id,
        paper_update.model_dump(exclude_unset=True),
        current_user["user_id"]
    )
    if not paper:
        raise HTTPException(status_code=404, detail="Paper not found or unauthorized")
    return paper


@router.delete("/{paper_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_paper(
    paper_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Delete a paper"""
    success = await paper_service.delete_paper(paper_id, current_user["user_id"])
    if not success:
        raise HTTPException(status_code=404, detail="Paper not found or unauthorized")


@router.post("/upload", response_model=Paper)
async def upload_paper(
    file: UploadFile = File(...),
    title: str = Query(...),
    current_user: dict = Depends(get_current_user)
):
    """Upload a paper PDF"""
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    # Read PDF content
    pdf_bytes = await file.read()

    # Extract text from PDF
    full_text = await paper_service.extract_text_from_pdf(pdf_bytes)

    # Create paper entry
    paper_data = PaperCreate(
        title=title,
        authors=[],  # Should be extracted or provided
        full_text=full_text
    )

    return await paper_service.create_paper(paper_data, current_user["user_id"])
