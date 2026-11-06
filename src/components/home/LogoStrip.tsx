import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { heroLogos } from "@/data/customers";

export function LogoStrip() {
  return (
    <section aria-label="Customers" className="border-y border-ink-100 bg-white">
      <Container>
        <ul className="grid grid-cols-2 items-center gap-y-8 py-10 sm:grid-cols-3 lg:grid-cols-6">
          {heroLogos.map((logo) => (
            <li key={logo.name} className="text-center">
              <span className={clsx("text-xl text-ink-500 select-none", logo.className)}>
                {logo.name}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
