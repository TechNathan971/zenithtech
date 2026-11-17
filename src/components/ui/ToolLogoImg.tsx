import { useState } from "react";

/** A tool's logo from public/logos. If the file is missing, it shows nothing. */
export function ToolLogoImg({ slug, className }: { slug: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={(img) => {
        if (img && img.complete && img.naturalWidth === 0) setFailed(true);
      }}
      src={`/logos/${slug}.svg`}
      alt=""
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
