import { tx, type Locale, type Text } from "@/lib/i18n";

type Rule = { keywords: string[]; label: Text; href: string; reason: Text };

export type Recommendation = { label: string; href: string; reason: string; matched: boolean };

// Keywords are written without accents. Input is normalized the same way.
const rules: Rule[] = [
  {
    keywords: [
      "deploy",
      "deployment",
      "deploiement",
      "deploi",
      "pipeline",
      "ci",
      "cd",
      "release",
      "jenkins",
      "github actions",
      "gitlab",
      "automate",
      "automation",
      "manual",
      "slow",
      "manuel",
      "lent",
      "livrais",
      "automatis",
      "mise en production",
    ],
    label: ["CI/CD pipeline automation", "Automatisation de pipelines CI/CD"],
    href: "/services/ci-cd-automation",
    reason: [
      "Automated pipelines replace manual releases. On DWTS, lead time fell from 4.2 hours to under 6 minutes.",
      "Des pipelines automatisés remplacent les livraisons manuelles. Sur DWTS, le délai est passé de 4,2 heures à moins de 6 minutes.",
    ],
  },
  {
    keywords: [
      "docker",
      "container",
      "conteneur",
      "kubernetes",
      "k8s",
      "helm",
      "orchestration",
      "microservices",
      "scale",
      "scaling",
    ],
    label: ["Docker and Kubernetes", "Docker et Kubernetes"],
    href: "/work/docker-containers",
    reason: [
      "Containers make apps portable, and Kubernetes scales them when demand grows.",
      "Les conteneurs rendent les applications portables, et Kubernetes les adapte quand la demande augmente.",
    ],
  },
  {
    keywords: [
      "server",
      "hosting",
      "host",
      "nginx",
      "tomcat",
      "ec2",
      "aws",
      "cloud",
      "vps",
      "domain",
      "ssl",
      "serveur",
      "hebergement",
      "heberger",
      "domaine",
    ],
    label: ["Servers, hosting and NGINX", "Serveurs, hébergement et NGINX"],
    href: "/services/server-and-hosting",
    reason: [
      "Cloud servers and web servers configured so your site stays online.",
      "Des serveurs cloud et web configurés pour que votre site reste en ligne.",
    ],
  },
  {
    keywords: [
      "website",
      "web",
      "app",
      "application",
      "php",
      "mysql",
      "react",
      "node",
      "nodejs",
      "api",
      "backend",
      "frontend",
      "fullstack",
      "full stack",
      "site",
      "portail",
      "portal",
    ],
    label: ["Full-stack development", "Développement full-stack"],
    href: "/services/full-stack-development",
    reason: [
      "A back end, a front end and the deployment that puts them online.",
      "Un back end, un front end et le déploiement qui les met en ligne.",
    ],
  },
  {
    keywords: [
      "quality",
      "sonarqube",
      "sonar",
      "bug",
      "testing",
      "test",
      "nexus",
      "artifact",
      "qualite",
      "code review",
    ],
    label: ["Code quality and artifacts", "Qualité du code et artefacts"],
    href: "/work/code-quality",
    reason: [
      "Automated analysis and versioned builds catch problems before release.",
      "Une analyse automatisée et des builds versionnés détectent les problèmes avant la livraison.",
    ],
  },
  {
    keywords: [
      "metrics",
      "dora",
      "measure",
      "measuring",
      "performance",
      "kpi",
      "research",
      "thesis",
      "metriques",
      "mesurer",
      "recherche",
      "memoire",
    ],
    label: ["DORA metrics", "Métriques DORA"],
    href: "/work/dora-metrics",
    reason: [
      "Measure lead time, failure rate and recovery time to see real progress.",
      "Mesurer le délai, le taux d’échec et le temps de rétablissement pour voir les vrais progrès.",
    ],
  },
  {
    keywords: [
      "learn",
      "learning",
      "teach",
      "training",
      "tutor",
      "tutoring",
      "course",
      "student",
      "beginner",
      "ict",
      "apprendre",
      "formation",
      "cours",
      "etudiant",
      "debutant",
    ],
    label: ["Tutoring and training", "Cours et formation"],
    href: "/services/tutoring-and-training",
    reason: [
      "One-to-one tech tutoring and ICT package training.",
      "Des cours particuliers d’informatique et des formations aux logiciels TIC.",
    ],
  },
  {
    keywords: [
      "ngo",
      "nonprofit",
      "humanitarian",
      "charity",
      "children",
      "welfare",
      "records",
      "association",
      "humanitaire",
      "enfants",
      "dossiers",
    ],
    label: ["DWTS case study", "Étude de cas DWTS"],
    href: "/work/dwts",
    reason: [
      "A system that replaced paper records for displaced and orphaned children, with automated delivery.",
      "Un système qui a remplacé les dossiers papier d’enfants déplacés et orphelins, avec une livraison automatisée.",
    ],
  },
  {
    keywords: ["music", "audio", "piano", "keyboard", "melody", "harmony", "musique", "clavier"],
    label: "MeloKeys",
    href: "/work/melokeys",
    reason: [
      "A keyboard and audio workstation platform for music production.",
      "Une plateforme de clavier et de station audio pour la production musicale.",
    ],
  },
  {
    keywords: [
      "directory",
      "marketplace",
      "listing",
      "plumber",
      "electrician",
      "annuaire",
      "plombier",
      "electricien",
    ],
    label: ["Senvato Services Portal", "Portail de services Senvato"],
    href: "/work/senvato",
    reason: [
      "A directory that connects local trade professionals with customers.",
      "Un annuaire qui met en relation des professionnels des métiers locaux et leurs clients.",
    ],
  },
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

function matches(text: string, words: string[], keyword: string) {
  const key = normalize(keyword);
  if (key.includes(" ")) return text.includes(key);
  return words.some((word) => word === key || (key.length >= 5 && word.startsWith(key)));
}

export function recommend(input: string, locale: Locale): Recommendation[] {
  const text = normalize(input);
  const words = text.split(/[^a-z0-9]+/).filter(Boolean);

  const scored = rules
    .map((rule, index) => ({
      rule,
      index,
      score: rule.keywords.filter((keyword) => matches(text, words, keyword)).length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 3);

  const hasMatch = scored.length > 0;
  const picked = hasMatch ? scored.map((entry) => entry.rule) : [rules[0], rules[3]];

  return picked.map((rule) => ({
    label: tx(rule.label, locale),
    href: rule.href,
    reason: tx(rule.reason, locale),
    matched: hasMatch,
  }));
}
