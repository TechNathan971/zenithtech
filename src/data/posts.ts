import { tx, type Locale, type Text } from "@/lib/i18n";

export type Block =
  | { type: "h2"; text: Text }
  | { type: "p"; text: Text }
  | { type: "ul"; items: Text[] }
  | { type: "ol"; items: Text[] }
  | { type: "code"; label: string; code: string }
  | { type: "link"; text: Text; href: string };

export type Post = {
  slug: string;
  title: Text;
  excerpt: Text;
  date: string; // ISO date
  category: Text;
  tools: string[]; // tool slugs, shown as logos
  art: string; // gradient for the card
  blocks: Block[];
};

// These are drafts in a neutral voice. Edit them so they sound like you.
export const posts: Post[] = [
  {
    slug: "dora-metrics-explained",
    title: ["The four DORA metrics, explained", "Les quatre métriques DORA, expliquées"],
    excerpt: [
      "Four numbers that show whether your software delivery is really improving, and what they showed on DWTS.",
      "Quatre chiffres qui montrent si votre livraison logicielle s’améliore vraiment, et ce qu’ils ont montré sur DWTS.",
    ],
    date: "2026-11-20",
    category: ["Metrics", "Métriques"],
    tools: ["github-actions", "docker"],
    art: "bg-linear-to-br from-violet-700 via-brand-600 to-cyan-400",
    blocks: [
      { type: "h2", text: ["Why measure delivery at all?", "Pourquoi mesurer la livraison ?"] },
      {
        type: "p",
        text: [
          "Teams often feel they ship slowly or break things too often, but a feeling is hard to improve. DORA metrics turn that feeling into four numbers you can track and compare over time.",
          "Les équipes ont souvent l’impression de livrer lentement ou de casser trop souvent, mais une impression est difficile à améliorer. Les métriques DORA la transforment en quatre chiffres que l’on peut suivre et comparer dans le temps.",
        ],
      },
      { type: "h2", text: ["The four metrics", "Les quatre métriques"] },
      {
        type: "ul",
        items: [
          [
            "Deployment frequency: how often you release to production.",
            "Fréquence de déploiement : à quelle fréquence vous livrez en production.",
          ],
          [
            "Lead time for changes: how long a change takes from commit to production.",
            "Délai de livraison des changements : le temps qu’un changement met du commit à la production.",
          ],
          [
            "Change failure rate: the share of releases that cause a failure.",
            "Taux d’échec des changements : la part des livraisons qui provoquent une panne.",
          ],
          [
            "Time to restore service: how quickly you recover when something breaks.",
            "Temps de rétablissement du service : la rapidité avec laquelle vous vous rétablissez quand quelque chose casse.",
          ],
        ],
      },
      {
        type: "p",
        text: [
          "The first two describe speed, and the last two describe stability. Good teams improve both at once, because small, frequent, automated releases are also safer.",
          "Les deux premières décrivent la vitesse, les deux dernières la stabilité. Les bonnes équipes améliorent les deux à la fois, car des livraisons petites, fréquentes et automatisées sont aussi plus sûres.",
        ],
      },
      { type: "h2", text: ["What changed on DWTS", "Ce qui a changé sur DWTS"] },
      {
        type: "p",
        text: [
          "On DWTS, automating the pipeline took deployment lead time from 4.2 hours to under 6 minutes. Deployment frequency rose by 750%, the change failure rate fell from 34% to 4%, and recovery now takes 11 minutes.",
          "Sur DWTS, l’automatisation du pipeline a ramené le délai de déploiement de 4,2 heures à moins de 6 minutes. La fréquence de déploiement a augmenté de 750 %, le taux d’échec des changements est passé de 34 % à 4 %, et le rétablissement prend désormais 11 minutes.",
        ],
      },
      { type: "h2", text: ["How to start measuring", "Comment commencer à mesurer"] },
      {
        type: "ol",
        items: [
          [
            "Pick a time window, such as the last 30 days.",
            "Choisissez une période, par exemple les 30 derniers jours.",
          ],
          [
            "Record when each change is committed and when it reaches production.",
            "Notez quand chaque changement est validé et quand il arrive en production.",
          ],
          [
            "Mark each release that needed a fix or a rollback.",
            "Repérez chaque livraison qui a nécessité une correction ou un retour arrière.",
          ],
          [
            "Write down how long each recovery took, then repeat every month.",
            "Notez la durée de chaque rétablissement, puis recommencez chaque mois.",
          ],
        ],
      },
      {
        type: "link",
        text: [
          "My thesis studies these metrics in humanitarian software. Read it on the research page.",
          "Mon mémoire étudie ces métriques dans les logiciels humanitaires. Lisez-le sur la page de recherche.",
        ],
        href: "/work/research-thesis",
      },
    ],
  },

  {
    slug: "safer-deployments-five-habits",
    title: ["Five habits for safer deployments", "Cinq habitudes pour des déploiements plus sûrs"],
    excerpt: [
      "Small changes in how you ship make releases calmer, faster and easier to undo.",
      "De petits changements dans la façon de livrer rendent les mises en production plus calmes, plus rapides et plus faciles à annuler.",
    ],
    date: "2026-11-20",
    category: ["Practice", "Pratique"],
    tools: ["github-actions", "docker", "jenkins"],
    art: "bg-linear-to-br from-orange-500 via-coral-500 to-pink-500",
    blocks: [
      {
        type: "p",
        text: [
          "A deployment should be boring. When it is not, the fix is rarely heroics: it is usually a handful of habits that make the risky parts small, visible and reversible.",
          "Un déploiement devrait être ennuyeux. Quand ce n’est pas le cas, la solution est rarement héroïque : ce sont le plus souvent quelques habitudes qui rendent les parties risquées petites, visibles et réversibles.",
        ],
      },
      { type: "h2", text: ["The five habits", "Les cinq habitudes"] },
      {
        type: "ol",
        items: [
          [
            "Automate the build. A pipeline does the same steps every time, which people cannot.",
            "Automatisez le build. Un pipeline refait les mêmes étapes à chaque fois, ce que les humains ne peuvent pas.",
          ],
          [
            "Ship small changes. Small releases are easier to review, test and undo.",
            "Livrez de petits changements. De petites livraisons sont plus faciles à relire, tester et annuler.",
          ],
          [
            "Deploy the same artifact everywhere. Build once, then promote that exact build through test and production.",
            "Déployez le même artefact partout. Construisez une fois, puis faites passer ce build exact par le test et la production.",
          ],
          [
            "Check health and keep a way back. Health checks catch a bad release early, and a rollback makes mistakes cheap.",
            "Vérifiez la santé et gardez un retour arrière. Les contrôles de santé détectent tôt une mauvaise livraison, et un rollback rend les erreurs peu coûteuses.",
          ],
          [
            "Measure the result. Track lead time and failure rate so you know whether the habits are working.",
            "Mesurez le résultat. Suivez le délai de livraison et le taux d’échec pour savoir si les habitudes fonctionnent.",
          ],
        ],
      },
      {
        type: "h2",
        text: ["A tiny example: the health check", "Un petit exemple : le contrôle de santé"],
      },
      {
        type: "p",
        text: [
          "The simplest safety net is a command that fails when the app is not healthy. Run it right after every deploy, and let the pipeline roll back if it fails.",
          "Le filet de sécurité le plus simple est une commande qui échoue quand l’application n’est pas en bonne santé. Lancez-la juste après chaque déploiement, et laissez le pipeline revenir en arrière si elle échoue.",
        ],
      },
      {
        type: "code",
        label: "After every deploy",
        code: "curl -fsS http://localhost:3000/health || exit 1",
      },
      {
        type: "link",
        text: [
          "Follow the guide to set up a CI pipeline.",
          "Suivez le guide pour mettre en place un pipeline CI.",
        ],
        href: "/learn/guides/ci-pipeline",
      },
    ],
  },
];

export function readingMinutes(post: Post, locale: Locale) {
  const words = post.blocks
    .map((block) => {
      if (block.type === "ul" || block.type === "ol") {
        return block.items.map((item) => tx(item, locale)).join(" ");
      }
      if (block.type === "code") return "";
      return tx(block.text, locale);
    })
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(2, Math.round(words / 200));
}
