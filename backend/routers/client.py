from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from typing import Annotated, List
from sqlmodel import select
from sqlalchemy.ext.asyncio import AsyncSession
from database.db import get_session
from models.client import Client, ClientBase
from utils.email import send_email

router = APIRouter()

@router.get("/clients", response_model=List[Client])
async def get_clients(session: Annotated[AsyncSession, Depends(get_session)]):
    statement = (
        select(Client)
    )
    result = await session.execute(statement=statement)
    clients = result.scalars().all()

    return clients

@router.post("/clients", response_model=Client)
async def post_client(data: ClientBase, session: Annotated[AsyncSession, Depends(get_session)], background_tasks: BackgroundTasks):
    client = Client.model_validate(data)

    subject = "Contato VajuPeças"
    body_plain = f"""Obrigado por entrar em Contato!

Um formulário de contato foi enviado com os dados abaixo.

Nome: {client.name}
E-mail: {client.email}
Telefone: {client.number}

Este e-mail foi enviado automaticamente pelo formulário de contato da VajuPeças.
"""
    
    body_html = f"""
<html lang="pt-BR">
  <head>
    <style>
      body {{ background-color: #f4f4f5; margin: 0; padding: 0; -webkit-text-size-adjust: 100%; }}
      img {{ border: 0; outline: none; text-decoration: none; display: block; }}
      a {{ color: inherit; text-decoration: none; }}
      .wrapper {{ width: 100%; table-layout: fixed; background-color: #f4f4f5; padding: 20px 0; }}
      .main {{ background: #ffffff; margin: 0 auto; width: 100%; max-width: 600px; border-radius: 8px; overflow: hidden; }}
      .container {{ padding: 24px; }}
      .btn {{ display: inline-block; padding: 12px 20px; border-radius: 6px; font-weight: 600; }}
      @media screen and (max-width: 480px) {{
        .container {{ padding: 16px; }}
      }}
    </style>
  </head>
  <body>
    <center class="wrapper">
      <table class="main" width="600" cellpadding="0" cellspacing="0" role="presentation">
        <!-- Header -->
        <tr>
          <td style="background:#ff8904; padding:18px 24px; text-align:left;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="vertical-align:middle;">
                  <!-- Logo: substituir src pelo caminho do logo -->
                  <img src="https://i.ibb.co/bRjNkkxs/foto-logo-vajupecas.png" alt="VajuPeças" width="150" style="display:block;">
                </td>
                <td style="text-align:right; color:#ffffff; font-family:Helvetica, Arial, sans-serif; font-size:20px;">
                  <div style="font-weight:700">VajuPeças</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td class="container" style="background:#ffffff; font-family:Helvetica, Arial, sans-serif; color:#333333; font-size:15px; line-height:1.5;">
            <h2 style="margin:0 0 12px 0; font-size:20px; color:#ff8904;">Obrigado por entrar em Contato!</h2>

            <p style="margin:0 0 12px 0;">Um formulário de contato foi enviado com os dados abaixo.</p>

            <!-- Informações do remetente -->
            <table width="100%" cellpadding="6" cellspacing="0" role="presentation" style="border-collapse:collapse; margin:12px 0 18px 0;">
              <tr>
                <td style="background:#f7f9fc; font-weight:700; width:120px;">Nome</td>
                <td style="background:#f7f9fc;">{client.name}</td>
              </tr>
              <tr>
                <td style="font-weight:700; width:120px;">E-mail</td>
                <td>{client.email}</td>
              </tr>
              <tr>
                <td style="font-weight:700; width:120px;">Telefone</td>
                <td>{client.number}</td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:18px 24px; background:#fafafa; font-family:Helvetica, Arial, sans-serif; font-size:13px; color:#666666; text-align:center;">
            <div style="max-width:520px; margin:0 auto;">
              <p style="margin:0 0 8px 0;">VajuPeças • Rua Treze de Maio, 50 • Barreiros • São José - SC</p>
              <p style="margin:0 0 12px 0;">Tel: (048) 99206-7057 • valdecir@vajupecas.com.br</p>

              <!-- redes sociais -->
              <p style="margin:6px 0 12px 0;">
                <a href="https://www.facebook.com/p/Vaju-Pe%C3%A7as-de-Bombas-e-Betoneiras-100037942788609/" style="margin:0 6px;">Facebook</a> •
                <a href="https://www.instagram.com/vaju_pecas/" style="margin:0 6px;">Instagram</a> •
                <a href="https://api.whatsapp.com/send?phone=5548992067057" style="margin:0 6px;">WhatsApp</a>
              </p>

              <p style="margin:0; color:#999999; font-size:12px;">Este e-mail foi enviado automaticamente pelo formulário de contato da VajuPeças.</p>
            </div>
          </td>
        </tr>
      </table>

      <!-- Espaço extra -->
      <div style="height:12px; line-height:12px; font-size:12px;">&nbsp;</div>
    </center>
  </body>
</html>
"""

    try:
        session.add(client)
        await session.commit()
        await session.refresh(client)
    except Exception as e:
        await session.rollback()
        raise HTTPException(status_code=500, detail=f"Erro ao salvar cliente: {str(e)}")
    
    background_tasks.add_task(
        send_email, 
        client.email, 
        subject, 
        body_html, 
        body_plain
    )

    return client

@router.delete("/clients/{client_id}", status_code=204)
async def delete_client(client_id: int, session: Annotated[AsyncSession, Depends(get_session)]):
    client = await session.get(Client, client_id)

    if not client:
        raise HTTPException(status_code=404, detail="Cliente não encontrado ou cadastrado")
    
    await session.delete(client)
    await session.commit()

    return {"detail": "Cliente deletado com sucesso"}