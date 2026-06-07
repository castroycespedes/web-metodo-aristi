'use client';

import { useQuery } from '@tanstack/react-query';
import { Filter, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { SkeletonLoader } from '@/components/feedback/skeleton-loader';
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { projectsService } from '@/services/api/projects.service';

export default function ProjectsPage() {
  const [search, setSearch] = useState('');
  const query = useQuery({ queryKey: ['projects'], queryFn: projectsService.list });
  const projects = useMemo(
    () => (query.data ?? []).filter((project) => project.name.toLowerCase().includes(search.toLowerCase())),
    [query.data, search],
  );

  return (
    <AuthenticatedLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-normal">Projects</h1>
            <p className="text-sm text-muted-foreground">Search, filter and open active delivery spaces.</p>
          </div>
          <Button><Plus className="h-4 w-4" />Create project</Button>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects..." />
          </div>
          <Button variant="outline"><Filter className="h-4 w-4" />Filters</Button>
        </div>
        {query.isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => <SkeletonLoader key={item} className="h-48" />)}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Card className="h-full transition hover:border-primary/50 hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{project.key}</Badge>
                      <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>{project.status}</Badge>
                    </div>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-2 flex justify-between text-xs text-muted-foreground">
                      <span>{project.members} members</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: `${project.progress}%` }} />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
