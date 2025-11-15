import type { Producer, ProducerSummaryDTO } from "../producer/producer.model";
import type { Model, ModelSummaryDTO } from "../model/models.model";
import type { ProductType, ProductTypeSummaryDTO } from "../product_type/productType.model";

export interface Product {
  id: number;
  name: string;
  description: string;
  url_image: string;
  product_type_id: number;
  product_type: ProductType;
  producer_id: number;
  producer: Producer;
  model_id: number;
  model: Model;
}

export interface ProductResponseDTO {
  id: number;
  name: string;
  description: string;
  url_image: string;
  product_type_id: number;
  product_type: ProductTypeSummaryDTO;
  producer_id: number;
  producer: ProducerSummaryDTO;
  model_id: number;
  model: ModelSummaryDTO;
}

export interface ProductBaseDTO {
  name: string;
  description: string;
  url_image: string;
  product_type_id: number;
  producer_id?: number;
  model_id?: number;
}

export interface ProductSummaryDTO {
  name: string;
  description: string;
  url_image: string;
  product_type_id: number;
  producer_id: number;
  model_id: number;
}

export interface ProductUpdateDTO {
  name?: string;
  description?: string;
  url_image?: string;
  product_type_id?: number;
  producer_id?: number;
  model_id?: number;
}
