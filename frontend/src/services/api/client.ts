import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth.store';
import type { AuthResponse } from '@/types/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4001/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

let refreshPromise: Promise<AuthResponse> | null = null;

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (error.response?.status !== 401 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }

    const refreshToken = useAuthStore.getState().refreshToken;
    if (!refreshToken) {
      useAuthStore.getState().clearSession();
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    refreshPromise ??= apiClient
      .post<AuthResponse>('/auth/refresh', { refreshToken })
      .then((response) => response.data)
      .finally(() => {
        refreshPromise = null;
      });

    const session = await refreshPromise;
    useAuthStore.getState().setSession(session);
    originalRequest.headers.Authorization = `Bearer ${session.accessToken}`;

    return apiClient(originalRequest);
  },
);
