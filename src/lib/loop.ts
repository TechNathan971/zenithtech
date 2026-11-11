export type LoopGeometry = {
  cx: number; // centre of the loop
  cy: number;
  a: number; // half the loop's width
  k: number; // how tall the loop is compared with its width
  horizon: number; // where the grid floor starts
};

export function loopGeometry(width: number, height: number): LoopGeometry {
  return {
    cx: width / 2,
    cy: height * 0.42,
    a: Math.min(width * 0.4, height * 0.62),
    k: 1.15,
    horizon: height * 0.76,
  };
}

/** A point on the infinity curve (a lemniscate). t runs from 0 to 2π. */
export function loopPoint(t: number, g: LoopGeometry): { x: number; y: number } {
  const s = Math.sin(t);
  const c = Math.cos(t);
  const d = 1 + s * s;
  return { x: g.cx + (g.a * c) / d, y: g.cy + (g.k * g.a * s * c) / d };
}

/** The top edge of the loop, used to place the cloud symbol above it. */
export const loopTop = (g: LoopGeometry) => g.cy - 0.3536 * g.k * g.a;
