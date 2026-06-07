'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Task } from '@/types/domain';
import { AssigneeAvatarGroup } from './assignee-avatar-group';
import { DueDateBadge } from './due-date-badge';
import { PriorityBadge } from './priority-badge';

export function KanbanCard({
  task,
  onOpen,
}: {
  task: Task;
  onOpen: (task: Task) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });

  return (
    <Card
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn('cursor-pointer p-3 shadow-sm transition hover:border-primary/40', isDragging && 'opacity-60')}
      onClick={() => onOpen(task)}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-medium leading-5">{task.title}</h4>
        <button className="text-muted-foreground" {...attributes} {...listeners} onClick={(event) => event.stopPropagation()}>
          <GripVertical className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{task.description}</p>
      <div className="mt-3 flex flex-wrap gap-1">
        <PriorityBadge priority={task.priority} />
        <DueDateBadge date={task.dueDate} />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <AssigneeAvatarGroup assignees={task.assignees} />
        <span className="text-xs text-muted-foreground">{task.points} pts</span>
      </div>
    </Card>
  );
}
