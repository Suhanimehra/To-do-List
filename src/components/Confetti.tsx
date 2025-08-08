// File: src/components/Confetti.tsx
'use client';

import { useEffect, useState } from 'react';

interface ConfettiProps {
  active: boolean;
  duration?: number;
  pieces?: number;
}

export default function Confetti({ active, duration = 3000, pieces = 50 }: ConfettiProps) {
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);
  
  useEffect(() => {
    if (active) {
      // Create confetti pieces
      const newPieces = Array.from({ length: pieces }, (_, i) => {
        const colors = ['#ff69b4', '#ffb6c1', '#ff1493', '#c71585', '#ffc0cb'];
        const shapes = ['circle', 'square', 'triangle'];
        
        // Random position, color, rotation, etc.
        const style: React.CSSProperties = {
          position: 'fixed',
          left: `${Math.random() * 100}vw`,
          top: '-20px',
          width: `${Math.random() * 10 + 5}px`,
          height: `${Math.random() * 10 + 5}px`,
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          borderRadius: shapes[Math.floor(Math.random() * shapes.length)] === 'circle' ? '50%' : '0',
          transform: `rotate(${Math.random() * 360}deg)`,
          opacity: 0,
          animation: `confetti-fall ${Math.random() * 2 + 2}s linear forwards, confetti-sway ${Math.random() * 2 + 1}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 0.5}s`,
        };
        
        // Create triangle shape for some pieces
        if (shapes[Math.floor(Math.random() * shapes.length)] === 'triangle') {
          style.width = '0';
          style.height = '0';
          style.backgroundColor = 'transparent';
          style.borderLeft = `${Math.random() * 5 + 5}px solid transparent`;
          style.borderRight = `${Math.random() * 5 + 5}px solid transparent`;
          style.borderBottom = `${Math.random() * 10 + 10}px solid ${colors[Math.floor(Math.random() * colors.length)]}`;
        }
        
        return {
          id: i,
          style,
        };
      });
      
      setConfettiPieces(newPieces);
      
      // Clean up after duration
      const timer = setTimeout(() => {
        setConfettiPieces([]);
      }, duration);
      
      return () => clearTimeout(timer);
    } else {
      setConfettiPieces([]);
    }
  }, [active, duration, pieces]);
  
  if (!active && confettiPieces.length === 0) return null;
  
  return (
    <div className="confetti-container" style={{ pointerEvents: 'none' }}>
      {confettiPieces.map((piece) => (
        <div key={piece.id} className="confetti active" style={piece.style} />
      ))}
    </div>
  );
}