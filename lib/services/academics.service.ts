import { AxiosErrorShape, errorHandler } from '../config/axios-error';
import { ApiResponse, College, Department } from '../types';
import { publicApi } from '../config/axios-instance';

export const getColleges = async () => {
  try {
    const response = await publicApi.get<ApiResponse<College[]>>(
      '/academics/college'
    );

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
  }
};

export const getDepartmentsForCollege = async (collegeId: string) => {
  try {
    const response = await publicApi.get<ApiResponse<Department[]>>(
      `/academics/college/${collegeId}/department`
    );

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
  }
};

export const getAllDepartments = async () => {
  try {
    const response = await publicApi.get<ApiResponse<Department[]>>(
      `/academics/department`
    );

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
  }
};
