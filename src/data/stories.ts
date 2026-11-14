import { testimonials } from "@/data/portfolio";
import type { Text } from "@/lib/i18n";

export type Story = {
  id: string;
  kind: "quote" | "result";
  tool: { slug: string; name: string }; // the logo in the row under the quote
  quote: Text;
  name: string;
  role: Text;
  photo?: string; // optional picture of the person
  href: string;
  cta: Text;
};

const supervisor = testimonials[0];

// When you collect more real testimonials, add them here with kind: "quote" and a photo path.
export const stories: Story[] = [
  {
    id: "thesis",
    kind: "quote",
    tool: { slug: "github-actions", name: "GitHub Actions" },
    quote: supervisor.quote,
    name: supervisor.author,
    role: supervisor.role,
    photo: "/images/people/roland-abeimbi.jpg",
    href: "/work/research-thesis",
    cta: ["About the project", "À propos du projet"],
  },
  {
    id: "lab",
    kind: "result",
    tool: { slug: "jenkins", name: "Jenkins" },
    quote: [
      "Every build runs automatically, and a full test environment is ready in under 5 minutes.",
      "Chaque build s’exécute automatiquement, et un environnement de test complet est prêt en moins de 5 minutes.",
    ],
    name: "DevOps CI/CD Lab Pipeline",
    role: ["Result from the lab", "Résultat du labo"],
    href: "/work/ci-cd-lab-pipeline",
    cta: ["Read the story", "Lire l’histoire"],
  },
  {
    id: "senvato",
    kind: "result",
    tool: { slug: "php", name: "PHP" },
    quote: [
      "Local trade professionals became easy to find online, and contact response time dropped by 50%.",
      "Les professionnels des métiers locaux sont devenus faciles à trouver en ligne, et le délai de réponse aux contacts a baissé de 50 %.",
    ],
    name: "Senvato Services Portal",
    role: ["Result from the project", "Résultat du projet"],
    href: "/work/senvato",
    cta: ["Read the story", "Lire l’histoire"],
  },
  {
    id: "melokeys",
    kind: "result",
    tool: { slug: "react", name: "React" },
    quote: [
      "Automated voicing routines made keyboard and audio layout setup 40% faster.",
      "Des routines de voicing automatisées ont rendu la mise en place des dispositions de clavier et d’audio 40 % plus rapide.",
    ],
    name: "MeloKeys",
    role: ["Result from the project", "Résultat du projet"],
    href: "/work/melokeys",
    cta: ["Read the story", "Lire l’histoire"],
  },
];
