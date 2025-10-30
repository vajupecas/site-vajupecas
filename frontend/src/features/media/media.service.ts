import API from "../../api/axios.ts";

export const uploadFile = async (data: File): Promise<{ url: string }> => {
  const formData = new FormData();
  formData.append("file", data);

  const response = await API.post("/medias", formData);
  return response.data;
};
