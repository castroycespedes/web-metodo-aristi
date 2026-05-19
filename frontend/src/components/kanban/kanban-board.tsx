'use client';

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import type { BoardColumn, Task } from '@/types/domain';
import { KanbanColumn } from './kanban-column';
import { TaskFilters } from './task-filters';
import { TaskModal } from './task-modal';

function findColumn(columns: BoardColumn[], taskId: string) {
  return columns.find((column) => column.taskIds.includes(taskId));
}

export function KanbanBoard({
  initialColumns,
  initialTasks,
}: {
  initialColumns: BoardColumn[];
  initialTasks: Record<string, Task>;
}) {
  const [columns, setColumns] = useState(initialColumns);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeColumn = findColumn(columns, String(active.id));
    const overColumn = findColumn(columns, String(over.id)) ?? columns.find((column) => column.id === over.id);
    if (!activeColumn || !overColumn || activeColumn.id === overColumn.id) return;

    setColumns((current) =>
      current.map((column) => {
        if (column.id === activeColumn.id) {
          return { ...column, taskIds: column.taskIds.filter((id) => id !== active.id) };
        }
        if (column.id === overColumn.id) {
          return { ...column, taskIds: [...column.taskIds, String(active.id)] };
        }
        return column;
      }),
    );
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const column = findColumn(columns, String(active.id));
    if (!column || !column.taskIds.includes(String(over.id))) return;

    const oldIndex = column.taskIds.indexOf(String(active.id));
    const newIndex = column.taskIds.indexOf(String(over.id));
    setColumns((current) =>
      current.map((item) =>
        item.id === column.id
          ? { ...item, taskIds: arrayMove(item.taskIds, oldIndex, newIndex) }
          : item,
      ),
    );
  }

  return (
    <div className="space-y-4">
      <TaskFilters />
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragOver={onDragOver} onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-3">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              tasks={column.taskIds.map((id) => initialTasks[id]).filter(Boolean)}
              onOpenTask={setSelectedTask}
            />
          ))}
        </div>
      </DndContext>
      <TaskModal task={selectedTask} open={Boolean(selectedTask)} onOpenChange={(open) => !open && setSelectedTask(null)} />
    </div>
  );
}
