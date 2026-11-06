import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { mainNav } from "@/data/nav";

type MobileMenuProps = { id: string; open: boolean; onNavigate: () => void };

export function MobileMenu({ id, open, onNavigate }: MobileMenuProps) {
  return (
    <div
      id={id}
      className={clsx(
        "absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-ink-100 bg-white transition-[opacity,visibility] duration-150 lg:hidden",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <Container className="py-4">
        <ul className="divide-y divide-ink-100">
          {mainNav.map((entry) =>
            entry.type === "link" ? (
              <li key={entry.href}>
                <Link
                  href={entry.href}
                  onClick={onNavigate}
                  className="block py-4 text-lg font-medium text-ink-900"
                >
                  {entry.label}
                </Link>
              </li>
            ) : (
              <li key={entry.menu.id}>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-medium text-ink-900 [&::-webkit-details-marker]:hidden">
                    {entry.menu.label}
                    <ChevronDown
                      aria-hidden
                      className="size-5 text-ink-500 transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <div className="space-y-6 pb-6">
                    {(entry.menu.aside
                      ? [...entry.menu.columns, entry.menu.aside]
                      : entry.menu.columns
                    ).map((group) => (
                      <div key={group.title}>
                        <p className="mb-2 text-xs font-semibold tracking-widest text-ink-400 uppercase">
                          {group.title}
                        </p>
                        <ul>
                          {group.items.map((item) => (
                            <li key={`${group.title}-${item.label}`}>
                              <Link
                                href={item.href}
                                onClick={onNavigate}
                                className="block py-1.5 text-base text-brand-700"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {entry.menu.footerLink && (
                      <Link
                        href={entry.menu.footerLink.href}
                        onClick={onNavigate}
                        className="block text-base font-semibold text-brand-700"
                      >
                        {entry.menu.footerLink.label}
                      </Link>
                    )}
                  </div>
                </details>
              </li>
            ),
          )}
        </ul>
        <div className="mt-6 grid gap-3 pb-10">
          <Button href="/sign-in" variant="secondary" size="lg" onClick={onNavigate}>
            Sign in
          </Button>
          <Button href="/contact-sales" size="lg" arrow onClick={onNavigate}>
            Contact sales
          </Button>
        </div>
      </Container>
    </div>
  );
}
