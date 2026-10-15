'use client';

import { useEffect, useRef, useState } from 'react';

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

type ScrambleTextProps = {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  trigger?: boolean;
};

export default function ScrambleText({
  text,
  className = '',
  delay = 0,
  speed = 30,
  trigger = true,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!trigger) return;

    const timeout = setTimeout(() => {
      setIsAnimating(true);
      let iteration = 0;
      const maxIterations = text.length;

      const interval = setInterval(() => {
        setDisplay(
          text
            .split('')
            .map((char, i) => {
              if (i < iteration) return text[i];
              if (char === ' ') return ' ';
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        iteration += 1 / 2;

        if (iteration >= maxIterations) {
          clearInterval(interval);
          setDisplay(text);
          setIsAnimating(false);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, speed, trigger]);

  return (
    <span ref={containerRef} className={className}>
      {display}
      {isAnimating && (
        <span className="inline-block w-[2px] h-[1em] bg-orange-400 ml-0.5 animate-pulse align-text-bottom" />
      )}
    </span>
  );
}
