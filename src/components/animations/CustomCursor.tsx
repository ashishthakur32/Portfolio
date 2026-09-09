'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

export default function CustomCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'text' | 'link'>('default');

  const trailRef = useRef<HTMLDivElement>(null);
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);
  const trailId = useRef(0);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      trailId.current += 1;
      const newTrail = { x: e.clientX, y: e.clientY, id: trailId.current };
      setTrails((prev) => [...prev.slice(-5), newTrail]);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
        setCursorVariant('link');
      } else if (
        target.closest('h1') ||
        target.closest('h2') ||
        target.closest('h3')
      ) {
        setCursorVariant('text');
      } else {
        setIsHovering(false);
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrails((prev) => prev.slice(1));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Cursor trails */}
      {trails.map((trail, i) => (
        <motion.div
          key={trail.id}
          className="fixed pointer-events-none z-[9999] rounded-full bg-cyan-400"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            left: trail.x - 3,
            top: trail.y - 3,
            width: 6,
            height: 6,
          }}
        />
      ))}

      {/* Main cursor dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
        animate={{
          width: cursorVariant === 'text' ? 80 : cursorVariant === 'link' ? 48 : 12,
          height: cursorVariant === 'text' ? 80 : cursorVariant === 'link' ? 48 : 12,
          backgroundColor: cursorVariant === 'link' ? 'rgba(34, 211, 238, 0.15)' : '#fff',
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full border border-cyan-400/50"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
        }}
        animate={{
          width: isHovering ? 64 : 36,
          height: isHovering ? 64 : 36,
          opacity: 0.6,
          borderWidth: isHovering ? 2 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      />

      {/* Glow effect on hover */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="fixed pointer-events-none z-[9997] rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              left: cursorXSpring,
              top: cursorYSpring,
              translateX: '-50%',
              translateY: '-50%',
              width: 120,
              height: 120,
              background: 'radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
