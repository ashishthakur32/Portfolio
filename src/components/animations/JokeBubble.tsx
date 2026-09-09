'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useSpring } from 'motion/react';
import type { MotionValue } from 'motion/react';

const JOKES = [
  "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
  "A SQL query walks into a bar, sees two tables and asks... Can I JOIN you? 🍺",
  "Why do Java developers wear glasses? Because they can't C#! 👓",
  "What's a programmer's favorite hangout place? Foo Bar! 🍸",
  "Why was the JavaScript developer sad? Because he didn't Node how to Express himself! 😢",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
  "Why do programmers hate nature? It has too many bugs! 🦗",
  "What's a computer's favorite snack? Microchips! 🍟",
  "Why did the developer go broke? Because he used up all his cache! 💸",
  "What do you call a computer that sings? A-Dell! 🎵",
];

const TECH_NEWS = [
  "🤖 OpenAI released GPT-5 with amazing new capabilities!",
  "🍎 Apple Vision Pro sales exceed expectations in 2026!",
  "🚀 SpaceX completes 100th Starship mission!",
  "💻 Rust language adoption grows 200% in enterprise!",
  "🔐 New quantum-resistant encryption standard announced!",
  "🌐 Web3 adoption reaches mainstream milestone!",
  "🎮 Nintendo Switch 2 breaks all sales records!",
  "📱 Foldable phones now 30% of smartphone market!",
  "🤖 Humanoid robots enter warehouse workforce!",
  "☁️ Cloud computing market hits $1 trillion!",
];

type JokeBubbleProps = {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  visible: boolean;
};

export default function JokeBubble({ mouseX, mouseY, visible }: JokeBubbleProps) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isJoke, setIsJoke] = useState(true);

  const bubbleX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const bubbleY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  useEffect(() => {
    if (visible) {
      const useJoke = Math.random() > 0.4;
      setIsJoke(useJoke);
      const messages = useJoke ? JOKES : TECH_NEWS;
      setCurrentMessage(messages[Math.floor(Math.random() * messages.length)]);
    }
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed pointer-events-none z-[91]"
          style={{
            x: bubbleX,
            y: bubbleY,
          }}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: -80 }}
          exit={{ opacity: 0, scale: 0, y: -40 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        >
          <div
            className="relative max-w-[280px] px-4 py-3 rounded-2xl shadow-xl backdrop-blur-md"
            style={{
              background: isJoke
                ? 'linear-gradient(135deg, rgba(34, 211, 238, 0.15), rgba(59, 130, 246, 0.15))'
                : 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(236, 72, 153, 0.15))',
              border: isJoke
                ? '1px solid rgba(34, 211, 238, 0.3)'
                : '1px solid rgba(168, 85, 247, 0.3)',
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-xs font-semibold" style={{ color: isJoke ? '#22D3EE' : '#A855F7' }}>
                {isJoke ? '😄 Duck Joke' : '📰 Tech News'}
              </span>
            </div>

            {/* Message */}
            <p className="text-sm leading-relaxed text-foreground">
              {currentMessage}
            </p>

            {/* Speech bubble tail */}
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45"
              style={{
                background: isJoke
                  ? 'rgba(34, 211, 238, 0.15)'
                  : 'rgba(168, 85, 247, 0.15)',
                borderRight: isJoke
                  ? '1px solid rgba(34, 211, 238, 0.3)'
                  : '1px solid rgba(168, 85, 247, 0.3)',
                borderBottom: isJoke
                  ? '1px solid rgba(34, 211, 238, 0.3)'
                  : '1px solid rgba(168, 85, 247, 0.3)',
              }}
            />

            {/* Decorative dots */}
            <div className="absolute -top-1 -right-1 flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full"
                  style={{ background: isJoke ? '#22D3EE' : '#A855F7' }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
