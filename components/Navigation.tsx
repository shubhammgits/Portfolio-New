'use client';

import { useState } from 'react';
import { useSceneStore } from '@/store/sceneStore';

const navItems = [
  { id: 0, label: 'Home', icon: '◆' },
  { id: 1, label: 'About', icon: '◇' },
  { id: 2, label: 'Projects', icon: '◈' },
  { id: 3, label: 'Contact', icon: '◉' },
];

export default function Navigation() {
  const currentSection = useSceneStore((state) => state.currentSection);
  const setCurrentSection = useSceneStore((state) => state.setCurrentSection);
  const [magneticOffset, setMagneticOffset] = useState<{ [key: number]: { x: number; y: number } }>({});

  const handleMagneticMove = (e: React.MouseEvent, itemId: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    const maxDistance = 30;
    const offsetX = Math.max(-maxDistance, Math.min(maxDistance, deltaX * 0.3));
    const offsetY = Math.max(-maxDistance, Math.min(maxDistance, deltaY * 0.3));

    setMagneticOffset(prev => ({
      ...prev,
      [itemId]: { x: offsetX, y: offsetY }
    }));
  };

  const handleMagneticLeave = (itemId: number) => {
    setMagneticOffset(prev => ({
      ...prev,
      [itemId]: { x: 0, y: 0 }
    }));
  };

  const scrollToSection = (sectionId: number) => {
    setCurrentSection(sectionId);
    const sectionHeight = window.innerHeight;
    window.scrollTo({
      top: sectionId * sectionHeight,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="glass-morph rounded-full px-6 py-4 shadow-2xl">
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const offset = magneticOffset[item.id] || { x: 0, y: 0 };
              const isActive = currentSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseMove={(e) => handleMagneticMove(e, item.id)}
                  onMouseLeave={() => handleMagneticLeave(item.id)}
                  className="magnetic-button group relative px-5 py-3 rounded-full transition-all duration-300"
                  style={{
                    transform: `translate(${offset.x}px, ${offset.y}px)`,
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-dm-text text-lg">{item.icon}</span>
                    <span
                      className={`text-sm font-medium transition-all duration-300 ${
                        isActive ? 'text-dm-text opacity-100' : 'text-dm-text opacity-60'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  {/* Hover Glow */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Shadow Effect (CSS-based 3D shadow simulation) */}
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-30 -z-10"
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            transform: 'translateY(10px) scale(0.95)',
          }}
        />
      </nav>

      {/* Alternative: Vertical Left Navigation (Commented) */}
      {/* <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-50">
        <div className="glass-morph rounded-full px-4 py-6">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="magnetic-button group w-12 h-12 rounded-full flex items-center justify-center transition-all"
                style={{
                  backgroundColor: currentSection === item.id ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                }}
              >
                <span className="text-dm-text text-xl">{item.icon}</span>
              </button>
            ))}
          </div>
        </div>
      </nav> */}
    </>
  );
}
