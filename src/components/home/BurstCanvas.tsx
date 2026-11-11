import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const RAYS = 180;
const PARTICLES = 3;
const FRAME_MS = 1000 / 30;
const MAX_DPR = 1.5;
const TWO_PI = Math.PI * 2;

type Rgb = [number, number, number];

const rays = Array.from({ length: RAYS }, (_, i) => ({
  angle: (182 + (i / (RAYS - 1)) * 176) * (Math.PI / 180),
  length: 0.42 + ((i * 47) % 58) / 100, // share of the full radius
  opacity: 0.25 + ((i * 29) % 60) / 100,
  particles: Array.from({ length: PARTICLES }, (_, j) => ({
    along: 0.2 + ((i * 17 + j * 41) % 78) / 100, // where on the ray it sits
    phase: (((i * 13 + j * 29) % 100) / 100) * TWO_PI,
    size: 1.1 + ((i + j) % 3) * 0.5,
  })),
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
    let clock = 0;
    const current: Rgb = [...targetRef.current];
    const pointer = { x: 0, y: 0, level: 0, goal: 0 };

    const draw = (dt: number) => {
      clock += dt;
      const ease = reduced ? 1 : 1 - Math.exp(-dt * 4);
      for (let c = 0; c < 3; c++) current[c] += (targetRef.current[c] - current[c]) * ease;
      pointer.level += (pointer.goal - pointer.level) * (1 - Math.exp(-dt * 8));

      ctx.clearRect(0, 0, width, height);
      const ox = width / 2;
      const oy = height;
      const rx = width * 0.48; // the fan is a wide dome that fills the frame
      const ry = height * 0.94;
      const rgb = `${Math.round(current[0])}, ${Math.round(current[1])}, ${Math.round(current[2])}`;

      // the glow around the focal point
      const glowRadius = Math.min(width * 0.5, height * 1.5);
      const glow = ctx.createRadialGradient(ox, oy, 0, ox, oy, glowRadius);
      glow.addColorStop(0, `rgba(${rgb}, 0.38)`);
      glow.addColorStop(1, `rgba(${rgb}, 0)`);
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // where the cursor points, measured on the same dome shape
      let pointerAngle = Math.atan2((pointer.y - oy) / ry, (pointer.x - ox) / rx);
      if (pointerAngle < 0) pointerAngle += TWO_PI;

      for (const ray of rays) {
        const cos = Math.cos(ray.angle);
        const sin = Math.sin(ray.angle);
        const x1 = ox + cos * rx * 0.035;
        const y1 = oy + sin * ry * 0.035;
        const x2 = ox + cos * rx * ray.length;
        const y2 = oy + sin * ry * ray.length;

        // rays close to the cursor light up
        let boost = 0;
        if (pointer.level > 0.01) {
          let diff = Math.abs(ray.angle - pointerAngle);
          diff = Math.min(diff, TWO_PI - diff);
          boost = Math.max(0, 1 - diff / 0.25) * pointer.level;
        }

        ctx.strokeStyle = `rgba(${rgb}, ${Math.min(1, ray.opacity * 0.55 + boost * 0.45)})`;
        ctx.lineWidth = 0.8 + boost * 0.8;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // the dot at the tip of the ray
        ctx.fillStyle = `rgba(${rgb}, ${Math.min(1, ray.opacity + boost * 0.3)})`;
        ctx.beginPath();
        ctx.arc(x2, y2, 1.8 + boost * 1.4, 0, TWO_PI);
        ctx.fill();

        // particles that stay on the ray and only drift and twinkle a little
        for (const particle of ray.particles) {
          const along = particle.along + 0.012 * Math.sin(clock * 0.35 + particle.phase);
          const twinkle = 0.5 + 0.5 * Math.sin(clock * 0.9 + particle.phase);
          ctx.fillStyle = `rgba(${rgb}, ${Math.min(1, 0.3 + 0.55 * twinkle + boost * 0.3)})`;
          ctx.beginPath();
          ctx.arc(
            x1 + (x2 - x1) * along,
            y1 + (y2 - y1) * along,
            particle.size + boost * 0.8,
            0,
            TWO_PI,
          );
          ctx.fill();
        }
      }

      // the bright dome at the focal point
      const core = Math.max(10, height * 0.035);
      ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
      ctx.beginPath();
      ctx.arc(ox, oy, core, Math.PI, TWO_PI);
      ctx.fill();
      ctx.strokeStyle = `rgba(${rgb}, 0.6)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
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