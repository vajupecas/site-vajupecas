import API from "../../api/axios.ts";
import type { Product, ProductBaseDTO, ProductUpdateDTO } from "./product.model.ts";

export const getProducts = async (): Promise<Array<Product>> => {
  const response = await API.get("/products");
  return response.data;
};

export const getProductsByProducer = async (producerId: number): Promise<Array<Product>> => {
  const response = await API.get(`/products/?producer=${producerId}`);
  return response.data;
};

export const getProductsByProducerSlug = async (producerSlug: string): Promise<Array<Product>> => {
  const response = await API.get(`/products/?producer=${producerSlug}`);
  return response.data;
};

export const getProductsByModel = async (modelId: number): Promise<Array<Product>> => {
  const response = await API.get(`/products/?model=${modelId}`);
  return response.data;
};

export const getProductsByModelSlug = async (modelSlug: string): Promise<Array<Product>> => {
  const response = await API.get(`/products/?model=${modelSlug}`);
  return response.data;
};

export const getProductsByProductTypeSlug = async (productTypeSlug: string): Promise<Array<Product>> => {
  const response = await API.get(`/products/?product_type=${productTypeSlug}`);
  return response.data;
};

export const getProductsById = async (productId: number): Promise<Product> => {
  const response = await API.get(`/products/${productId}`);
  return response.data;
};

export const getProductsBySlug = async (productSlug: string, modelSlug: string): Promise<Product> => {
  const response = await API.get(`/products/slug/${productSlug}/${modelSlug}`);
  return response.data;
};

export const postProduct = async (data: ProductBaseDTO): Promise<Product> => {
  const response = await API.post("/products", data);
  return response.data;
};

export const updateProduct = async (productId: number, data: ProductUpdateDTO): Promise<Product> => {
  const response = await API.put(`products/${productId}`, data);
  return response.data;
};

export const deleteProduct = async (productId: number): Promise<{ detail: string }> => {
  const response = await API.delete(`products/${productId}`);
  return response.data;
};
