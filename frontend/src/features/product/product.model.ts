import type { Producer, ProducerSummaryDTO } from "../producer/producer.model";

export interface Product {
  id: number;
  name: string;
  description: string;
  url_image: string;
  producer_id: number;
  producer: Producer;
}

export interface ProductResponseDTO {
  id: number;
  name: string;
  description: string;
  url_image: string;
  producer_id: number;
  producer: ProducerSummaryDTO;
}

export interface ProductBaseDTO {
  name: string;
  description: string;
  url_image: string;
  producer_id: number;
}

export interface ProductUpdateDTO {
  name?: string;
  description?: string;
  url_image?: string;
  producer_id?: number;
}
