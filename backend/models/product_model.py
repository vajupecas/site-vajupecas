from typing import TYPE_CHECKING, List, Optional
from sqlmodel import Relationship, SQLModel, Field
from pydantic import BaseModel, ConfigDict
from models.product import ProductSummary
from models.product_type import ProductTypeSummary

if TYPE_CHECKING:
    from models.product import Product
    from models.product_type import ProductType

class ProductModelBase(SQLModel):
    name: str
    product_type_id: Optional[int] = Field(default=None, foreign_key="producttype.id")

class ProductModel(ProductModelBase, table=True):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(default=None, primary_key=True)
    product_type: Optional["ProductType"] = Relationship(back_populates="product_model_list")
    products_list: List["Product"] = Relationship(back_populates="product_model", sa_relationship_kwargs={"cascade": "all, delete-orphan"})

class ProductModelResponse(ProductModelBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    product_type: Optional[ProductTypeSummary] = None
    products_list: List[ProductSummary] = []

class ProductModelSummary(ProductModelBase):
    model_config = ConfigDict(from_attributes=True)
    id: int

class ProductModelUpdate(BaseModel):
    name: Optional[str] = None
    product_type_id: Optional[int] = None