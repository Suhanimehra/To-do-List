// File: src/lib/store.ts
import { create } from 'zustand';

export type Priority = 'High' | 'Medium' | 'Low';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  priority: Priority;
  tags: string[];
  completed: boolean;
}

interface TaskStore {
  tasks: Task[];
  locationContext: string | null;
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
  setLocationContext: (location: string) => void;
}

export const useTasksStore = create<TaskStore>((set) => ({
  tasks: [],
  locationContext: null,

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),

  setTasks: (tasks) => set(() => ({ tasks })),

  setLocationContext: (location) => set(() => ({ locationContext: location })),
}));
