from sqlmodel import SQLModel, Field, Relationship
from pydantic import BaseModel, ConfigDict
from typing import Optional, TYPE_CHECKING

if TYPE_CHECKING:
    from models.producer import Producer, ProducerSummary

class ProductBase(SQLModel):
    name: str
    description: str
    url_image: str
    producer_id: Optional[int] = Field(default=None, foreign_key="producer.id")

class Product(ProductBase, table=True):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(default=None, primary_key=True)
    producer: Optional["Producer"] = Relationship(back_populates="products_list")

class ProductResponse(ProductBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    producer: Optional["ProducerSummary"] = None

class ProductSummary(ProductBase):
    model_config = ConfigDict(from_attributes=True)
    id: int

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    url_image: Optional[str] = None
    producer_id: Optional[int] = None
