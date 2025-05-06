import { AxiosErrorShape, errorHandler } from '@/lib/config/axios-error';
import { authApi, publicApi } from '@/lib/config/axios-instance';
import { AdminLoginDto } from '@/lib/dtos/auth.dto';
import { ApiResponse, User } from '@/lib/types';

export const signIn = async (body: AdminLoginDto) => {
  try {
    const response = await publicApi.post<
      ApiResponse<{ access_token: string }>
    >('/authentication/sign-in', body);

    return response.data.data;
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await authApi.get('/authentication/sign-out');
  } catch (error) {
    errorHandler(error as AxiosErrorShape | string);
  }
};

export const getUserInfo = async () => {
  try {
    const {
      data: { data },
    } = await authApi.get<ApiResponse<User>>(`/user`);
    return data;
  } catch (err) {
    errorHandler(err as AxiosErrorShape | string);
  }
};