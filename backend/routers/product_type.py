from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated, List
from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func
from sqlalchemy.orm import selectinload
from database.db import get_session
from models.product_type import ProductType, ProductTypeBase, ProductTypeResponse, ProductTypeUpdate
from models.producer import Producer, ProducerResponse

router = APIRouter()

@router.get("/product-types", response_model=List[ProductTypeResponse])
async def get_product_types(session: Annotated[AsyncSession, Depends(get_session)]):
    statement = select(ProductType).options(selectinload(ProductType.producer_list))
    result = await session.execute(statement=statement)
    product_types = result.scalars().all()

    return product_types

@router.get("/product-types/{product_type_id}", response_model=ProductTypeResponse)
async def get_product_type_by_id(product_type_id: int, session: Annotated[AsyncSession, Depends(get_session)]):
    product_type = await session.get(
        ProductType, 
        product_type_id, 
        options=[selectinload(ProductType.producer_list)]
    )

    if not product_type:
        raise HTTPException(status_code=404, detail="Tipo de produto não encontrado ou cadastrado")

    return product_type

@router.get("/product-types/{product_type}/producers", response_model=list[ProducerResponse])
async def get_producers_by_type(product_type: str, session: Annotated[AsyncSession, Depends(get_session)]):
    if product_type.isdigit():
        statement = (
            select(Producer)
            .options(
                selectinload(Producer.products_list), 
                selectinload(Producer.product_type)
            )
            .where(Producer.product_type_id == int(product_type))
        )
    else:
        statement = (
            select(Producer)
            .options(
                selectinload(Producer.products_list),
                selectinload(Producer.product_type)
            )
            .join(Producer.product_type)
            .where(func.lower(ProductType.name) == product_type.replace("-", " ").lower())
        )
    
    result = await session.execute(statement)
    producers = result.scalars().all()
    
    return producers

@router.post("/product-types", response_model=ProductType)
async def post_product_type(data: ProductTypeBase, session: Annotated[AsyncSession, Depends(get_session)]) -> ProductType:
    product_type = ProductType.model_validate(data)

    session.add(product_type)
    await session.commit()
    await session.refresh(product_type)

    return product_type

@router.put("/product-types/{product_type_id}")
async def update_product_type(product_type_id: int, data: ProductTypeUpdate, session: Annotated[AsyncSession, Depends(get_session)]):
    product_type = await session.get(ProductType, product_type_id)

    if not product_type:
        raise HTTPException(status_code=404, detail="Tipo de produto não encontrado ou cadastrado")
    
    filtred_data = data.model_dump(exclude_unset=True)

    for key, value in filtred_data.items():
        setattr(product_type, key, value)

    session.add(product_type)
    await session.commit()
    await session.refresh(product_type)

    return product_type

@router.delete("/product-types/{product_type_id}", status_code=204)
async def delete_product_type(product_type_id: int, session: Annotated[AsyncSession, Depends(get_session)]):
    product_type = await session.get(ProductType, product_type_id)

    if not product_type:
        raise HTTPException(status_code=404, detail="Tipo de produto não encontrado ou cadastrado")
    
    await session.delete(product_type)
    await session.commit()
    
    return {"detail": "Tipo de produto deletado com sucesso"}