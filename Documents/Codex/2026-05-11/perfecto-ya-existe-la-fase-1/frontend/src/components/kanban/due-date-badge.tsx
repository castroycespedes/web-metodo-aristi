import { format } from 'date-fns';
import { CalendarClock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function DueDateBadge({ date }: { date: string }) {
  return (
    <Badge variant="outline">
      <CalendarClock className="mr-1 h-3 w-3" />
      {format(new Date(date), 'MMM d')}
    </Badge>
  );
}
