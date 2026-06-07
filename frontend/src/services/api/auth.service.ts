import { apiClient } from './client';
import type { AuthResponse, AuthUser, LoginPayload } from '@/types/auth';

export const authService = {
  async login(payload: LoginPayload) {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
    return data;
  },
  async refresh(refreshToken: string) {
    const { data } = await apiClient.post<AuthResponse>('/auth/refresh', {
      refreshToken,
    });
    return data;
  },
  async logout() {
    await apiClient.post('/auth/logout');
  },
  async me() {
    const { data } = await apiClient.get<AuthUser>('/auth/me');
    return data;
  },
};
