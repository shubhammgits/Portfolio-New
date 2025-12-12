'use client';

import { portfolio } from '@/lib/portfolio';

export default function SpotifyPeek() {
  const { playlistId, playlistTitle } = portfolio.spotify;
  const src = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`;

  return (
    <aside
      className={
        "fixed top-24 right-0 z-50 pointer-events-auto translate-x-[72%] hover:translate-x-0 transition-transform duration-500"
      }
      aria-label="Spotify playlist"
    >
      <div className="glass-morph rounded-l-3xl border border-white/10 w-[340px] overflow-hidden">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-dm-text/70" />
            <div>
              <div className="text-sm text-dm-text font-medium">Now vibing</div>
              <div className="text-xs text-body">{playlistTitle}</div>
            </div>
          </div>
          <a
            href={`https://open.spotify.com/playlist/${playlistId}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-dm-text/80 hover:text-dm-text transition-colors"
          >
            Open
          </a>
        </div>

        <div className="h-[152px] bg-dm-bg-dark">
          <iframe
            title={`Spotify playlist: ${playlistTitle}`}
            src={src}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="border-0"
          />
        </div>

        <div className="px-4 py-3 text-xs text-body">
          Hover me like a secret level.
        </div>
      </div>
    </aside>
  );
}
