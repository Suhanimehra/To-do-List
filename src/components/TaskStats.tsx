// File: src/components/TaskStats.tsx
'use client';

import { useTasksStore } from '../lib/store';

export default function TaskStats() {
  const tasks = useTasksStore((state) => state.tasks);
  
  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Count tasks by priority
  const highPriorityTasks = tasks.filter(task => task.priority === 'High').length;
  const mediumPriorityTasks = tasks.filter(task => task.priority === 'Medium').length;
  const lowPriorityTasks = tasks.filter(task => task.priority === 'Low').length;
  
  // Get all unique tags
  const allTags = new Set<string>();
  tasks.forEach(task => task.tags.forEach(tag => allTags.add(tag)));
  
  return (
    <div className="card-kawaii p-4 mb-6 pixel-bg">
      <h2 className="text-sm font-bold mb-4 text-pink-600 text-center pixel-text">
        📊 Task Statistics 📊
      </h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="pixel-border p-2 text-center">
          <div className="text-xs font-bold mb-1 text-pink-500">✨ Completion</div>
          <div className="relative h-4 bg-pink-100 rounded-full overflow-hidden mb-2">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-400 to-pink-600"
              style={{ width: `${completionRate}%`, transition: 'width 1s ease-in-out' }}
            />
          </div>
          <div className="text-xs text-pink-600">{completionRate}% Complete</div>
        </div>
        
        <div className="pixel-border p-2 text-center">
          <div className="text-xs font-bold mb-1 text-pink-500">🔢 Counts</div>
          <div className="flex justify-around">
            <div className="text-center">
              <div className="text-xs font-bold text-pink-600">{totalTasks}</div>
              <div className="text-[8px] text-pink-400">Total</div>
            </div>
            <div className="text-center">
              <div className="text-xs font-bold text-green-500">{activeTasks}</div>
              <div className="text-[8px] text-pink-400">Active</div>
            </div>
            <div className="text-center">
              <div className="text-xs font-bold text-purple-500">{completedTasks}</div>
              <div className="text-[8px] text-pink-400">Done</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        <div className="pixel-border p-2">
          <div className="text-xs font-bold mb-2 text-pink-500 text-center">⭐ Priority Breakdown</div>
          <div className="flex justify-around">
            <div className="text-center">
              <div className="text-xs font-bold text-red-500">{highPriorityTasks}</div>
              <div className="text-[8px] text-pink-400">🔥 High</div>
            </div>
            <div className="text-center">
              <div className="text-xs font-bold text-yellow-500">{mediumPriorityTasks}</div>
              <div className="text-[8px] text-pink-400">⭐ Medium</div>
            </div>
            <div className="text-center">
              <div className="text-xs font-bold text-blue-500">{lowPriorityTasks}</div>
              <div className="text-[8px] text-pink-400">🌸 Low</div>
            </div>
          </div>
        </div>
      </div>
      
      {allTags.size > 0 && (
        <div className="mt-4 pixel-border p-2">
          <div className="text-xs font-bold mb-2 text-pink-500 text-center">🏷️ Tags</div>
          <div className="flex flex-wrap gap-1 justify-center">
            {Array.from(allTags).map((tag, index) => (
              <span 
                key={index}
                className="text-[8px] bg-pink-100 text-pink-600 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}