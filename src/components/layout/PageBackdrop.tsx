import { useRouter } from "next/router";
import { HeroWave } from "@/components/home/HeroWave";
import { backdropFor } from "@/data/backdrops";

export function PageBackdrop() {
  const { asPath } = useRouter();
  const path = asPath.split(/[?#]/)[0] || "/";

  // The home page has its own, sharper ribbon in the hero
  if (path === "/") return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] overflow-hidden"
    >
      {/* drawn at low resolution, so the browser's smooth scaling makes it soft */}
      <HeroWave
        look={backdropFor(path)}
        resolution={0.3}
        fps={24}
        fade={0}
        className="absolute inset-0 size-full opacity-60"
      />
      <div className="absolute inset-0 bg-linear-to-b from-white/0 via-white/10 to-white" />
    </div>
  );
}
