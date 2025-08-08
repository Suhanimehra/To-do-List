// File: src/components/SettingsPanel.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../lib/theme-context';
import { toggleSounds, isSoundsEnabled } from '../lib/sounds';

export default function SettingsPanel() {
  const { theme, toggleTheme } = useTheme();
  const [soundsOn, setSoundsOn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // Initialize sound state
  useEffect(() => {
    setSoundsOn(isSoundsEnabled());
  }, []);
  
  const handleSoundToggle = () => {
    const newState = toggleSounds();
    setSoundsOn(newState);
  };
  
  return (
    <div className="fixed top-4 right-4 z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="btn-kawaii p-2 rounded-full glitch"
        aria-label="Settings"
      >
        ⚙️
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 card-kawaii p-4 pixel-border">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-xs">🌙 Dark Mode</span>
              <button 
                onClick={toggleTheme}
                className={`relative w-12 h-6 rounded-full transition-colors ${theme === 'dark' ? 'bg-pink-400' : 'bg-gray-300'}`}
                aria-label="Toggle dark mode"
              >
                <span 
                  className={`absolute top-1 w-4 h-4 rounded-full transition-transform transform ${theme === 'dark' ? 'translate-x-7 bg-purple-800' : 'translate-x-1 bg-white'}`}
                />
              </button>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs">🔊 Sounds</span>
              <button 
                onClick={handleSoundToggle}
                className={`relative w-12 h-6 rounded-full transition-colors ${soundsOn ? 'bg-pink-400' : 'bg-gray-300'}`}
                aria-label="Toggle sounds"
              >
                <span 
                  className={`absolute top-1 w-4 h-4 rounded-full transition-transform transform ${soundsOn ? 'translate-x-7 bg-pink-600' : 'translate-x-1 bg-white'}`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}