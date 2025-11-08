import type { Producer, ProducerSummaryDTO } from "../producer/producer.model";
import type { ProductSummaryDTO } from "../product/product.model";
import type { ProductModel, ProductModelSummaryDTO } from "../product_model/productModels.model";

export interface ProductType {
  id: number;
  name: string;
  has_producer: boolean;
  has_product_model: boolean;
  producer_list: Array<Producer>;
  product_model_list: Array<ProductModel>;
}

export interface ProductTypeResponseDTO {
  id: number;
  name: string;
  has_producer: boolean;
  has_product_model: boolean;
  product_list: Array<ProductSummaryDTO>;
  producer_list: Array<ProducerSummaryDTO>;
  product_model_list: Array<ProductModelSummaryDTO>;
}

export interface ProductTypeSummaryDTO {
  id: number;
  name: string;
  has_producer: boolean;
  has_product_model: boolean;
}

export interface ProductTypeBaseDTO {
  name: string;
  has_producer: boolean;
  has_product_model: boolean;
}

export interface ProductTypeUpdateDTO {
  name?: string;
  has_producer?: boolean;
  has_product_model?: boolean;
}
