import type { Producer, ProducerResponseDTO, ProducerSummaryDTO } from "../producer/producer.model";
import type { Product, ProductResponseDTO } from "../product/product.model";

export interface Model {
  id: number;
  name: string;
  producer_id: number;
  producer: Producer;
  products_list: Array<Product>;
}

export interface ModelResponseDTO {
  id: number;
  name: string;
  producer_id: number;
  producer: ProducerResponseDTO;
  products_list: Array<ProductResponseDTO>;
}

export interface ModelSummaryDTO {
  id: number;
  name: string;
  producer_id: number;
  producer: ProducerSummaryDTO;
}

export interface ModelBaseDTO {
  name: string;
  producer_id: number;
}

export interface ModelUpdateDTO {
  name?: string;
  producer_id?: number;
}
