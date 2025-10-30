import type { ProductType, ProductTypeResponseDTO, ProductTypeSummaryDTO } from "../product_type/productType.model";
import type { Product, ProductResponseDTO } from "../product/product.model";

export interface Producer {
  id: number;
  name: string;
  product_type_id: number;
  product_type: ProductType;
  products_list: Array<Product>;
}

export interface ProducerResponseDTO {
  id: number;
  name: string;
  product_type_id: number;
  product_type: ProductTypeResponseDTO;
  products_list: Array<ProductResponseDTO>;
}

export interface ProducerSummaryDTO {
  id: number;
  name: string;
  product_type_id: number;
  product_type: ProductTypeSummaryDTO;
}

export interface ProducerBaseDTO {
  name: string;
  product_type_id: number;
}

export interface ProducerUpdateDTO {
  name?: string;
  product_type_id?: number;
}
