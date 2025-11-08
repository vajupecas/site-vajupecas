from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List, TYPE_CHECKING
from pydantic import BaseModel, ConfigDict

if TYPE_CHECKING:
    from models.producer import Producer, ProducerSummary
    from models.product_model import ProductModel, ProductModelSummary
    from models.product import Product, ProductSummary

class ProductTypeBase(SQLModel):
    name: str
    has_producer: bool
    has_product_model: bool

class ProductType(ProductTypeBase, table=True):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(default=None, primary_key=True)
    product_list: List["Product"] = Relationship(back_populates="product_type", sa_relationship_kwargs={"cascade": "all, delete-orphan"})
    producer_list: List["Producer"] = Relationship(back_populates="product_type", sa_relationship_kwargs={"cascade": "all, delete-orphan"})
    product_model_list: List["ProductModel"] = Relationship(back_populates="product_type", sa_relationship_kwargs={"cascade": "all, delete-orphan"})

class ProductTypeSummary(ProductTypeBase):
    model_config = ConfigDict(from_attributes=True)
    id: int

class ProductTypeResponse(ProductTypeBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    product_list: List["ProductSummary"] = []
    producer_list: List["ProducerSummary"] = []
    product_model_list: List["ProductModelSummary"] = []

class ProductTypeUpdate(BaseModel):
    name: Optional[str] = None
    has_producer: Optional[bool] = None
    has_product_model: Optional[bool] = None
