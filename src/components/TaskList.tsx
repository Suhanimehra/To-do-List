// File: src/components/TaskList.tsx
'use client';

import { useTasksStore } from '../lib/store';

export default function TaskList() {
  const tasks = useTasksStore((state) => state.tasks);
  const toggleTask = useTasksStore((state) => state.toggleTask);
  const deleteTask = useTasksStore((state) => state.deleteTask);

  if (tasks.length === 0) {
    return <p className="text-gray-500">No tasks added yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`p-4 border rounded shadow-sm ${
            task.completed ? 'bg-green-100 line-through' : 'bg-white'
          }`}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-black font-semibold">{task.title}</h3>
              {task.description && (
                <p className="text-lg text-blue-600">{task.description}</p>
              )}
              <p className="text-sm text-black">
                <strong>Due:</strong> {task.dueDate || 'N/A'} |{' '}
                <strong>Priority:</strong> {task.priority}
              </p>
              <p className="text-sm">
                <strong>Tags:</strong> {task.tags.join(', ')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleTask(task.id)}
                className="text-sm px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
              >
                {task.completed ? 'Undo' : 'Done'}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
