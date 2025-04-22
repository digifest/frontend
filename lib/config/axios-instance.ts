import axios, { AxiosInstance } from "axios";
import { getSession } from "next-auth/react";
import { API_URL } from "../constants/env";

export const publicApi: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const authApi: AxiosInstance = axios.create({
  baseURL: API_URL,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

authApi.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (!session) return config;

  const token = session.user.tokens.access_token;

  config.headers["Authorization"] = `Bearer ${token}`;

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
