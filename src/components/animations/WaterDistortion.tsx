'use client';

import { useEffect, useRef } from 'react';

type WaterDistortionProps = {
  children: React.ReactNode;
  maxScale?: number;
};

export default function WaterDistortion({
  children,
  maxScale = 9,
}: WaterDistortionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const wrapper = wrapperRef.current;
    const displacement = displacementRef.current;
    const turbulence = turbulenceRef.current;
    if (!wrapper || !displacement || !turbulence) return;

    let energy = 0;
    let phase = 0;
    let active = false;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    const activate = (amount: number) => {
      energy = Math.min(1, energy + amount);
      if (!active) {
        active = true;
        wrapper.style.filter = 'url(#water-distortion-filter)';
      }
    };

    const onDown = () => activate(0.9);
    let last: { x: number; y: number } | null = null;
    const onMove = (e: PointerEvent) => {
      if (last) {
        const dist = Math.hypot(e.clientX - last.x, e.clientY - last.y);
        if (dist > 4) activate(Math.min(0.5, dist / 220));
      }
      last = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('pointerdown', onDown, { passive: true });
    if (finePointer) window.addEventListener('pointermove', onMove, { passive: true });

    let raf = 0;
    const tick = () => {
      if (energy > 0.002) {
        energy *= 0.93;
        phase += 0.05;
        const scale = energy * maxScale;
        displacement.setAttribute('scale', scale.toFixed(2));
        const fx = 0.012 + Math.sin(phase) * 0.004;
        const fy = 0.016 + Math.cos(phase * 0.8) * 0.005;
        turbulence.setAttribute('baseFrequency', `${fx.toFixed(4)} ${fy.toFixed(4)}`);
      } else if (active) {
        energy = 0;
        active = false;
        displacement.setAttribute('scale', '0');
        wrapper.style.filter = 'none';
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointerdown', onDown);
      if (finePointer) window.removeEventListener('pointermove', onMove);
    };
  }, [maxScale]);

  return (
    <div ref={wrapperRef} style={{ willChange: 'filter' }}>
      <svg
        aria-hidden="true"
        width="0"
        height="0"
        style={{ position: 'absolute', pointerEvents: 'none' }}
      >
        <defs>
          <filter id="water-distortion-filter" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.012 0.016"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      {children}
    </div>
  );
}
