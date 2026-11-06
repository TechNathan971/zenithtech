import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { primaryNav } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-white/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" aria-label="ZenithTech home" className="text-ink-950">
            <Logo />
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:text-ink-950"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button href="/sign-in" variant="secondary" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button href="/contact-sales" arrow>
            Contact sales
          </Button>
        </div>
      </Container>
    </header>
  );
}
