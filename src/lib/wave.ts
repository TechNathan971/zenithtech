/** How one ribbon looks: its colours, direction, position and speed. */
export type WaveLook = {
  colors?: [string, string, string];
  angle?: number; // direction of the ribbon, in radians
  center?: [number, number]; // where it passes, as a share of width and height
  scale?: number; // how wide the ribbon is
  speed?: number; // 1 is normal
  seed?: number; // shifts the animation so two pages never look identical
};
