import { toastError } from '../utils/toast';

type AxiosErrorShape = {
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
  };
  message?: string;
};

export function errorHandler<T = AxiosErrorShape | string>(
  error: AxiosErrorShape | string
): T {
  const extractedError =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    error;

  toastError(extractedError, { id: 'error' });
  return extractedError as T;
}
