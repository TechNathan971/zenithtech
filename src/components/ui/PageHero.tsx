import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { useI18n } from "@/hooks/useI18n";
import type { Text } from "@/lib/i18n";

type PageHeroProps = {
  eyebrow?: Text;
  lead: Text;
  rest?: Text;
  children?: ReactNode;
};

/** The two-tone heading used at the top of the inner pages. */
export function PageHero({ eyebrow, lead, rest, children }: PageHeroProps) {
  const { t } = useI18n();

  return (
    <section className="py-14 sm:py-20">
      <Container>
        {eyebrow && (
          <p className="text-sm font-semibold tracking-widest text-brand-600 uppercase">
            {t(eyebrow)}
          </p>
        )}
        <h1 className="mt-3 max-w-4xl text-3xl leading-tight font-medium tracking-tight sm:text-4xl lg:text-[2.75rem]">
          <span className="text-ink-950">{t(lead)}</span>
          {rest && (
            <>
              {" "}
              <span className="text-ink-500">{t(rest)}</span>
            </>
          )}
        </h1>
        {children}
      </Container>
    </section>
  );
}
