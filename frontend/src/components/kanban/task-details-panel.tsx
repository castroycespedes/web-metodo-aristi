import { Badge } from '@/components/ui/badge';
import type { Task } from '@/types/domain';
import { AssigneeAvatarGroup } from './assignee-avatar-group';
import { DueDateBadge } from './due-date-badge';
import { PriorityBadge } from './priority-badge';

export function TaskDetailsPanel({ task }: { task: Task }) {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-6 text-muted-foreground">{task.description}</p>
      <div className="grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">Priority</p>
          <PriorityBadge priority={task.priority} />
        </div>
        <div>
          <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">Due</p>
          <DueDateBadge date={task.dueDate} />
        </div>
        <div>
          <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">Assignees</p>
          <AssigneeAvatarGroup assignees={task.assignees} />
        </div>
        <div>
          <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">Estimate</p>
          <Badge variant="secondary">{task.points} points</Badge>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {task.labels.map((label) => <Badge key={label} variant="outline">{label}</Badge>)}
      </div>
    </div>
  );
}
