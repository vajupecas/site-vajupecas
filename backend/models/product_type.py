from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List, TYPE_CHECKING
from pydantic import BaseModel, ConfigDict

if TYPE_CHECKING:
    from models.producer import Producer, ProducerSummary

class ProductTypeBase(SQLModel):
    name: str
    has_producer: bool

class ProductType(ProductTypeBase, table=True):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(default=None, primary_key=True)
    producer_list: List["Producer"] = Relationship(back_populates="product_type", sa_relationship_kwargs={"cascade": "all, delete-orphan"})

class ProductTypeSummary(ProductTypeBase):
    model_config = ConfigDict(from_attributes=True)
    id: int

class ProductTypeResponse(ProductTypeBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    producer_list: List["ProducerSummary"] = []


class ProductTypeUpdate(BaseModel):
    name: Optional[str] = None
    has_producer: Optional[bool] = None
