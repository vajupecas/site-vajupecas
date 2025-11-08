from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Annotated
from pydantic import EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from random import randint
import secrets
from database.db import get_session
from models.admin import Admin, AdminNewPassword, AdminPasswordRequest, AdminVerifyCode
from utils.token import verify_token
from utils.security import hash_password_code, hash_password, verify_password_code
from utils.email import send_email

router = APIRouter()

async def create_password_reset(session: AsyncSession, admin: Admin, expire_minutes: int = 15) -> str:
    code = secrets.token_urlsafe(6)
    
    code_hash = hash_password_code(code)
    expires_at = datetime.now(timezone.utc) + timedelta(minutes=expire_minutes)
    
    admin.reset_code = code_hash
    admin.reset_expires_at = expires_at.replace(tzinfo=None)

    session.add(admin)
    await session.commit()
    await session.refresh(admin)
    
    return code


async def verify_password_reset(session: AsyncSession, admin: Admin, code: str) -> bool:
    if (
        admin.reset_code 
        and admin.reset_expires_at 
        and verify_password_code(code, admin.reset_code)
        and admin.reset_expires_at > datetime.now(timezone.utc).replace(tzinfo=None)
    ):
        admin.reset_code = None
        admin.reset_expires_at = None
        await session.commit()
        return True

    raise HTTPException(status_code=401, detail="Senha incorreta")

@router.get("/admin/me")
async def get_current_admin(admin_id: Annotated[int, Depends(verify_token)]):
    return admin_id

@router.get("/admin/email")
async def get_admin_by_email(admin_email: Annotated[str, Query(...)], session: Annotated[AsyncSession, Depends(get_session)]):
    statement = select(Admin).where(Admin.email == admin_email)

    result = await session.execute(statement)
    admin = result.scalars().first()

    if not admin:
        raise HTTPException(status_code=404, detail="Email incorreto")
    
    return {"id": admin.id}

@router.put("/admin/change-password-code")
async def admin_change_password_code(data: AdminPasswordRequest, session: Annotated[AsyncSession, Depends(get_session)]):
    admin = await session.get(Admin, data.id)

    if not admin:
        raise HTTPException(status_code=404, detail="Email incorreto")

    change_password_code = await create_password_reset(session=session, admin=admin)

    subject = "Pedido de Troca de Senha"
    body_plain = f"""Recebemos um pedido de troca de senha para sua conta.

Seu código para efetuar a troca de senha: {change_password_code}

Se não foi você que fez esse pedido, entre em contato com o suporte imediatamente."""
    
    body_html = f"""
<html>
  <body style="font-family: Arial, sans-serif;">
    <div style="display: flex; font-family: Arial, sans-serif; aling-items: center; justify-content: center; color: #333; padding: 50px; background-color: #f9f9f9; height: 500px;">
        <div style="padding: 20px 20px; border-radius: 20px; background-color: white; height: 450px; width: 450px;">
            <h3 style="font-weight: bold; font-size: 28px; color: #ffa500">{change_password_code}</h3>
            <hr>
            <p style="font-size: 18px; font-weight: bold;">Esse c&oacute;digo é válido por 15 minutos.</p>
            <p style="font-size: 18px;">Você está recebendo isto porquê você (ou alguém) requisitou a troca da senha de sua conta.</p>
            <p style="font-size: 15px;">Se n&atilde;o foi voc&ecirc; que fez esse pedido, por favor ignore esse email e sua senha ira permanecer inalterada.</p>
        </div>
    </div>
  </body>
</html>
"""

    try:
        send_email(admin.email, subject, body_html, body_plain)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao enviar email: {str(e)}")

    return {"message": "Email enviado com sucesso!"}

@router.put("/admin/verify-change-password")
async def admin_verify_change_password_code(data: AdminVerifyCode, session: Annotated[AsyncSession, Depends(get_session)]):
    admin = await session.get(Admin, data.id)

    verification = await verify_password_reset(session=session, admin=admin, code=data.code)

    return verification

@router.put("/admin/change-password")
async def admin_change_password(data: AdminNewPassword, session: Annotated[ AsyncSession,Depends(get_session)]):
    admin = await session.get(Admin, data.id)

    admin.hashed_password = hash_password(data.new_password)
    admin.reset_code = None
    admin.reset_expires_at = None
    session.add(admin)
    await session.commit()

    return {"message": "Senha alterada com sucesso!"}