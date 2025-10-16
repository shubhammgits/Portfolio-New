"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolioLikes', (likes + 1).toString());
      }
    }
  };

  useState(() => {
    if (typeof window !== 'undefined') {
      const savedLikes = localStorage.getItem('portfolioLikes');
      if (savedLikes) {
        setLikes(parseInt(savedLikes));
      }
    }
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleLike}
        className={`flex items-center justify-center w-12 h-12 rounded-full ${
          isLiked 
            ? 'bg-red-500 text-white' 
            : 'bg-[#1414149c] text-[var(--white-icon)] border border-[var(--white-icon-tr)]'
        } transition-colors duration-300`}
        aria-label="Like this portfolio"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={isLiked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          className="w-6 h-6"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </motion.button>
      <motion.p 
        className="mt-2 text-[var(--white-icon)] text-sm"
        animate={{ scale: isLiked ? 1.2 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 10 }}
      >
        {likes}
      </motion.p>
    </div>
  );
}