import React from 'react';
import { twMerge } from 'tailwind-merge';

export const Sigil = ({ seed, className }: { seed: number; className?: string }) => {
  const type = seed % 6;
  
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={twMerge("w-8 h-8", className)}>
      {type === 0 && (
        <path d="M12 2L22 12L12 22L2 12L12 2Z M12 6v12 M6 12h12" stroke="currentColor" strokeWidth="1" strokeLinejoin="bevel" />
      )}
      {type === 1 && (
        <path d="M2 4h20L12 20Z M12 8v4" stroke="currentColor" strokeWidth="1" strokeLinejoin="bevel" />
      )}
      {type === 2 && (
        <path d="M12 2v20 M2 12h20 M4.93 4.93l14.14 14.14 M19.07 4.93L4.93 19.07" stroke="currentColor" strokeWidth="1" />
      )}
      {type === 3 && (
        <path d="M4 4h16v16H4Z M8 8h8v8H8Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="bevel" transform="rotate(45 12 12)" />
      )}
      {type === 4 && (
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10ZM2 12h20" stroke="currentColor" strokeWidth="1" />
      )}
      {type === 5 && (
        <path d="M12 4c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10ZM12 8v8 M8 12h8" stroke="currentColor" strokeWidth="1" />
      )}
    </svg>
  );
};