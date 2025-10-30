from sqlmodel import SQLModel, Field, Relationship
from pydantic import BaseModel, ConfigDict
from typing import List, Optional, TYPE_CHECKING
from models.product import ProductSummary
from models.product_type import ProductTypeSummary


if TYPE_CHECKING:
    from models.product import Product
    from models.product_type import ProductType

class ProducerBase(SQLModel):
    name: str
    product_type_id: Optional[int] = Field(default=None, foreign_key="producttype.id")

class Producer(ProducerBase, table=True):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(default=None, primary_key=True)
    product_type: Optional["ProductType"] = Relationship(back_populates="producer_list")
    products_list: List["Product"] = Relationship(back_populates="producer", sa_relationship_kwargs={"cascade": "all, delete-orphan"})

class ProducerResponse(ProducerBase):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    product_type: Optional[ProductTypeSummary] = None
    products_list: List[ProductSummary] = []

class ProducerSummary(ProducerBase):
    model_config = ConfigDict(from_attributes=True)
    id: int

class ProducerUpdate(BaseModel):
    name: Optional[str] = None
    product_type_id: Optional[int] = None

