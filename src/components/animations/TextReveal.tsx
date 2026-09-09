'use client';

import { motion, type Variants } from 'motion/react';

type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
  gradient?: boolean;
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20, rotateX: -90 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function TextReveal({
  text,
  className,
  delay = 0,
  as: Component = 'span',
  gradient = false,
}: TextRevealProps) {
  const words = text.split(' ');

  return (
    <Component className={`inline-block ${className ?? ''}`} style={{ perspective: 600 }}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split('').map((char, ci) => (
            <motion.span
              key={ci}
              className={`inline-block ${gradient ? 'text-gradient' : ''}`}
              custom={delay + wi * 2 + ci * 0.5}
              variants={letterVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Component>
  );
}
