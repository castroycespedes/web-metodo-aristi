'use client';

import { Filter, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function TaskFilters() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-9" placeholder="Search board tasks..." />
      </div>
      <div className="flex gap-2">
        <Button variant="outline"><Filter className="h-4 w-4" />Filters</Button>
        <Button><Plus className="h-4 w-4" />New task</Button>
      </div>
    </div>
  );
}
