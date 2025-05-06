import { handleAxiosErrorWithToast } from '../config/axios-error';
import { publicApi } from '../config/axios-instance';
import { LoginType, ResetPassword, SignUp } from '../types/auth';

export const loginUser = async (data: LoginType) => {
  try {
    await publicApi.post('/authentication/sign-in', data);
  } catch (error) {
    handleAxiosErrorWithToast(error);
  }
};

export const requestForgotPasswordLink = async (credential: string) => {
  try {
    await publicApi.post('/authentication/forgot-password', { credential });
  } catch (error) {
    handleAxiosErrorWithToast(error);
  }
};

export const resetPassword = async (body: ResetPassword) => {
  try {
    await publicApi.post('/authentication/reset-password', body);
  } catch (error) {
    handleAxiosErrorWithToast(error);
  }
};

export const signUpUser = async (data: SignUp) => {
  try {
    await publicApi.post('/authentication/sign-up', {
      ...data,
      college: data.college?._id,
      department: data.department?._id,
    });
  } catch (error) {
    handleAxiosErrorWithToast(error);
  }
};
