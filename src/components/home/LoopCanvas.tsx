import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { loopGeometry, loopPoint, type LoopGeometry } from "@/lib/loop";

const FRAME_MS = 1000 / 30;
const MAX_DPR = 1.5;
const TWO_PI = Math.PI * 2;
const PATH_POINTS = 280;
const PARTICLES = 64;
const TRAIL = 6;
const GRID_COLS = 16;
const GRID_ROWS = 12;
const GRID_SEGMENTS = 36;

type Rgb = [number, number, number];
type Palette = { dev: Rgb; ops: Rgb; accent: Rgb };

export type LoopColors = { dev: string; ops: string; accent: string };

const hexToRgb = (hex: string): Rgb => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const mix = (a: Rgb, b: Rgb, f: number): Rgb => [
  a[0] + (b[0] - a[0]) * f,
  a[1] + (b[1] - a[1]) * f,
  a[2] + (b[2] - a[2]) * f,
];
const rgba = (c: Rgb, alpha: number) =>
  `rgba(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])}, ${alpha})`;

const toPalette = (colors: LoopColors): Palette => ({
  dev: hexToRgb(colors.dev),
  ops: hexToRgb(colors.ops),
  accent: hexToRgb(colors.accent),
});

const particles = Array.from({ length: PARTICLES }, (_, i) => ({
  start: (i * 0.618034) % 1,
  speed: 0.06 + (i % 5) * 0.012,
}));

const network = Array.from({ length: 18 }, (_, i) => ({
  x: 0.04 + ((i * 37) % 92) / 100,
  y: 0.05 + ((i * 53) % 52) / 100,
  phase: (((i * 29) % 100) / 100) * TWO_PI,
}));

const gridDots = Array.from({ length: 26 }, (_, i) => ({
  col: (i * 7) % (GRID_COLS + 1),
  row: 1 + ((i * 5) % GRID_ROWS),
  phase: (((i * 31) % 100) / 100) * TWO_PI,
}));

const passes = [
  { width: 16, alpha: 0.08 },
  { width: 8, alpha: 0.16 },
  { width: 2.4, alpha: 0.95 },
];

type LoopCanvasProps = {
  colors: LoopColors;
  stageTs: number[];
  active: number;
  className?: string;
};

export function LoopCanvas({ colors, stageTs, active, className }: LoopCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetRef = useRef<Palette>(toPalette(colors));
  const stageRef = useRef(stageTs);
  const activeRef = useRef(active);
  const redrawRef = useRef<(() => void) | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    targetRef.current = toPalette(colors);
    stageRef.current = stageTs;
    activeRef.current = active;
    redrawRef.current?.();
  }, [colors, stageTs, active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let clock = 0;
    let geom: LoopGeometry = loopGeometry(1, 1);
    let path: { x: number; y: number }[] = [];
    const now: Palette = {
      dev: [...targetRef.current.dev],
      ops: [...targetRef.current.ops],
      accent: [...targetRef.current.accent],
    };
    const progress = particles.map((p) => p.start);

    const draw = (dt: number) => {
      clock += dt;
      const ease = reduced ? 1 : 1 - Math.exp(-dt * 3);
      for (const key of ["dev", "ops", "accent"] as const) {
        for (let c = 0; c < 3; c++) {
          now[key][c] += (targetRef.current[key][c] - now[key][c]) * ease;
        }
      }
      const { dev, ops, accent } = now;
      const { cx, a, horizon } = geom;
      const lw = Math.max(0.6, a / 300);

      ctx.clearRect(0, 0, width, height);

      /* 1. A faint network of connected nodes */
      const nodes = network.map((n) => ({
        x: n.x * width + Math.sin(clock * 0.25 + n.phase) * 12,
        y: n.y * height + Math.cos(clock * 0.2 + n.phase) * 10,
      }));
      const reach = width * 0.14;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d > reach) continue;
          ctx.strokeStyle = rgba(accent, 0.16 * (1 - d / reach));
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
      ctx.fillStyle = rgba(accent, 0.4);
      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.8, 0, TWO_PI);
        ctx.fill();
      }

      /* 2. The grid floor with a travelling wave */
      const depth = height - horizon;
      const amp = depth * 0.1;
      ctx.strokeStyle = rgba(accent, 0.16);
      for (let i = 0; i <= GRID_COLS; i++) {
        const bx = cx + (i / GRID_COLS - 0.5) * width * 1.8;
        ctx.beginPath();
        ctx.moveTo(cx, horizon);
        ctx.lineTo(bx, height);
        ctx.stroke();
      }
      for (let j = 1; j <= GRID_ROWS; j++) {
        const u = (j / GRID_ROWS) ** 2;
        const baseY = horizon + depth * u;
        ctx.strokeStyle = rgba(accent, 0.06 + 0.3 * u);
        ctx.beginPath();
        for (let k = 0; k <= GRID_SEGMENTS; k++) {
          const x = (k / GRID_SEGMENTS) * width;
          const y = baseY + Math.sin(x * 0.012 + clock * 1.1 + j * 0.6) * amp * u;
          if (k === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      for (const dot of gridDots) {
        const u = (dot.row / GRID_ROWS) ** 2;
        const bx = cx + (dot.col / GRID_COLS - 0.5) * width * 1.8;
        const x = cx + (bx - cx) * u;
        const y = horizon + depth * u + Math.sin(x * 0.012 + clock * 1.1 + dot.row * 0.6) * amp * u;
        const pulse = 0.5 + 0.5 * Math.sin(clock * 2 + dot.phase);
        ctx.fillStyle = rgba(accent, 0.35 + 0.55 * pulse);
        ctx.beginPath();
        ctx.arc(x, y, (1.4 + 1.2 * pulse) * Math.max(0.8, u + 0.4), 0, TWO_PI);
        ctx.fill();
      }

      /* 3. The infinity loop: Dev on the left, Ops on the right */
      const gradient = ctx.createLinearGradient(cx - a, 0, cx + a, 0);
      gradient.addColorStop(0, rgba(dev, 1));
      gradient.addColorStop(0.4, rgba(dev, 1));
      gradient.addColorStop(0.6, rgba(ops, 1));
      gradient.addColorStop(1, rgba(ops, 1));
      ctx.strokeStyle = gradient;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      for (const pass of passes) {
        ctx.globalAlpha = pass.alpha;
        ctx.lineWidth = pass.width * lw;
        ctx.beginPath();
        path.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      /* 4. Energy particles flowing around the loop */
      const white: Rgb = [255, 255, 255];
      particles.forEach((particle, i) => {
        progress[i] = (progress[i] + dt * particle.speed) % 1;
        const tHead = TWO_PI * (1 - progress[i]);
        const head = loopPoint(tHead, geom);
        const f = Math.min(1, Math.max(0, (head.x - (cx - a * 0.12)) / (a * 0.24)));
        const color = mix(dev, ops, f);

        ctx.beginPath();
        for (let k = TRAIL; k >= 0; k--) {
          const q = loopPoint(tHead + k * 0.05, geom);
          if (k === TRAIL) ctx.moveTo(q.x, q.y);
          else ctx.lineTo(q.x, q.y);
        }
        ctx.strokeStyle = rgba(color, 0.55);
        ctx.lineWidth = 2 * lw;
        ctx.stroke();

        ctx.fillStyle = rgba(color, 0.2);
        ctx.beginPath();
        ctx.arc(head.x, head.y, 6 * lw, 0, TWO_PI);
        ctx.fill();
        ctx.fillStyle = rgba(mix(color, white, 0.6), 1);
        ctx.beginPath();
        ctx.arc(head.x, head.y, 2.4 * lw, 0, TWO_PI);
        ctx.fill();
      });

      /* 5. Pulsing rings around the four stages */
      stageRef.current.forEach((t, i) => {
        const p = loopPoint(t, geom);
        const isActive = i === activeRef.current;
        const pulse = 0.5 + 0.5 * Math.sin(clock * 2 + i * 1.5);
        ctx.strokeStyle = `rgba(255, 255, 255, ${(isActive ? 0.6 : 0.25) * (1 - pulse * 0.5)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, (isActive ? 20 : 13) + pulse * (isActive ? 8 : 4), 0, TWO_PI);
        ctx.stroke();
      });
    };

    const loop = (time: number) => {
      frame = requestAnimationFrame(loop);
      if (time - last < FRAME_MS) return;
      const dt = last === 0 ? 0.016 : Math.min((time - last) / 1000, 0.1);
      last = time;
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
      geom = loopGeometry(width, height);
      path = Array.from({ length: PATH_POINTS + 1 }, (_, k) =>
        loopPoint((k / PATH_POINTS) * TWO_PI, geom),
      );
      draw(0); // resizing clears the canvas, so draw right away
    };

    redrawRef.current = () => draw(0);

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
      redrawRef.current = null;
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
    };
  }, [reduced]);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
