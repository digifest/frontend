import { errorHandler } from '../config/axios-error';
import { publicApi } from '../config/axios-instance';
import {
  ApiResponse,
  Document,
  DocumentMetrics,
  SearchDocuments,
} from '../types';

export const getDocuments = async (query: SearchDocuments) => {
  try {
    const response = await publicApi.get<
      ApiResponse<
        Document[],
        { count: number; totalPages: number; metrics: DocumentMetrics }
      >
    >('/documents', {
      params: {
        ...query,
        page: query?.page ?? 1,
        limit: query?.limit ?? 10,
      },
    });

    return response.data;
  } catch (error: any) {
    errorHandler(error);
    throw error;
  }
};
