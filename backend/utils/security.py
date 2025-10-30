from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError, InvalidHash
import secrets
import string
from datetime import datetime, timedelta, timezone
import jwt
from pydantic_settings import BaseSettings
from utils.settings import Settings

settings = Settings()
ph = PasswordHasher()

def hash_password(password: str) -> str:
    return ph.hash(password)

def verify_password(password: str, hashed: str) -> bool:
    try:
        return ph.verify(hashed, password)
    except (VerifyMismatchError, InvalidHash):
        return False

def hash_password_code(code: str) -> str:
    return ph.hash(code)

def verify_password_code(code: str, hashed: str) -> bool:
    try:
        return ph.verify(hashed, code)
    except (VerifyMismatchError, InvalidHash):
        return False

def password_generator(safe=True, size=12):
    characters = string.ascii_letters + string.digits
    if safe:
        characters += string.punctuation

    return ''.join(secrets.choice(characters) for _ in range(size))

def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expires = datetime.now(timezone.utc) + expires_delta
    to_encode.update({'exp': expires})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

def decode_access_token(token: str):
    return jwt.decode(token, settings.SECRET_KEY, algorithms=settings.ALGORITHM)