import axios, { type AxiosError, type AxiosResponse } from "axios";
import type { ApiResponse } from "./types";

export const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data instanceof Blob) return response;

    const apiResponse = response.data as ApiResponse<unknown>;
    if (apiResponse && typeof apiResponse === "object" && "success" in apiResponse) {
      if (apiResponse.success) {
        response.data = apiResponse.data;
        return response;
      }
      return Promise.reject(apiResponse);
    }
    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 404 && error.config?.url?.includes("/events/get-image/")) {
      return Promise.resolve(error.response);
    }

    if (error.response?.data) {
      const apiResponse = error.response.data as ApiResponse<unknown>;
      if (apiResponse && typeof apiResponse === "object" && "success" in apiResponse) {
        return Promise.reject(apiResponse);
      }
    }
    return Promise.reject({
      success: false,
      message: error.message || "Ошибка соединения",
      data: null,
    });
  },
);

export default apiClient;
