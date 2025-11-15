import type { ProductType, ProductTypeResponseDTO, ProductTypeSummaryDTO } from "../product_type/productType.model";
import type { Product, ProductResponseDTO } from "../product/product.model";
import type { Model, ModelSummaryDTO } from "../model/models.model";

export interface Producer {
  id: number;
  name: string;
  has_model: boolean;
  product_type_id: number;
  product_type: ProductType;
  products_list: Array<Product>;
  models_list: Array<Model>;
}

export interface ProducerResponseDTO {
  id: number;
  name: string;
  has_model: boolean;
  product_type_id: number;
  product_type: ProductTypeResponseDTO;
  products_list: Array<ProductResponseDTO>;
  models_list: Array<ModelSummaryDTO>;
}

export interface ProducerSummaryDTO {
  id: number;
  name: string;
  has_model: boolean;
  product_type_id: number;
  product_type: ProductTypeSummaryDTO;
}

export interface ProducerBaseDTO {
  name: string;
  has_model: boolean;
  product_type_id: number;
}

export interface ProducerUpdateDTO {
  name?: string;
  has_model?: boolean;
  product_type_id?: number;
}
