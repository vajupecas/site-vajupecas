from fastapi import APIRouter, Depends, HTTPException, Response
from typing import Annotated
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import Session, select
from models.admin import Admin, AdminLogin
from database.db import get_session
from utils.security import verify_password, create_access_token
from datetime import timedelta

router = APIRouter()

@router.post("/auth/login")
async def login(data: AdminLogin, response: Response, session: Annotated[AsyncSession, Depends(get_session)]):
    result = await session.execute(statement=select(Admin).where(Admin.email == data.email))
    user = result.scalars().first()
    if not user or not verify_password(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    token = create_access_token({"sub": str(user.id)}, timedelta(minutes=300))
    response.set_cookie(key="user_session", value=token, httponly=True, secure=True, samesite="none", path="/")
    return {"message": "Login bem-sucedido", "user_id": user.id}

@router.delete("/auth/logout")
async def logout():
    response = Response()
    response.delete_cookie(key="user_session")
    return {"message": "Logout realizado"}