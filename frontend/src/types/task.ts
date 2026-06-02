export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export type PlanITTask = {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateTaskInput = {
  title: string;
  description?: string;
  dueDate?: string;
  status?: TaskStatus;
};