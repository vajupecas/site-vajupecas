from fastapi import APIRouter, Depends, HTTPException, Request
from typing import Annotated, List, Optional
from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func
from sqlalchemy.orm import selectinload
from database.db import get_session
from models.producer import Producer
from models.product import Product, ProductBase, ProductUpdate, ProductResponse
from models.product_model import ProductModel
from models.product_type import ProductType
from routers.media import deleteFile

router = APIRouter()

@router.get("/products", response_model=List[ProductResponse])
async def get_products(session: Annotated[AsyncSession, Depends(get_session)],product_model: Optional[str] = None, producer: Optional[str] = None, product_type: Optional[str] = None):
    statement = select(Product)
    if product_model:
        if product_model.isdigit():
            statement = statement.where(Product.product_model_id == int(product_model))
        else:
            statement = statement.join(Product.product_model).where(
                func.lower(ProductModel.name) == product_model.replace("-", " ").lower()
            )

    if producer:
        if producer.isdigit():
            statement = statement.where(Product.producer_id == int(producer))
        else:
            statement = statement.join(Product.producer).where(
                func.lower(Producer.name) == producer.replace("-", " ").lower()
            )
    
    if product_type:
        if product_type.isdigit():
            statement = statement.where(Product.product_type_id == int(product_type))
        else:
            statement = statement.join(Product.product_type).where(
                func.lower(ProductType.name) == product_type.replace("-", " ").lower()
            )

    statement = statement.options(
        selectinload(Product.product_model),
        selectinload(Product.producer), selectinload(Product.product_type)
    )

    result = await session.execute(statement)
    products = result.scalars().all()

    return products

@router.get("/products/{product_id}", response_model=ProductResponse)
async def get_product_by_id(product_id: int, session: Annotated[AsyncSession, Depends(get_session)]):
    product = await session.get(Product, product_id, options=[selectinload(Product.producer), selectinload(Product.product_model), selectinload(Product.product_type)])

    if not product:
        raise HTTPException(status_code=404, detail="Produto não encontrado ou cadastrado")

    return product

@router.get("/products/slug/{product_slug}", response_model=ProductResponse)
async def get_product_by_slug(product_slug: str, session: Annotated[AsyncSession, Depends(get_session)]):
    statement = select(Product).options(selectinload(Product.producer), selectinload(Product.product_model), selectinload(Product.product_type)).where(
        func.lower(Product.name) == product_slug.replace("-", " ").lower()
    )

    result = await session.execute(statement=statement)
    product = result.scalars().first()

    if not product:
        raise HTTPException(status_code=404, detail="Produto não encontrado ou cadastrado")

    return product

@router.post("/products", response_model=ProductBase)
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