from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Query
from fastapi.responses import StreamingResponse
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from io import BytesIO

from app.models.dataset import Dataset, DatasetCreate, DatasetUpdate
from app.services.dataset_service import DatasetService
from app.database.db import get_session
from app.api.dependencies import get_current_user

router = APIRouter()
dataset_service = DatasetService()


@router.post("/", response_model=Dataset, status_code=status.HTTP_201_CREATED)
async def create_dataset(
    dataset: DatasetCreate,
    session: AsyncSession = Depends(get_session),
    current_user: dict = Depends(get_current_user)
):
    """Create a new dataset"""
    return await dataset_service.create_dataset(session, dataset, current_user["user_id"])


@router.get("/", response_model=List[Dataset])
async def list_datasets(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    visibility: Optional[str] = None,
    session: AsyncSession = Depends(get_session)
):
    """List all datasets"""
    return await dataset_service.list_datasets(session, skip, limit, visibility)


@router.get("/{dataset_id}", response_model=Dataset)
async def get_dataset(
    dataset_id: str,
    session: AsyncSession = Depends(get_session)
):
    """Get a dataset by ID"""
    dataset = await dataset_service.get_dataset(session, dataset_id)
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")
    return dataset


@router.patch("/{dataset_id}", response_model=Dataset)
async def update_dataset(
    dataset_id: str,
    dataset_update: DatasetUpdate,
    session: AsyncSession = Depends(get_session),
    current_user: dict = Depends(get_current_user)
):
    """Update a dataset"""
    dataset = await dataset_service.update_dataset(
        session,
        dataset_id,
        dataset_update,
        current_user["user_id"]
    )
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found or unauthorized")
    return dataset


@router.delete("/{dataset_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_dataset(
    dataset_id: str,
    session: AsyncSession = Depends(get_session),
    current_user: dict = Depends(get_current_user)
):
    """Delete a dataset"""
    success = await dataset_service.delete_dataset(
        session,
        dataset_id,
        current_user["user_id"]
    )
    if not success:
        raise HTTPException(status_code=404, detail="Dataset not found or unauthorized")


@router.post("/{dataset_id}/upload", response_model=Dataset)
async def upload_dataset_file(
    dataset_id: str,
    file: UploadFile = File(...),
    session: AsyncSession = Depends(get_session),
    current_user: dict = Depends(get_current_user)
):
    """Upload dataset file"""
    file_content = await file.read()

    dataset = await dataset_service.upload_file(
        session,
        dataset_id,
        file_content,
        file.filename,
        current_user["user_id"]
    )

    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found or unauthorized")

    return dataset


@router.get("/{dataset_id}/download")
async def download_dataset_file(
    dataset_id: str,
    session: AsyncSession = Depends(get_session),
    current_user: dict = Depends(get_current_user)
):
    """Download dataset file"""
    dataset = await dataset_service.get_dataset(session, dataset_id)
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")

    file_content = await dataset_service.download_file(dataset)
    if not file_content:
        raise HTTPException(status_code=404, detail="File not found")

    return StreamingResponse(
        BytesIO(file_content),
        media_type="application/octet-stream",
        headers={"Content-Disposition": f"attachment; filename={dataset.name}"}
    )
