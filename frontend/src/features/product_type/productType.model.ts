import type { Producer, ProducerSummaryDTO } from "../producer/producer.model";

export interface ProductType {
  id: number;
  name: string;
  has_producer: boolean;
  producer_list: Array<Producer>;
}

export interface ProductTypeResponseDTO {
  id: number;
  name: string;
  has_producer: boolean;
  producer_list: Array<ProducerSummaryDTO>;
}

export interface ProductTypeSummaryDTO {
  id: number;
  name: string;
  has_producer: boolean;
}

export interface ProductTypeBaseDTO {
  name: string;
  has_producer: boolean;
}

export interface ProductTypeUpdateDTO {
  name?: string;
  has_producer?: boolean;
}
