import API from "../../api/axios.ts";
import type { Text, TextBaseDTO, TextUpdateDTO } from "./texts.model.ts";

export const getTexts = async (): Promise<Text[]> => {
  const response = await API.get("/texts");
  return response.data;
};

export const getTextsByPage = async (page: string): Promise<Text[]> => {
  const response = await API.get(`/texts/${page}`);
  return response.data;
};

export const getTextById = async (TextId: number): Promise<Text> => {
  const response = await API.put(`/texts/${TextId}`);
  return response.data;
};

export const getTextByName = async (name: string): Promise<Text> => {
  const response = await API.put(`/texts/${name}`);
  return response.data;
};

export const postText = async (data: TextBaseDTO): Promise<Text> => {
  const response = await API.post("/texts", data);
  return response.data;
};

export const updateText = async (TextId: number, data: TextUpdateDTO): Promise<Text> => {
  const response = await API.put(`texts/${TextId}`, data);
  return response.data;
};
