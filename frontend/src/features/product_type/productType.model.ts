import type { Producer, ProducerSummaryDTO } from "../producer/producer.model";
import type { ProductSummaryDTO } from "../product/product.model";

export interface ProductType {
  id: number;
  name: string;
  has_producer: boolean;
  url_image: string;
  producer_list: Array<Producer>;
  order_index: number;
}

export interface ProductTypeResponseDTO {
  id: number;
  name: string;
  has_producer: boolean;
  url_image: string;
  product_list: Array<ProductSummaryDTO>;
  producer_list: Array<ProducerSummaryDTO>;
  order_index: number;
}

export interface ProductTypeSummaryDTO {
  id: number;
  name: string;
  has_producer: boolean;
  order_index: number;
}

export interface ProductTypeBaseDTO {
  name: string;
  has_producer: boolean;
}

export interface ProductTypeUpdateDTO {
  name?: string;
  url_image?: string;
  has_producer?: boolean;
}
