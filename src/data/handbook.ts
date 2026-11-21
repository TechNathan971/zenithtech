import type { Text } from "@/lib/i18n";

export type Term = { term: string; def: Text };

export const glossary: Term[] = [
  {
    term: "Artifact",
    def: [
      "A file produced by a build, such as a package or a container image, that you can store and deploy.",
      "Un fichier produit par un build, comme un paquet ou une image de conteneur, que l’on peut stocker et déployer.",
    ],
  },
  {
    term: "Blue-green deployment",
    def: [
      "Two identical environments: you release to the idle one, then switch traffic over, and switch back if needed.",
      "Deux environnements identiques : on livre dans celui qui est inactif, on y bascule le trafic, et on revient en arrière si besoin.",
    ],
  },
  {
    term: "Canary release",
    def: [
      "Sending a new version to a small share of users first, to catch problems before everyone is affected.",
      "Envoyer une nouvelle version à une petite part des utilisateurs d’abord, pour détecter les problèmes avant que tout le monde soit touché.",
    ],
  },
  {
    term: "CI (continuous integration)",
    def: [
      "Merging changes often, with every change built and tested automatically.",
      "Fusionner souvent les changements, chacun étant construit et testé automatiquement.",
    ],
  },
  {
    term: "CD (continuous delivery)",
    def: [
      "Keeping software always ready to release, with the release itself automated and repeatable.",
      "Garder le logiciel toujours prêt à être livré, la livraison elle-même étant automatisée et reproductible.",
    ],
  },
  {
    term: "Container",
    def: [
      "A running, isolated process that carries its own dependencies, started from an image.",
      "Un processus isolé en cours d’exécution, qui embarque ses dépendances, démarré à partir d’une image.",
    ],
  },
  {
    term: "DORA metrics",
    def: [
      "Four measures of delivery performance: deployment frequency, lead time, change failure rate and time to restore.",
      "Quatre mesures de la performance de livraison : fréquence de déploiement, délai, taux d’échec et temps de rétablissement.",
    ],
  },
  {
    term: "IaC (infrastructure as code)",
    def: [
      "Describing servers and networks in files that live in Git, so they can be reviewed and recreated.",
      "Décrire serveurs et réseaux dans des fichiers versionnés dans Git, pour pouvoir les relire et les recréer.",
    ],
  },
  {
    term: "Idempotent",
    def: [
      "Safe to run many times: the result is the same after the first run and after the tenth.",
      "Sûr à lancer plusieurs fois : le résultat est le même après la première exécution et après la dixième.",
    ],
  },
  {
    term: "Image",
    def: [
      "A read-only template that a container is started from. It contains the app and what it needs to run.",
      "Un modèle en lecture seule à partir duquel un conteneur démarre. Il contient l’application et ce qu’il lui faut pour tourner.",
    ],
  },
  {
    term: "Lead time",
    def: [
      "How long a change takes to travel from commit to running in production.",
      "Le temps qu’un changement met pour aller du commit à l’exécution en production.",
    ],
  },
  {
    term: "MTTR (mean time to restore)",
    def: [
      "The average time it takes to recover after something breaks in production.",
      "Le temps moyen nécessaire pour se rétablir après une panne en production.",
    ],
  },
  {
    term: "Observability",
    def: [
      "Being able to understand what a system is doing from its logs, metrics and traces.",
      "Pouvoir comprendre ce que fait un système à partir de ses logs, métriques et traces.",
    ],
  },
  {
    term: "Orchestration",
    def: [
      "Automatically starting, stopping, scaling and healing many containers, which is what Kubernetes does.",
      "Démarrer, arrêter, mettre à l’échelle et réparer automatiquement de nombreux conteneurs, ce que fait Kubernetes.",
    ],
  },
  {
    term: "Pipeline",
    def: [
      "An automated series of steps, such as build, test, scan and deploy, that runs on every change.",
      "Une suite d’étapes automatisées, comme build, test, analyse et déploiement, exécutée à chaque changement.",
    ],
  },
  {
    term: "Registry",
    def: [
      "A place where container images are stored and pulled from.",
      "Un endroit où les images de conteneur sont stockées et d’où on les récupère.",
    ],
  },
  {
    term: "Rollback",
    def: [
      "Returning to the previous working version after a bad release.",
      "Revenir à la version précédente qui fonctionnait après une mauvaise livraison.",
    ],
  },
  {
    term: "Secret",
    def: [
      "A password, key or token that must never be committed to Git or baked into an image.",
      "Un mot de passe, une clé ou un jeton qui ne doit jamais être validé dans Git ni intégré à une image.",
    ],
  },
  {
    term: "SLO (service level objective)",
    def: [
      "A target for reliability, such as 99.9% of requests succeeding over a month.",
      "Un objectif de fiabilité, comme 99,9 % de requêtes réussies sur un mois.",
    ],
  },
];

export type CheckGroup = { title: Text; items: Text[] };

export const checklist: CheckGroup[] = [
  {
    title: ["Code", "Code"],
    items: [
      [
        "The change was reviewed by another person",
        "Le changement a été relu par une autre personne",
      ],
      [
        "Tests pass and cover the new behaviour",
        "Les tests passent et couvrent le nouveau comportement",
      ],
      [
        "No secrets or personal data in the diff",
        "Aucun secret ni donnée personnelle dans le diff",
      ],
    ],
  },
  {
    title: ["Build", "Build"],
    items: [
      [
        "The pipeline is green on the exact commit being released",
        "Le pipeline est vert sur le commit exact qui est livré",
      ],
      [
        "The artifact has a version, not just “latest”",
        "L’artefact a une version, pas seulement « latest »",
      ],
      ["Dependencies and the image were scanned", "Les dépendances et l’image ont été analysées"],
    ],
  },
  {
    title: ["Release", "Livraison"],
    items: [
      ["There is a written way to roll back", "Il existe une procédure écrite de retour arrière"],
      [
        "A health check will tell you if the release is broken",
        "Un contrôle de santé indiquera si la livraison est cassée",
      ],
      [
        "Data is backed up before any database change",
        "Les données sont sauvegardées avant toute modification de base",
      ],
    ],
  },
  {
    title: ["After", "Après"],
    items: [
      [
        "You watched errors and latency for the first minutes",
        "Vous avez surveillé erreurs et latence pendant les premières minutes",
      ],
      [
        "The change is noted in a changelog",
        "Le changement est noté dans un journal des modifications",
      ],
      ["The team knows what shipped and when", "L’équipe sait ce qui a été livré et quand"],
    ],
  },
];
