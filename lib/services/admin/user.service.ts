import { handleAxiosErrorWithToast } from '@/lib/config/axios-error';
import { authApi } from '@/lib/config/axios-instance';
import { ApiResponse, User } from '@/lib/types';

export const getUserInfo = async () => {
  try {
    const {
      data: { data },
    } = await authApi.get<ApiResponse<User>>(`/user`);
    return data;
  } catch (err) {
    handleAxiosErrorWithToast(err);
  }
};
