import type { Text } from "@/lib/i18n";

export type PipelineStep = { title: Text; text: Text };

export type ProjectStory = {
  challenge: Text;
  built: Text[];
  steps: PipelineStep[];
  services: string[]; // slugs of the related services
};

export const projectStories: Record<string, ProjectStory> = {
  dwts: {
    challenge: [
      "Records for orphaned and displaced children were managed through manual paper processes. Releasing software changes was manual too: deployment lead time was 4.2 hours and 34% of changes failed.",
      "Les dossiers d’enfants orphelins et déplacés étaient gérés par des processus papier manuels. La livraison des changements logiciels était manuelle elle aussi : le délai de déploiement était de 4,2 heures et 34 % des changements échouaient.",
    ],
    built: [
      [
        "A records system that replaces manual paper processes with automated record management.",
        "Un système de dossiers qui remplace les processus papier manuels par une gestion automatisée.",
      ],
      [
        "A PHP and MySQL application to manage the records.",
        "Une application PHP et MySQL pour gérer les dossiers.",
      ],
      [
        "Docker containers, so the app runs the same way everywhere.",
        "Des conteneurs Docker, pour que l’application s’exécute partout de la même façon.",
      ],
      [
        "A GitHub Actions pipeline that automates the build and the release.",
        "Un pipeline GitHub Actions qui automatise le build et la livraison.",
      ],
      ["Hosting on AWS EC2.", "Un hébergement sur AWS EC2."],
    ],
    steps: [
      {
        title: ["Commit", "Commit"],
        text: ["A change is committed to GitHub.", "Un changement est validé dans GitHub."],
      },
      {
        title: ["Build", "Build"],
        text: [
          "GitHub Actions builds the Docker image.",
          "GitHub Actions construit l’image Docker.",
        ],
      },
      {
        title: ["Deploy", "Déploiement"],
        text: [
          "The image is deployed to the AWS EC2 server.",
          "L’image est déployée sur le serveur AWS EC2.",
        ],
      },
      {
        title: ["Measure", "Mesure"],
        text: [
          "Lead time, frequency, failures and recovery are tracked with DORA metrics.",
          "Le délai, la fréquence, les échecs et le rétablissement sont suivis avec les métriques DORA.",
        ],
      },
    ],
    services: ["ci-cd-automation"],
  },

  melokeys: {
    challenge: [
      "Preparing keyboard layouts and chord voicings for real-time playing and harmonic analysis was a manual job, and setup got in the way of the music.",
      "Préparer des dispositions de clavier et des voicings d’accords pour le jeu en temps réel et l’analyse harmonique était un travail manuel, et la mise en place gênait la musique.",
    ],
    built: [
      [
        "An interactive keyboard and audio workstation layout platform for music production and harmonic analysis.",
        "Une plateforme interactive de disposition de clavier et de station audio pour la production musicale et l’analyse harmonique.",
      ],
      [
        "A React interface built with HTML5, CSS3 and JavaScript.",
        "Une interface React construite avec HTML5, CSS3 et JavaScript.",
      ],
      ["Sound produced through the Web Audio API.", "Le son produit grâce à la Web Audio API."],
      ["Automated digital voicing routines.", "Des routines de voicing numériques automatisées."],
    ],
    steps: [
      {
        title: ["Choose a layout", "Choisir une disposition"],
        text: [
          "Pick the keyboard and workstation layout you want to play on.",
          "Choisissez la disposition de clavier et de station sur laquelle jouer.",
        ],
      },
      {
        title: ["Get a voicing", "Obtenir un voicing"],
        text: [
          "An automated routine prepares the digital voicing for you.",
          "Une routine automatisée prépare le voicing numérique pour vous.",
        ],
      },
      {
        title: ["Play", "Jouer"],
        text: [
          "Play in real time, with sound from the Web Audio API.",
          "Jouez en temps réel, avec le son de la Web Audio API.",
        ],
      },
      {
        title: ["Analyse", "Analyser"],
        text: [
          "Look at the harmony behind what you played.",
          "Observez l’harmonie derrière ce que vous avez joué.",
        ],
      },
    ],
    services: ["full-stack-development"],
  },

  "ci-cd-lab-pipeline": {
    challenge: [
      "The aim was a production-grade lab pipeline: every build runs automatically, code quality is analysed on the way, and the result is delivered in containers the same way every time.",
      "L’objectif était un pipeline de laboratoire de niveau production : chaque build s’exécute automatiquement, la qualité du code est analysée au passage, et le résultat est livré en conteneurs, de la même façon à chaque fois.",
    ],
    built: [
      [
        "A Jenkins pipeline that runs every build automatically (100% automated build execution).",
        "Un pipeline Jenkins qui exécute chaque build automatiquement (exécution des builds automatisée à 100 %).",
      ],
      [
        "Automated code quality analysis with SonarQube.",
        "Une analyse automatisée de la qualité du code avec SonarQube.",
      ],
      ["Nexus to store the build artifacts.", "Nexus pour stocker les artefacts de build."],
      ["Docker for containerised delivery.", "Docker pour la livraison conteneurisée."],
      ["NGINX and Tomcat to serve the application.", "NGINX et Tomcat pour servir l’application."],
      [
        "Test environments that are ready in under 5 minutes.",
        "Des environnements de test prêts en moins de 5 minutes.",
      ],
    ],
    steps: [
      {
        title: ["Commit", "Commit"],
        text: ["Code is pushed to the repository.", "Le code est poussé dans le dépôt."],
      },
      {
        title: ["Build", "Build"],
        text: [
          "Jenkins runs the build automatically.",
          "Jenkins exécute le build automatiquement.",
        ],
      },
      {
        title: ["Analyse", "Analyse"],
        text: [
          "SonarQube analyses the quality of the code.",
          "SonarQube analyse la qualité du code.",
        ],
      },
      {
        title: ["Store", "Stockage"],
        text: ["Nexus keeps the build artifact.", "Nexus conserve l’artefact de build."],
      },
      {
        title: ["Package", "Empaquetage"],
        text: ["Docker packages the application.", "Docker empaquette l’application."],
      },
      {
        title: ["Serve", "Mise en service"],
        text: ["Tomcat runs it, with NGINX in front.", "Tomcat l’exécute, avec NGINX en frontal."],
      },
    ],
    services: ["ci-cd-automation"],
  },

  senvato: {
    challenge: [
      "Finding local plumbers, electricians and technicians was not digital: customers had no central place to look, and reaching a provider took time.",
      "Trouver des plombiers, électriciens et techniciens locaux n’était pas numérique : les clients n’avaient pas de lieu central où chercher, et joindre un prestataire prenait du temps.",
    ],
    built: [
      [
        "A centralized service directory connecting local trade professionals in plumbing, electrical and technical fields.",
        "Un annuaire de services centralisé reliant les professionnels locaux de la plomberie, de l’électricité et des métiers techniques.",
      ],
      ["A PHP and MySQL back end.", "Un back end PHP et MySQL."],
      [
        "An interface built with Tailwind CSS and JavaScript.",
        "Une interface construite avec Tailwind CSS et JavaScript.",
      ],
      [
        "Profiles for registered providers, so customers can reach them.",
        "Des profils pour les prestataires inscrits, afin que les clients puissent les joindre.",
      ],
    ],
    steps: [
      {
        title: ["Search", "Rechercher"],
        text: [
          "A customer looks for a trade professional.",
          "Un client cherche un professionnel d’un métier.",
        ],
      },
      {
        title: ["Choose", "Choisir"],
        text: [
          "They find a registered provider in the directory.",
          "Il trouve un prestataire inscrit dans l’annuaire.",
        ],
      },
      {
        title: ["Contact", "Contacter"],
        text: ["They contact the provider directly.", "Il contacte directement le prestataire."],
      },
      {
        title: ["Reply", "Réponse"],
        text: [
          "Contact response time is 50% shorter across registered providers.",
          "Le délai de réponse aux contacts est réduit de 50 % chez les prestataires inscrits.",
        ],
      },
    ],
    services: ["full-stack-development"],
  },
};
