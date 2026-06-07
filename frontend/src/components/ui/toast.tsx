'use client';

import * as ToastPrimitive from '@radix-ui/react-toast';
import * as React from 'react';
import { cn } from '@/lib/utils';

export function Toaster() {
  return (
    <ToastPrimitive.Provider swipeDirection="right">
      <ToastPrimitive.Viewport className="fixed bottom-4 right-4 z-[100] flex max-h-screen w-96 max-w-[calc(100vw-2rem)] flex-col gap-2" />
    </ToastPrimitive.Provider>
  );
}

export const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>
>(({ className, ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    className={cn('rounded-md border bg-card p-4 text-card-foreground shadow-lg', className)}
    {...props}
  />
));
Toast.displayName = ToastPrimitive.Root.displayName;
