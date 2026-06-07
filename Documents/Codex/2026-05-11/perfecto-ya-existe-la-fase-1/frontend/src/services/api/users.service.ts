import { apiClient } from './client';
import type { UserRow } from '@/types/domain';

export interface CreateUserPayload {
  email: string;
  username: string;
  password: string;
  roleIds?: string[];
}

export const usersService = {
  async list() {
    const { data } = await apiClient.get<UserRow[]>('/users');
    return data;
  },
  async get(id: string) {
    const { data } = await apiClient.get<UserRow>(`/users/${id}`);
    return data;
  },
  async create(payload: CreateUserPayload) {
    const { data } = await apiClient.post<UserRow>('/users', payload);
    return data;
  },
  async update(id: string, payload: Partial<CreateUserPayload>) {
    const { data } = await apiClient.patch<UserRow>(`/users/${id}`, payload);
    return data;
  },
  async updateStatus(id: string, isActive: boolean) {
    const { data } = await apiClient.patch<UserRow>(`/users/${id}/status`, {
      isActive,
    });
    return data;
  },
};
