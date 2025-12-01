'use client';

import { useEffect, useState } from 'react';
import { useSceneStore } from '@/store/sceneStore';

export default function LoadingScreen() {
  const setIsLoading = useSceneStore((state) => state.setIsLoading);
  const setLoadingProgress = useSceneStore((state) => state.setLoadingProgress);
  const [shouldHide, setShouldHide] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prev + Math.random() * 15, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setLoadingProgress(progress);

    if (progress >= 100) {
      // Wait before hiding
      setTimeout(() => {
        setShouldHide(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 800); // Match CSS transition
      }, 500);
    }
  }, [progress, setIsLoading, setLoadingProgress]);

  return (
    <div
      className={`loading-screen ${shouldHide ? 'fade-out' : ''}`}
      style={{
        background: 'linear-gradient(135deg, #222222 0%, #313647 100%)',
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Animated Wireframe CSS */}
        <div className="relative">
          {/* Rotating Hexagon */}
          <div 
            className="w-32 h-32 border-2 border-dm-primary"
            style={{
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
              animation: 'spin 3s linear infinite',
              opacity: 0.8,
              transform: `scale(${progress / 100})`,
              transition: 'transform 0.3s ease-out'
            }}
          />
          
          {/* Inner Glow */}
          <div 
            className="absolute inset-0 w-32 h-32 bg-dm-text"
            style={{
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
              opacity: 0.1,
              transform: `scale(${(progress / 100) * 0.9})`,
              transition: 'transform 0.3s ease-out'
            }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <div className="text-center">
            <div className="text-6xl font-mono mono-counter text-dm-text mb-2">
              {Math.round(progress)}%
            </div>
            <div className="text-sm text-body tracking-widest uppercase">
              Loading Experience
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64">
          <div className="h-px bg-dm-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-dm-text transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
