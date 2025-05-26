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
    <div className="bg-black-50 p-4 rounded-xl shadow mb-6">
      <input
        type="text"
        placeholder='e.g. Add "call mom" for tomorrow at 2 PM'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSmartInput}
      >
        Parse Command
      </button>
    </div>
  );
}
