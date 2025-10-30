from fastapi import APIRouter, Depends, HTTPException, Request
from typing import Annotated, List, Optional
from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func
from sqlalchemy.orm import selectinload
from database.db import get_session
from models.producer import Producer
from models.product import Product, ProductBase, ProductUpdate, ProductResponse
import os
from routers.media import deleteFile

router = APIRouter()

@router.get("/products", response_model=List[ProductResponse])
async def get_products(session: Annotated[AsyncSession, Depends(get_session)], producer: Optional[str] = None):
    if producer:
        if producer.isdigit():
            statement = (
                select(Product)
                .options(selectinload(Product.producer))
                .where(Product.producer_id == int(producer))
            )
        else:
            statement = (
                select(Product)
                .join(Product.producer)
                .options(selectinload(Product.producer))
                .where(func.lower(Producer.name) == producer.replace("-", " ").lower())
            )
    else:
        statement = select(Product).options(selectinload(Product.producer))
    
    result = await session.execute(statement=statement)
    products = result.scalars().all()

    return products

@router.get("/products/{product_id}", response_model=ProductResponse)
async def get_product_by_id(product_id: int, session: Annotated[AsyncSession, Depends(get_session)]):
    product = await session.get(Product, product_id, options=[selectinload(Product.producer)])

    if not product:
        raise HTTPException(status_code=404, detail="Produto não encontrado ou cadastrado")

    return product

@router.get("/products/slug/{product_slug}", response_model=ProductResponse)
async def get_product_by_slug(product_slug: str, session: Annotated[AsyncSession, Depends(get_session)]):
    statement = select(Product).options(selectinload(Product.producer)).where(
        func.lower(Product.name) == product_slug.replace("-", " ").lower()
    )

    result = await session.execute(statement=statement)
    product = result.scalars().first()

    if not product:
        raise HTTPException(status_code=404, detail="Produto não encontrado ou cadastrado")

    return product

@router.post("/products", response_model=ProductResponse)
async def post_product(data: ProductBase, session: Annotated[AsyncSession, Depends(get_session)]) -> Product:

    product = Product.model_validate(data)

    session.add(product)
    await session.commit()
    await session.refresh(product)

    return product

@router.put("/products/{product_id}")
async def update_product(request: Request, product_id: int, data: ProductUpdate, session: Annotated[AsyncSession, Depends(get_session)]):
    product = await session.get(Product, product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Produto não encontrado ou cadastrado")
    
    filtered_data = data.model_dump(exclude_unset=True)

    if "url_image" in filtered_data.keys():
        await deleteFile(request, product.url_image)

    for key, value in filtered_data.items():
        setattr(product, key, value)

    session.add(product)
    await session.commit()
    await session.refresh(product)

    return product

@router.delete("/products/{product_id}", status_code=204)
async def delete_product(request: Request, product_id: int, session: Annotated[AsyncSession, Depends(get_session)]):
    product = await session.get(Product, product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Produto não encontrado ou cadastrado")
    
    if product.url_image:
        await deleteFile(request, product.url_image)

    await session.delete(product)
    await session.commit()

    return {"detail": "Produto deletado com sucesso"}