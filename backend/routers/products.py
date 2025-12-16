from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated, List, Optional
from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import and_, func
from sqlalchemy.orm import selectinload
from database.db import get_session
from models.producer import Producer
from models.product import Product, ProductBase, ProductUpdate, ProductResponse
from models.model import Model
from models.product_type import ProductType
from routers.b2_service import delete_from_b2

router = APIRouter()

@router.get("/products", response_model=List[ProductResponse])
async def get_products(session: Annotated[AsyncSession, Depends(get_session)],model: Optional[str] = None, producer: Optional[str] = None, product_type: Optional[str] = None):
    statement = select(Product)
    if model:
        if model.isdigit():
            statement = statement.where(Product.model_id == int(model))
        else:
            statement = statement.join(Product.model).where(
                func.lower(Model.name) == model.replace("-", " ").lower()
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
        selectinload(Product.model),
        selectinload(Product.producer), selectinload(Product.product_type)
    ).order_by(Product.name)

    result = await session.execute(statement)
    products = result.scalars().all()

    return products

@router.get("/products/{product_id}", response_model=ProductResponse)
async def get_product_by_id(product_id: int, session: Annotated[AsyncSession, Depends(get_session)]):
    product = await session.get(Product, product_id, options=[selectinload(Product.producer), selectinload(Product.model), selectinload(Product.product_type)])

    if not product:
        raise HTTPException(status_code=404, detail="Produto não encontrado ou cadastrado")

    return product

@router.get("/products/slug/{product_slug}", response_model=ProductResponse)
async def get_product_by_slug(product_slug: str, session: Annotated[AsyncSession, Depends(get_session)],  model_slug: str | None = None):
    product_name = product_slug.replace("-", " ").lower()
    
    base_query = (
        select(Product)
        .options(
            selectinload(Product.producer),
            selectinload(Product.model),
            selectinload(Product.product_type),
        )
    )

    if model_slug:
        model_name = model_slug.replace("-", " ").lower()
        statement = (
            base_query
            .join(Product.model)
            .where(
                and_(
                    func.lower(Product.name) == product_name,
                    func.lower(Model.name) == model_name,
                )
            )
        )
    else:
        statement = base_query.where(func.lower(Product.name) == product_name)

    result = await session.execute(statement)
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
async def update_product(product_id: int, data: ProductUpdate, session: Annotated[AsyncSession, Depends(get_session)]):
    product = await session.get(Product, product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Produto não encontrado ou cadastrado")
    
    filtered_data = data.model_dump(exclude_unset=True)

    if "url_image" in filtered_data:
        old_key = product.url_image.split("/")[-1]
        delete_from_b2(old_key)

    for key, value in filtered_data.items():
        setattr(product, key, value)

    session.add(product)
    await session.commit()
    await session.refresh(product)

    return product

@router.delete("/products/{product_id}", status_code=204)
async def delete_product(product_id: int, session: Annotated[AsyncSession, Depends(get_session)]):
    product = await session.get(Product, product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Produto não encontrado ou cadastrado")
    
    old_key = product.url_image.split("/")[-1]
    delete_from_b2(old_key)

    await session.delete(product)
    await session.commit()

    return {"detail": "Produto deletado com sucesso"}