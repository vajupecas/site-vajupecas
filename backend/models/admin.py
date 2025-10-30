from datetime import datetime
from pydantic import BaseModel, EmailStr 
from sqlmodel import SQLModel, Field

class Admin(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    email: EmailStr
    hashed_password: str
    reset_code: str | None = None
    reset_expires_at: datetime | None = None

class AdminCreate(BaseModel):
    email: EmailStr
    password: str

class AdminLogin(BaseModel):
    email: EmailStr
    password: str

class AdminRead(BaseModel):
    id: int
    email: EmailStr

class AdminPasswordRequest(BaseModel):
    id: int

class AdminVerifyCode(BaseModel):
    id: int
    code: str

class AdminNewPassword(BaseModel):
    id: int
    new_password: str