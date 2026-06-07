'use client';

import { EmptyState } from '@/components/feedback/empty-state';
import { useAuthStore } from '@/stores/auth.store';

export function PermissionGuard({
  permissions,
  roles,
  children,
}: {
  permissions?: string[];
  roles?: string[];
  children: React.ReactNode;
}) {
  const hasPermission = useAuthStore((state) => state.hasPermission);
  const hasRole = useAuthStore((state) => state.hasRole);
  const allowed =
    (!permissions?.length || hasPermission(permissions)) &&
    (!roles?.length || hasRole(roles));

  if (!allowed) {
    return (
      <EmptyState
        title="Access restricted"
        description="Your current role does not include the permissions required for this view."
      />
    );
  }

  return children;
}
