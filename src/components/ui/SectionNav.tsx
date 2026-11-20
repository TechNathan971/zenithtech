import clsx from "clsx";
import { useEffect, useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import type { Text } from "@/lib/i18n";

export type SectionLink = { id: string; label: Text };

/** A sticky "On this page" list that highlights the section you are reading. */
export function SectionNav({ sections }: { sections: SectionLink[] }) {
  const { t } = useI18n();
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24">
        <p className="text-xs font-semibold tracking-widest text-ink-500 uppercase">
          {t(["On this page", "Sur cette page"])}
        </p>
        <ul className="mt-4 space-y-1 border-l border-ink-200">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={clsx(
                  "-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors",
                  active === section.id
                    ? "border-brand-600 font-medium text-brand-700"
                    : "border-transparent text-ink-500 hover:text-ink-900",
                )}
              >
                {t(section.label)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
