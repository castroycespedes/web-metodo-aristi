'use client';

import { AuthGuard } from '@/features/auth/auth-guard';
import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

export function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-muted/30">
        <div className="fixed inset-y-0 left-0 hidden w-72 lg:block">
          <Sidebar />
        </div>
        <div className="lg:pl-72">
          <Navbar />
          <main className="mx-auto w-full max-w-7xl p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
