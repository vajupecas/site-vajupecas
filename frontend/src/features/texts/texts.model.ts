export interface Text {
  id: number;
  name: string;
  content: string;
  page: string;
}

export interface TextBaseDTO {
  name: string;
  content: string;
  page: string;
}

export interface TextUpdateDTO {
  name?: string;
  content?: string;
  page?: string;
}
