'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser } from '@/types/auth';

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  hydrated: boolean;
  setSession: (session: {
    user: AuthUser;
    accessToken: string;
    refreshToken: string;
  }) => void;
  setAccessToken: (accessToken: string) => void;
  clearSession: () => void;
  setHydrated: (hydrated: boolean) => void;
  hasRole: (roles: string | string[]) => boolean;
  hasPermission: (permissions: string | string[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      hydrated: false,
      setSession: (session) => set({ ...session }),
      setAccessToken: (accessToken) => set({ accessToken }),
      clearSession: () =>
        set({ user: null, accessToken: null, refreshToken: null }),
      setHydrated: (hydrated) => set({ hydrated }),
      hasRole: (roles) => {
        const required = Array.isArray(roles) ? roles : [roles];
        const current = get().user?.roles ?? [];
        return required.some((role) => current.includes(role));
      },
      hasPermission: (permissions) => {
        const required = Array.isArray(permissions)
          ? permissions
          : [permissions];
        const current = get().user?.permissions ?? [];
        return required.every((permission) => current.includes(permission));
      },
    }),
    {
      name: 'metodo-aristi-auth',
      partialize: ({ user, accessToken, refreshToken }) => ({
        user,
        accessToken,
        refreshToken,
      }),
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
    },
  ),
);
