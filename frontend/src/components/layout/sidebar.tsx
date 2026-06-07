'use client';

import {
  BarChart3,
  FolderKanban,
  LayoutDashboard,
  LockKeyhole,
  Shield,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const items = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
  { href: '/settings/users', label: 'Users', icon: Users },
  { href: '/settings/roles', label: 'Roles', icon: Shield },
  { href: '/settings/permissions', label: 'Permissions', icon: LockKeyhole },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full flex-col border-r bg-background">
      <div className="flex h-16 items-center gap-3 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <BarChart3 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold leading-none">Metodo Aristi</p>
          <p className="text-xs text-muted-foreground">Sistema interno</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
                active && 'bg-accent text-foreground',
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-4">
        <div className="rounded-lg bg-muted p-3">
          <p className="text-xs font-medium">Sprint health</p>
          <div className="mt-2 h-2 rounded-full bg-background">
            <div className="h-2 w-3/4 rounded-full bg-primary" />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">72% delivery confidence</p>
        </div>
      </div>
    </aside>
  );
}
