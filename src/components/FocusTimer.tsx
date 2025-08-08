// File: components/FocusTimer.tsx
'use client'
import { useEffect, useState } from "react";
import { playSound } from '../lib/sounds';

export default function FocusTimer() {
  const [seconds, setSeconds] = useState(1500); // 25 min
  const [active, setActive] = useState(false);

  useEffect(() => {
    let interval: any;
    if (active && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [active, seconds]);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="card-kawaii p-6 mb-6">
      <h2 className="text-lg font-bold mb-4 text-pink-600 text-center pixel-text">
        🌸 Kawaii Focus Timer 🌸
      </h2>
      <div className="text-center mb-4 pixel-bg p-4">
        <div className="text-3xl font-bold text-pink-700 mb-2 sparkle" style={{imageRendering: 'pixelated'}}>
          {formatTime(seconds)}
        </div>
        <div className="flex justify-center gap-2 text-lg mb-4">
          <span className={`heart-pulse ${active ? 'text-pink-500' : 'text-pink-300'}`}>🌟</span>
          <span className={`heart-pulse ${active ? 'text-pink-500' : 'text-pink-300'}`} style={{animationDelay: '0.5s'}}>💖</span>
          <span className={`heart-pulse ${active ? 'text-pink-500' : 'text-pink-300'}`} style={{animationDelay: '1s'}}>🦄</span>
        </div>
        <p className="text-xs text-pink-500 mb-4">
          {active ? '✨ You\'re doing amazing! Stay focused! ✨' : '🌸 Ready to focus on your magical tasks? 🌸'}
        </p>
      </div>
      <div className="text-center">
        <button 
          className={`btn-kawaii px-6 py-3 rounded-xl font-bold transition-all ${
            active ? 'sparkle' : ''
          }`}
          onClick={() => {
            setActive(!active);
            playSound('click');
            
            // Add animation
            const button = document.activeElement as HTMLElement;
            if (button) {
              button.classList.add(active ? 'shake' : 'celebrate');
              setTimeout(() => button.classList.remove(active ? 'shake' : 'celebrate'), 500);
            }
          }}
          style={{imageRendering: 'pixelated'}}
        >
          {active ? '⏸️ Pause Magic' : '▶️ Start Focus Magic'}
        </button>
      </div>
      {active && (
        <div className="mt-4 text-center pixel-border p-2">
          <div className="text-xs text-pink-400">
            💫 Focus mode activated! You got this, princess! 💫
          </div>
        </div>
      )}
    </div>
  );
}