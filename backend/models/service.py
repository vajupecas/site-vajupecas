from sqlmodel import SQLModel, Field
from sqlalchemy import Column, Text as SQLAlchemyText
from pydantic import BaseModel
from typing import Optional

class ServiceBase(SQLModel):
    name: str
    description: str = Field(sa_column=Column(SQLAlchemyText))
    url_image: str

class Service(ServiceBase, table=True):
    id: int = Field(default=None, primary_key=True)

class ServiceUpdate(BaseModel):
    name: Optional[str] | None = None
    description: Optional[str]  | None = None
    url_image: Optional[str]  | None = None