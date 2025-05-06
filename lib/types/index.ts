import { DocType } from "../enums";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  department: string;
  college: string;
  role: string;
}

export interface UploadDocument {
  name: string;
  level: number;
  department: string;
  file: File;
  document_type: DocType;
  semester_index: 1 | 2;
  description: string;
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
