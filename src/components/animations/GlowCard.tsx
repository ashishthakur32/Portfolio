'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { cn } from '@/lib/utils';

type GlowCardProps = {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
};

export default function GlowCard({
  children,
  className = '',
  glowColor = 'rgba(34, 211, 238, 0.15)',
}: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        willChange: 'transform',
      }}
      className={cn('relative group', className)}
    >
      <div className="glass-card relative overflow-hidden h-full transition-all duration-300 group-hover:border-cyan-500/30">
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(400px circle at ${glowX}% ${glowY}%, ${glowColor}, transparent 70%)`,
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
}
