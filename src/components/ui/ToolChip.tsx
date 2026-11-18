import { ToolLogoImg } from "@/components/ui/ToolLogoImg";
import { heroLogos } from "@/data/customers";

/** A tool name with its logo, when we have one. */
export function ToolChip({ tool }: { tool: string }) {
  const logo = heroLogos.find((entry) => entry.title === tool);

  return (
    <li className="inline-flex items-center gap-2 rounded-full border border-ink-100 bg-white px-3 py-1.5 text-sm font-medium text-ink-700">
      {logo && <ToolLogoImg slug={logo.slug} className="size-4 object-contain" />}
      {tool}
    </li>
  );
}
