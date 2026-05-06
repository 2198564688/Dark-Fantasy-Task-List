import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ShadowCreature } from './ShadowCreature';

export type Difficulty = 'normal' | 'elite' | 'boss';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  difficulty: Difficulty;
  createdAt: number;
  completedAt?: number;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = React.forwardRef<HTMLDivElement, TaskItemProps>(({ task, onToggle, onDelete }, ref) => {
  const [isSlashing, setIsSlashing] = useState(false);
  const [isHit, setIsHit] = useState(false);
  const [hitParticles, setHitParticles] = useState<Array<{id: number; x: number; y: number; vx: number; vy: number}>>([]);
  const [slashProgress, setSlashProgress] = useState(0);
  const [isSlashingGesture, setIsSlashingGesture] = useState(false);
  const gestureStartX = useRef(0);
  const gestureStartY = useRef(0);
  const isGesturing = useRef(false);

  const handleDeleteClick = () => {
    if (isSlashing) return;
    setIsSlashing(true);
    setTimeout(() => {
      onDelete(task.id);
    }, 700);
  };

  const spawnHitParticles = useCallback((centerX: number, centerY: number) => {
    const particles = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: centerX,
      y: centerY,
      vx: (Math.random() - 0.5) * 120,
      vy: (Math.random() - 0.5) * 120 - 30,
    }));
    setHitParticles(particles);
    setTimeout(() => setHitParticles([]), 600);
  }, []);

  const handleCreatureClick = (e: React.MouseEvent) => {
    if (isSlashing) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    spawnHitParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    setIsHit(true);
    setTimeout(() => setIsHit(false), 300);
    onToggle(task.id);
  };

  // Swipe gesture handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (task.completed || isSlashing) return;
    isGesturing.current = true;
    gestureStartX.current = e.clientX;
    gestureStartY.current = e.clientY;
    setIsSlashingGesture(true);
    setSlashProgress(0);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isGesturing.current) return;
    const deltaX = e.clientX - gestureStartX.current;
    const deltaY = Math.abs(e.clientY - gestureStartY.current);
    if (deltaX > 20 && deltaY < 60) {
      const progress = Math.min((deltaX - 20) / 120, 1);
      setSlashProgress(progress);
      if (progress >= 1) {
        isGesturing.current = false;
        setIsSlashingGesture(false);
        setSlashProgress(0);
        handleDeleteClick();
      }
    } else if (deltaX < -10 || deltaY > 80) {
      isGesturing.current = false;
      setIsSlashingGesture(false);
      setSlashProgress(0);
    }
  };

  const handlePointerUp = () => {
    if (!isGesturing.current) return;
    isGesturing.current = false;
    setIsSlashingGesture(false);
    setSlashProgress(0);
  };

  const difficultyConfig = {
    normal: { label: '', color: '#5c8898', glow: 'shadow-[0_0_15px_rgba(92,136,152,0.1)]' },
    elite: { label: 'ELITE', color: '#c9a84c', glow: 'shadow-[0_0_20px_rgba(201,168,76,0.15)]' },
    boss: { label: 'BOSS', color: '#c94c4c', glow: 'shadow-[0_0_25px_rgba(201,76,76,0.2)]' },
  };
  const diff = difficultyConfig[task.difficulty];

  // Reusable core content of the task so we can duplicate it perfectly for the sliced halves
  const content = (
    <div className="w-full h-full relative">
      <div 
        className={twMerge(
          "relative z-10 flex items-center p-5 bg-[#121212]/90 backdrop-blur-md transition-all duration-500 h-full",
          "border border-[#5c8898]/30",
          task.difficulty === 'elite' && "border-[#c9a84c]/40",
          task.difficulty === 'boss' && "border-[#c94c4c]/50",
          "hover:border-[#5c8898]/70 hover:shadow-[0_0_20px_rgba(92,136,152,0.2)]",
          task.difficulty === 'elite' && "hover:border-[#c9a84c]/70 hover:shadow-[0_0_25px_rgba(201,168,76,0.25)]",
          task.difficulty === 'boss' && "hover:border-[#c94c4c]/80 hover:shadow-[0_0_30px_rgba(201,76,76,0.3)]",
          task.completed ? "border-white/5 bg-[#0a0a0a]/90 shadow-none hover:border-white/10" : ""
        )}
        style={{
          boxShadow: task.completed ? 'none' : `inset 0 0 20px rgba(0,0,0,0.5), 0 0 10px ${task.difficulty === 'normal' ? 'rgba(92,136,152,0.15)' : task.difficulty === 'elite' ? 'rgba(201,168,76,0.15)' : 'rgba(201,76,76,0.2)'}`,
          transform: isHit ? `translate(${Math.random() > 0.5 ? 2 : -2}px, ${Math.random() > 0.5 ? 1 : -1}px)` : 'translate(0,0)',
          transition: isHit ? 'transform 0.05s ease' : 'transform 0.3s ease, box-shadow 0.5s ease, border-color 0.5s ease, background-color 0.5s ease',
        }}
      >
        <ShadowCreature 
          difficulty={task.difficulty}
          completed={task.completed} 
          onClick={handleCreatureClick}
          className="mr-5 flex-shrink-0"
        />
        
        <div className="flex-grow flex flex-col justify-center min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {task.difficulty !== 'normal' && (
              <span 
                className="text-[9px] font-['Julius_Sans_One'] tracking-[0.2em] px-1.5 py-0.5 border"
                style={{ 
                  color: diff.color, 
                  borderColor: `${diff.color}40`,
                  textShadow: `0 0 6px ${diff.color}60`,
                }}
              >
                {diff.label}
              </span>
            )}
          </div>
          <span 
            className={twMerge(
              "font-['Outfit'] font-light text-lg tracking-wider transition-all duration-500 truncate",
              task.completed ? "text-white/20 line-through decoration-white/10" : "text-white/90"
            )}
          >
            {task.text}
          </span>
        </div>

        <button
          onClick={handleDeleteClick}
          onPointerDown={(e) => e.stopPropagation()}
          className="opacity-0 group-hover:opacity-100 transition-all duration-300 ml-4 p-2 focus:outline-none cursor-pointer hover:bg-[#5c8898]/20 rounded-full text-white/30 hover:text-white relative z-30"
          aria-label="Delete Task"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Decorative sharp corner accents */}
      {!task.completed && (
        <>
          <div className="absolute top-0 left-0 w-2 h-[1px] z-20 opacity-70" style={{ backgroundColor: diff.color }}></div>
          <div className="absolute top-0 left-0 w-[1px] h-2 z-20 opacity-70" style={{ backgroundColor: diff.color }}></div>
          <div className="absolute bottom-0 right-0 w-2 h-[1px] z-20 opacity-70" style={{ backgroundColor: diff.color }}></div>
          <div className="absolute bottom-0 right-0 w-[1px] h-2 z-20 opacity-70" style={{ backgroundColor: diff.color }}></div>
        </>
      )}
    </div>
  );

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="group relative w-full select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Hit particles */}
      {hitParticles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute z-50 rounded-full pointer-events-none"
          style={{
            width: Math.random() * 3 + 2,
            height: Math.random() * 3 + 2,
            backgroundColor: task.difficulty === 'boss' ? '#c94c4c' : task.difficulty === 'elite' ? '#c9a84c' : '#70c0d8',
            boxShadow: `0 0 6px ${task.difficulty === 'boss' ? '#c94c4c' : task.difficulty === 'elite' ? '#c9a84c' : '#70c0d8'}`,
            left: p.x,
            top: p.y,
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            x: p.vx,
            y: p.vy,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      ))}

      {/* Swipe progress indicator */}
      {isSlashingGesture && slashProgress > 0 && (
        <motion.div
          className="absolute top-0 left-0 h-full z-30 pointer-events-none"
          style={{
            width: `${slashProgress * 100}%`,
            background: `linear-gradient(90deg, ${diff.color}20 0%, ${diff.color}60 100%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}

      {/* Ghostly Glow Backdrop */}
      {!isSlashing && (
        <div 
          className={twMerge(
            "absolute -inset-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm z-0",
            task.completed ? "bg-transparent" : task.difficulty === 'boss' ? "bg-[#c94c4c]/30" : task.difficulty === 'elite' ? "bg-[#c9a84c]/30" : "bg-[#5c8898]/40"
          )} 
        />
      )}

      {/* Normal State */}
      <div className={twMerge("relative w-full h-full", isSlashing ? "opacity-0 pointer-events-none" : "opacity-100")}>
         {content}
      </div>

      {/* Slashing Cinematic Effect State */}
      {isSlashing && (
        <div className="absolute inset-0 z-50 pointer-events-none w-full h-full">
          {/* Top Half Slice */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ clipPath: 'polygon(-20% -20%, 120% -20%, 120% 30%, -20% 70%)' }}
            initial={{ x: 0, y: 0, rotate: 0 }}
            animate={{ x: -15, y: -25, rotate: -4, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {content}
          </motion.div>

          {/* Bottom Half Slice */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{ clipPath: 'polygon(-20% 70%, 120% 30%, 120% 120%, -20% 120%)' }}
            initial={{ x: 0, y: 0, rotate: 0 }}
            animate={{ x: 15, y: 25, rotate: 4, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {content}
          </motion.div>

          {/* Intense White Slash Trail */}
          <motion.div 
            className="absolute top-1/2 left-1/2 h-[2px] bg-white rounded-full shadow-[0_0_20px_5px_rgba(255,255,255,0.9)] z-50"
            style={{ 
              width: '140%',
              rotate: -16, 
            }}
            initial={{ scaleX: 0, opacity: 1, x: "-50%", y: "-50%" }}
            animate={{ scaleX: 1, opacity: [1, 1, 0] }}
            transition={{ duration: 0.5, times: [0, 0.4, 1], ease: "easeOut" }}
          />

          {/* Dark Ink & Glowing Particles */}
          {Array.from({ length: 40 }).map((_, i) => {
            const type = Math.random();
            const isIntense = type > 0.7;
            const isInk = type < 0.3;
            
            const glowColor = task.difficulty === 'boss' ? '#c94c4c' : task.difficulty === 'elite' ? '#c9a84c' : '#70c0d8';
            
            const colorClass = isIntense
              ? "bg-white shadow-[0_0_12px_rgba(255,255,255,1)]" 
              : isInk 
                ? "bg-[#050505] shadow-[0_0_8px_rgba(0,0,0,0.8)]" 
                : "";
                
            // Spread particles across the width
            const startX = (Math.random() - 0.5) * 400;
            
            // Calculate startY exactly along the -16deg line (slope ≈ -0.2857)
            const startY = -0.2857 * startX;

            const dirY = Math.random() > 0.5 ? -1 : 1;
            const flyY = startY + dirY * (Math.random() * 80 + 30);
            const flyX = startX + (Math.random() - 0.5) * 100;
            
            const size = isIntense ? (Math.random() * 2 + 2) : (Math.random() * 3 + 1.5);
            const isSlashSpark = isIntense && Math.random() > 0.4;

            return (
              <motion.div
                key={i}
                className={`absolute top-1/2 left-1/2 rounded-full ${colorClass}`}
                style={{
                  width: isSlashSpark ? size * 5 : size,
                  height: isSlashSpark ? size * 0.5 : size,
                  rotate: isSlashSpark ? -16 + (Math.random() * 30 - 15) : 0,
                  backgroundColor: isInk || isIntense ? undefined : glowColor,
                  boxShadow: isInk || isIntense ? undefined : `0 0 8px ${glowColor}99`,
                }}
                initial={{
                  x: `calc(-50% + ${startX}px)`,
                  y: `calc(-50% + ${startY}px)`,
                  scale: 0.5
                }}
                animate={{
                  x: `calc(-50% + ${flyX}px)`,
                  y: `calc(-50% + ${flyY}px)`,
                  opacity: 0,
                  scale: isSlashSpark ? 2 : 0
                }}
                transition={{ duration: 0.3 + Math.random() * 0.4, ease: "easeOut" }}
              />
            );
          })}
        </div>
      )}
    </motion.div>
  );
});

TaskItem.displayName = 'TaskItem';
