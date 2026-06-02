import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Task {
  id: string;
  subject: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  duration: number;
  notes: string;
  aiEnabled: boolean;
  done: boolean;
  createdAt: string;
}

interface TaskStore {
  tasks: Task[];
  draft: Partial<Task>;
  setDraft: (data: Partial<Task>) => void;
  addTask: (task: Task) => void;
  setTasks: (tasks: Task[]) => void;
  toggleDone: (id: string) => void;
  deleteTask: (id: string) => void;
  clearDraft: () => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      draft: {},
      setDraft: (data) => set((state) => ({ draft: { ...state.draft, ...data } })),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      setTasks: (tasks) => set({ tasks }),
      toggleDone: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
      clearDraft: () => set({ draft: {} }),
    }),
    { name: 'planit-tasks' },
  ),
);