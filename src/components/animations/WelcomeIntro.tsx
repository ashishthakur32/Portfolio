'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type WelcomeIntroProps = {
  onComplete: () => void;
};

const PETALS = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  const distance = 80 + (i % 5) * 40;
  return {
    id: i,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    rotation: (i * 90) % 720,
    scale: 0.4 + (i % 4) * 0.15,
    color: ['#FF5A1F', '#FFB347', '#FFD700', '#E8590C', '#FFC75F', '#FF9E4A', '#FF8E53'][i % 7],
    delay: (i % 7) * 0.04,
  };
});

export default function WelcomeIntro({ onComplete }: WelcomeIntroProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setIsExiting(true), 1200);
    const completeTimer = setTimeout(() => onComplete(), 1800);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0A0705 0%, #1a0f06 50%, #241207 100%)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Soft glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full opacity-20 bg-[radial-gradient(circle,#FF5A1F,transparent)] animate-pulse" />

          {/* Petals */}
          {PETALS.map((petal) => (
            <motion.div
              key={petal.id}
              className="absolute pointer-events-none"
              initial={{ x: 0, y: 0, opacity: 0, scale: 0, rotate: 0 }}
              animate={{
                x: petal.x,
                y: petal.y,
                opacity: [0, 1, 0.8],
                scale: petal.scale,
                rotate: petal.rotation,
              }}
              transition={{
                duration: 1,
                delay: petal.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <ellipse cx="12" cy="8" rx="5" ry="8" fill={petal.color} opacity="0.9" />
                <ellipse cx="12" cy="8" rx="5" ry="8" fill={petal.color} opacity="0.7" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="8" rx="5" ry="8" fill={petal.color} opacity="0.7" transform="rotate(120 12 12)" />
                <circle cx="12" cy="12" r="3" fill="#FFD700" />
              </svg>
            </motion.div>
          ))}

          {/* Welcome text */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="text-5xl sm:text-7xl font-bold tracking-tight text-shimmer"
            >
              Welcome
            </h1>
            <p className="mt-3 text-lg text-soft-gray">to Ashish&apos;s Portfolio</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
