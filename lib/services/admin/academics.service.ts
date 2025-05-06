import { errorHandler } from '@/lib/config/axios-error';
import { authApi } from '@/lib/config/axios-instance';
import { ApiResponse, College, Department } from '@/lib/types';

export const getColleges = async () => {
  try {
    const response = await authApi.get<ApiResponse<College[]>>(
      `/academics/college`
    );

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
  }
};

export const getDepartments = async (collegeId: string) => {
  try {
    const response = await authApi.get<ApiResponse<Department[]>>(
      `/academics/college/${collegeId}/department`
    );

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
  }
};
