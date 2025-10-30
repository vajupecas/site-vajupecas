from sqlmodel import SQLModel, Field
from sqlalchemy import Column, Text as SQLAlchemyText
from pydantic import BaseModel
from typing import Optional

class TextBase(SQLModel):
    name: str
    content: str = Field(sa_column=Column(SQLAlchemyText))
    page: str

class Text(TextBase, table=True):
    id: int = Field(default=None, primary_key=True)

class TextUpdate(BaseModel):
    name: Optional[str] | None = None
    content: Optional[str]  | None = None
    page: Optional[str]  | None = None