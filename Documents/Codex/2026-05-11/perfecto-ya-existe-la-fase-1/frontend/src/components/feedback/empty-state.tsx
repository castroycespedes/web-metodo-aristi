import { Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: string;
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
      <Inbox className="mb-3 h-8 w-8 text-muted-foreground" />
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action ? <Button className="mt-4" size="sm">{action}</Button> : null}
    </div>
  );
}
