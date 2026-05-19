import { PermissionGuard } from '@/features/auth/permission-guard';
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout';
import { RolesTable } from '@/components/tables/roles-table';

export default function RolesPage() {
  return (
    <AuthenticatedLayout>
      <PermissionGuard permissions={['roles:read']}>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-normal">Roles</h1>
            <p className="text-sm text-muted-foreground">Role catalog consumed from the Auth + RBAC backend.</p>
          </div>
          <RolesTable />
        </div>
      </PermissionGuard>
    </AuthenticatedLayout>
  );
}
