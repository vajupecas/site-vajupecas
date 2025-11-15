from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated, List
from sqlalchemy import func
from sqlmodel import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from database.db import get_session
from models.producer import Producer, ProducerBase, ProducerUpdate, ProducerResponse
from models.model import Model, ModelResponse

router = APIRouter()

@router.get("/producers", response_model=List[ProducerResponse])
async def get_producers(session: Annotated[AsyncSession, Depends(get_session)]):
    statement = (
        select(Producer).options(selectinload(Producer.products_list), selectinload(Producer.product_type), selectinload(Producer.models_list))
    ).order_by(Producer.name)
    result = await session.execute(statement=statement)
    producers = result.scalars().all()

    return producers

@router.get("/producers/{producer_id}", response_model=ProducerResponse)
async def get_producer_by_id(producer_id: int, session: Annotated[AsyncSession, Depends(get_session)]):
    statement = (
        select(Producer)
        .options(selectinload(Producer.products_list), selectinload(Producer.product_type), selectinload(Producer.models_list))
        .where(Producer.id == producer_id)
    )
    result = await session.execute(statement)
    producer = result.scalars().first()

    if not producer:
        raise HTTPException(status_code=404, detail="Fabricante não encontrado ou cadastrado")

    return producer

@router.get("/producers/{producer}/models", response_model=list[ModelResponse])
async def get_models_by_producer(producer: str, session: Annotated[AsyncSession, Depends(get_session)]):
    if producer.isdigit():
        statement = (
            select(Model)
            .options(
                selectinload(Model.products_list), 
                selectinload(Model.producer)
            )
            .where(Model.producer_id == int(producer))
        )
    else:
        statement = (
            select(Model)
            .options(
                selectinload(Model.products_list),
                selectinload(Model.producer)
            )
            .join(Model.producer)
            .where(func.lower(Producer.name) == producer.replace("-", " ").lower())
        )
    
    result = await session.execute(statement)
    models = result.scalars().all()
    
    return models

@router.post("/producers", response_model=ProducerBase)
async def post_producer(data: ProducerBase, session: Annotated[AsyncSession, Depends(get_session)]) -> Producer:
    producer = Producer.model_validate(data)

    session.add(producer)
    await session.commit()
    await session.refresh(producer)

    return producer

@router.put("/producers/{producer_id}", response_model=ProducerResponse)
async def update_producer(producer_id: int, data: ProducerUpdate, session: Annotated[AsyncSession, Depends(get_session)]):
    producer = await session.get(Producer, producer_id)

    if not producer:
        raise HTTPException(status_code=404, detail="Fabricante não encontrado ou cadastrado")
    
    filtred_data = data.model_dump(exclude_unset=True)
    for key, value in filtred_data.items():
        setattr(producer, key, value)

    session.add(producer)
    await session.commit()
    await session.refresh(producer)

    return producer

@router.delete("/producers/{producer_id}", status_code=204)
async def delete_producer(producer_id: int, session: Annotated[AsyncSession, Depends(get_session)]):
    producer = await session.get(Producer, producer_id)

    if not producer:
        raise HTTPException(status_code=404, detail="Fabricante não encontrado ou cadastrado")
    
    await session.delete(producer)
    await session.commit()

    return {"detail": "Fabricante deletado com sucesso"}