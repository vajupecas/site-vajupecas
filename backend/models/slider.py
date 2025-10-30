from typing import Optional
from sqlmodel import SQLModel, Field
from pydantic import BaseModel

class SliderImageBase(SQLModel):
    name: str
    url_image: str

class SliderImage(SliderImageBase, table=True):
    id: int = Field(default=None, primary_key=True)

class SliderImageUpdate(BaseModel):
    name: Optional[str] | None = None
    url_image: Optional[str] | None = None
