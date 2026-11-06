import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const LINES = 48;
const STEP = 12;
const FREEZE_AT = 2600; // time (ms) used for the still frame when motion is reduced

function readColor(name: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
}

function withAlpha(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

export function HeroWave({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const blue = readColor("--color-brand-500", "#3d5cff");
    const violet = "#8b5cf6";
    const coral = readColor("--color-coral-400", "#ff8a6b");

    let width = 0;
    let height = 0;
    let frame = 0;

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const reach = Math.hypot(width, height) * 0.6;
      const thickness = Math.min(width, height) * 0.55;

      const gradient = ctx.createLinearGradient(-reach, 0, reach, 0);
      gradient.addColorStop(0, withAlpha(blue, 0));
      gradient.addColorStop(0.3, withAlpha(blue, 1));
      gradient.addColorStop(0.6, withAlpha(violet, 1));
      gradient.addColorStop(0.85, withAlpha(coral, 1));
      gradient.addColorStop(1, withAlpha(coral, 0));

      ctx.save();
      ctx.translate(width * 0.7, height * 0.5);
      ctx.rotate(-0.5);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.1;

      for (let i = 0; i < LINES; i++) {
        const k = i / (LINES - 1) - 0.5;
        ctx.globalAlpha = 0.16 + 0.34 * Math.abs(Math.sin(i * 0.55 + time * 0.0003));
        ctx.beginPath();
        for (let x = -reach; x <= reach; x += STEP) {
          const twist = 0.55 + 0.45 * Math.sin(x * 0.0032 + time * 0.00045);
          const swell = Math.sin(x * 0.0021 - time * 0.0006) * thickness * 0.28;
          const y = k * thickness * twist + swell;
          if (x === -reach) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();
    };

    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) draw(FREEZE_AT);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    let intersectionObserver: IntersectionObserver | undefined;
    if (!reduced) {
      intersectionObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      });
      intersectionObserver.observe(canvas);
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
    };
  }, [reduced]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
