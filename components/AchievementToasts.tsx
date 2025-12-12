'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSceneStore } from '@/store/sceneStore';

type Toast = {
  id: number;
  title: string;
  detail?: string;
};

export default function AchievementToasts() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress);
  const likeCount = useSceneStore((s) => s.likeCount);

  const [toasts, setToasts] = useState<Toast[]>([]);
  const fired = useRef<Set<string>>(new Set());
  const once = useCallback((key: string) => {
    if (fired.current.has(key)) return false;
    fired.current.add(key);
    return true;
  }, []);
  const prevLikes = useRef<number>(likeCount);

  const pushToast = (title: string, detail?: string) => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((t) => [...t, { id, title, detail }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 2600);
  };

  useEffect(() => {
    if (scrollProgress > 0.02 && once('boot')) {
      pushToast('Achievement Unlocked', 'Boot sequence complete');
    }
    if (scrollProgress > 0.25 && once('about')) {
      pushToast('Achievement Unlocked', 'Lore Hunter (About reached)');
    }
    if (scrollProgress > 0.55 && once('projects')) {
      pushToast('Achievement Unlocked', 'Loot Goblin (Projects reached)');
    }
    if (scrollProgress > 0.92 && once('contact')) {
      pushToast('Achievement Unlocked', 'Final Boss (Contact reached)');
    }
  }, [scrollProgress, once]);

  useEffect(() => {
    if (likeCount > prevLikes.current && once('like')) {
      pushToast('Achievement Unlocked', 'Confetti Summoner');
    }
    prevLikes.current = likeCount;
  }, [likeCount, once]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div className="flex flex-col gap-3">
        {toasts.map((t) => (
          <div key={t.id} className="achievement-toast glass-morph rounded-2xl border border-white/10 px-4 py-3 w-[360px]">
            <div className="flex items-start gap-3">
              <div className="mt-1 w-2.5 h-2.5 rounded-full bg-dm-primary shadow-[0_0_18px_rgba(109,40,217,0.55)]" />
              <div>
                <div className="text-sm font-semibold text-dm-text">{t.title}</div>
                {t.detail && <div className="text-xs text-body mt-0.5">{t.detail}</div>}
              </div>
              <div className="ml-auto text-xs text-body">+10 XP</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
