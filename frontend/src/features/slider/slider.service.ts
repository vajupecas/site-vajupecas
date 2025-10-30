import API from "../../api/axios.ts";
import type { SliderImage, SliderImageBaseDTO, SliderImageUpdateDTO } from "./slider.model.ts";

export const getSliderImages = async (): Promise<SliderImage[]> => {
  const response = await API.get("/slider-images");
  return response.data;
};

export const postSliderImage = async (data: SliderImageBaseDTO): Promise<SliderImage> => {
  const response = await API.post("/slider-images", data);
  return response.data;
};

export const updateSliderImage = async (SliderImageId: number, data: SliderImageUpdateDTO): Promise<SliderImage> => {
  const response = await API.put(`slider-images/${SliderImageId}`, data);
  return response.data;
};

export const deleteSliderImage = async (SliderImageId: number): Promise<SliderImage> => {
  const response = await API.delete(`slider-images/${SliderImageId}`);
  return response.data;
};
