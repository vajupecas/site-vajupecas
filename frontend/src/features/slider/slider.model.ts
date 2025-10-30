export interface SliderImage {
  id: number;
  name: string;
  url_image: string;
}

export interface SliderImageBaseDTO {
  name: string;
  url_image: string;
}

export interface SliderImageUpdateDTO {
  name?: string;
  url_image?: string;
}
