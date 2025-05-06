import { handleAxiosErrorWithToast } from "@/lib/config/axios-error";
import { authApi, publicApi } from "@/lib/config/axios-instance";
import { AdminLoginDto } from "@/lib/dtos/auth.dto";
import { ApiResponse } from "@/lib/types";

export const signIn = async (body: AdminLoginDto) => {
  try {
    const { data } = await publicApi.post<ApiResponse<{ message: string }>>(
      "/authentication/sign-in",
      body
    );

    return data.data;
  } catch (error) {
    handleAxiosErrorWithToast(error);
  }
};

export const signOut = async () => {
  try {
    await authApi.get("/authentication/sign-out");
  } catch (error) {
    handleAxiosErrorWithToast(error)
  }
};