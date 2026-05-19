'use client';

import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from './breadcrumbs';
import { MobileSidebar } from './mobile-sidebar';
import { UserDropdown } from './user-dropdown';

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/70 lg:px-6">
      <MobileSidebar />
      <Breadcrumbs />
      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="h-9 w-64 pl-9" placeholder="Search tasks, projects..." />
        </div>
        <Button variant="ghost" size="icon">
          <Bell className="h-4 w-4" />
        </Button>
        <UserDropdown />
      </div>
    </header>
  );
}
