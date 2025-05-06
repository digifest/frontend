import { AxiosErrorShape, errorHandler } from '@/lib/config/axios-error';
import { authApi } from '@/lib/config/axios-instance';

export const uploadDocument = async (body: FormData) => {
  try {
    await authApi.post(`/documents`, body);
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
  }
};
