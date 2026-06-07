import { Badge } from '@/components/ui/badge';
import type { Priority } from '@/types/domain';

const labels: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  const variant = priority === 'urgent' || priority === 'high' ? 'destructive' : 'secondary';
  return <Badge variant={variant}>{labels[priority]}</Badge>;
}
