import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Sigil } from '../components/Sigil';
import type { ContextType } from './Root';

export function Journal() {
  const { tasks } = useOutletContext<ContextType>();
  const completedTasks = tasks.filter(t => t.completed);
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);

  const stats = useMemo(() => {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    const weekAgo = now - day * 7;
    const monthAgo = now - day * 30;

    const thisWeek = completedTasks.filter(t => t.completedAt && t.completedAt >= weekAgo).length;
    const thisMonth = completedTasks.filter(t => t.completedAt && t.completedAt >= monthAgo).length;
    const total = completedTasks.length;

    const byDifficulty = {
      normal: completedTasks.filter(t => t.difficulty === 'normal').length,
      elite: completedTasks.filter(t => t.difficulty === 'elite').length,
      boss: completedTasks.filter(t => t.difficulty === 'boss').length,
    };

    return { thisWeek, thisMonth, total, byDifficulty };
  }, [completedTasks]);

  const MIN_SLOTS = 32;
  const totalSlots = Math.max(MIN_SLOTS, Math.ceil(completedTasks.length / 8) * 8);
  
  const slots = Array.from({ length: totalSlots }).map((_, i) => completedTasks[i] || null);

  return (
    <motion.div 
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center py-8 px-6 max-w-5xl mx-auto w-full"
    >
      <header className="mb-12 flex flex-col items-center">
         <h2 className="font-['Julius_Sans_One'] text-lg tracking-[0.5em] text-white/40 uppercase mb-8">Hunter's Journal</h2>
         
         {/* Stats Grid */}
         <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 w-full max-w-lg">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.2 }}
             className="flex flex-col items-center"
           >
             <span className="font-['Julius_Sans_One'] text-[10px] tracking-[0.2em] text-white/30 uppercase mb-2">Total Souls</span>
             <span className="font-['Outfit'] font-thin text-4xl text-white/90 tracking-wider">{stats.total}</span>
           </motion.div>
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="flex flex-col items-center"
           >
             <span className="font-['Julius_Sans_One'] text-[10px] tracking-[0.2em] text-white/30 uppercase mb-2">本周</span>
             <span className="font-['Outfit'] font-thin text-4xl text-white/90 tracking-wider">{stats.thisWeek}</span>
           </motion.div>
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4 }}
             className="flex flex-col items-center"
           >
             <span className="font-['Julius_Sans_One'] text-[10px] tracking-[0.2em] text-[#c9a84c]/50 uppercase mb-2">Elites</span>
             <span className="font-['Outfit'] font-thin text-4xl text-[#c9a84c]/80 tracking-wider">{stats.byDifficulty.elite}</span>
           </motion.div>
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.5 }}
             className="flex flex-col items-center"
           >
             <span className="font-['Julius_Sans_One'] text-[10px] tracking-[0.2em] text-[#c94c4c]/50 uppercase mb-2">Bosses</span>
             <span className="font-['Outfit'] font-thin text-4xl text-[#c94c4c]/80 tracking-wider">{stats.byDifficulty.boss}</span>
           </motion.div>
         </div>
      </header>

      <div className="w-full relative p-1">
        <div className="absolute top-0 left-0 w-8 h-[1px] bg-white/30" />
        <div className="absolute top-0 left-0 w-[1px] h-8 bg-white/30" />
        <div className="absolute top-0 right-0 w-8 h-[1px] bg-white/30" />
        <div className="absolute top-0 right-0 w-[1px] h-8 bg-white/30" />
        <div className="absolute bottom-0 left-0 w-8 h-[1px] bg-white/30" />
        <div className="absolute bottom-0 left-0 w-[1px] h-8 bg-white/30" />
        <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-white/30" />
        <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-white/30" />

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-[1px] bg-white/10 border border-white/10">
          {slots.map((task, i) => (
            <div 
              key={i}
              onMouseEnter={() => task && setHoveredTask(task.text)}
              onMouseLeave={() => task && setHoveredTask(null)}
              className="aspect-square bg-[#0a0a0a] flex items-center justify-center relative group overflow-hidden transition-colors duration-500 hover:bg-[#121212]"
            >
              {task ? (
                <>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md"
                    style={{
                      backgroundColor: task.difficulty === 'boss' ? 'rgba(201,76,76,0.15)' : task.difficulty === 'elite' ? 'rgba(201,168,76,0.15)' : 'rgba(92,136,152,0.15)',
                    }}
                  />
                  <Sigil 
                    seed={task.text.length + i} 
                    className={
                      task.difficulty === 'boss' 
                        ? "text-[#c94c4c]/30 group-hover:text-[#c94c4c] transition-all duration-700 group-hover:drop-shadow-[0_0_8px_rgba(201,76,76,0.9)] group-hover:scale-110 relative z-10"
                        : task.difficulty === 'elite'
                        ? "text-[#c9a84c]/30 group-hover:text-[#c9a84c] transition-all duration-700 group-hover:drop-shadow-[0_0_8px_rgba(201,168,76,0.9)] group-hover:scale-110 relative z-10"
                        : "text-white/20 group-hover:text-white transition-all duration-700 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] group-hover:scale-110 relative z-10"
                    }
                  />
                </>
              ) : (
                <div className="w-2 h-2 rounded-full bg-white/5" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 h-8 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {hoveredTask ? (
            <motion.div 
              key={hoveredTask}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="font-['Outfit'] font-light tracking-widest text-white/50 text-sm uppercase"
            >
              {hoveredTask}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-['Outfit'] font-extralight tracking-[0.2em] text-white/10 text-xs uppercase"
            >
              Hover over a sigil to decipher
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}