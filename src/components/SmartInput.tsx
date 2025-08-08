// File: components/SmartInput.tsx
'use client';

import { useState } from 'react';
import { useTasksStore } from '../lib/store';
import { v4 as uuidv4 } from 'uuid';

export default function SmartInput() {
  const addTask = useTasksStore((state) => state.addTask);
  const [input, setInput] = useState('');

  const handleSmartInput = () => {
    const match = input.match(/Add for (.+?) at (.+)/i);
    if (match) {
      const [, title, day, time] = match;
      const dueDate = new Date(`${day} ${time}`);

      // Ensure valid date
      if (isNaN(dueDate.getTime())) {
        alert('Invalid date format.');
        return;
      }

      const newTask = {
        id: uuidv4(),
        title,
        description: '',
        dueDate: dueDate.toISOString(),
        priority: 'Medium' as 'High' | 'Medium' | 'Low',
        tags: [],
        completed: false,
      };

      addTask(newTask);
      setInput('');
    } else {
      alert('Please use format: Add task for <day> at <time>');
    }
  };

  return (
    <div className="card-kawaii p-6 mb-6">
      <h2 className="text-lg font-bold mb-4 text-pink-600 text-center">
        🪄 Magic Command Center 🪄
      </h2>
      <p className="text-xs text-pink-500 mb-4 text-center">
        ✨ Use natural language to create tasks! ✨
      </p>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder='🌟 Try: Add "call mom" for tomorrow at 2 PM'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full input-kawaii pr-12"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-400">🎭</span>
      </div>
      <div className="text-center">
        <button
          className="btn-kawaii px-6 py-3 rounded-xl font-bold sparkle"
          onClick={handleSmartInput}
        >
          🪄 Cast Magic Spell 🪄
        </button>
      </div>
      <div className="mt-4 text-xs text-pink-400 text-center">
        💡 Example: Add "study for exam" for Friday at 3 PM
      </div>
    </div>
  );
}
