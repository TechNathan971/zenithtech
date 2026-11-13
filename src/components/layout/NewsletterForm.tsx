import { useState } from "react";
import type { FormEvent } from "react";
import { buttonStyles } from "@/components/ui/Button";
import { useI18n } from "@/hooks/useI18n";

type Status = "idle" | "sending" | "done" | "error";

export function NewsletterForm() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(response.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="newsletter-email" className="block text-sm font-medium text-ink-950">
        {t(["Get notes from the field", "Recevez des notes du terrain"])}
      </label>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "sending") setStatus("idle");
          }}
          placeholder={t(["Enter your email", "Entrez votre e-mail"])}
          className="h-12 w-full rounded-lg border border-ink-200 bg-white px-4 text-ink-900 placeholder:text-ink-400 sm:max-w-sm"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className={buttonStyles({ size: "lg" })}
        >
          {t(["Continue", "Continuer"])}
        </button>
      </div>
      <p aria-live="polite" className="mt-3 min-h-5 text-sm">
        {status === "done" && (
          <span className="text-emerald-700">
            {t(["Thanks, you’re on the list.", "Merci, vous êtes inscrit."])}
          </span>
        )}
        {status === "error" && (
          <span className="text-coral-500">
            {t([
              "That email doesn’t look right. Please check it and try again.",
              "Cet e-mail ne semble pas valide. Vérifiez-le et réessayez.",
            ])}
          </span>
        )}
      </p>
      <p className="text-xs text-ink-500">
        {t([
          "Occasional updates on DevOps, new projects and what I’m learning. Unsubscribe any time.",
          "Des nouvelles occasionnelles sur le DevOps, les nouveaux projets et ce que j’apprends. Désabonnement à tout moment.",
        ])}
      </p>
    </form>
  );
}
