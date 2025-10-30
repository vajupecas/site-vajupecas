from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated
from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from database.db import get_session
from models.text import Text, TextBase, TextUpdate

router = APIRouter()

@router.get("/texts", response_model=list[Text])
async def get_texts(session: Annotated[AsyncSession, Depends(get_session)]):
    statement = select(Text)
    result = await session.execute(statement=statement)
    texts = result.scalars().all()

    return texts

@router.get("/texts/{page}", response_model=list[Text])
async def get_texts_by_page(page: str, session: Annotated[AsyncSession, Depends(get_session)]):
    statement = select(Text).where(Text.page == page)
    result = await session.execute(statement=statement)
    texts = result.scalars().all()

    return texts

@router.get("/texts/{text_id}", response_model=Text)
async def get_text_by_id(text_id: int, session: Annotated[AsyncSession, Depends(get_session)]):
    text = await session.get(Text, text_id)

    if not text:
        raise HTTPException(status_code=404, detail="Nenhum texto com esse ID foi cadastrado")
    
    return text

@router.get("/texts/{name}", response_model=Text)
async def get_text_by_name(name: str, session: Annotated[AsyncSession, Depends(get_session)]):
    statement = select(Text).where(Text.name == name)
    result = await session.execute(statement=statement)
    text = result.scalars().all()

    if not text:
        raise HTTPException(status_code=404, detail="Nenhum texto com esse nome foi cadastrado")
    
    return text

@router.post("/texts", response_model=Text)
async def post_text(data: TextBase, session: Annotated[AsyncSession, Depends(get_session)]):
    text = Text.model_validate(data)

    session.add(text)
    await session.commit()
    await session.refresh(text)

    return text

@router.put("/texts/{text_id}", response_model=Text)
async def update_text(text_id: int, data: TextUpdate, session: Annotated[AsyncSession, Depends(get_session)]):
    text = await session.get(Text, text_id)

    if not text:
        raise HTTPException(status_code=404, detail="Nenhum texto com esse ID foi cadastrado")
    
    filtered_data = data.model_dump(exclude_unset=True)

    for key, value in filtered_data.items():
        setattr(text, key, value)
    
    session.add(text)
    await session.commit()
    await session.refresh(text)

    return text

@router.delete("/texts/{text_id}", status_code=204)
async def delete_text(text_id: int, session: Annotated[AsyncSession, Depends(get_session)]):
    text = session.get(Text, text_id)

    if not text:
        raise HTTPException(status_code=404, detail="Texto não encontrado ou cadastrado")
    
    await session.delete(text)
    await session.commit()

    return {"detail": "Texto deletado com sucesso"}