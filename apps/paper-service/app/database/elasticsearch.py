from elasticsearch import AsyncElasticsearch
from app.core.config import settings

es_client: AsyncElasticsearch = None


async def connect_to_elasticsearch():
    global es_client
    es_client = AsyncElasticsearch([settings.ELASTICSEARCH_URL])

    # Create papers index if it doesn't exist
    if not await es_client.indices.exists(index="papers"):
        await es_client.indices.create(
            index="papers",
            body={
                "mappings": {
                    "properties": {
                        "title": {"type": "text"},
                        "abstract": {"type": "text"},
                        "full_text": {"type": "text"},
                        "authors": {"type": "text"},
                        "keywords": {"type": "keyword"},
                        "categories": {"type": "keyword"},
                        "published_date": {"type": "date"},
                        "arxiv_id": {"type": "keyword"},
                        "doi": {"type": "keyword"}
                    }
                }
            }
        )

    print("✅ Connected to Elasticsearch")


async def close_elasticsearch_connection():
    global es_client
    if es_client:
        await es_client.close()
        print("❌ Closed Elasticsearch connection")


def get_elasticsearch():
    return es_client
