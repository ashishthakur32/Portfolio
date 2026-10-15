'use client';

import { useEffect, useRef } from 'react';

type Ripple = {
  x: number;
  y: number;
  r: number;
  max: number;
  life: number;
  ttl: number;
  width: number;
};

export default function WaterRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const ripples: Ripple[] = [];
    const MAX_RIPPLES = 60;

    const spawn = (x: number, y: number, big: boolean) => {
      const rings = big ? 3 : 1;
      for (let k = 0; k < rings; k++) {
        ripples.push({
          x,
          y,
          r: k * 10,
          max: (big ? 100 : 60) + k * 20,
          life: 0,
          ttl: 1100 + k * 180,
          width: big ? 2.2 : 1.2,
        });
      }
      if (ripples.length > MAX_RIPPLES) {
        ripples.splice(0, ripples.length - MAX_RIPPLES);
      }
    };

    const onDown = (e: PointerEvent) => spawn(e.clientX, e.clientY, true);

    let lastMove = 0;
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastMove < 100) return;
      lastMove = now;
      spawn(e.clientX, e.clientY, false);
    };

    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);

    let raf = 0;
    let prev = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - prev, 64);
      prev = now;

      ctx.clearRect(0, 0, w, h);

      if (ripples.length > 0) {
        ctx.globalCompositeOperation = 'lighter';
        for (let i = ripples.length - 1; i >= 0; i--) {
          const rp = ripples[i];
          rp.life += dt;
          const p = rp.life / rp.ttl;
          if (p >= 1) {
            ripples.splice(i, 1);
            continue;
          }
          const ease = 1 - Math.pow(1 - p, 3);
          const radius = rp.r + (rp.max - rp.r) * ease;
          const alpha = (1 - p) * 0.45;
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 122, 40, ${alpha})`;
          ctx.lineWidth = rp.width * (1 - p) + 0.4;
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[45] mix-blend-screen"
    />
  );
}
