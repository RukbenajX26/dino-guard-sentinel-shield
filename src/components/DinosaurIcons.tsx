
import React from 'react';

interface DinosaurIconProps {
  className?: string;
  type: 'trex' | 'raptor' | 'triceratops' | 'stegosaurus' | 'brontosaurus' | 'pteranodon';
}

export const DinosaurIcon: React.FC<DinosaurIconProps> = ({ className = "w-6 h-6", type }) => {
  const dinosaurs = {
    trex: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M8 4c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm6 8c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4zm-4 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6-10c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm-12 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"/>
        <path d="M12 2c-1.66 0-3 1.34-3 3 0 .74.27 1.42.71 1.95L8 9l2 2 2-2-1.71-2.05c.44-.53.71-1.21.71-1.95 0-1.66-1.34-3-3-3z"/>
      </svg>
    ),
    raptor: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    triceratops: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9l-5.91.74L12 16l-4.09-6.26L2 9l6.91-.74L12 2z"/>
        <circle cx="8" cy="8" r="2"/>
        <circle cx="16" cy="8" r="2"/>
        <circle cx="12" cy="14" r="3"/>
      </svg>
    ),
    stegosaurus: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        <path d="M4 12l4-4 4 4 4-4 4 4"/>
      </svg>
    ),
    brontosaurus: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        <path d="M7 12l5-5 5 5-5 5-5-5z"/>
        <circle cx="12" cy="7" r="2"/>
        <circle cx="12" cy="17" r="2"/>
      </svg>
    ),
    pteranodon: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12 2l-1.5 6L12 14l1.5-6L12 2z"/>
        <path d="M2 12l6-1.5L14 12l-6 1.5L2 12z"/>
        <path d="M22 12l-6-1.5L10 12l6 1.5L22 12z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    )
  };

  return dinosaurs[type] || dinosaurs.trex;
};
