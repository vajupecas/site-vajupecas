from fastapi import APIRouter, Depends, HTTPException, Request
from typing import Annotated
from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from database.db import get_session
from models.slider import SliderImageBase, SliderImage, SliderImageUpdate
from routers.b2_service import delete_from_b2

router = APIRouter()

@router.get("/slider-images", response_model=list[SliderImage])
async def get_slider_images(session: Annotated[AsyncSession, Depends(get_session)]):
    statement = select(SliderImage).order_by(SliderImage.name)
    result = await session.execute(statement=statement)
    slider_images = result.scalars().all()

    return slider_images

@router.post("/slider-images", response_model=SliderImage)
async def post_slider_image(data: SliderImageBase, session: Annotated[AsyncSession, Depends(get_session)]):
    slider_image = SliderImage.model_validate(data)

    session.add(slider_image)
    await session.commit()
    await session.refresh(slider_image)

    return slider_image

@router.put("/slider-images/{slider_image_id}", response_model=SliderImage)
async def update_slider_image(slider_image_id: int, data: SliderImageUpdate, session: Annotated[AsyncSession, Depends(get_session)]):
    slider_image = await session.get(SliderImage, slider_image_id)

    if not slider_image:
        raise HTTPException(status_code=404, detail="Nenhuma imagem do slider com esse ID foi cadastrada")
    
    filtered_data = data.model_dump(exclude_unset=True)

    if "url_image" in filtered_data:
        old_key = slider_image.url_image.split("/")[-1]
        delete_from_b2(old_key)

    for key, value in filtered_data.items():
        setattr(slider_image, key, value)
    
    session.add(slider_image)
    await session.commit()
    await session.refresh(slider_image)

    return slider_image

@router.delete("/slider-images/{slider_image_id}", status_code=204)
async def delete_slider_image(slider_image_id: int, session: Annotated[AsyncSession, Depends(get_session)]):
    slider_image = await session.get(SliderImage, slider_image_id)

    if not slider_image:
        raise HTTPException(status_code=404, detail="Imagem do Slider não encontrada ou cadastrada")
    
    old_key = slider_image.url_image.split("/")[-1]
    delete_from_b2(old_key)
    
    await session.delete(slider_image)
    await session.commit()

    return {"detail": "Imagem do Slider deletada com sucesso"}