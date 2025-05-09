import { DocType, Sort } from '../enums';

export interface ApiResponse<T, M = undefined> {
  success: boolean;
  message: string;
  data: T;
  meta?: M;
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
  department: string;
  file: File;
  document_type: DocType;
  description: string;
  course: string;
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

export type Course = {
  _id: string;
  name: string;
  department: string;
  level: string;
  semester_index: number
  course_code: string
}
export type Document = {
  _id: string;
  createdAt: Date;
  name: string;
  description: string;
  department: Department;
  url: string;
  mime_type: string;
  document_type: DocType;
  uploaded_by: User;
  byte_size: number;
  upload_id?: string;
  course: {
    name: string;
    course_code: string;
    level: number;
    semester_index: number;
  };
};

export type DocumentMetrics = {
  categories?: { category: DocType; total: number }[];
  document_by_levels?: { level: string; total: number }[];
};

export type SearchDocuments = {
  department?: Department;
  search?: string;
  page?: number;
  limit?: number;
  level?: number;
  semester_index?: number;
  document_type?: DocType;
  sort?: Sort;
};
