import { KanbanBoard } from '@/components/kanban/kanban-board';
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout';
import { boardsService } from '@/services/api/boards.service';

export default async function BoardPage() {
  const board = await boardsService.getBoard();
  return (
    <AuthenticatedLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-normal">Sprint board</h1>
          <p className="text-sm text-muted-foreground">Drag tasks across dynamic workflow columns.</p>
        </div>
        <KanbanBoard initialColumns={board.columns} initialTasks={board.tasks} />
      </div>
    </AuthenticatedLayout>
  );
}
