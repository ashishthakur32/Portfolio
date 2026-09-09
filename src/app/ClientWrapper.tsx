'use client';

import { useEffect, useState } from 'react';
import CustomCursor from '@/components/animations/CustomCursor';
import ScrollProgress from '@/components/animations/ScrollProgress';
import WelcomeIntro from '@/components/animations/WelcomeIntro';
import CursorDuck from '@/components/animations/CursorDuck';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {showIntro && <WelcomeIntro onComplete={() => setShowIntro(false)} />}
      {!isMobile && <CustomCursor />}
      {!isMobile && <CursorDuck />}
      <ScrollProgress />
      {children}
    </>
  );
}
