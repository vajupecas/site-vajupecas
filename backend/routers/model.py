from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated, List
from sqlmodel import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from database.db import get_session
from models.model import Model, ModelBase, ModelResponse, ModelUpdate

router = APIRouter()

@router.get("/models", response_model=List[ModelResponse])
async def get_models(session: Annotated[AsyncSession, Depends(get_session)]):
    statement = (
        select(Model).options(selectinload(Model.products_list), selectinload(Model.producer))
    ).order_by(Model.name)
    result = await session.execute(statement=statement)
    models = result.scalars().all()

    return models

@router.get("/models/{model_id}", response_model=ModelResponse)
async def get_model_by_id(model_id: int, session: Annotated[AsyncSession, Depends(get_session)]):
    statement = (
        select(Model)
        .options(
            selectinload(Model.producer),
            selectinload(Model.products_list)
        )
        .where(Model.id == model_id)
        )
    
    result = await session.execute(statement=statement)
    model = result.scalars().first()

    if not model:
        raise HTTPException(status_code=404, detail="Fabricante não encontrado ou cadastrado")

    return model

@router.post("/models", response_model=ModelBase)
async def post_model(data: ModelBase, session: Annotated[AsyncSession, Depends(get_session)]) -> Model:
    model = Model.model_validate(data)

    session.add(model)
    await session.commit()
    await session.refresh(model)

    return model

@router.put("/models/{model_id}", response_model=ModelResponse)
async def update_model(model_id: int, data: ModelUpdate, session: Annotated[AsyncSession, Depends(get_session)]):
    model = await session.get(Model, model_id)

    if not model:
        raise HTTPException(status_code=404, detail="Fabricante não encontrado ou cadastrado")
    
    filtred_data = data.model_dump(exclude_unset=True)
    for key, value in filtred_data.items():
        setattr(model, key, value)

    session.add(model)
    await session.commit()
    await session.refresh(model)

    return model

@router.delete("/models/{model_id}", status_code=204)
async def delete_model(model_id: int, session: Annotated[AsyncSession, Depends(get_session)]):
    model = await session.get(Model, model_id)

    if not model:
        raise HTTPException(status_code=404, detail="Fabricante não encontrado ou cadastrado")
    
    await session.delete(model)
    await session.commit()

    return {"detail": "Fabricante deletado com sucesso"}