import API from "../../api/axios.ts";
import type { ProductTypeResponseDTO, ProductTypeBaseDTO, ProductTypeUpdateDTO } from "./productType.model.ts";
import type { ProducerResponseDTO } from "../producer/producer.model.ts";
import type { ProductModelResponseDTO } from "../product_model/productModels.model.ts";

export const getProductTypes = async (): Promise<Array<ProductTypeResponseDTO>> => {
  const response = await API.get(`/product-types`);
  return response.data;
};

export const getProductTypesWithProducers = async (): Promise<Array<ProductTypeResponseDTO>> => {
  const response = await API.get(`/product-types`);
  return response.data;
};

export const getProductTypeById = async (productTypeId: number): Promise<ProductTypeResponseDTO> => {
  const response = await API.get(`/product-types/${productTypeId}`);
  return response.data;
};

export const getProducersByTypeId = async (productTypeId: number): Promise<Array<ProducerResponseDTO>> => {
  const response = await API.get(`/product-types/${productTypeId}/producers`);
  return response.data;
};

export const getProducersByTypeSlug = async (productTypeSlug: string): Promise<Array<ProducerResponseDTO>> => {
  const response = await API.get(`/product-types/${productTypeSlug}/producers`);
  return response.data;
};

export const getProductModelsByTypeId = async (productTypeId: number): Promise<Array<ProductModelResponseDTO>> => {
  const response = await API.get(`/product-types/${productTypeId}/product-models`);
  return response.data;
};

export const getProductModelsByTypeSlug = async (productTypeSlug: string): Promise<Array<ProductModelResponseDTO>> => {
  const response = await API.get(`/product-types/${productTypeSlug}/product-models`);
  return response.data;
};

export const postProductType = async (data: ProductTypeBaseDTO): Promise<ProductTypeResponseDTO> => {
  const response = await API.post(`/product-types`, data);
  return response.data;
};

export const updateProductType = async (productTypeId: number, data: ProductTypeUpdateDTO): Promise<ProductTypeResponseDTO> => {
  const response = await API.put(`product-types/${productTypeId}`, data);
  return response.data;
};

export const deleteProductType = async (productTypeId: number): Promise<{ detail: string }> => {
  const response = await API.delete(`/product-types/${productTypeId}`);
  return response.data;
};
