import API from "../../api/axios.ts";
import type { Client, ClientBaseDTO } from "./client.model.ts";

export const getClients = async (): Promise<Array<Client>> => {
  const response = await API.get(`/clients`);
  return response.data;
};

export const postClient = async (data: ClientBaseDTO): Promise<Client> => {
  const response = await API.post(`/clients`, data);
  return response.data;
};

export const deleteClients = async (clientId: number): Promise<{ detail: string }> => {
  const response = await API.delete(`clients/${clientId}`);
  return response.data;
};
