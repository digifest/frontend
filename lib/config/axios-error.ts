import { toastError } from '../utils/toast';

export function errorHandler<T = any>(error: T | any) {
  error =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    error;
  toastError(error, { id: 'error' });
  return error as T;
}
