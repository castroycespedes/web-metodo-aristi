import { apiClient } from './client';
import type { PermissionRow, RoleRow } from '@/types/domain';

export const rolesService = {
  async list() {
    const { data } = await apiClient.get<RoleRow[]>('/roles');
    return data;
  },
  async get(id: string) {
    const { data } = await apiClient.get<RoleRow>(`/roles/${id}`);
    return data;
  },
  async permissions(id: string) {
    const { data } = await apiClient.get<PermissionRow[]>(`/roles/${id}/permissions`);
    return data;
  },
};
