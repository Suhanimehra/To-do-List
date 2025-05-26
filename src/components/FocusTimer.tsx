// File: components/FocusTimer.tsx
'use client'
import { useEffect, useState } from "react";

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
    <div className="bg-yellow-50 p-4 rounded-xl shadow mb-6 flex justify-between items-center">
      <div className="text-black font-semibold">🧘 Focus Timer: {formatTime(seconds)}</div>
      <button className="btn text-black" onClick={() => setActive(!active)}>{active ? 'Pause' : 'Start Focus'}</button>
    </div>
  );
}