'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Task } from '@/types/domain';
import { TaskDetailsPanel } from './task-details-panel';

export function TaskModal({
  task,
  open,
  onOpenChange,
}: {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task?.title}</DialogTitle>
          <DialogDescription>Task detail and planning metadata.</DialogDescription>
        </DialogHeader>
        {task ? <TaskDetailsPanel task={task} /> : null}
      </DialogContent>
    </Dialog>
  );
}
