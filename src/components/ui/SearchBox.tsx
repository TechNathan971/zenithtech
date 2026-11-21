import { Search } from "lucide-react";
import type { Text } from "@/lib/i18n";
import { useI18n } from "@/hooks/useI18n";

export function SearchBox({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: Text;
}) {
  const { t } = useI18n();
  return (
    <label className="relative block">
      <span className="sr-only">{t(placeholder)}</span>
      <Search
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-400"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t(placeholder)}
        className="w-full rounded-full border border-ink-200 bg-white py-3 pr-4 pl-11 text-ink-950 transition-shadow outline-none placeholder:text-ink-400 focus:border-brand-400 focus:shadow-card"
      />
    </label>
  );
}
