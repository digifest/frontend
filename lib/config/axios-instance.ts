import axios, { AxiosInstance } from "axios";
import { API_URL } from "../constants/env";

export const publicApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

export const authApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});


authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) {
    //   window.location.href = "/admin/login";
    // }

    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "An error occurred";
      return Promise.reject(new Error(message));
    }

  }
);
