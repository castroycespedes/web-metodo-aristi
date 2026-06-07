import type { Project } from '@/types/domain';

export const projects: Project[] = [
  {
    id: 'project-1',
    name: 'Metodo Aristi',
    key: 'TF',
    description: 'Core SaaS workspace, auth and Kanban experience.',
    status: 'active',
    progress: 72,
    members: 8,
    updatedAt: '2026-05-12',
  },
  {
    id: 'project-2',
    name: 'Mobile Companion',
    key: 'MOB',
    description: 'Responsive workflows and push-ready task views.',
    status: 'active',
    progress: 38,
    members: 5,
    updatedAt: '2026-05-10',
  },
  {
    id: 'project-3',
    name: 'Customer Ops',
    key: 'OPS',
    description: 'Operational boards for onboarding and support.',
    status: 'paused',
    progress: 54,
    members: 4,
    updatedAt: '2026-05-08',
  },
];

export const projectsService = {
  async list() {
    return projects;
  },
  async get(id: string) {
    return projects.find((project) => project.id === id) ?? projects[0];
  },
};
