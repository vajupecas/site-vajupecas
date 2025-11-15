from fastapi import APIRouter, Depends, HTTPException, Request
from typing import Annotated, List
from pydantic import BaseModel
from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func
from sqlalchemy.orm import selectinload
from database.db import get_session
from models.product_type import ProductType, ProductTypeBase, ProductTypeResponse, ProductTypeUpdate
from models.producer import Producer, ProducerResponse
from routers.b2_service import delete_from_b2

router = APIRouter()

class ReorderRequest(BaseModel):
    ordered_ids: List[int]

@router.get("/product-types", response_model=List[ProductTypeResponse])
async def get_product_types(session: Annotated[AsyncSession, Depends(get_session)]):
    statement = select(ProductType).options(selectinload(ProductType.producer_list), selectinload(ProductType.product_list)).order_by(ProductType.order_idx)
    result = await session.execute(statement=statement)
    product_types = result.scalars().all()

    return product_types

@router.get("/product-types/{product_type_id}", response_model=ProductTypeResponse)
async def get_product_type_by_id(product_type_id: int, session: Annotated[AsyncSession, Depends(get_session)]):
    product_type = await session.get(
        ProductType, 
        product_type_id, 
        options=[selectinload(ProductType.producer_list), selectinload(ProductType.product_list)]
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
                selectinload(Producer.product_type),
                selectinload(Producer.models_list)
            )
            .where(Producer.product_type_id == int(product_type))
        )
    else:
        statement = (
            select(Producer)
            .options(
                selectinload(Producer.products_list),
                selectinload(Producer.product_type),
                selectinload(Producer.models_list)
            )
            .join(Producer.product_type)
            .where(func.lower(ProductType.name) == product_type.replace("-", " ").lower())
        )
    
    result = await session.execute(statement)
    producers = result.scalars().all()
    
    return producers

@router.post("/product-types", response_model=ProductType)
async def post_product_type(data: ProductTypeBase, session: Annotated[AsyncSession, Depends(get_session)]) -> ProductType:
    max_index_statement = select(func.max(ProductType.order_idx))
    max_index_result = await session.execute(max_index_statement)
    max_index = max_index_result.scalar_one_or_none()

    new_index = (max_index + 1) if max_index is not None else 1

    product_type_data = data.model_dump()
    product_type_data["order_idx"] = new_index

    product_type = ProductType(**product_type_data)

    session.add(product_type)
    await session.commit()
    await session.refresh(product_type)

    return product_type

@router.post("/product-types/reorder", status_code=200)
async def reorder_product_types(
    data: ReorderRequest, 
    session: Annotated[AsyncSession, Depends(get_session)]
):
    ordered_ids = data.ordered_ids
    
    statement = select(ProductType).where(ProductType.id.in_(ordered_ids))
    result = await session.execute(statement)
    product_types = result.scalars().all()
    
    product_type_map = {pt.id: pt for pt in product_types}
    
    for index, product_id in enumerate(ordered_ids):
        if product_id in product_type_map:
            product_type = product_type_map[product_id]
            old_value = product_type.order_idx
            new_value = index + 1
            print(f"Alterando ID {product_id}: de order_idx={old_value} para {new_value}")
            
            product_type.order_idx = new_value
    
    print("Tentando commitar mudanças...")
    await session.commit()
    print("Commit realizado com sucesso.")
    return {"detail": "Ordem atualizada com sucesso"}

@router.put("/product-types/{product_type_id}")
async def update_product_type(product_type_id: int, data: ProductTypeUpdate, session: Annotated[AsyncSession, Depends(get_session)]):
    product_type = await session.get(ProductType, product_type_id)

    if not product_type:
        raise HTTPException(status_code=404, detail="Tipo de produto não encontrado ou cadastrado")
    
    filtered_data = data.model_dump(exclude_unset=True)

    if "url_image" in filtered_data:
        old_key = product_type.url_image.split("/")[-1]
        delete_from_b2(old_key)

    for key, value in filtered_data.items():
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
    
    old_key = product_type.url_image.split("/")[-1]
    delete_from_b2(old_key)

    await session.delete(product_type)
    await session.commit()
    
    return {"detail": "Tipo de produto deletado com sucesso"}