'use client';

import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import FocusTimer from '../components/FocusTimer';
import SmartInput from '../components/SmartInput';
import { useEffect } from 'react';
import { useTasksStore } from '../lib/store';

export default function Home() {
  const setLocationContext = useTasksStore((state) => state.setLocationContext);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocationContext('Home'); // or 'Unknown', 'Office', etc.

      });
    }
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Context-Aware To-Do List</h1>
      <SmartInput />
      <TaskForm />
      <FocusTimer />
      <TaskList />
    </main>
  );
}
