import type { WaveLook } from "@/lib/wave";

const fallback: WaveLook = {
  colors: ["#3d5cff", "#8b5cf6", "#ff8a6b"],
  angle: -0.5,
  center: [0.62, 0.5],
  scale: 1,
  speed: 0.8,
  seed: 0,
};

const work: WaveLook = {
  colors: ["#3d5cff", "#8b5cf6", "#22d3ee"],
  angle: -0.35,
  center: [0.68, 0.5],
  scale: 0.9,
  speed: 0.8,
  seed: 1,
};
const services: WaveLook = {
  colors: ["#14b8a6", "#22c55e", "#a3e635"],
  angle: 0.25,
  center: [0.3, 0.5],
  scale: 0.95,
  speed: 0.7,
  seed: 2,
};
const learn: WaveLook = {
  colors: ["#f59e0b", "#fb7185", "#8b5cf6"],
  angle: -0.9,
  center: [0.8, 0.55],
  scale: 0.85,
  speed: 0.9,
  seed: 3,
};
const reading: WaveLook = {
  colors: ["#6366f1", "#a855f7", "#f472b6"],
  angle: -0.1,
  center: [0.5, 0.45],
  scale: 1,
  speed: 0.6,
  seed: 4,
};
const pricing: WaveLook = {
  colors: ["#8b5cf6", "#d946ef", "#fb923c"],
  angle: 0,
  center: [0.5, 0.5],
  scale: 1.1,
  speed: 0.7,
  seed: 5,
};
const contact: WaveLook = {
  colors: ["#ff6b4a", "#f472b6", "#8b5cf6"],
  angle: -0.6,
  center: [0.2, 0.5],
  scale: 0.9,
  speed: 0.8,
  seed: 6,
};
const about: WaveLook = {
  colors: ["#3b82f6", "#06b6d4", "#34d399"],
  angle: -0.3,
  center: [0.7, 0.5],
  scale: 1,
  speed: 0.7,
  seed: 7,
};
const guide: WaveLook = {
  colors: ["#7c3aed", "#3d5cff", "#06b6d4"],
  angle: -0.7,
  center: [0.65, 0.5],
  scale: 0.9,
  speed: 0.9,
  seed: 8,
};
const status: WaveLook = {
  colors: ["#10b981", "#06b6d4", "#3b82f6"],
  angle: 0.05,
  center: [0.5, 0.5],
  scale: 1,
  speed: 0.6,
  seed: 9,
};
const stack: WaveLook = {
  colors: ["#3d5cff", "#06b6d4", "#8b5cf6"],
  angle: -0.45,
  center: [0.75, 0.5],
  scale: 0.9,
  speed: 0.8,
  seed: 10,
};
const account: WaveLook = {
  colors: ["#3d5cff", "#6366f1", "#a855f7"],
  angle: -0.55,
  center: [0.7, 0.5],
  scale: 1,
  speed: 0.7,
  seed: 11,
};

const entries: { paths: string[]; look: WaveLook }[] = [
  { paths: ["/work"], look: work },
  { paths: ["/services", "/partners", "/templates"], look: services },
  { paths: ["/learn"], look: learn },
  {
    paths: ["/blog", "/guides", "/case-studies", "/writing", "/updates", "/press-kit"],
    look: reading,
  },
  { paths: ["/pricing"], look: pricing },
  { paths: ["/contact", "/get-started", "/support", "/collaborate"], look: contact },
  { paths: ["/about", "/letter", "/work-with-me", "/roadmap"], look: about },
  { paths: ["/guide-me"], look: guide },
  { paths: ["/status"], look: status },
  { paths: ["/stack"], look: stack },
  { paths: ["/sign-in"], look: account },
];

export function backdropFor(path: string): WaveLook {
  const hit = entries.find((entry) =>
    entry.paths.some((p) => path === p || path.startsWith(`${p}/`)),
  );
  return hit ? hit.look : fallback;
}
