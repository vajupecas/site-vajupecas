import API from "../../api/axios.ts";
import type { Service, ServiceBaseDTO, ServiceUpdateDTO } from "./service.model.ts";

export const getServices = async (): Promise<Service[]> => {
  const response = await API.get("/services");
  return response.data;
};

export const getServicesByPage = async (page: string): Promise<Service[]> => {
  const response = await API.get(`/services/${page}`);
  return response.data;
};

export const getServiceById = async (ServiceId: number): Promise<Service> => {
  const response = await API.put(`/services/${ServiceId}`);
  return response.data;
};

export const getServiceByName = async (name: string): Promise<Service> => {
  const response = await API.put(`/services/${name}`);
  return response.data;
};

export const postService = async (data: ServiceBaseDTO): Promise<Service> => {
  const response = await API.post("/services", data);
  return response.data;
};

export const updateService = async (ServiceId: number, data: ServiceUpdateDTO): Promise<Service> => {
  const response = await API.put(`services/${ServiceId}`, data);
  return response.data;
};

export const deleteService = async (ServiceId: number): Promise<{ detail: string }> => {
  const response = await API.delete(`services/${ServiceId}`);
  return response.data;
};
