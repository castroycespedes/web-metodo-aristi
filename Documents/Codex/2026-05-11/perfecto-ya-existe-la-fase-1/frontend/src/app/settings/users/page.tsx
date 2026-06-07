import { PermissionGuard } from '@/features/auth/permission-guard';
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout';
import { UsersTable } from '@/components/tables/users-table';

export default function UsersSettingsPage() {
  return (
    <AuthenticatedLayout>
      <PermissionGuard permissions={['users:read']}>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-normal">Users</h1>
            <p className="text-sm text-muted-foreground">Manage workspace members and account status.</p>
          </div>
          <UsersTable />
        </div>
      </PermissionGuard>
    </AuthenticatedLayout>
  );
}
