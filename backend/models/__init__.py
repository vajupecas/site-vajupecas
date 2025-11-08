from models.client import Client
from models.product_model import ProductModel, ProductModelResponse, ProductModelSummary
from models.slider import SliderImage
from models.product_type import ProductType, ProductTypeResponse, ProductTypeSummary
from models.producer import Producer, ProducerResponse, ProducerSummary
from models.product import Product, ProductResponse, ProductSummary
from models.admin import Admin
from models.text import Text
from models.service import Service

ProductType.model_rebuild()
ProductTypeResponse.model_rebuild()
ProductTypeSummary.model_rebuild()
Producer.model_rebuild()
ProducerResponse.model_rebuild()
ProducerSummary.model_rebuild()
ProductModel.model_rebuild()
ProductModelSummary.model_rebuild()
ProductModelResponse.model_rebuild()
Product.model_rebuild()
ProductSummary.model_rebuild()
ProductResponse.model_rebuild()
Admin.model_rebuild()
Text.model_rebuild()
Client.model_rebuild()
Service.model_rebuild()
SliderImage.model_rebuild()