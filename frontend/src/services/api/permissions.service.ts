import { apiClient } from './client';
import type { PermissionRow } from '@/types/domain';

export const permissionsService = {
  async list() {
    const { data } = await apiClient.get<PermissionRow[]>('/permissions');
    return data;
  },
};
