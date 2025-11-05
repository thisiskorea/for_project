from typing import List, Optional
from datetime import datetime
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
import boto3
from io import BytesIO

from app.models.dataset import DatasetDB, DatasetCreate, DatasetUpdate
from app.core.config import settings


class DatasetService:
    def __init__(self):
        self.s3_client = boto3.client(
            's3',
            endpoint_url=settings.S3_ENDPOINT,
            aws_access_key_id=settings.S3_ACCESS_KEY_ID,
            aws_secret_access_key=settings.S3_SECRET_ACCESS_KEY,
            region_name=settings.S3_REGION
        )

        # Ensure bucket exists
        try:
            self.s3_client.head_bucket(Bucket=settings.S3_BUCKET)
        except:
            self.s3_client.create_bucket(Bucket=settings.S3_BUCKET)

    async def create_dataset(
        self,
        session: AsyncSession,
        dataset_data: DatasetCreate,
        user_id: str
    ) -> DatasetDB:
        """Create a new dataset"""
        dataset = DatasetDB(
            **dataset_data.model_dump(),
            owner_id=user_id
        )
        session.add(dataset)
        await session.commit()
        await session.refresh(dataset)
        return dataset

    async def get_dataset(
        self,
        session: AsyncSession,
        dataset_id: str
    ) -> Optional[DatasetDB]:
        """Get dataset by ID"""
        result = await session.execute(
            select(DatasetDB).where(DatasetDB.id == dataset_id)
        )
        dataset = result.scalar_one_or_none()

        if dataset:
            # Increment view count
            dataset.download_count += 1
            await session.commit()

        return dataset

    async def list_datasets(
        self,
        session: AsyncSession,
        skip: int = 0,
        limit: int = 20,
        visibility: Optional[str] = None
    ) -> List[DatasetDB]:
        """List datasets"""
        query = select(DatasetDB)

        if visibility:
            query = query.where(DatasetDB.visibility == visibility)

        query = query.offset(skip).limit(limit).order_by(DatasetDB.created_at.desc())

        result = await session.execute(query)
        return result.scalars().all()

    async def update_dataset(
        self,
        session: AsyncSession,
        dataset_id: str,
        update_data: DatasetUpdate,
        user_id: str
    ) -> Optional[DatasetDB]:
        """Update dataset"""
        dataset = await self.get_dataset(session, dataset_id)

        if not dataset or str(dataset.owner_id) != user_id:
            return None

        for key, value in update_data.model_dump(exclude_unset=True).items():
            setattr(dataset, key, value)

        dataset.updated_at = datetime.utcnow()

        await session.commit()
        await session.refresh(dataset)
        return dataset

    async def delete_dataset(
        self,
        session: AsyncSession,
        dataset_id: str,
        user_id: str
    ) -> bool:
        """Delete dataset"""
        dataset = await self.get_dataset(session, dataset_id)

        if not dataset or str(dataset.owner_id) != user_id:
            return False

        # Delete from S3
        if dataset.storage_path:
            try:
                self.s3_client.delete_object(
                    Bucket=settings.S3_BUCKET,
                    Key=dataset.storage_path
                )
            except Exception as e:
                print(f"Error deleting from S3: {e}")

        await session.delete(dataset)
        await session.commit()
        return True

    async def upload_file(
        self,
        session: AsyncSession,
        dataset_id: str,
        file_content: bytes,
        file_name: str,
        user_id: str
    ) -> Optional[DatasetDB]:
        """Upload dataset file to S3"""
        dataset = await self.get_dataset(session, dataset_id)

        if not dataset or str(dataset.owner_id) != user_id:
            return None

        # Generate S3 key
        storage_path = f"{user_id}/{dataset_id}/{file_name}"

        # Upload to S3
        self.s3_client.put_object(
            Bucket=settings.S3_BUCKET,
            Key=storage_path,
            Body=BytesIO(file_content)
        )

        # Update dataset
        dataset.storage_path = storage_path
        dataset.size_bytes = len(file_content)
        dataset.file_count = 1  # TODO: Support multiple files

        await session.commit()
        await session.refresh(dataset)
        return dataset

    async def download_file(self, dataset: DatasetDB) -> bytes:
        """Download dataset file from S3"""
        if not dataset.storage_path:
            return None

        response = self.s3_client.get_object(
            Bucket=settings.S3_BUCKET,
            Key=dataset.storage_path
        )

        return response['Body'].read()
