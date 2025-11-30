'use client';

import { useState } from 'react';
import { useSceneStore } from '@/store/sceneStore';

export default function LikeButton() {
  const likeCount = useSceneStore((state) => state.likeCount);
  const incrementLikes = useSceneStore((state) => state.incrementLikes);
  const [isAnimating, setIsAnimating] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState<Array<{ id: number; x: number; y: number; rotation: number; delay: number }>>([]);

  const handleLike = () => {
    incrementLikes();
    setIsAnimating(true);

    // Generate confetti particles
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 200,
      y: -Math.random() * 300 - 50,
      rotation: Math.random() * 360,
      delay: Math.random() * 0.1,
    }));
    
    setConfettiParticles(particles);

    setTimeout(() => setIsAnimating(false), 300);
    setTimeout(() => setConfettiParticles([]), 1000);
  };

  return (
    <>
      {/* HTML Button */}
      <button
        onClick={handleLike}
        className="fixed bottom-24 right-8 z-50 glass-morph rounded-full p-4 shadow-2xl group hover:scale-110 transition-transform duration-300"
        style={{
          transform: isAnimating ? 'scale(0.9)' : 'scale(1)',
        }}
      >
        <div className="flex flex-col items-center gap-2">
          {/* Heart Icon */}
          <div className="relative">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="text-dm-text transition-all duration-300 group-hover:text-white"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="currentColor"
                opacity="0.3"
              />
            </svg>
            
            {/* Pulse Animation */}
            {isAnimating && (
              <div className="absolute inset-0 animate-ping">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-dm-text"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="currentColor"
                    opacity="0.3"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Counter */}
          <span className="text-dm-text text-sm font-mono mono-counter">
            {likeCount}
          </span>
        </div>
      </button>

      {/* CSS Confetti */}
      {confettiParticles.length > 0 && (
        <div className="fixed bottom-32 right-12 pointer-events-none z-40">
          {confettiParticles.map((particle) => (
            <div
              key={particle.id}
              className="absolute w-3 h-3"
              style={{
                left: '0px',
                top: '0px',
                animation: `confettiFall 1s ease-out forwards`,
                animationDelay: `${particle.delay}s`,
                transform: `translate(${particle.x}px, ${particle.y}px) rotate(${particle.rotation}deg)`,
                backgroundColor: Math.random() > 0.5 ? '#44444E' : '#333446',
                opacity: 0.8,
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
