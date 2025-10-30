from models.client import Client
from models.slider import SliderImage
from .product_type import ProductType, ProductTypeResponse
from .producer import Producer, ProducerResponse, ProducerSummary
from .product import Product, ProductResponse
from .admin import Admin
from .text import Text
from .service import Service

ProductType.model_rebuild()
ProductTypeResponse.model_rebuild()
Producer.model_rebuild()
ProducerResponse.model_rebuild()
ProducerSummary.model_rebuild()
Product.model_rebuild()
ProductResponse.model_rebuild()
Admin.model_rebuild()
Text.model_rebuild()
Client.model_rebuild()
Service.model_rebuild()
SliderImage.model_rebuild()