// File: src/lib/store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Priority = 'High' | 'Medium' | 'Low';
export type SortOption = 'dueDate' | 'priority' | 'title' | 'created';
export type FilterOption = 'all' | 'active' | 'completed' | 'highPriority' | 'tag';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate?: string;
  priority: Priority;
  tags: string[];
  completed: boolean;
  createdAt: number; // Timestamp for sorting by creation date
}

interface TaskStore {
  tasks: Task[];
  locationContext: string | null;
  sortBy: SortOption;
  filterBy: FilterOption;
  filterTag: string;
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
  setLocationContext: (location: string) => void;
  setSortBy: (option: SortOption) => void;
  setFilterBy: (option: FilterOption, tag?: string) => void;
  getFilteredAndSortedTasks: () => Task[];
  clearCompletedTasks: () => void;
}

export const useTasksStore = create<TaskStore>(
  persist(
    (set, get) => ({
      tasks: [],
      locationContext: null,
      sortBy: 'created',
      filterBy: 'all',
      filterTag: '',

      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, {
            ...task,
            createdAt: Date.now() // Add timestamp for sorting
          }],
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
      
      setSortBy: (option) => set(() => ({ sortBy: option })),
      
      setFilterBy: (option, tag = '') => set(() => ({ 
        filterBy: option,
        filterTag: option === 'tag' ? tag : ''
      })),
      
      getFilteredAndSortedTasks: () => {
        const { tasks, sortBy, filterBy, filterTag } = get();
        
        // First filter the tasks
        let filteredTasks = [...tasks];
        
        switch (filterBy) {
          case 'active':
            filteredTasks = filteredTasks.filter(task => !task.completed);
            break;
          case 'completed':
            filteredTasks = filteredTasks.filter(task => task.completed);
            break;
          case 'highPriority':
            filteredTasks = filteredTasks.filter(task => task.priority === 'High');
            break;
          case 'tag':
            if (filterTag) {
              filteredTasks = filteredTasks.filter(task => 
                task.tags.some(tag => tag.toLowerCase() === filterTag.toLowerCase())
              );
            }
            break;
          // 'all' shows everything, so no filtering needed
        }
        
        // Then sort the filtered tasks
        return filteredTasks.sort((a, b) => {
          switch (sortBy) {
            case 'dueDate':
              // Handle tasks without due dates (put them at the end)
              if (!a.dueDate) return 1;
              if (!b.dueDate) return -1;
              return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            
            case 'priority':
              const priorityValues = { 'High': 0, 'Medium': 1, 'Low': 2 };
              return priorityValues[a.priority] - priorityValues[b.priority];
            
            case 'title':
              return a.title.localeCompare(b.title);
            
            case 'created':
            default:
              return (b.createdAt || 0) - (a.createdAt || 0); // Newest first
          }
        });
      },
      
      clearCompletedTasks: () => 
        set((state) => ({
          tasks: state.tasks.filter(task => !task.completed)
        })),
    }),
    {
      name: 'kawaii-todo-storage', // Name for localStorage
    }
  )
);
