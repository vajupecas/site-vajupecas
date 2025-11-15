from fastapi import APIRouter, UploadFile, File
from routers.b2_service import upload_to_b2, delete_from_b2

router = APIRouter()

@router.post("/medias")
async def upload_file(file: UploadFile = File(...)):
    url = await upload_to_b2(file)
    return {"url": url}

@router.delete("/medias")
async def delete_file(url: str):
    key = url.split("/")[-1]
    delete_from_b2(key)
    return {"detail": "Imagem deletada com sucesso"}