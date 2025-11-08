from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated, List
from sqlmodel import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from database.db import get_session
from models.product_model import ProductModel, ProductModelBase, ProductModelResponse, ProductModelUpdate

router = APIRouter()

@router.get("/product-models", response_model=List[ProductModelResponse])
async def get_product_models(session: Annotated[AsyncSession, Depends(get_session)]):
    statement = (
        select(ProductModel).options(selectinload(ProductModel.products_list), selectinload(ProductModel.product_type))
    )
    result = await session.execute(statement=statement)
    product_models = result.scalars().all()

    return product_models

@router.get("/product-models/{product_model_id}", response_model=ProductModelResponse)
async def get_product_model_by_id(product_model_id: int, session: Annotated[AsyncSession, Depends(get_session)]):
    statement = (
        select(ProductModel)
        .options(
            selectinload(ProductModel.product_type),
            selectinload(ProductModel.products_list)
        )
        .where(ProductModel.id == product_model_id)
        )
    
    result = await session.execute(statement=statement)
    product_model = result.scalars().first()

    if not product_model:
        raise HTTPException(status_code=404, detail="Fabricante não encontrado ou cadastrado")

    return product_model

@router.post("/product-models", response_model=ProductModelBase)
async def post_product_model(data: ProductModelBase, session: Annotated[AsyncSession, Depends(get_session)]) -> ProductModel:
    product_model = ProductModel.model_validate(data)

    session.add(product_model)
    await session.commit()
    await session.refresh(product_model)

    return product_model

@router.put("/product-models/{product_model_id}", response_model=ProductModelResponse)
async def update_product_model(product_model_id: int, data: ProductModelUpdate, session: Annotated[AsyncSession, Depends(get_session)]):
    product_model = await session.get(ProductModel, product_model_id)

    if not product_model:
        raise HTTPException(status_code=404, detail="Fabricante não encontrado ou cadastrado")
    
    filtred_data = data.model_dump(exclude_unset=True)
    for key, value in filtred_data.items():
        setattr(product_model, key, value)

    session.add(product_model)
    await session.commit()
    await session.refresh(product_model)

    return product_model

@router.delete("/product-models/{product_model_id}", status_code=204)
async def delete_product_model(product_model_id: int, session: Annotated[AsyncSession, Depends(get_session)]):
    product_model = await session.get(ProductModel, product_model_id)

    if not product_model:
        raise HTTPException(status_code=404, detail="Fabricante não encontrado ou cadastrado")
    
    await session.delete(product_model)
    await session.commit()

    return {"detail": "Fabricante deletado com sucesso"}