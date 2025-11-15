import API from "../../api/axios.ts";
import type { ModelBaseDTO, ModelResponseDTO, ModelUpdateDTO } from "./models.model.ts";

export const getModels = async (): Promise<Array<ModelResponseDTO>> => {
  const response = await API.get(`/models`);
  return response.data;
};

export const getModelById = async (modelId: number): Promise<ModelResponseDTO> => {
  const response = await API.get(`/models/${modelId}`);
  return response.data;
};

export const postModel = async (data: ModelBaseDTO): Promise<ModelResponseDTO> => {
  const response = await API.post(`/models`, data);
  return response.data;
};

export const updateModel = async (modelId: number, data: ModelUpdateDTO): Promise<ModelResponseDTO> => {
  const response = await API.put(`models/${modelId}`, data);
  return response.data;
};

export const deleteModel = async (modelId: number): Promise<{ detail: string }> => {
  const response = await API.delete(`models/${modelId}`);
  return response.data;
};
