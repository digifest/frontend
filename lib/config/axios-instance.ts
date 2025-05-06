import axios, { AxiosInstance } from "axios";
import { API_URL } from "../constants/env";

export const publicApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false
});

export const authApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true
});


authApi.interceptors.request.use(async (config) => {

  return config;
});

authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error);
    }
  }
);
