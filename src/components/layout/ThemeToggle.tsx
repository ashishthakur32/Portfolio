'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useMounted } from '@/lib/hooks/useMounted';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="p-2 rounded-lg hover:bg-foreground/10 transition-colors duration-200"
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="p-2 rounded-lg hover:bg-foreground/10 transition-colors duration-200 relative"
    >
      <Sun
        className={`w-5 h-5 text-amber-400 transition-all duration-300 ${
          isDark ? 'opacity-0 scale-75 rotate-90 absolute' : 'opacity-100 scale-100 rotate-0'
        }`}
      />
      <Moon
        className={`w-5 h-5 text-orange-400 transition-all duration-300 ${
          isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-90 absolute'
        }`}
      />
    </button>
  );
}
