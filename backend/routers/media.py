from fastapi import APIRouter, HTTPException, UploadFile, File, Request
from PIL import Image
import os, uuid, io
import asyncio

from fastapi.responses import StreamingResponse

router = APIRouter()

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "media")

@router.post("/medias")
async def uploadFile(request: Request, file: UploadFile = File(...)):
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    new_name = f"{uuid.uuid4().hex}.webp"
    file_path = os.path.join(UPLOAD_DIR, new_name)

    contents = await file.read()
    image = Image.open(io.BytesIO(contents))

    if image.mode in ("RGBA", "P"):
        image = image.convert("RGBA")
    else:
        image = image.convert("RGB")

    image.save(file_path, "WEBP", quality=100)

    base_url = str(request.base_url)

    print(f"{base_url}media/{new_name}")

    return {"url": f"{base_url}media/{new_name}"}

async def deleteFile(request: Request, url: str):
    base_url = str(request.base_url)
    relative_path = url.replace(base_url, "")
    file_path = os.path.join(BASE_DIR, relative_path)

    if os.path.exists(file_path):
        await asyncio.to_thread(os.remove, file_path)
        return {"detail": "Foto excluída com sucesso"}
    else:
        return {"detail": "Arquivo não encontrado, nada para excluir"}
    