'use client';

import { useQuery } from '@tanstack/react-query';
import { ErrorState } from '@/components/feedback/error-state';
import { SkeletonLoader } from '@/components/feedback/skeleton-loader';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { permissionsService } from '@/services/api/permissions.service';

export function PermissionsTable() {
  const query = useQuery({ queryKey: ['permissions'], queryFn: permissionsService.list });

  if (query.isLoading) return <SkeletonLoader className="h-72" />;
  if (query.isError) return <ErrorState message="Unable to load permissions from /api/permissions." />;

  return (
    <Card>
      <CardHeader><CardTitle>Permission catalog</CardTitle></CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Permission</TableHead>
              <TableHead>Resource</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(query.data ?? []).map((permission) => (
              <TableRow key={permission.id}>
                <TableCell className="font-medium">{permission.name}</TableCell>
                <TableCell><Badge variant="outline">{permission.resource ?? 'global'}</Badge></TableCell>
                <TableCell className="text-muted-foreground">{permission.action ?? '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
