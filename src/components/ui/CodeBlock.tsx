import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";

export function CodeBlock({ label, code }: { label: string; code: string }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard blocked: nothing to do
    }
  };

  return (
    <div className="overflow-hidden rounded-card bg-ink-950 shadow-float">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="font-mono text-xs text-ink-300">{label}</span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-ink-200 transition-colors hover:bg-white/10"
        >
          {copied ? (
            <Check aria-hidden className="size-3.5" />
          ) : (
            <Copy aria-hidden className="size-3.5" />
          )}
          {copied ? t(["Copied", "Copié"]) : t(["Copy", "Copier"])}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-6 text-ink-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
