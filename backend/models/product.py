from sqlmodel import Column, ForeignKey, Integer, SQLModel, Field, Relationship
from pydantic import BaseModel, ConfigDict
from typing import Optional, TYPE_CHECKING


if TYPE_CHECKING:
    from models.product_type import ProductType,ProductTypeSummary
    from models.producer import Producer, ProducerSummary
    from models.model import Model, ModelSummary

class ProductBase(SQLModel):
    name: str
    description: str
    url_image: str
    product_type_id: Optional[int] = Field(default=None, sa_column=Column(Integer, ForeignKey("producttype.id", ondelete="CASCADE"), nullable=True))
    model_id: Optional[int] = Field(default=None, sa_column=Column(Integer, ForeignKey("model.id", ondelete="CASCADE"), nullable=True))
    producer_id: Optional[int] = Field(default=None, sa_column=Column(Integer, ForeignKey("producer.id", ondelete="CASCADE"), nullable=True))

class Product(ProductBase, table=True):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(default=None, primary_key=True)
    product_type: Optional["ProductType"] = Relationship(back_populates="product_list")
    producer: Optional["Producer"] = Relationship(back_populates="products_list")
    model: Optional["Model"] = Relationship(back_populates="products_list")

class ProductResponse(ProductBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    product_type: Optional["ProductTypeSummary"] = None
    producer: Optional["ProducerSummary"] = None
    model: Optional["ModelSummary"] = None

class ProductSummary(ProductBase):
    model_config = ConfigDict(from_attributes=True)
    id: int

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    url_image: Optional[str] = None
    product_type_id: Optional[int] = None
    model_id: Optional[int] = None
    producer_id: Optional[int] = None
