import { Container } from "@/components/ui/Container";
import { useI18n } from "@/hooks/useI18n";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-ink-100 bg-ink-50">
      <Container className="flex flex-col gap-4 py-10 text-sm text-ink-500 md:flex-row md:items-center md:justify-between">
        <LanguageSwitcher />
        <p>
          © {new Date().getFullYear()} ZenithTech.{" "}
          {t(["A personal learning project.", "Un projet personnel d’apprentissage."])}
        </p>
      </Container>
    </footer>
  );
}
