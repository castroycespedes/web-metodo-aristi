'use client';

import { useAuthStore } from '@/stores/auth.store';

export function usePermissions() {
  const hasPermission = useAuthStore((state) => state.hasPermission);
  const hasRole = useAuthStore((state) => state.hasRole);
  return { hasPermission, hasRole };
}
