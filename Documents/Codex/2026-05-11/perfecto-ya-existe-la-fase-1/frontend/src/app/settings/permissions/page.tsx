import { PermissionGuard } from '@/features/auth/permission-guard';
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout';
import { PermissionsTable } from '@/components/tables/permissions-table';

export default function PermissionsPage() {
  return (
    <AuthenticatedLayout>
      <PermissionGuard permissions={['permissions:read']}>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-normal">Permissions</h1>
            <p className="text-sm text-muted-foreground">Permission catalog for frontend access checks.</p>
          </div>
          <PermissionsTable />
        </div>
      </PermissionGuard>
    </AuthenticatedLayout>
  );
}
