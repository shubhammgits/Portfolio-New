"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Spotify() {
  const [isFading, setIsFading] = useState(false);

  // Spotify playlist URL
  const playlistUrl = "https://open.spotify.com/embed/playlist/3reHqJToLNaswBhYsS0q1P?utm_source=generator&theme=0";

  useEffect(() => {
    // Since we can't control individual tracks in an embedded playlist,
    // we'll create a visual fade effect to simulate track changes
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setIsFading(false);
      }, 1500); // 1.5 second fade duration
    }, 30000); // 30 seconds per "track"

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full py-8">
      <motion.div 
        className="flex justify-end"
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-end space-y-6">
          <div className="w-full max-w-xs">
            <iframe
              style={{ borderRadius: "12px", border: "0" }}
              src={playlistUrl}
              className={`w-full h-40 transition-opacity duration-1500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Playlist"
            ></iframe>
          </div>
        </div>
      </motion.div>
    </div>
  );
}