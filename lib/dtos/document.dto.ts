import { DocType } from "../enums";

export interface CreateDocumentDto {
  name: string;
  level: number;
  department: string;
  file: File;
  document_type: DocType;
  semester_index: number;
  description: string;
}