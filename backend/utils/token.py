from fastapi import HTTPException, Cookie
from fastapi.security import OAuth2PasswordBearer
from .security import decode_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

async def verify_token(user_session: str = Cookie(None)):
    try:
        payload = decode_access_token(user_session)
        user_id: int = payload.get('sub')
        if user_id is None:
            raise HTTPException(status_code=401, detail="Token Inválido")
        return user_id
    except:
        raise HTTPException(status_code=401, detail="Token Inválido ou Expirado")