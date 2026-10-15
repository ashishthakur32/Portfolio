'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/lib/data/resume';
import Section from '@/components/ui/Section';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { cn } from '@/lib/utils';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      next();
    }, 6000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
    startTimer();
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    startTimer();
  };

  const current = testimonials[index];

  return (
    <Section
      id="testimonials"
      eyebrow="Testimonials"
      title={
        <>
          What People <span className="text-gradient">Say</span>
        </>
      }
      subtitle="Feedback from people I've had the pleasure of working with."
    >
      <ScrollReveal>
        <div className="relative max-w-3xl mx-auto">
          <div className="glass-card p-8 md:p-10 relative overflow-hidden">
            <Quote className="absolute top-6 right-6 w-12 h-12 text-foreground/5" />

            <div className="min-h-[220px] flex items-center">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.blockquote
                  key={index}
                  initial={{ opacity: 0, x: direction * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -60 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <p className="text-base md:text-lg leading-relaxed text-soft-gray italic mb-8">
                    &ldquo;{current.quote}&rdquo;
                  </p>

                  <footer className="flex items-center gap-4">
                    <div
                      className={cn(
                        'w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold text-lg',
                        current.avatarColor
                      )}
                    >
                      {current.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{current.name}</p>
                      <p className="text-sm text-soft-gray">
                        {current.role} Ã‚Â· {current.company}
                      </p>
                    </div>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="p-2 rounded-lg border border-card-border text-soft-gray hover:border-orange-500/50 hover:text-orange-400 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                    startTimer();
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    i === index
                      ? 'bg-gradient-to-r from-orange-400 to-amber-500 w-6'
                      : 'bg-foreground/20 hover:bg-foreground/40'
                  )}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="p-2 rounded-lg border border-card-border text-soft-gray hover:border-orange-500/50 hover:text-orange-400 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </ScrollReveal>
    </Section>
  );
}