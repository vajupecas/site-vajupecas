from sqlmodel import SQLModel, Field, Relationship
from pydantic import BaseModel, ConfigDict
from typing import Optional, TYPE_CHECKING


if TYPE_CHECKING:
    from models.product_type import ProductType,ProductTypeSummary
    from models.producer import Producer, ProducerSummary
    from models.product_model import ProductModel, ProductModelSummary

class ProductBase(SQLModel):
    name: str
    description: str
    url_image: str
    product_type_id: Optional[int] = Field(default=None, foreign_key="producttype.id")
    product_model_id: Optional[int] = Field(default=None, foreign_key="productmodel.id")
    producer_id: Optional[int] = Field(default=None, foreign_key="producer.id")

class Product(ProductBase, table=True):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(default=None, primary_key=True)
    product_type: Optional["ProductType"] = Relationship(back_populates="product_list")
    producer: Optional["Producer"] = Relationship(back_populates="products_list")
    product_model: Optional["ProductModel"] = Relationship(back_populates="products_list")

class ProductResponse(ProductBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    product_type: Optional["ProductTypeSummary"] = None
    producer: Optional["ProducerSummary"] = None
    product_model: Optional["ProductModelSummary"] = None

class ProductSummary(ProductBase):
    model_config = ConfigDict(from_attributes=True)
    id: int

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    url_image: Optional[str] = None
    product_type_id: Optional[int] = None
    product_model_id: Optional[int] = None
    producer_id: Optional[int] = None
