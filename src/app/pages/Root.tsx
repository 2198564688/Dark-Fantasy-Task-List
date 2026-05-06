import React from 'react';
import { Outlet, NavLink } from 'react-router';
import { motion } from 'motion/react';
import { INITIAL_TASKS } from '../data/initialTasks';
import { Task } from '../components/TaskItem';
import { useLocalStorage } from '../hooks/useLocalStorage';

export type ContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export function Root() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('quest-dungeon-tasks', INITIAL_TASKS);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white/90 font-['Outfit'] selection:bg-[#5c8898]/30 overflow-x-hidden relative">
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
        <motion.div 
          className="w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-[#5c8898]/5 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0D0D0D_100%)] opacity-80 mix-blend-multiply z-40"></div>

      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex gap-12 sm:gap-16 font-['Julius_Sans_One'] text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase">
        <NavLink to="/" className={({isActive}) => isActive ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] transition-all duration-300" : "text-white/30 hover:text-white/60 transition-colors duration-300"}>地下城</NavLink>
        <NavLink to="/journal" className={({isActive}) => isActive ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] transition-all duration-300" : "text-white/30 hover:text-white/60 transition-colors duration-300"}>图鉴</NavLink>
        <NavLink to="/widget" className={({isActive}) => isActive ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] transition-all duration-300" : "text-white/30 hover:text-white/60 transition-colors duration-300"}>组件</NavLink>
      </nav>

      <main className="relative z-10 pt-24 min-h-screen">
        <Outlet context={{ tasks, setTasks } satisfies ContextType} />
      </main>
    </div>
  );
}