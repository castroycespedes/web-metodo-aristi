import { AuthenticatedLayout } from '@/components/layout/authenticated-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskDetailsPanel } from '@/components/kanban/task-details-panel';
import { tasksService } from '@/services/api/tasks.service';

export default async function TaskPage({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;
  const task = await tasksService.get(taskId);
  return (
    <AuthenticatedLayout>
      <Card>
        <CardHeader><CardTitle>{task.title}</CardTitle></CardHeader>
        <CardContent><TaskDetailsPanel task={task} /></CardContent>
      </Card>
    </AuthenticatedLayout>
  );
}
