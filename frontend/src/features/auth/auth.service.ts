import API from "../../api/axios.ts";
import type { AdminLoginDTO } from "../admin/admin.model.ts";
import type { Token } from "./auth.model.ts";

export const loginAdmin = async (data: AdminLoginDTO): Promise<Token> => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

export const logoutAdmin = async (): Promise<{ message: string }> => {
  const response = await API.post("/auth/logout");
  return response.data;
};
