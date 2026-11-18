import type { Text } from "@/lib/i18n";

export type ServiceDetail = {
  gets: Text[];
  proof: string[]; // slugs of projects that show this service in action
};

// Draft wording: edit anything that doesn't match how you really deliver the service.
export const serviceDetails: Record<string, ServiceDetail> = {
  "ci-cd-automation": {
    gets: [
      [
        "A pipeline that builds, tests and deploys on every change",
        "Un pipeline qui construit, teste et déploie à chaque changement",
      ],
      ["Containerised builds with Docker", "Des builds conteneurisés avec Docker"],
      ["Environments set up on AWS", "Des environnements mis en place sur AWS"],
      [
        "Automated code-quality checks where they fit",
        "Des contrôles de qualité du code automatisés quand c’est pertinent",
      ],
      [
        "Documentation so your team can run it",
        "Une documentation pour que votre équipe puisse l’exploiter",
      ],
    ],
    proof: ["dwts", "ci-cd-lab-pipeline"],
  },
  "full-stack-development": {
    gets: [
      [
        "A back end in PHP or Node.js with a MySQL database",
        "Un back end en PHP ou Node.js avec une base de données MySQL",
      ],
      [
        "A responsive interface in React and Tailwind CSS",
        "Une interface responsive en React et Tailwind CSS",
      ],
      [
        "API integrations that connect your systems",
        "Des intégrations d’API qui relient vos systèmes",
      ],
      [
        "Deployment to a server so it is live",
        "Un déploiement sur un serveur pour qu’il soit en ligne",
      ],
      ["Handover and documentation", "Une passation et une documentation"],
    ],
    proof: ["dwts", "senvato", "melokeys"],
  },
  "server-and-hosting": {
    gets: [
      ["Server setup and configuration", "Installation et configuration de serveurs"],
      ["NGINX as a web server and reverse proxy", "NGINX comme serveur web et reverse proxy"],
      ["Your site or app hosted and online", "Votre site ou application hébergé et en ligne"],
      [
        "A documented setup you can repeat",
        "Une installation documentée que vous pouvez reproduire",
      ],
      [
        "Help moving from manual setup to automation",
        "De l’aide pour passer d’une installation manuelle à l’automatisation",
      ],
    ],
    proof: ["ci-cd-lab-pipeline", "dwts"],
  },
  "tutoring-and-training": {
    gets: [
      ["One-to-one tech tutoring", "Des cours particuliers d’informatique"],
      ["Training on common ICT software packages", "Une formation aux logiciels TIC courants"],
      [
        "A learning plan matched to your level and schedule",
        "Un plan d’apprentissage adapté à votre niveau et à votre emploi du temps",
      ],
      ["Practice material and follow-up questions", "Des exercices et un suivi pour vos questions"],
    ],
    proof: [],
  },
};
