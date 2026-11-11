import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const STRANDS = 110;
const BASE_HEIGHT = 440; // the design height the strand lengths are written for
const FRAME_MS = 1000 / 40;
const MAX_DPR = 1.5;
const TWO_PI = Math.PI * 2;

type Rgb = [number, number, number];

const strands = Array.from({ length: STRANDS }, (_, i) => ({
  angle: (190 + (i / (STRANDS - 1)) * 160) * (Math.PI / 180),
  length: 150 + ((i * 47) % 140) + ((i * 13) % 60),
  opacity: 0.3 + ((i * 29) % 70) / 100,
  speed: 0.1 + ((i * 31) % 50) / 400, // packet trips per second
  phase: ((i * 37) % 100) / 100,
}));

function hexToRgb(hex: string): Rgb {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function BurstCanvas({ color, className }: { color: string; className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetRef = useRef<Rgb>(hexToRgb(color));
  const redrawRef = useRef<(() => void) | null>(null);
  const reduced = usePrefersReducedMotion();

  // A new colour: the loop eases toward it (or we redraw at once when nothing is moving)
  useEffect(() => {
    targetRef.current = hexToRgb(color);
    redrawRef.current?.();
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    const current: Rgb = [...targetRef.current];
    const progress = strands.map((strand) => strand.phase);
    const pointer = { x: 0, y: 0, level: 0, goal: 0 };

    const draw = (dt: number) => {
      const ease = reduced ? 1 : 1 - Math.exp(-dt * 4);
      for (let c = 0; c < 3; c++) current[c] += (targetRef.current[c] - current[c]) * ease;
      pointer.level += (pointer.goal - pointer.level) * (1 - Math.exp(-dt * 8));

      ctx.clearRect(0, 0, width, height);
      const scale = height / BASE_HEIGHT;
      const ox = width / 2;
      const oy = height;
      const rgb = `${Math.round(current[0])}, ${Math.round(current[1])}, ${Math.round(current[2])}`;

      let pointerAngle = Math.atan2(pointer.y - oy, pointer.x - ox);
      if (pointerAngle < 0) pointerAngle += TWO_PI;

      strands.forEach((strand, i) => {
        const cos = Math.cos(strand.angle);
        const sin = Math.sin(strand.angle);
        const inner = 24 * scale;
        const outer = strand.length * scale;

        // strands close to the cursor light up
        let boost = 0;
        if (pointer.level > 0.01) {
          let diff = Math.abs(strand.angle - pointerAngle);
          diff = Math.min(diff, TWO_PI - diff);
          boost = Math.max(0, 1 - diff / 0.3) * pointer.level;
        }

        progress[i] = (progress[i] + dt * strand.speed * (1 + boost * 2)) % 1;
        const t = progress[i];

        // the strand
        ctx.strokeStyle = `rgba(${rgb}, ${Math.min(1, strand.opacity * 0.55 + boost * 0.5)})`;
        ctx.lineWidth = 1 + boost * 0.9;
        ctx.beginPath();
        ctx.moveTo(ox + cos * inner, oy + sin * inner);
        ctx.lineTo(ox + cos * outer, oy + sin * outer);
        ctx.stroke();

        // the dot at its tip
        ctx.fillStyle = `rgba(${rgb}, ${Math.min(1, strand.opacity + boost * 0.4)})`;
        ctx.beginPath();
        ctx.arc(ox + cos * outer, oy + sin * outer, 2.4 + boost * 1.6, 0, TWO_PI);
        ctx.fill();

        // a packet travelling outward, like a release on its way to production
        const r = inner + (outer - inner) * t;
        const fade = Math.sin(Math.PI * t);
        const tail = Math.max(inner, r - 22 * scale);
        ctx.strokeStyle = `rgba(${rgb}, ${0.6 * fade})`;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(ox + cos * tail, oy + sin * tail);
        ctx.lineTo(ox + cos * r, oy + sin * r);
        ctx.stroke();
        ctx.fillStyle = `rgba(${rgb}, ${0.9 * fade})`;
        ctx.beginPath();
        ctx.arc(ox + cos * r, oy + sin * r, 2.2 + boost, 0, TWO_PI);
        ctx.fill();
      });
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      const dt = last === 0 ? 0.016 : Math.min((now - last) / 1000, 0.1);
      last = now;
      draw(dt);
    };
    const start = () => {
      if (!frame) {
        last = 0;
        frame = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0); // resizing clears the canvas, so draw right away
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const box = canvas.getBoundingClientRect();
      pointer.x = e.clientX - box.left;
      pointer.y = e.clientY - box.top;
      pointer.goal = 1;
    };
    const onLeave = () => {
      pointer.goal = 0;
    };

    redrawRef.current = () => draw(0);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    let intersectionObserver: IntersectionObserver | undefined;
    if (!reduced) {
      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerleave", onLeave);
      intersectionObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      });
      intersectionObserver.observe(canvas);
    }

    return () => {
      stop();
      redrawRef.current = null;
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
