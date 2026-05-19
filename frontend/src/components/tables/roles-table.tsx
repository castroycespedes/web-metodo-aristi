'use client';

import { useQuery } from '@tanstack/react-query';
import { ErrorState } from '@/components/feedback/error-state';
import { SkeletonLoader } from '@/components/feedback/skeleton-loader';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { rolesService } from '@/services/api/roles.service';

export function RolesTable() {
  const query = useQuery({ queryKey: ['roles'], queryFn: rolesService.list });

  if (query.isLoading) return <SkeletonLoader className="h-72" />;
  if (query.isError) return <ErrorState message="Unable to load roles from /api/roles." />;

  return (
    <Card>
      <CardHeader><CardTitle>Role catalog</CardTitle></CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Permissions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(query.data ?? []).map((role) => (
              <TableRow key={role.id}>
                <TableCell className="font-medium">{role.name}</TableCell>
                <TableCell className="text-muted-foreground">{role.description ?? 'System role'}</TableCell>
                <TableCell><Badge variant="secondary">{role.permissions?.length ?? 0}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
