'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Search, UserPlus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ErrorState } from '@/components/feedback/error-state';
import { SkeletonLoader } from '@/components/feedback/skeleton-loader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usersService } from '@/services/api/users.service';

export function UsersTable() {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();
  const query = useQuery({ queryKey: ['users'], queryFn: usersService.list });
  const statusMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      usersService.updateStatus(id, isActive),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
  });

  const users = useMemo(
    () =>
      (query.data ?? []).filter((user) =>
        `${user.email} ${user.username}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [query.data, search],
  );

  if (query.isLoading) {
    return <SkeletonLoader className="h-80" />;
  }

  if (query.isError) {
    return <ErrorState message="Unable to load users. Check backend permissions and connectivity." />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search users..." />
        </div>
        <Button><UserPlus className="h-4 w-4" />Create user</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <div className="font-medium">{user.username}</div>
                <div className="text-xs text-muted-foreground">{user.email}</div>
              </TableCell>
              <TableCell className="space-x-1">
                {user.roles?.map((role) => {
                  const roleName = typeof role === 'string' ? role : role.name;
                  return <Badge key={roleName} variant="secondary">{roleName}</Badge>;
                })}
              </TableCell>
              <TableCell>
                <Badge variant={user.isActive ? 'default' : 'outline'}>{user.isActive ? 'Active' : 'Inactive'}</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => statusMutation.mutate({ id: user.id, isActive: !user.isActive })}
                >
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
