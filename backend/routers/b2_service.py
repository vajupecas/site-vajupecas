import boto3
from botocore.client import Config
import uuid
from fastapi import UploadFile
import os
from io import BytesIO
from PIL import Image

B2_KEY_ID = os.getenv("B2_KEY_ID")
B2_APPLICATION_KEY = os.getenv("B2_APPLICATION_KEY")
B2_BUCKET = os.getenv("B2_BUCKET")
B2_S3_ENDPOINT = os.getenv("B2_S3_ENDPOINT")
B2_DOWNLOAD_ENDPOINT = os.getenv("B2_DOWNLOAD_ENDPOINT")

session = boto3.session.Session()

client = session.client(
    "s3",
    endpoint_url=B2_S3_ENDPOINT,
    aws_access_key_id=B2_KEY_ID,
    aws_secret_access_key=B2_APPLICATION_KEY,
    config=Config(signature_version="s3v4")
)

async def upload_to_b2(file: UploadFile):
    original_bytes = await file.read()

    img = Image.open(BytesIO(original_bytes)).convert("RGB")

    buffer = BytesIO()
    img.save(buffer, format="WEBP", quality=80)
    buffer.seek(0)

    key = f"{uuid.uuid4()}.webp"

    client.put_object(
        Bucket=B2_BUCKET,
        Key=key,
        Body=buffer.getvalue(),
        ContentType="image/webp",
        CacheControl="public, max-age=31536000"
    )
    
    public_url = f"{B2_DOWNLOAD_ENDPOINT}/file/{B2_BUCKET}/{key}"
    return public_url


def delete_from_b2(key: str):
    client.delete_object(Bucket=B2_BUCKET, Key=key)