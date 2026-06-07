'use client';

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { BoardColumn, Task } from '@/types/domain';
import { KanbanCard } from './kanban-card';

export function KanbanColumn({
  column,
  tasks,
  onOpenTask,
}: {
  column: BoardColumn;
  tasks: Task[];
  onOpenTask: (task: Task) => void;
}) {
  return (
    <section className="flex h-[calc(100vh-13rem)] min-w-80 flex-col rounded-lg border bg-muted/40">
      <div className="flex items-center justify-between border-b p-3">
        <div className="flex items-center gap-2">
          <span className={cn('h-2.5 w-2.5 rounded-full', column.color)} />
          <h3 className="text-sm font-semibold">{column.title}</h3>
        </div>
        <Badge variant="secondary">{tasks.length}</Badge>
      </div>
      <SortableContext items={column.taskIds} strategy={verticalListSortingStrategy}>
        <div className="flex-1 space-y-3 overflow-y-auto p-3">
          {tasks.map((task) => <KanbanCard key={task.id} task={task} onOpen={onOpenTask} />)}
        </div>
      </SortableContext>
    </section>
  );
}
