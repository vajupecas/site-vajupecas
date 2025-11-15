from fastapi import APIRouter, Depends, HTTPException, Request
from typing import Annotated
from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from database.db import get_session
from models.service import Service, ServiceBase, ServiceUpdate
from routers.b2_service import delete_from_b2

router = APIRouter()

@router.get("/services", response_model=list[Service])
async def get_services(session: Annotated[AsyncSession, Depends(get_session)]):
    statement = select(Service).order_by(Service.name)
    result = await session.execute(statement=statement)
    services = result.scalars().all()

    return services

@router.get("/services/{page}", response_model=list[Service])
async def get_services_by_page(page: str, session: Annotated[AsyncSession, Depends(get_session)]):
    statement = select(Service).where(Service.page == page).order_by(Service.name)
    result = await session.execute(statement=statement)
    services = result.scalars().all()

    return services

@router.get("/services/{service_id}", response_model=Service)
async def get_service_by_id(service_id: int, session: Annotated[AsyncSession, Depends(get_session)]):
    service = await session.get(Service, service_id)

    if not service:
        raise HTTPException(status_code=404, detail="Nenhum serviço com esse ID foi cadastrado")
    
    return service

@router.get("/services/{name}", response_model=Service)
async def get_service_by_name(name: str, session: Annotated[AsyncSession, Depends(get_session)]):
    statement = select(Service).where(Service.name == name)
    result = await session.execute(statement=statement)
    service = result.scalars().all()

    if not service:
        raise HTTPException(status_code=404, detail="Nenhum serviço com esse nome foi cadastrado")
    
    return service

@router.post("/services", response_model=Service)
async def post_service(data: ServiceBase, session: Annotated[AsyncSession, Depends(get_session)]):
    service = Service.model_validate(data)

    session.add(service)
    await session.commit()
    await session.refresh(service)

    return service

@router.put("/services/{service_id}", response_model=Service)
async def update_service(service_id: int, data: ServiceUpdate, session: Annotated[AsyncSession, Depends(get_session)]):
    service = await session.get(Service, service_id)

    if not service:
        raise HTTPException(status_code=404, detail="Nenhum serviço com esse ID foi cadastrado")
    
    filtered_data = data.model_dump(exclude_unset=True)

    if "url_image" in filtered_data:
        old_key = service.url_image.split("/")[-1]
        delete_from_b2(old_key)

    for key, value in filtered_data.items():
        setattr(service, key, value)
    
    session.add(service)
    await session.commit()
    await session.refresh(service)

    return service

@router.delete("/services/{service_id}", status_code=204)
async def delete_service(service_id: int, session: Annotated[AsyncSession, Depends(get_session)]):
    service = session.get(Service, service_id)

    if not service:
        raise HTTPException(status_code=404, detail="Serviço não encontrado ou cadastrado")
    
    old_key = service.url_image.split("/")[-1]
    delete_from_b2(old_key)
    
    await session.delete(service)
    await session.commit()

    return {"detail": "Serviço deletado com sucesso"}