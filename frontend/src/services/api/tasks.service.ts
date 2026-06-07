import { initialTasks } from './boards.service';

export const tasksService = {
  async get(id: string) {
    return initialTasks[id] ?? Object.values(initialTasks)[0];
  },
};
