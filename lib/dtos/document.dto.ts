import { DocType } from "../enums";

export interface CreateDocumentDto {
  name: string;
  department: string;
  file: File;
  document_type: DocType;
  description: string;
  course: string;
}