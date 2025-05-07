import { AxiosErrorShape, errorHandler } from '@/lib/config/axios-error';
import { authApi } from '@/lib/config/axios-instance';
import { AddCourseDto } from '@/lib/dtos/academic.dto';
import { ApiResponse, College, Course, Department } from '@/lib/types';

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

export const getDepartmentsForCollege = async (collegeId: string) => {
  try {
    const response = await authApi.get<ApiResponse<Department[]>>(
      `/academics/college/${collegeId}/department`
    );

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
  }
};
export const getDepartments = async () => {
  try {
    const response = await authApi.get<ApiResponse<Department[]>>(
      `/academics/department`
    );

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
  }
};

export const getCourses = async (departmentId: string) => {
  try {
    const response = await authApi.get<ApiResponse<Course[]>>(
      `/academics/course?department_id=${departmentId}`
    );

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
  }
};

export const addCourse = async (data: AddCourseDto) => {
  try {
    const response = await authApi.post<ApiResponse<Course>>(
      `/academics/course`, data
    );

    return response?.data?.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
  }
};