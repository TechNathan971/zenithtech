import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-ink-50">
      <Container className="flex flex-col gap-2 py-10 text-sm text-ink-500 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} ZenithTech. A learning project, not a real company.</p>
        <p>The full footer arrives in Step 9.</p>
      </Container>
    </footer>
  );
}
