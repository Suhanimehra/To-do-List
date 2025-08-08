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
    <main className="max-w-4xl mx-auto p-6 min-h-screen">
      <div className="text-center mb-8 float-animation">
        <h1 className="text-2xl font-bold mb-4 text-pink-600 sparkle">
          🌸 Kawaii Todo Princess 🌸
        </h1>
        <p className="text-sm text-pink-500 mb-2">
          ✨ Your magical productivity companion ✨
        </p>
        <div className="flex justify-center gap-2 text-lg">
          <span className="heart-pulse">💕</span>
          <span className="heart-pulse" style={{animationDelay: '0.5s'}}>🌟</span>
          <span className="heart-pulse" style={{animationDelay: '1s'}}>💖</span>
          <span className="heart-pulse" style={{animationDelay: '1.5s'}}>🦄</span>
          <span className="heart-pulse" style={{animationDelay: '2s'}}>🌈</span>
        </div>
      </div>
      
      <div className="space-y-6">
        <SmartInput />
        <TaskForm />
        <FocusTimer />
        <TaskList />
      </div>
      
      {/* Floating kawaii elements */}
      <div className="fixed bottom-4 right-4 text-2xl float-animation" style={{animationDelay: '1s'}}>
        🎀
      </div>
      <div className="fixed top-20 right-8 text-xl float-animation" style={{animationDelay: '2s'}}>
        ✨
      </div>
      <div className="fixed bottom-20 left-4 text-2xl float-animation" style={{animationDelay: '0.5s'}}>
        🌸
      </div>
    </main>
  );
}
