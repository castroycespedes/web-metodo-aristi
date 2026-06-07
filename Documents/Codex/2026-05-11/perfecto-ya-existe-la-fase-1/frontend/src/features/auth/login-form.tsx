'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LoadingSpinner } from '@/components/feedback/loading-spinner';
import { FormInput } from '@/components/forms/form-input';
import { Button } from '@/components/ui/button';
import { authService } from '@/services/api/auth.service';
import { useAuthStore } from '@/stores/auth.store';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

type LoginValues = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const form = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (session) => {
      setSession(session);
      router.replace('/dashboard');
    },
  });

  const error = mutation.error as AxiosError<{ message?: string }> | null;

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
      <FormInput<LoginValues>
        label="Email"
        name="email"
        type="email"
        register={form.register}
        error={form.formState.errors.email?.message}
      />
      <FormInput<LoginValues>
        label="Password"
        name="password"
        type="password"
        register={form.register}
        error={form.formState.errors.password?.message}
      />
      {error ? (
        <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error.response?.data?.message ?? 'Unable to sign in'}
        </p>
      ) : null}
      <Button className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? <LoadingSpinner /> : null}
        Sign in
      </Button>
    </form>
  );
}
