'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import JokeBubble from './JokeBubble';

export default function CursorDuck() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(true);
  const [showDuck, setShowDuck] = useState(false);
  const [isExcited, setIsExcited] = useState(false);
  const [showJoke, setShowJoke] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [isOverText, setIsOverText] = useState(false);
  const lastX = useRef(0);
  const facingRight = useRef(true);

  const springConfig = { damping: 15, stiffness: 80, mass: 0.5 };
  const duckX = useSpring(mouseX, springConfig);
  const duckY = useSpring(mouseY, springConfig);

  const bodyRotation = useTransform(
    mouseX,
    (latest) => {
      const diff = latest - lastX.current;
      return Math.max(-8, Math.min(8, diff * 0.05));
    }
  );

  const isOverTextRef = useRef(false);

  const checkIfOverText = useCallback((x: number, y: number) => {
    const element = document.elementFromPoint(x, y);
    if (!element) return false;

    const interactiveTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'a', 'button', 'label', 'li', 'td', 'th', 'strong', 'em', 'b', 'i', 'svg'];

    let current: Element | null = element;
    for (let i = 0; i < 6 && current; i++) {
      const tagName = current.tagName.toLowerCase();
      if (interactiveTags.includes(tagName)) return true;
      if (current.closest('a') || current.closest('button')) return true;
      current = current.parentElement;
    }

    return false;
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const timer = setTimeout(() => setShowDuck(true), 5000);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const overText = checkIfOverText(e.clientX, e.clientY);
      if (overText !== isOverTextRef.current) {
        isOverTextRef.current = overText;
        setIsOverText(overText);
      }

      const diff = e.clientX - lastX.current;
      facingRight.current = diff > 0;
      setIsWalking(Math.abs(diff) > 5);
      lastX.current = e.clientX;

      if (Math.abs(diff) > 50) {
        setIsExcited(true);
        setTimeout(() => setIsExcited(false), 500);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, [isMobile, mouseX, mouseY, checkIfOverText]);

  useEffect(() => {
    if (isMobile || !showDuck) return;

    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setShowJoke(true);
        setTimeout(() => setShowJoke(false), 6000);
      }
    }, 15000);

    const firstJokeTimer = setTimeout(() => setShowJoke(true), 8000);
    const hideFirstJoke = setTimeout(() => setShowJoke(false), 14000);

    return () => {
      clearInterval(interval);
      clearTimeout(firstJokeTimer);
      clearTimeout(hideFirstJoke);
    };
  }, [isMobile, showDuck]);

  if (isMobile || !showDuck) return null;

  return (
    <>
      {/* Duck speech bubble */}
      <JokeBubble mouseX={mouseX} mouseY={mouseY} visible={showJoke && !isOverText} />

      {/* The Duck */}
      <motion.div
        className="fixed pointer-events-none z-[90]"
        style={{
          x: duckX,
          y: duckY,
          translateX: '-50%',
          translateY: '-50%',
          rotate: bodyRotation,
          willChange: 'transform',
        }}
        animate={{
          opacity: isOverText ? 0.15 : 1,
          scale: isOverText ? 0.7 : 1,
          filter: isOverText ? 'blur(2px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {/* Duck shadow */}
        <motion.div
          className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-10 h-2 bg-black/20 rounded-full blur-[2px]"
          animate={{ 
            scaleX: isExcited ? 1.3 : 1,
            opacity: isOverText ? 0 : 1,
          }}
        />

        {/* Duck body SVG */}
        <motion.div
          animate={{
            y: isExcited ? [0, -8, 0, -4, 0] : [0, -2, 0],
            rotate: isExcited ? [0, -5, 5, -3, 0] : [0, -1, 1, 0],
          }}
          transition={{
            duration: isExcited ? 0.5 : 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: facingRight.current ? 'scaleX(1)' : 'scaleX(-1)' }}
          >
            {/* Body */}
            <ellipse cx="32" cy="40" rx="18" ry="14" fill="#FFD93D" />
            <ellipse cx="32" cy="40" rx="18" ry="14" fill="url(#bodyGradient)" />

            {/* Wing */}
            <motion.ellipse
              cx="20"
              cy="38"
              rx="8"
              ry="10"
              fill="#FFC107"
              animate={isWalking ? { rotate: [0, -15, 0] } : {}}
              transition={{ duration: 0.3, repeat: Infinity }}
              style={{ transformOrigin: '20px 30px' }}
            />

            {/* Head */}
            <circle cx="32" cy="22" r="12" fill="#FFD93D" />
            <circle cx="32" cy="22" r="12" fill="url(#headGradient)" />

            {/* Eyes */}
            <motion.g animate={{ y: isExcited ? -1 : 0 }}>
              <circle cx="28" cy="20" r="3" fill="white" />
              <circle cx="36" cy="20" r="3" fill="white" />
              <circle cx="29" cy="20" r="1.5" fill="#1a1a2e" />
              <circle cx="37" cy="20" r="1.5" fill="#1a1a2e" />
              <circle cx="27.5" cy="19" r="0.8" fill="white" />
              <circle cx="35.5" cy="19" r="0.8" fill="white" />
            </motion.g>

            {/* Blush */}
            <AnimatePresence>
              {isExcited && (
                <>
                  <motion.circle
                    cx="22"
                    cy="24"
                    r="3"
                    fill="#FF9AA2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                  />
                  <motion.circle
                    cx="42"
                    cy="24"
                    r="3"
                    fill="#FF9AA2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                  />
                </>
              )}
            </AnimatePresence>

            {/* Beak */}
            <path d="M32 24 L26 27 L32 29 L38 27 Z" fill="#FF8C00" />

            {/* Hat */}
            <rect x="24" y="10" width="16" height="3" rx="1" fill="#3B82F6" />
            <rect x="28" y="4" width="8" height="8" rx="2" fill="#3B82F6" />
            <circle cx="32" cy="4" r="2" fill="#22D3EE" />

            {/* Feet */}
            <motion.g animate={isWalking ? { y: [0, -2, 0] } : {}}>
              <path d="M24 52 L18 58 L24 56 L30 58 Z" fill="#FF8C00" />
              <path d="M40 52 L34 58 L40 56 L46 58 Z" fill="#FF8C00" />
            </motion.g>

            {/* Sparkles when excited */}
            <AnimatePresence>
              {isExcited && (
                <>
                  <motion.text
                    x="10"
                    y="15"
                    fontSize="10"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1, y: 10 }}
                    exit={{ opacity: 0 }}
                  >
                    ✨
                  </motion.text>
                  <motion.text
                    x="48"
                    y="15"
                    fontSize="10"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1, y: 10 }}
                    exit={{ opacity: 0 }}
                  >
                    ✨
                  </motion.text>
                </>
              )}
            </AnimatePresence>

            <defs>
              <linearGradient id="bodyGradient" x1="14" y1="26" x2="50" y2="54">
                <stop offset="0%" stopColor="#FFE066" />
                <stop offset="100%" stopColor="#FFB800" />
              </linearGradient>
              <linearGradient id="headGradient" x1="20" y1="10" x2="44" y2="34">
                <stop offset="0%" stopColor="#FFE066" />
                <stop offset="100%" stopColor="#FFD93D" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Walking dust particles */}
        <AnimatePresence>
          {isWalking && !isOverText && (
            <>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-amber-200/40"
                  style={{ bottom: -2, left: 20 + i * 8 }}
                  initial={{ opacity: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 0.6, 0], y: [0, -10], scale: [0.5, 0] }}
                  transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
