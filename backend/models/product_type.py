from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List, TYPE_CHECKING
from pydantic import BaseModel, ConfigDict

if TYPE_CHECKING:
    from models.producer import Producer, ProducerSummary
    from models.product import Product, ProductSummary

class ProductTypeBase(SQLModel):
    name: str
    url_image: str
    has_producer: bool

class ProductType(ProductTypeBase, table=True):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(default=None, primary_key=True)
    order_idx: Optional[int] = Field(default=None, index=True)
    product_list: List["Product"] = Relationship(back_populates="product_type", sa_relationship_kwargs={"cascade": "all, delete-orphan"})
    producer_list: List["Producer"] = Relationship(back_populates="product_type", sa_relationship_kwargs={"cascade": "all, delete-orphan"})

class ProductTypeSummary(ProductTypeBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    order_idx: Optional[int] = Field(default=None, index=True)

class ProductTypeResponse(ProductTypeBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    product_list: List["ProductSummary"] = []
    producer_list: List["ProducerSummary"] = []
    order_idx: Optional[int] = Field(default=None, index=True)

class ProductTypeUpdate(BaseModel):
    name: Optional[str] = None
    url_image: Optional[str] = None
    has_producer: Optional[bool] = None
