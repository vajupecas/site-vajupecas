export interface Service {
  id: number;
  name: string;
  description: string;
  url_image: string;
}

export interface ServiceBaseDTO {
  name: string;
  description: string;
  url_image: string;
}

export interface ServiceUpdateDTO {
  name?: string;
  description?: string;
  url_image?: string;
}
