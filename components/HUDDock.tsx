'use client';

import { useMemo } from 'react';
import { useSceneStore } from '@/store/sceneStore';
import { portfolio } from '@/lib/portfolio';

const sectionLabels = ['Home', 'About', 'Projects', 'Projects+', 'Contact'] as const;
const sectionFlavors = [
  'Spawning into the void…',
  'Lore drop unlocked.',
  'Loot table: repos.',
  'Side quest: pick a project.',
  'Final boss: say hi.',
] as const;

export default function HUDDock() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress);
  const currentSection = useSceneStore((s) => s.currentSection);

  const level = useMemo(() => {
    // Levels 1..5 mapped to 0..1 scroll
    return Math.min(5, Math.max(1, Math.floor(scrollProgress * 5) + 1));
  }, [scrollProgress]);

  const percent = Math.round(scrollProgress * 100);
  const label = sectionLabels[currentSection] ?? '???';
  const flavor = sectionFlavors[currentSection] ?? '…';

  return (
    <aside className="fixed left-6 bottom-6 z-50 pointer-events-auto">
      <div className="glass-morph rounded-3xl border border-white/10 w-[320px] overflow-hidden">
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs text-body">LEVEL</div>
              <div className="text-2xl font-semibold text-dm-text leading-none">{level}</div>
              <div className="mt-2 text-xs text-body">{label}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-body">XP</div>
              <div className="text-sm text-dm-text/90 font-mono">{percent}%</div>
              <div className="mt-2 text-[11px] text-body">{flavor}</div>
            </div>
          </div>

          <div className="mt-3 h-2 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full bg-dm-primary"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        <div className="px-4 pb-4 flex flex-wrap gap-2">
          {portfolio.socials.slice(0, 3).map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-dm-text/90 hover:text-dm-text hover:bg-white/10 transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}
