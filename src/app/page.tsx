'use client';

import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import FocusTimer from '../components/FocusTimer';
import SmartInput from '../components/SmartInput';
import SettingsPanel from '../components/SettingsPanel';
import TaskControls from '../components/TaskControls';
import TaskStats from '../components/TaskStats';
import { useEffect, useState } from 'react';
import { useTasksStore } from '../lib/store';
import Confetti from '../components/Confetti';

export default function Home() {
  const setLocationContext = useTasksStore((state) => state.setLocationContext);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Listen for task completion to trigger confetti
  useEffect(() => {
    const handleTaskComplete = () => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    };
    
    // Create a custom event for task completion
    window.addEventListener('taskCompleted', handleTaskComplete);
    
    return () => {
      window.removeEventListener('taskCompleted', handleTaskComplete);
    };
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocationContext('Home'); // or 'Unknown', 'Office', etc.
      });
    }
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6 min-h-screen pixel-bg">
      {/* Settings Panel */}
      <SettingsPanel />
      
      {/* Confetti Effect */}
      <Confetti active={showConfetti} />
      
      <div className="text-center mb-8 float-animation pixel-border p-4">
        <h1 className="text-2xl font-bold mb-4 text-pink-600 sparkle pixel-text">
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
        <TaskControls />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FocusTimer />
          <TaskStats />
        </div>
        <TaskList />
      </div>
      
      {/* Pixelated decorative elements */}
      <div className="fixed bottom-0 left-0 w-full h-8 bg-pink-100 opacity-30" style={{backgroundSize: '8px 8px', backgroundImage: 'linear-gradient(to right, var(--pink-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--pink-primary) 1px, transparent 1px)'}}></div>
      
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
