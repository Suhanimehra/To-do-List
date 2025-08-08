// File: src/components/TaskList.tsx
'use client';

import { useTasksStore } from '../lib/store';

export default function TaskList() {
  const tasks = useTasksStore((state) => state.tasks);
  const toggleTask = useTasksStore((state) => state.toggleTask);
  const deleteTask = useTasksStore((state) => state.deleteTask);

  if (tasks.length === 0) {
    return (
      <div className="card-kawaii p-8 text-center pixel-bg">
        <div className="text-4xl mb-4 pixel-border p-2">🌸</div>
        <p className="text-pink-500 text-sm pixel-text">
          No magical tasks yet! ✨<br />
          Add your first kawaii task above! 💕
        </p>
      </div>
    );
  }

  const getPriorityEmoji = (priority: string) => {
    switch (priority) {
      case 'High': return '🔥';
      case 'Medium': return '⭐';
      case 'Low': return '🌸';
      default: return '💫';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-pink-600 text-center mb-4 pixel-text">
        🦄 Your Magical Tasks 🦄
      </h2>
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className={`card-kawaii p-4 transition-all duration-300 hover:scale-[1.02] pixel-border ${
            task.completed ? 'opacity-75 bg-gradient-to-r from-pink-50 to-purple-50' : ''
          }`}
          style={{ animationDelay: `${index * 0.1}s`, imageRendering: 'pixelated' }}
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{getPriorityEmoji(task.priority)}</span>
                <h3 className={`font-semibold text-pink-700 ${
                  task.completed ? 'line-through opacity-60' : ''
                }`}>
                  {task.title}
                </h3>
                {task.completed && <span className="text-lg">✅</span>}
              </div>
              
              {task.description && (
                <p className={`text-xs text-pink-600 mb-2 ${
                  task.completed ? 'line-through opacity-60' : ''
                }`}>
                  🌟 {task.description}
                </p>
              )}
              
              <div className="flex flex-wrap gap-2 text-xs">
                {task.dueDate && (
                  <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                    ⏰ {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                  {getPriorityEmoji(task.priority)} {task.priority}
                </span>
              </div>
              
              {task.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {task.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-pink-200 text-pink-800 px-2 py-1 rounded-full text-xs pixel-bg"
                      style={{ imageRendering: 'pixelated' }}
                    >
                      🏷️ {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-2">
              <button
                onClick={() => toggleTask(task.id)}
                className={`text-xs px-3 py-2 rounded-xl font-bold transition-all ${
                  task.completed
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:from-yellow-500 hover:to-orange-500'
                    : 'bg-gradient-to-r from-green-400 to-emerald-400 text-white hover:from-green-500 hover:to-emerald-500'
                }`}
                style={{ imageRendering: 'pixelated' }}
              >
                {task.completed ? '↩️ Undo' : '✨ Done'}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-xs px-3 py-2 bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-xl hover:from-red-500 hover:to-pink-500 font-bold transition-all"
                style={{ imageRendering: 'pixelated' }}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
