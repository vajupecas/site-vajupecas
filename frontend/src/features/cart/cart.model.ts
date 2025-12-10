import type { ProductResponseDTO } from "../product/product.model";

export interface CartItem extends ProductResponseDTO {
  quantity: number;
}
