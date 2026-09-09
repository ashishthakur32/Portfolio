'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
};

export default function Parallax({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const directionMap = {
    up: { y: useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]) },
    down: { y: useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]) },
    left: { x: useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed]) },
    right: { x: useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]) },
  };

  const style = direction === 'up' || direction === 'down'
    ? { y: directionMap[direction].y }
    : { x: directionMap[direction].x };

  return (
    <motion.div ref={ref} style={style} className={className}>
      {children}
    </motion.div>
  );
}
