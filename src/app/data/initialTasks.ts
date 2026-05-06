import { Task } from '../components/TaskItem';

const now = Date.now();
const day = 24 * 60 * 60 * 1000;

export const INITIAL_TASKS: Task[] = [
  { id: '1', text: 'Vanquish the False Knight', completed: false, difficulty: 'boss', createdAt: now - day * 2 },
  { id: '2', text: 'Acquire the Mothwing Cloak', completed: false, difficulty: 'elite', createdAt: now - day },
  { id: '3', text: 'Navigate the Fog Canyon', completed: false, difficulty: 'normal', createdAt: now - day * 3 },
  { id: '4', text: 'Awaken the Dreamers', completed: true, difficulty: 'boss', createdAt: now - day * 10, completedAt: now - day * 5 },
  { id: '5', text: 'Defeat the Mantis Lords', completed: true, difficulty: 'boss', createdAt: now - day * 12, completedAt: now - day * 6 },
  { id: '6', text: 'Find the City of Tears', completed: true, difficulty: 'normal', createdAt: now - day * 15, completedAt: now - day * 10 },
  { id: '7', text: 'Obtain the Dream Nail', completed: true, difficulty: 'elite', createdAt: now - day * 11, completedAt: now - day * 7 },
  { id: '8', text: 'Bestow peace upon the Hollow Knight', completed: true, difficulty: 'boss', createdAt: now - day * 20, completedAt: now - day * 4 },
  { id: '9', text: 'Slay the Soul Master', completed: true, difficulty: 'boss', createdAt: now - day * 14, completedAt: now - day * 8 },
  { id: '10', text: 'Uncover the Abyss', completed: true, difficulty: 'elite', createdAt: now - day * 18, completedAt: now - day * 9 },
  { id: '11', text: 'Collect the Monarch Wings', completed: true, difficulty: 'elite', createdAt: now - day * 16, completedAt: now - day * 11 },
  { id: '12', text: 'Traverse the Deepnest', completed: true, difficulty: 'normal', createdAt: now - day * 13, completedAt: now - day * 10 },
  { id: '13', text: 'Rescue the Grubs', completed: true, difficulty: 'normal', createdAt: now - day * 19, completedAt: now - day * 12 },
  { id: '14', text: 'Master the Nail Arts', completed: true, difficulty: 'elite', createdAt: now - day * 17, completedAt: now - day * 13 },
  { id: '15', text: 'Challenge the Radiance', completed: true, difficulty: 'boss', createdAt: now - day * 22, completedAt: now - day * 2 },
  { id: '16', text: 'Conquer the Colosseum of Fools', completed: true, difficulty: 'boss', createdAt: now - day * 21, completedAt: now - day * 3 },
  { id: '17', text: 'Map the Fungal Wastes', completed: true, difficulty: 'normal', createdAt: now - day * 25, completedAt: now - day * 14 },
  { id: '18', text: 'Survive the Path of Pain', completed: true, difficulty: 'boss', createdAt: now - day * 30, completedAt: now - day * 1 },
];