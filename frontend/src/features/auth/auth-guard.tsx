'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingSpinner } from '@/components/feedback/loading-spinner';
import { useAuthStore } from '@/stores/auth.store';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const hydrated = useAuthStore((state) => state.hydrated);
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (hydrated && !token && pathname !== '/login') {
      router.replace('/login');
    }
  }, [hydrated, pathname, router, token]);

  if (!hydrated || (!token && pathname !== '/login')) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner className="h-6 w-6" />
      </div>
    );
  }

  return children;
}
