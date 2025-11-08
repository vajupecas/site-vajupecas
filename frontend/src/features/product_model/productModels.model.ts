import type { ProductType, ProductTypeResponseDTO, ProductTypeSummaryDTO } from "../product_type/productType.model";
import type { Product, ProductResponseDTO } from "../product/product.model";

export interface ProductModel {
  id: number;
  name: string;
  product_type_id: number;
  product_type: ProductType;
  products_list: Array<Product>;
}

export interface ProductModelResponseDTO {
  id: number;
  name: string;
  product_type_id: number;
  product_type: ProductTypeResponseDTO;
  products_list: Array<ProductResponseDTO>;
}

export interface ProductModelSummaryDTO {
  id: number;
  name: string;
  product_type_id: number;
  product_type: ProductTypeSummaryDTO;
}

export interface ProductModelBaseDTO {
  name: string;
  product_type_id: number;
}

export interface ProductModelUpdateDTO {
  name?: string;
  product_type_id?: number;
}
