import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { HeroWave } from "@/components/home/HeroWave";
import { backdropFor } from "@/data/backdrops";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function PageBackdrop() {
  const { asPath } = useRouter();
  const reduced = usePrefersReducedMotion();
  const layer = useRef<HTMLDivElement>(null);
  const path = asPath.split(/[?#]/)[0] || "/";

  // The background drifts down a little more slowly than the page, which gives depth
  useEffect(() => {
    if (reduced) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (layer.current) {
        const shift = Math.min(window.scrollY, 700) * 0.25;
        layer.current.style.transform = `translate3d(0, ${shift}px, 0)`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  // The home page has its own, sharper ribbon in the hero
  if (path === "/") return null;

  return (
    <div
      ref={layer}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] overflow-hidden will-change-transform"
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
