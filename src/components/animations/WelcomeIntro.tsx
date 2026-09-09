'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Petal = {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  delay: number;
  duration: number;
  drift: number;
};

type Sparkle = {
  id: number;
  left: number;
  top: number;
  delay: number;
};

const PETAL_COLORS = [
  '#FF6B9D', '#FF8E53', '#FFC75F', '#F9F871',
  '#C9B1FF', '#A0E7E5', '#FFB7CE', '#B5EAD7',
  '#FF9AA2', '#FFD1DC', '#E2F0CB', '#FFDAC1',
];

function createPetal(id: number, centerX: number, centerY: number): Petal {
  const angle = Math.random() * Math.PI * 2;
  const distance = 50 + Math.random() * 200;
  return {
    id,
    x: centerX + Math.cos(angle) * distance,
    y: centerY + Math.sin(angle) * distance,
    rotation: Math.random() * 720 - 360,
    scale: 0.3 + Math.random() * 0.7,
    color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    delay: Math.random() * 0.5,
    duration: 1.5 + Math.random() * 1,
    drift: (Math.random() - 0.5) * 100,
  };
}

type WelcomeIntroProps = {
  onComplete: () => void;
};

export default function WelcomeIntro({ onComplete }: WelcomeIntroProps) {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [showText, setShowText] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const newPetals: Petal[] = [];
    for (let i = 0; i < 60; i++) {
      newPetals.push(createPetal(i, centerX, centerY));
    }
    setPetals(newPetals);

    const newSparkles: Sparkle[] = [];
    for (let i = 0; i < 20; i++) {
      newSparkles.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
      });
    }
    setSparkles(newSparkles);

    const textTimer = setTimeout(() => setShowText(true), 300);
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3500);
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #0B0F14 0%, #1a1a2e 50%, #16213e 100%)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated background circles */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, #22D3EE, transparent)' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #3B82F6, transparent)', left: '20%', top: '30%' }}
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Flower petals explosion */}
          {petals.map((petal) => (
            <motion.div
              key={petal.id}
              className="absolute pointer-events-none"
              initial={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                opacity: 0,
                scale: 0,
                rotate: 0,
              }}
              animate={{
                x: petal.x,
                y: petal.y,
                opacity: [0, 1, 1, 0.6],
                scale: petal.scale,
                rotate: petal.rotation,
              }}
              transition={{
                duration: petal.duration,
                delay: petal.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Flower petal SVG */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <ellipse
                  cx="12"
                  cy="8"
                  rx="5"
                  ry="8"
                  fill={petal.color}
                  opacity="0.9"
                />
                <ellipse
                  cx="12"
                  cy="8"
                  rx="5"
                  ry="8"
                  fill={petal.color}
                  opacity="0.7"
                  transform="rotate(60 12 12)"
                />
                <ellipse
                  cx="12"
                  cy="8"
                  rx="5"
                  ry="8"
                  fill={petal.color}
                  opacity="0.7"
                  transform="rotate(120 12 12)"
                />
                <ellipse
                  cx="12"
                  cy="8"
                  rx="5"
                  ry="8"
                  fill={petal.color}
                  opacity="0.7"
                  transform="rotate(180 12 12)"
                />
                <circle cx="12" cy="12" r="3" fill="#FFD700" />
              </svg>
            </motion.div>
          ))}

          {/* Welcome text */}
          <AnimatePresence>
            {showText && (
              <motion.div
                className="relative z-10 text-center"
                initial={{ opacity: 0, scale: 0.5, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.5, y: -50 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.h1
                  className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #22D3EE, #3B82F6, #FF6B9D, #22D3EE)',
                    backgroundSize: '300% 300%',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Welcome
                </motion.h1>
                <motion.p
                  className="mt-4 text-xl sm:text-2xl text-soft-gray"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  to Ashish&apos;s Portfolio
                </motion.p>

                {/* Decorative dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-cyan-400"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating sparkles */}
          {sparkles.map((sparkle) => (
            <motion.div
              key={`sparkle-${sparkle.id}`}
              className="absolute w-1 h-1 rounded-full bg-white"
              style={{
                left: `${sparkle.left}%`,
                top: `${sparkle.top}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                delay: sparkle.delay,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
