import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { buttonStyles } from "@/components/ui/Button";
import { useI18n } from "@/hooks/useI18n";
import type { Text } from "@/lib/i18n";
import { recommend } from "@/lib/recommend";

const MAX = 300;

const examples: Text[] = [
  ["My deployments are slow and manual", "Mes déploiements sont lents et manuels"],
  ["I need a website hosted and secured", "J’ai besoin d’un site web hébergé et sécurisé"],
  ["I want to learn Docker and Kubernetes", "Je veux apprendre Docker et Kubernetes"],
];

export function GuideBox() {
  const { locale, t } = useI18n();
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  const results = useMemo(
    () => (submitted ? recommend(submitted, locale) : null),
    [submitted, locale],
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) setSubmitted(text);
  };

  const useExample = (example: Text) => {
    const value = t(example);
    setText(value);
    setSubmitted(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor="guide-input" className="block text-sm font-medium text-ink-950">
          {t(["What are you working on?", "Sur quoi travaillez-vous ?"])}
        </label>
        <textarea
          id="guide-input"
          value={text}
          maxLength={MAX}
          rows={4}
          onChange={(e) => setText(e.target.value)}
          placeholder={t([
            "For example: we deploy by hand and releases keep breaking…",
            "Par exemple : nous déployons à la main et les mises en production échouent souvent…",
          ])}
          className="mt-2 w-full resize-none rounded-xl border border-ink-200 bg-white p-4 text-ink-900 placeholder:text-ink-400"
        />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-ink-500 tabular-nums">
            {text.length}/{MAX}
          </p>
          <button
            type="submit"
            disabled={!text.trim()}
            className={buttonStyles({
              size: "lg",
              className: "disabled:cursor-not-allowed disabled:opacity-50",
            })}
          >
            {t(["Get recommendations", "Obtenir des recommandations"])}
          </button>
        </div>
      </form>

      <div className="mt-6 flex flex-wrap gap-2">
        {examples.map((example) => (
          <button
            key={t(example)}
            type="button"
            onClick={() => useExample(example)}
            className="rounded-full border border-ink-200 bg-white px-3 py-1.5 text-sm text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700"
          >
            {t(example)}
          </button>
        ))}
      </div>

      <div aria-live="polite" className="mt-8">
        {results && (
          <div>
            <p className="text-sm font-medium text-ink-950">
              {results[0].matched
                ? t(["Good places to start:", "De bons points de départ :"])
                : t([
                    "No exact match, but these are common starting points:",
                    "Pas de correspondance exacte, mais voici des points de départ courants :",
                  ])}
            </p>
            <ul className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {results.map((result) => (
                <li key={result.href}>
                  <Link
                    href={result.href}
                    className="group block h-full rounded-card border border-ink-100 bg-white p-5 transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-card"
                  >
                    <span className="flex items-center justify-between gap-2 font-semibold text-ink-950">
                      {result.label}
                      <ArrowRight
                        aria-hidden
                        className="size-4 shrink-0 text-brand-600 transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                    <span className="mt-2 block text-sm text-ink-600">{result.reason}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {!results[0].matched && (
              <p className="mt-4 text-sm text-ink-600">
                <Link href="/contact" className="font-medium text-brand-700 hover:text-brand-900">
                  {t(["Or just contact me", "Ou contactez-moi directement"])}
                </Link>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
