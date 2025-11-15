from typing import TYPE_CHECKING, List, Optional
from sqlmodel import Column, ForeignKey, Integer, Relationship, SQLModel, Field
from pydantic import BaseModel, ConfigDict
from models.product import ProductSummary

if TYPE_CHECKING:
    from models.product import Product
    from models.producer import Producer, ProducerSummary

class ModelBase(SQLModel):
    name: str
    producer_id: Optional[int] = Field(default=None, sa_column=Column(Integer, ForeignKey("producer.id", ondelete="CASCADE"), nullable=True))

class Model(ModelBase, table=True):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(default=None, primary_key=True)
    producer: Optional["Producer"] = Relationship(back_populates="models_list")
    products_list: List["Product"] = Relationship(back_populates="model", sa_relationship_kwargs={"cascade": "all, delete-orphan"})

class ModelResponse(ModelBase):
    model_config = ConfigDict(from_attributes=True)
    id: int
    producer: Optional['ProducerSummary'] = None
    products_list: List[ProductSummary] = []

class ModelSummary(ModelBase):
    model_config = ConfigDict(from_attributes=True)
    id: int

class ModelUpdate(BaseModel):
    name: Optional[str] = None
    producer_id: Optional[int] = None