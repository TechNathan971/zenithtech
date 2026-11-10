import type { Text } from "@/lib/i18n";

export type Project = {
  slug: string;
  name: string;
  fullName?: Text;
  summary: Text;
  role: Text;
  tools: string[];
  results: Text[];
};

export const projects: Project[] = [
  {
    slug: "dwts",
    name: "DWTS",
    fullName: ["Digital Welfare Tracking System", "Système numérique de suivi du bien-être"],
    summary: [
      "Automated record management for orphaned and displaced children, replacing manual paper processes.",
      "Gestion automatisée des dossiers d’enfants orphelins et déplacés, en remplacement des processus papier manuels.",
    ],
    role: ["Lead Developer & DevOps Specialist", "Développeur principal et spécialiste DevOps"],
    tools: ["GitHub Actions", "AWS EC2", "Docker", "VS Code", "PHP", "MySQL"],
    results: [
      [
        "Deployment lead time cut from 4.2 hours to under 6 minutes",
        "Délai de déploiement ramené de 4,2 heures à moins de 6 minutes",
      ],
      ["Deployment frequency up 750%", "Fréquence de déploiement en hausse de 750 %"],
      ["Failure rate down from 34% to 4%", "Taux d’échec ramené de 34 % à 4 %"],
      [
        "Mean time to recovery cut to 11 minutes",
        "Temps moyen de rétablissement réduit à 11 minutes",
      ],
    ],
  },
  {
    slug: "melokeys",
    name: "MeloKeys",
    summary: [
      "Interactive keyboard and audio workstation layout platform for music production and harmonic analysis.",
      "Plateforme interactive de disposition de clavier et de station audio pour la production musicale et l’analyse harmonique.",
    ],
    role: ["Full-Stack Developer", "Développeur full-stack"],
    tools: ["HTML5", "CSS3", "JavaScript", "React", "Web Audio API"],
    results: [
      [
        "Automated digital voicing routines, improving setup speed for real-time playability and workflow layout by 40%",
        "Routines de voicing numériques automatisées, avec une mise en place 40 % plus rapide pour le jeu en temps réel et l’agencement du flux de travail",
      ],
    ],
  },
  {
    slug: "ci-cd-lab-pipeline",
    name: "DevOps CI/CD Lab Pipeline",
    summary: [
      "Production-grade lab deployment pipeline integrating automated code quality analysis and containerized delivery.",
      "Pipeline de déploiement de laboratoire de niveau production, intégrant l’analyse automatisée de la qualité du code et la livraison conteneurisée.",
    ],
    role: ["DevOps Engineer", "Ingénieur DevOps"],
    tools: ["Docker", "Jenkins", "SonarQube", "Nexus", "NGINX", "Tomcat"],
    results: [
      ["100% automated build execution", "Exécution des builds automatisée à 100 %"],
      [
        "Test environment setup in under 5 minutes",
        "Environnement de test prêt en moins de 5 minutes",
      ],
    ],
  },
  {
    slug: "senvato",
    name: "Senvato Services Portal",
    summary: [
      "Centralized service directory connecting local trade professionals across plumbing, electrical and technical fields.",
      "Annuaire de services centralisé reliant les professionnels locaux de la plomberie, de l’électricité et des métiers techniques.",
    ],
    role: ["Web Developer", "Développeur web"],
    tools: ["PHP", "MySQL", "Tailwind CSS", "JavaScript"],
    results: [
      [
        "Digitized service discovery for local trades, cutting contact response latency by 50% across registered providers",
        "Recherche de services numérisée pour les métiers locaux, avec un délai de réponse aux contacts réduit de 50 % chez les prestataires inscrits",
      ],
    ],
  },
];

export type Service = { slug: string; title: Text; summary: Text; tools: string[] };

export const services: Service[] = [
  {
    slug: "ci-cd-automation",
    title: [
      "CI/CD pipeline automation and infrastructure setup",
      "Automatisation CI/CD et mise en place d’infrastructure",
    ],
    summary: [
      "Automated build, test and deploy pipelines, plus the infrastructure they run on.",
      "Des pipelines de build, de test et de déploiement automatisés, ainsi que l’infrastructure qui les fait tourner.",
    ],
    tools: ["Docker", "GitHub Actions", "AWS"],
  },
  {
    slug: "full-stack-development",
    title: [
      "Full-stack development and API integration",
      "Développement full-stack et intégration d’API",
    ],
    summary: [
      "Web applications from database to interface, with APIs that connect them to other systems.",
      "Des applications web de la base de données à l’interface, avec des API qui les relient à d’autres systèmes.",
    ],
    tools: ["PHP", "MySQL", "React", "Node.js"],
  },
  {
    slug: "server-and-hosting",
    title: [
      "Server configuration, hosting and NGINX",
      "Configuration de serveurs, hébergement et NGINX",
    ],
    summary: [
      "Server configuration, web hosting and NGINX management for sites that stay online.",
      "Configuration de serveurs, hébergement web et gestion de NGINX pour des sites qui restent en ligne.",
    ],
    tools: ["NGINX", "AWS EC2"],
  },
  {
    slug: "tutoring-and-training",
    title: [
      "Tech tutoring and ICT package training",
      "Cours d’informatique et formation aux logiciels TIC",
    ],
    summary: [
      "One-to-one tech tutoring and training on common ICT software packages.",
      "Des cours particuliers d’informatique et des formations aux logiciels TIC courants.",
    ],
    tools: [],
  },
];

export type Testimonial = { quote: Text; author: string; role: Text };

export const testimonials: Testimonial[] = [
  {
    quote: [
      "Being the only student under my guidance, I truly appreciate his readiness to assist and provide backup whenever needed during the course of this work.",
      "Étant le seul étudiant sous ma direction, j’apprécie sincèrement sa disponibilité pour aider et apporter son soutien chaque fois que nécessaire au cours de ce travail.",
    ],
    author: "Mr. Abeugra Roland Abeimbi",
    role: ["Project Supervisor & Lecturer, CCUI", "Superviseur de projet et enseignant, CCUI"],
  },
];

export type Publication = { title: Text; kind: Text; url: string };

export const writing: Publication[] = [
  {
    title: [
      "Empirical Evaluation of CI/CD Pipelines in Humanitarian Software Systems Using DORA Metrics",
      "Évaluation empirique des pipelines CI/CD dans les systèmes logiciels humanitaires à l’aide des métriques DORA",
    ],
    kind: ["Research thesis, CCUI, 2026", "Mémoire de recherche, CCUI, 2026"],
    url: "https://github.com", // replace with the real link
  },
];

export const education = {
  degree: [
    "Bachelor of Science in Software Engineering",
    "Bachelor of Science en génie logiciel",
  ] as Text,
  year: 2026,
};

export const yearsInTech = 6;

export const dailyTools = ["Kubernetes", "AWS EC2", "GitHub", "GitLab", "Docker", "ExpressVPN"];
