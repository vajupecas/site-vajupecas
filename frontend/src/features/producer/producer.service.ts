import API from "../../api/axios.ts";
import type { ProducerResponseDTO, ProducerBaseDTO, ProducerUpdateDTO } from "./producer.model.ts";

export const getProducers = async (): Promise<Array<ProducerResponseDTO>> => {
  const response = await API.get(`/producers`);
  return response.data;
};

export const getProducerById = async (producerId: number): Promise<ProducerResponseDTO> => {
  const response = await API.get(`/producers/${producerId}`);
  return response.data;
};

export const postProducer = async (data: ProducerBaseDTO): Promise<ProducerResponseDTO> => {
  const response = await API.post(`/producers`, data);
  return response.data;
};

export const updateProducer = async (producerId: number, data: ProducerUpdateDTO): Promise<ProducerResponseDTO> => {
  const response = await API.put(`producers/${producerId}`, data);
  return response.data;
};

export const deleteProducer = async (producerId: number): Promise<{ detail: string }> => {
  const response = await API.delete(`producers/${producerId}`);
  return response.data;
};
