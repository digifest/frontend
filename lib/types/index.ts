export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type College = {
  _id: string;
  name: string;
  acronym: string;
};

export type Department = {
  _id: string;
  name: string;
  acronym: string;
  level_count: number;
};
