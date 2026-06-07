export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export interface Project {
  id: string;
  name: string;
  key: string;
  description: string;
  status: 'active' | 'paused' | 'archived';
  progress: number;
  members: number;
  updatedAt: string;
}

export interface BoardColumn {
  id: string;
  title: string;
  color: string;
  taskIds: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  assignees: string[];
  dueDate: string;
  labels: string[];
  points: number;
}

export interface UserRow {
  id: string;
  email: string;
  username: string;
  roles: Array<string | { id: string; name: string }>;
  isActive: boolean;
  lastLoginAt?: string | null;
}

export interface RoleRow {
  id: string;
  name: string;
  description?: string | null;
  permissions?: PermissionRow[];
}

export interface PermissionRow {
  id: string;
  name: string;
  resource?: string | null;
  action?: string | null;
  description?: string | null;
}
