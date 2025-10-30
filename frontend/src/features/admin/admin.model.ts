export interface Admin {
  id: number;
  email: string;
  password: string;
}

export interface AdminLoginDTO {
  email: string;
  password: string;
}

export interface AdminPasswordRequestDTO {
  id: number;
}

export interface AdminVerifyCodeDTO {
  id: number;
  code: string;
}

export interface AdminNewPasswordDTO {
  id: number;
  new_password: string;
}
