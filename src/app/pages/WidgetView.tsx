import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { twMerge } from 'tailwind-merge';

export function WidgetView() {
  const [slashed, setSlashed] = useState(false);

  const handleSlash = () => {
    if (slashed) return;
    setSlashed(true);
    setTimeout(() => setSlashed(false), 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] w-full px-6">
      
      {/* Description */}
      <div className="mb-12 text-center max-w-md">
        <h2 className="font-['Julius_Sans_One'] text-lg tracking-[0.5em] text-white/40 uppercase mb-4">组件概念</h2>
        <p className="font-['Outfit'] font-light text-white/30 text-sm">一个 2x2 桌面小组件，用于快速查看和斩杀任务。</p>
      </div>

      {/* Mock Home Screen Background / Grid */}
      <div className="relative w-72 h-72 border border-white/5 rounded-[40px] bg-gradient-to-b from-white/[0.02] to-transparent flex items-center justify-center p-6 shadow-2xl overflow-hidden group">
        
        {/* Mock Android Grid Dots */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px', backgroundPosition: 'center' }}></div>

        {/* The Widget Itself */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
          animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-40 h-40 rounded-[28px] bg-[#050505]/40 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center overflow-hidden hover:border-[#c94c4c]/30 transition-colors duration-500"
        >
          {/* Subtle widget inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#c94c4c]/5 to-transparent pointer-events-none" />

          {/* Creature Container */}
          <div className="relative w-16 h-16 mb-2 flex flex-col items-center justify-center">
            {/* Ambient breathing glow behind creature */}
            <motion.div
              className="absolute inset-0 rounded-full bg-[#c94c4c]/20 blur-xl"
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Floating Silhouette */}
            <motion.svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 drop-shadow-[0_0_8px_rgba(0,0,0,1)]"
            >
              <path
                d="M12 1C7 1 5 6 5 11C5 15 4 18 3 22C6 21.5 8 20.5 9.5 19.5C10.5 20.5 13.5 20.5 14.5 19.5C16 20.5 18 21.5 21 22C20 18 19 15 19 11C19 6 17 1 12 1Z"
                fill="#0a0a0a"
                stroke="#3a1f1f"
                strokeWidth="0.5"
              />
              {/* Boss eyes */}
              <motion.ellipse
                cx="9.5" cy="10.5" rx="2" ry="3" fill="#f0cccc"
                style={{ filter: 'drop-shadow(0 0 4px #c94c4c)' }}
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 4, times: [0, 0.05, 0.1], repeat: Infinity, repeatDelay: 2 }}
              />
              <motion.ellipse
                cx="14.5" cy="10.5" rx="2" ry="3" fill="#f0cccc"
                style={{ filter: 'drop-shadow(0 0 4px #c94c4c)' }}
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 4, times: [0, 0.05, 0.1], repeat: Infinity, repeatDelay: 2.5 }}
              />
              <motion.ellipse
                cx="12" cy="8" rx="1" ry="1.5" fill="#f0cccc"
                style={{ filter: 'drop-shadow(0 0 3px #c94c4c)' }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.svg>
          </div>

          {/* Task Title */}
          <div className="w-full px-4 text-center z-10">
            <p className="font-['Outfit'] font-extralight text-[10px] text-[#c94c4c]/70 tracking-[0.2em] uppercase mb-1">Boss</p>
            <p className="font-['Outfit'] font-extralight text-xs text-white/90 tracking-widest truncate drop-shadow-md">
              Slay the Soul Master
            </p>
          </div>

          {/* Sharp Slash Button */}
          <motion.button 
            whileHover={{ scale: 1.1, backgroundColor: "rgba(201,76,76,0.15)" }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSlash}
            className="absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center border border-transparent hover:border-[#c94c4c]/50 transition-all duration-300 focus:outline-none cursor-pointer"
            aria-label="Slash Task"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/60 hover:text-white transition-colors duration-300">
              <path d="M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              <path d="M10 2L14 2L14 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              <path d="M6 14L2 14L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </motion.button>

          {/* Slash animation overlay */}
          <AnimatePresence>
            {slashed && (
              <>
                <motion.div
                  className="absolute top-1/2 left-1/2 h-[2px] bg-white rounded-full z-50"
                  style={{ width: '140%', rotate: -16 }}
                  initial={{ scaleX: 0, opacity: 1, x: "-50%", y: "-50%" }}
                  animate={{ scaleX: 1, opacity: [1, 1, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, times: [0, 0.4, 1], ease: "easeOut" }}
                />
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 rounded-full bg-[#c94c4c]"
                    style={{
                      width: Math.random() * 3 + 2,
                      height: Math.random() * 3 + 2,
                      boxShadow: '0 0 6px #c94c4c',
                    }}
                    initial={{
                      x: `calc(-50% + ${(Math.random() - 0.5) * 100}px)`,
                      y: `calc(-50% + ${(Math.random() - 0.5) * 60}px)`,
                      opacity: 1,
                    }}
                    animate={{
                      x: `calc(-50% + ${(Math.random() - 0.5) * 200}px)`,
                      y: `calc(-50% + ${(Math.random() - 0.5) * 200}px)`,
                      opacity: 0,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

    </div>
  );
}