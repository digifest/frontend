import { DocType } from "../enums";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

<<<<<<< HEAD
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

export interface College {
  _id: string;
  name: string;
  acronym: string;
  id: string;
}

export interface Department {
  _id: string;
  collegeId: string;
  name: string;
  acronym: string;
  level_count: number;
  id: string;
}
=======
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
>>>>>>> 22f74281f4efbc32b528d8d5a0e495cc18412196
