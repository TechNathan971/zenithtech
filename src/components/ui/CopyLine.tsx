import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyLine({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // clipboard blocked: nothing to do
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="group flex w-full items-center justify-between gap-3 rounded-lg bg-ink-950 px-3.5 py-2.5 text-left transition-colors hover:bg-ink-900"
    >
      <code className="overflow-x-auto font-mono text-[13px] whitespace-nowrap text-ink-100">
        {command}
      </code>
      {copied ? (
        <Check aria-hidden className="size-4 shrink-0 text-emerald-400" />
      ) : (
        <Copy
          aria-hidden
          className="size-4 shrink-0 text-ink-400 transition-colors group-hover:text-white"
        />
      )}
    </button>
  );
}
