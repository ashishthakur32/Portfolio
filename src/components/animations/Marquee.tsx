'use client';

import { cn } from '@/lib/utils';

type MarqueeProps = {
  items: string[];
  className?: string;
  reverse?: boolean;
  speed?: number;
  variant?: 'filled' | 'outline';
};

export default function Marquee({
  items,
  className,
  reverse = false,
  speed = 30,
  variant = 'outline',
}: MarqueeProps) {
  const row = [...items, ...items];

  return (
    <div className={cn('relative flex overflow-hidden py-4 select-none', className)}>
      <div
        className="marquee-track flex shrink-0 items-center gap-8 pr-8"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-8 shrink-0">
            <span
              className={cn(
                'text-3xl md:text-5xl font-bold tracking-tight whitespace-nowrap',
                variant === 'filled' ? 'text-gradient' : 'marquee-outline'
              )}
            >
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-amber-500 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
