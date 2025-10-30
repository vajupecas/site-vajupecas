import API from "../../api/axios.ts";
import type { AdminPasswordRequestDTO, AdminVerifyCodeDTO, AdminNewPasswordDTO } from "./admin.model.ts";

export const getCurrentAdmin = async (): Promise<number> => {
  const response = await API.get("/admin/me");
  return response.data;
};

export const getAdminByEmail = async (admin_email: string): Promise<{ id: number }> => {
  const response = await API.get(`/admin/email`, {
    params: { admin_email: admin_email },
  });
  return response.data;
};

export const requestAdminPasswordChangeCode = async (data: AdminPasswordRequestDTO): Promise<{ message: string }> => {
  const response = await API.put("/admin/change-password-code", data);
  return response.data;
};

export const verifyAdminPasswordChageCode = async (data: AdminVerifyCodeDTO): Promise<boolean> => {
  const response = await API.put("/admin/verify-change-password", data);
  return response.data;
};

export const putAdminNewPassword = async (data: AdminNewPasswordDTO): Promise<boolean> => {
  const response = await API.put("/admin/change-password", data);
  return response.data;
};
