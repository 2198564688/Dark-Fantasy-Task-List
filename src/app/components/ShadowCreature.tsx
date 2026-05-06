import React from 'react';
import { motion } from 'motion/react';
import { twMerge } from 'tailwind-merge';
import type { Difficulty } from './TaskItem';

interface ShadowCreatureProps {
  completed?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  difficulty?: Difficulty;
}

export const ShadowCreature: React.FC<ShadowCreatureProps> = ({ completed, className, onClick, difficulty = 'normal' }) => {
  const diffConfig = {
    normal: { size: 24, glowColor: '#5c8898', eyeColor: '#cce6f0', breathScale: [1, 1.15, 1] },
    elite: { size: 28, glowColor: '#c9a84c', eyeColor: '#f0e6cc', breathScale: [1, 1.25, 1] },
    boss: { size: 34, glowColor: '#c94c4c', eyeColor: '#f0cccc', breathScale: [1, 1.35, 1] },
  };
  const cfg = diffConfig[difficulty];

  const svgSize = cfg.size;
  const viewBox = "0 0 24 24";
  const scale = svgSize / 24;

  // More elaborate shapes for higher difficulties
  const getBodyPath = () => {
    if (difficulty === 'boss') {
      return "M12 1C7 1 5 6 5 11C5 15 4 18 3 22C6 21.5 8 20.5 9.5 19.5C10.5 20.5 13.5 20.5 14.5 19.5C16 20.5 18 21.5 21 22C20 18 19 15 19 11C19 6 17 1 12 1Z";
    }
    if (difficulty === 'elite') {
      return "M12 1.5C7.5 1.5 5.5 5.5 5.5 9.5C5.5 13.5 4.5 17.5 3.5 21.5C6 21 8 20 9.5 19C10.5 20 13.5 20 14.5 19C16 20 18 21 20.5 21.5C19.5 17.5 18.5 13.5 18.5 9.5C18.5 5.5 16.5 1.5 12 1.5Z";
    }
    return "M12 2C8 2 6 6 6 10C6 14 5 18 4 21C6.5 20.5 8 19.5 9.5 18.5C10.5 19.5 13.5 19.5 14.5 18.5C16 19.5 17.5 20.5 20 21C19 18 18 14 18 10C18 6 16 2 12 2Z";
  };

  const eyeRx = difficulty === 'boss' ? 2 : difficulty === 'elite' ? 1.8 : 1.5;
  const eyeRy = difficulty === 'boss' ? 3 : difficulty === 'elite' ? 2.8 : 2.5;

  return (
    <motion.button
      onClick={onClick}
      className={twMerge(
        "relative flex items-center justify-center focus:outline-none cursor-pointer group",
        className
      )}
      style={{ width: svgSize + 8, height: svgSize + 8 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Glow aura */}
      <motion.div
        className="absolute inset-0 rounded-full blur-md"
        style={{ backgroundColor: `${cfg.glowColor}20` }}
        animate={{
          scale: completed ? 0.8 : cfg.breathScale,
          opacity: completed ? 0 : [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: difficulty === 'boss' ? 2 : difficulty === 'elite' ? 2.5 : 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary aura for elite/boss */}
      {(difficulty === 'elite' || difficulty === 'boss') && !completed && (
        <motion.div
          className="absolute inset-0 rounded-full blur-lg"
          style={{ backgroundColor: `${cfg.glowColor}15` }}
          animate={{
            scale: [1.2, 1.5, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      )}
      
      {/* Body / Cloak */}
      <motion.svg
        width={svgSize}
        height={svgSize}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          y: completed ? 2 : [0, difficulty === 'boss' ? -3 : difficulty === 'elite' ? -2.5 : -2, 0],
        }}
        transition={{
          y: { duration: difficulty === 'boss' ? 3 : 4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="drop-shadow-[0_0_3px_rgba(0,0,0,1)]"
      >
        <motion.path
          d={getBodyPath()}
          fill={completed ? "#050505" : "#0a0a0a"}
          stroke={completed ? "#333333" : difficulty === 'boss' ? "#3a1f1f" : difficulty === 'elite' ? "#2a2515" : "#1f2937"}
          strokeWidth="0.5"
          animate={{
            fill: completed ? "#050505" : "#0f0f0f",
          }}
        />
        
        {/* Eyes */}
        {!completed && (
          <>
            <motion.ellipse
              cx="9.5"
              cy="10.5"
              rx={eyeRx}
              ry={eyeRy}
              fill={cfg.eyeColor}
              style={{ filter: `drop-shadow(0 0 ${difficulty === 'boss' ? 6 : 4}px ${cfg.glowColor})` }}
              animate={{
                scaleY: [1, 0.1, 1],
              }}
              transition={{
                duration: 4,
                times: [0, 0.05, 0.1],
                repeat: Infinity,
                repeatDelay: 2 + Math.random() * 2,
              }}
            />
            <motion.ellipse
              cx="14.5"
              cy="10.5"
              rx={eyeRx}
              ry={eyeRy}
              fill={cfg.eyeColor}
              style={{ filter: `drop-shadow(0 0 ${difficulty === 'boss' ? 6 : 4}px ${cfg.glowColor})` }}
              animate={{
                scaleY: [1, 0.1, 1],
              }}
              transition={{
                duration: 4,
                times: [0, 0.05, 0.1],
                repeat: Infinity,
                repeatDelay: 2 + Math.random() * 2,
              }}
            />
            {/* Boss extra eyes */}
            {difficulty === 'boss' && (
              <>
                <motion.ellipse
                  cx="12"
                  cy="8"
                  rx="1"
                  ry="1.5"
                  fill={cfg.eyeColor}
                  style={{ filter: `drop-shadow(0 0 4px ${cfg.glowColor})` }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </>
            )}
          </>
        )}
      </motion.svg>
    </motion.button>
  );
};
