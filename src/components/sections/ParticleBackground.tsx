'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

type Particle = {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  delay: number;
};

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 20 + 10,
        opacity: Math.random() * 0.5 + 0.1,
        delay: Math.random() * 10,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient blobs */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] motion-safe:animate-pulse" />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] motion-safe:animate-pulse" />
      <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] rounded-full bg-cyan-400/5 blur-[100px]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-400"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            willChange: 'transform',
          }}
          animate={{
            y: [0, -p.speed, 0],
            x: [0, p.speed / 2, 0],
          }}
          transition={{
            duration: p.speed,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
