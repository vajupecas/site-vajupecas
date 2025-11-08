import API from "../../api/axios.ts";
import type { ProductModelBaseDTO, ProductModelResponseDTO, ProductModelUpdateDTO } from "./productModels.model.ts";

export const getProductModels = async (): Promise<Array<ProductModelResponseDTO>> => {
  const response = await API.get(`/product-models`);
  return response.data;
};

export const getProductModelById = async (productModelId: number): Promise<ProductModelResponseDTO> => {
  const response = await API.get(`/product-models/${productModelId}`);
  return response.data;
};

export const postProductModel = async (data: ProductModelBaseDTO): Promise<ProductModelResponseDTO> => {
  const response = await API.post(`/product-models`, data);
  return response.data;
};

export const updateProductModel = async (productModelId: number, data: ProductModelUpdateDTO): Promise<ProductModelResponseDTO> => {
  const response = await API.put(`product-models/${productModelId}`, data);
  return response.data;
};

export const deleteProductModel = async (productModelId: number): Promise<{ detail: string }> => {
  const response = await API.delete(`product-models/${productModelId}`);
  return response.data;
};
