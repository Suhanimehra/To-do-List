// File: src/components/TaskForm.tsx
'use client';

import { useState } from 'react';
import { useTasksStore } from '../lib/store';

export default function TaskForm() {
  const addTask = useTasksStore((state) => state.addTask);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [tags, setTags] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      id: Date.now().toString(),
      title,
      description,
      dueDate,
      priority,
      tags: tags.split(',').map(tag => tag.trim()),
      completed: false,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Medium');
    setTags('');
  };

  return (
    <div className="card-kawaii p-6 mb-6">
      <h2 className="text-lg font-bold mb-4 text-pink-600 text-center">
        🌟 Create New Task 🌟
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="✨ What magical task shall we add? ✨"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full input-kawaii"
            required
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-400">💖</span>
        </div>
        
        <div className="relative">
          <textarea
            placeholder="🌸 Tell me more about this task... 🌸"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full input-kawaii min-h-[80px] resize-none"
            rows={3}
          />
          <span className="absolute right-3 top-3 text-pink-400">🦄</span>
        </div>
        
        <div className="relative">
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full input-kawaii"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-400">⏰</span>
        </div>
        
        <div className="relative">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'High' | 'Medium' | 'Low')}
            className="w-full input-kawaii appearance-none cursor-pointer"
          >
            <option value="High">🔥 Super Important!</option>
            <option value="Medium">⭐ Pretty Important</option>
            <option value="Low">🌸 When I have time</option>
          </select>
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-400 pointer-events-none">💫</span>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="🏷️ Tags (comma separated) - like #cute, #work"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full input-kawaii"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-400">🎀</span>
        </div>
        
        <div className="text-center pt-2">
          <button
            type="submit"
            className="btn-kawaii px-8 py-3 rounded-xl font-bold sparkle"
          >
            ✨ Add Magical Task ✨
          </button>
        </div>
      </form>
    </div>
  );
}
