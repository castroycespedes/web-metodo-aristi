import type { BoardColumn, Task } from '@/types/domain';

export const initialColumns: BoardColumn[] = [
  { id: 'backlog', title: 'Backlog', color: 'bg-slate-400', taskIds: ['task-1', 'task-2'] },
  { id: 'progress', title: 'In progress', color: 'bg-blue-500', taskIds: ['task-3'] },
  { id: 'review', title: 'Review', color: 'bg-amber-500', taskIds: ['task-4'] },
  { id: 'done', title: 'Done', color: 'bg-emerald-500', taskIds: ['task-5'] },
];

export const initialTasks: Record<string, Task> = {
  'task-1': {
    id: 'task-1',
    title: 'Polish RBAC permission matrix',
    description: 'Validate menu visibility and table actions against backend permissions.',
    priority: 'high',
    assignees: ['IC', 'SA'],
    dueDate: '2026-05-16',
    labels: ['Auth', 'Frontend'],
    points: 5,
  },
  'task-2': {
    id: 'task-2',
    title: 'Create reusable project filters',
    description: 'Search, status and member filters for the projects surface.',
    priority: 'medium',
    assignees: ['LM'],
    dueDate: '2026-05-18',
    labels: ['Projects'],
    points: 3,
  },
  'task-3': {
    id: 'task-3',
    title: 'Implement board drag and drop',
    description: 'Support reorder within columns and moving tasks across lanes.',
    priority: 'urgent',
    assignees: ['IC'],
    dueDate: '2026-05-13',
    labels: ['Kanban', 'UX'],
    points: 8,
  },
  'task-4': {
    id: 'task-4',
    title: 'Review dashboard loading states',
    description: 'Replace placeholders with consistent skeletons and empty states.',
    priority: 'low',
    assignees: ['SA', 'VN'],
    dueDate: '2026-05-20',
    labels: ['Dashboard'],
    points: 2,
  },
  'task-5': {
    id: 'task-5',
    title: 'Wire auth refresh interceptor',
    description: 'Refresh expired access tokens using the stored refresh token.',
    priority: 'high',
    assignees: ['IC'],
    dueDate: '2026-05-11',
    labels: ['Auth'],
    points: 5,
  },
};

export const boardsService = {
  async getBoard() {
    return { columns: initialColumns, tasks: initialTasks };
  },
};
