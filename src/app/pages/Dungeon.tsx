import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useOutletContext } from 'react-router';
import { TaskItem, type Difficulty } from '../components/TaskItem';
import type { ContextType } from './Root';

const DIFFICULTY_OPTIONS: { value: Difficulty; label: string; color: string }[] = [
  { value: 'normal', label: 'Normal', color: '#5c8898' },
  { value: 'elite', label: 'Elite', color: '#c9a84c' },
  { value: 'boss', label: 'Boss', color: '#c94c4c' },
];

export function Dungeon() {
  const { tasks, setTasks } = useOutletContext<ContextType>();
  const [newTaskText, setNewTaskText] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('normal');

  const handleToggle = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed, completedAt: !task.completed ? Date.now() : undefined } : task
    ));
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      setTasks([
        { id: Date.now().toString(), text: newTaskText.trim(), completed: false, difficulty: selectedDifficulty, createdAt: Date.now() },
        ...tasks
      ]);
      setNewTaskText('');
      setSelectedDifficulty('normal');
    }
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  const activeCount = activeTasks.length;
  const eliteCount = activeTasks.filter(t => t.difficulty === 'elite').length;
  const bossCount = activeTasks.filter(t => t.difficulty === 'boss').length;

  return (
    <div className="max-w-md mx-auto px-6 py-8 flex flex-col min-h-[calc(100vh-6rem)]">
      <header className="mb-12 flex flex-col items-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="font-['Julius_Sans_One'] text-5xl tracking-[0.3em] uppercase text-white/90 mb-4"
          style={{ textShadow: '0 0 20px rgba(255,255,255,0.2)' }}
        >
          Dungeon
        </motion.h1>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#5c8898]/50 to-transparent"
        />
        {/* Threat indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-4 flex items-center gap-3"
        >
          <span className="text-[10px] font-['Julius_Sans_One'] tracking-[0.25em] text-white/30 uppercase">
            威胁
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-['Outfit'] font-light text-white/50">{activeCount}</span>
            {eliteCount > 0 && (
              <span className="text-[10px] font-['Outfit'] font-light px-1.5 py-0.5 border border-[#c9a84c]/30 text-[#c9a84c]/70">
                {eliteCount} Elite
              </span>
            )}
            {bossCount > 0 && (
              <span className="text-[10px] font-['Outfit'] font-light px-1.5 py-0.5 border border-[#c94c4c]/30 text-[#c94c4c]/70">
                {bossCount} Boss
              </span>
            )}
          </div>
        </motion.div>
      </header>

      <motion.form 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        onSubmit={handleAddTask} 
        className="mb-12 relative group"
      >
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="刻下一道新法令..."
          className="w-full bg-transparent border-b border-white/10 pb-4 px-2 text-center text-white/70 font-['Outfit'] font-light text-lg tracking-widest placeholder:text-white/20 focus:outline-none focus:border-[#5c8898]/50 transition-colors duration-500"
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#5c8898] group-focus-within:w-full transition-all duration-700 ease-out" />
        
        {/* Difficulty selector */}
        <div className="flex justify-center gap-2 mt-4">
          {DIFFICULTY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setSelectedDifficulty(opt.value)}
              className="px-3 py-1 text-[10px] font-['Julius_Sans_One'] tracking-[0.2em] uppercase border transition-all duration-300 focus:outline-none cursor-pointer"
              style={{
                borderColor: selectedDifficulty === opt.value ? `${opt.color}80` : 'rgba(255,255,255,0.1)',
                color: selectedDifficulty === opt.value ? opt.color : 'rgba(255,255,255,0.3)',
                backgroundColor: selectedDifficulty === opt.value ? `${opt.color}15` : 'transparent',
                textShadow: selectedDifficulty === opt.value ? `0 0 8px ${opt.color}60` : 'none',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </motion.form>

      {/* Swipe hint */}
      {activeTasks.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-center text-[10px] font-['Outfit'] font-extralight tracking-[0.3em] text-white/15 uppercase mb-8"
        >
          向右滑动斩杀 &middot; 点击怪物挥击
        </motion.p>
      )}

      <div className="flex-grow flex flex-col gap-10 pb-12">
        <AnimatePresence mode="popLayout">
          {activeTasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
          
          {completedTasks.length > 0 && activeTasks.length > 0 && (
            <motion.div 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-6"
            >
              <div className="w-1 h-1 bg-white/10 rounded-full mx-2" />
              <div className="w-1 h-1 bg-white/10 rounded-full mx-2" />
              <div className="w-1 h-1 bg-white/10 rounded-full mx-2" />
            </motion.div>
          )}

          {completedTasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </AnimatePresence>
      </div>
      
      {tasks.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <p className="font-['Outfit'] font-extralight tracking-widest text-white/10 text-xl mt-32">
            深渊沉寂无声
          </p>
        </motion.div>
      )}
    </div>
  );
}