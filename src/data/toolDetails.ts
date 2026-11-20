import type { StageId } from "@/data/devops";
import type { Text } from "@/lib/i18n";

export type ToolDetail = {
  category: Text;
  stage: StageId; // where it sits in the DevOps loop
  tagline: Text;
  what: Text;
  gives: { title: Text; text: Text }[];
  snippet: { label: string; code: string };
  habits: Text[];
  pitfalls: Text[];
  faq: { q: Text; a: Text };
  related: string[]; // slugs of other tools
};

export const toolDetails: Record<string, ToolDetail> = {
  docker: {
    category: ["Containers", "Conteneurs"],
    stage: "deploy",
    tagline: [
      "Package an app once and run it anywhere.",
      "Empaqueter une application une fois et l’exécuter partout.",
    ],
    what: [
      "Docker puts an application and everything it needs into a container, so it behaves the same on a laptop, a test server and production.",
      "Docker place une application et tout ce dont elle a besoin dans un conteneur, pour qu’elle se comporte de la même façon sur un portable, un serveur de test et en production.",
    ],
    gives: [
      {
        title: ["Same everywhere", "Identique partout"],
        text: ["No more “it works on my machine”.", "Fini le « ça marche sur ma machine »."],
      },
      {
        title: ["Fast environments", "Environnements rapides"],
        text: [
          "A new test environment starts in seconds, not hours.",
          "Un nouvel environnement de test démarre en secondes, pas en heures.",
        ],
      },
      {
        title: ["Easy to ship", "Facile à livrer"],
        text: [
          "One image moves through build, test and deploy unchanged.",
          "Une seule image traverse build, test et déploiement sans changer.",
        ],
      },
    ],
    snippet: {
      label: "Dockerfile",
      code: `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]`,
    },
    habits: [
      [
        "Pin base image versions instead of using latest.",
        "Fixer les versions des images de base plutôt que d’utiliser latest.",
      ],
      [
        "Keep images small with slim or alpine bases.",
        "Garder des images légères avec des bases slim ou alpine.",
      ],
      ["Run the app as a non-root user.", "Exécuter l’application avec un utilisateur non root."],
    ],
    pitfalls: [
      ["Baking secrets into an image.", "Intégrer des secrets dans une image."],
      [
        "Never cleaning up old images and volumes.",
        "Ne jamais nettoyer les anciennes images et volumes.",
      ],
    ],
    faq: {
      q: [
        "Is a container the same as a virtual machine?",
        "Un conteneur est-il la même chose qu’une machine virtuelle ?",
      ],
      a: [
        "No. Containers share the host’s kernel, so they start faster and use less memory than virtual machines.",
        "Non. Les conteneurs partagent le noyau de l’hôte : ils démarrent plus vite et consomment moins de mémoire que des machines virtuelles.",
      ],
    },
    related: ["kubernetes", "github-actions", "nginx"],
  },

  kubernetes: {
    category: ["Orchestration", "Orchestration"],
    stage: "scale",
    tagline: [
      "Run containers at scale and keep them healthy.",
      "Exécuter des conteneurs à grande échelle et les garder en bonne santé.",
    ],
    what: [
      "Kubernetes decides where containers run, restarts them when they fail and adds copies when demand grows.",
      "Kubernetes décide où les conteneurs s’exécutent, les redémarre en cas de panne et ajoute des copies quand la demande augmente.",
    ],
    gives: [
      {
        title: ["Self-healing", "Auto-réparation"],
        text: [
          "If a container crashes, a new one starts automatically.",
          "Si un conteneur plante, un nouveau démarre automatiquement.",
        ],
      },
      {
        title: ["Scaling", "Mise à l’échelle"],
        text: [
          "Replicas go up and down with the load.",
          "Le nombre de réplicas monte et descend avec la charge.",
        ],
      },
      {
        title: ["Safe updates", "Mises à jour sûres"],
        text: [
          "Rolling updates replace pods gradually, with a way back.",
          "Les mises à jour progressives remplacent les pods peu à peu, avec un retour arrière possible.",
        ],
      },
    ],
    snippet: {
      label: "deployment.yaml",
      code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: web
          image: demo-app:1.0.0
          ports:
            - containerPort: 3000`,
    },
    habits: [
      [
        "Set resource requests and limits for every container.",
        "Définir des requêtes et limites de ressources pour chaque conteneur.",
      ],
      ["Add readiness and liveness probes.", "Ajouter des sondes de disponibilité et de vivacité."],
      [
        "Keep configuration in ConfigMaps and Secrets, not in images.",
        "Garder la configuration dans des ConfigMaps et Secrets, pas dans les images.",
      ],
    ],
    pitfalls: [
      [
        "Using Kubernetes for a tiny app that one server could run.",
        "Utiliser Kubernetes pour une petite application qu’un seul serveur pourrait faire tourner.",
      ],
      [
        "Forgetting resource limits, so one pod starves the rest.",
        "Oublier les limites de ressources, si bien qu’un pod affame les autres.",
      ],
    ],
    faq: {
      q: ["Do I need Kubernetes for every project?", "Faut-il Kubernetes pour chaque projet ?"],
      a: [
        "No. It pays off when you run many containers or need automatic scaling. Smaller apps are often fine on one server with Docker.",
        "Non. Il devient utile quand on exécute de nombreux conteneurs ou qu’il faut une mise à l’échelle automatique. Les petites applications se contentent souvent d’un serveur avec Docker.",
      ],
    },
    related: ["docker", "nginx", "aws-ec2"],
  },

  "aws-ec2": {
    category: ["Cloud", "Cloud"],
    stage: "deploy",
    tagline: [
      "Virtual servers you can start in minutes.",
      "Des serveurs virtuels que l’on démarre en quelques minutes.",
    ],
    what: [
      "Amazon EC2 rents you virtual servers in the cloud. You choose the size, the operating system and how long it runs.",
      "Amazon EC2 vous loue des serveurs virtuels dans le cloud. Vous choisissez la taille, le système d’exploitation et la durée d’exécution.",
    ],
    gives: [
      {
        title: ["Right-sized", "À la bonne taille"],
        text: [
          "Pick a small instance for a small app and grow later.",
          "Choisir une petite instance pour une petite application, puis grandir.",
        ],
      },
      {
        title: ["Pay for use", "Payer à l’usage"],
        text: [
          "You pay for the time a server runs.",
          "Vous payez le temps pendant lequel un serveur tourne.",
        ],
      },
      {
        title: ["Full control", "Contrôle total"],
        text: [
          "You configure the system, the web server and the app yourself.",
          "Vous configurez vous-même le système, le serveur web et l’application.",
        ],
      },
    ],
    snippet: {
      label: "AWS CLI",
      code: `aws ec2 run-instances \\
  --image-id ami-xxxxxxxx \\
  --instance-type t3.micro \\
  --key-name my-key \\
  --security-group-ids sg-xxxxxxxx \\
  --count 1`,
    },
    habits: [
      [
        "Restrict security groups to the ports you need.",
        "Limiter les groupes de sécurité aux ports nécessaires.",
      ],
      [
        "Use key pairs, never passwords, for SSH.",
        "Utiliser des paires de clés, jamais des mots de passe, pour SSH.",
      ],
      [
        "Stop or terminate instances you no longer use.",
        "Arrêter ou supprimer les instances inutilisées.",
      ],
    ],
    pitfalls: [
      ["Leaving port 22 open to the whole internet.", "Laisser le port 22 ouvert à tout Internet."],
      [
        "Forgetting a running instance and paying for it.",
        "Oublier une instance en marche et la payer.",
      ],
    ],
    faq: {
      q: ["How do I keep costs under control?", "Comment garder les coûts sous contrôle ?"],
      a: [
        "Choose small instance types, shut down what you don’t need and set a billing alert.",
        "Choisissez de petits types d’instance, arrêtez ce qui est inutile et définissez une alerte de facturation.",
      ],
    },
    related: ["docker", "nginx", "tomcat"],
  },

  github: {
    category: ["Source control", "Gestion de versions"],
    stage: "build",
    tagline: [
      "Where the code lives and where teams collaborate.",
      "Là où vit le code et où les équipes collaborent.",
    ],
    what: [
      "GitHub hosts Git repositories and adds pull requests, issues and automation around them.",
      "GitHub héberge des dépôts Git et ajoute des pull requests, des tickets et de l’automatisation autour.",
    ],
    gives: [
      {
        title: ["History", "Historique"],
        text: [
          "Every change is recorded, so you can see who changed what and why.",
          "Chaque changement est enregistré : on voit qui a changé quoi et pourquoi.",
        ],
      },
      {
        title: ["Review", "Revue"],
        text: [
          "Pull requests let others check a change before it merges.",
          "Les pull requests permettent à d’autres de vérifier un changement avant sa fusion.",
        ],
      },
      {
        title: ["Automation", "Automatisation"],
        text: [
          "GitHub Actions runs your pipelines next to the code.",
          "GitHub Actions exécute vos pipelines à côté du code.",
        ],
      },
    ],
    snippet: {
      label: "Terminal",
      code: `git switch -c feature/login
git add .
git commit -m "feat: add login form"
git push -u origin feature/login`,
    },
    habits: [
      ["Work in short-lived branches.", "Travailler dans des branches de courte durée."],
      ["Write clear commit messages.", "Écrire des messages de commit clairs."],
      [
        "Protect the main branch and require checks.",
        "Protéger la branche principale et exiger des vérifications.",
      ],
    ],
    pitfalls: [
      ["Committing secrets or .env files.", "Valider des secrets ou des fichiers .env."],
      [
        "Huge pull requests nobody can review.",
        "Des pull requests énormes que personne ne peut relire.",
      ],
    ],
    faq: {
      q: ["Git or GitHub: what is the difference?", "Git ou GitHub : quelle différence ?"],
      a: [
        "Git is the version control tool. GitHub is a service that hosts Git repositories and adds collaboration features.",
        "Git est l’outil de gestion de versions. GitHub est un service qui héberge des dépôts Git et ajoute des fonctions de collaboration.",
      ],
    },
    related: ["github-actions", "gitlab", "jenkins"],
  },

  gitlab: {
    category: ["Source control and CI", "Gestion de versions et CI"],
    stage: "build",
    tagline: [
      "Repositories and CI/CD in one platform.",
      "Dépôts et CI/CD dans une seule plateforme.",
    ],
    what: [
      "GitLab hosts Git repositories and ships with built-in pipelines, so code, review and delivery live in one place.",
      "GitLab héberge des dépôts Git et intègre des pipelines : code, revue et livraison au même endroit.",
    ],
    gives: [
      {
        title: ["One place", "Un seul endroit"],
        text: [
          "Repositories, issues and pipelines share one interface.",
          "Dépôts, tickets et pipelines partagent une même interface.",
        ],
      },
      {
        title: ["Pipelines as code", "Pipelines en tant que code"],
        text: [
          "A .gitlab-ci.yml file describes the whole pipeline.",
          "Un fichier .gitlab-ci.yml décrit tout le pipeline.",
        ],
      },
      {
        title: ["Runners", "Runners"],
        text: [
          "Jobs run on runners you can host yourself.",
          "Les jobs s’exécutent sur des runners que vous pouvez héberger vous-même.",
        ],
      },
    ],
    snippet: {
      label: ".gitlab-ci.yml",
      code: `stages: [build, test]

build:
  stage: build
  script:
    - npm ci
    - npm run build

test:
  stage: test
  script:
    - npm test`,
    },
    habits: [
      [
        "Keep the pipeline file short and readable.",
        "Garder le fichier de pipeline court et lisible.",
      ],
      [
        "Cache dependencies to speed up jobs.",
        "Mettre les dépendances en cache pour accélérer les jobs.",
      ],
      [
        "Use protected variables for secrets.",
        "Utiliser des variables protégées pour les secrets.",
      ],
    ],
    pitfalls: [
      [
        "Jobs that depend on each other without clear stages.",
        "Des jobs interdépendants sans étapes claires.",
      ],
      ["Printing secrets in job logs.", "Afficher des secrets dans les logs des jobs."],
    ],
    faq: {
      q: ["GitLab or GitHub?", "GitLab ou GitHub ?"],
      a: [
        "Both host Git and run pipelines. GitLab bundles more tools in one product, while GitHub has the larger community. Teams often choose by what they already use.",
        "Les deux hébergent Git et exécutent des pipelines. GitLab réunit plus d’outils dans un seul produit, GitHub a la plus grande communauté. Les équipes choisissent souvent selon ce qu’elles utilisent déjà.",
      ],
    },
    related: ["github", "jenkins", "docker"],
  },

  "github-actions": {
    category: ["CI/CD", "CI/CD"],
    stage: "build",
    tagline: [
      "Automate builds, tests and deployments on every push.",
      "Automatiser builds, tests et déploiements à chaque push.",
    ],
    what: [
      "GitHub Actions runs workflows defined in YAML files in your repository whenever something happens, like a push or a pull request.",
      "GitHub Actions exécute des workflows définis dans des fichiers YAML du dépôt dès qu’un événement se produit, comme un push ou une pull request.",
    ],
    gives: [
      {
        title: ["Every push", "À chaque push"],
        text: [
          "Tests and builds run automatically, so problems show up early.",
          "Les tests et builds s’exécutent automatiquement : les problèmes apparaissent tôt.",
        ],
      },
      {
        title: ["Deploy on merge", "Déploiement à la fusion"],
        text: [
          "A merge to main can deploy to a server without manual steps.",
          "Une fusion sur main peut déployer sur un serveur sans étape manuelle.",
        ],
      },
      {
        title: ["Reusable", "Réutilisable"],
        text: [
          "Shared workflows and marketplace actions save time.",
          "Les workflows partagés et les actions de la marketplace font gagner du temps.",
        ],
      },
    ],
    snippet: {
      label: ".github/workflows/ci.yml",
      code: `name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test`,
    },
    habits: [
      ["Pin action versions.", "Fixer les versions des actions."],
      [
        "Store secrets in repository secrets, never in the file.",
        "Stocker les secrets dans les secrets du dépôt, jamais dans le fichier.",
      ],
      [
        "Cache dependencies and keep jobs short.",
        "Mettre les dépendances en cache et garder les jobs courts.",
      ],
    ],
    pitfalls: [
      [
        "Using long-lived credentials instead of short-lived ones.",
        "Utiliser des identifiants durables plutôt que temporaires.",
      ],
      ["One giant job that does everything.", "Un seul job géant qui fait tout."],
    ],
    faq: {
      q: ["Is it free?", "Est-ce gratuit ?"],
      a: [
        "Public repositories can use it free of charge, and private ones get a monthly allowance of minutes. Check GitHub’s current limits.",
        "Les dépôts publics peuvent l’utiliser gratuitement et les dépôts privés disposent d’un quota mensuel de minutes. Vérifiez les limites actuelles de GitHub.",
      ],
    },
    related: ["github", "docker", "jenkins"],
  },

  jenkins: {
    category: ["CI/CD", "CI/CD"],
    stage: "build",
    tagline: [
      "The long-standing, flexible automation server.",
      "Le serveur d’automatisation flexible et éprouvé.",
    ],
    what: [
      "Jenkins is a self-hosted automation server. A Jenkinsfile describes the pipeline, and plugins connect it to almost any tool.",
      "Jenkins est un serveur d’automatisation auto-hébergé. Un Jenkinsfile décrit le pipeline et des plugins le relient à presque tous les outils.",
    ],
    gives: [
      {
        title: ["Pipeline as code", "Pipeline en tant que code"],
        text: [
          "The Jenkinsfile lives in the repository with the code.",
          "Le Jenkinsfile vit dans le dépôt avec le code.",
        ],
      },
      {
        title: ["Plugins", "Plugins"],
        text: [
          "Connect SonarQube, Nexus, Docker and more.",
          "Connecter SonarQube, Nexus, Docker et plus encore.",
        ],
      },
      {
        title: ["Self-hosted", "Auto-hébergé"],
        text: [
          "You control where builds run and what they can reach.",
          "Vous contrôlez où les builds s’exécutent et ce qu’ils peuvent atteindre.",
        ],
      },
    ],
    snippet: {
      label: "Jenkinsfile",
      code: `pipeline {
  agent any
  stages {
    stage('Build') { steps { sh 'npm ci && npm run build' } }
    stage('Test')  { steps { sh 'npm test' } }
  }
}`,
    },
    habits: [
      [
        "Keep the Jenkinsfile in version control.",
        "Garder le Jenkinsfile sous gestion de versions.",
      ],
      ["Keep plugins and Jenkins itself up to date.", "Garder les plugins et Jenkins à jour."],
      [
        "Use credentials binding, never hard-coded secrets.",
        "Utiliser la liaison d’identifiants, jamais de secrets en dur.",
      ],
    ],
    pitfalls: [
      ["Installing too many plugins.", "Installer trop de plugins."],
      [
        "Configuring jobs by hand in the web UI.",
        "Configurer les jobs à la main dans l’interface web.",
      ],
    ],
    faq: {
      q: ["Jenkins or GitHub Actions?", "Jenkins ou GitHub Actions ?"],
      a: [
        "Actions is simpler when your code is on GitHub. Jenkins is a good fit when you want full control and self-hosting.",
        "Actions est plus simple quand le code est sur GitHub. Jenkins convient quand on veut un contrôle total et de l’auto-hébergement.",
      ],
    },
    related: ["github-actions", "sonarqube", "nexus"],
  },

  sonarqube: {
    category: ["Code quality", "Qualité du code"],
    stage: "build",
    tagline: [
      "Catch bugs and code smells before they ship.",
      "Repérer bugs et mauvaises pratiques avant la livraison.",
    ],
    what: [
      "SonarQube analyses source code and reports bugs, vulnerabilities and maintainability problems. A quality gate can stop a build that doesn’t meet your standard.",
      "SonarQube analyse le code source et signale bugs, vulnérabilités et problèmes de maintenabilité. Une quality gate peut bloquer un build qui n’atteint pas votre niveau d’exigence.",
    ],
    gives: [
      {
        title: ["Quality gate", "Quality gate"],
        text: [
          "Fail a build when new code misses the agreed standard.",
          "Faire échouer un build quand le nouveau code n’atteint pas le standard convenu.",
        ],
      },
      {
        title: ["Early feedback", "Retour précoce"],
        text: [
          "Problems show up on the pull request, not in production.",
          "Les problèmes apparaissent sur la pull request, pas en production.",
        ],
      },
      {
        title: ["Trends", "Tendances"],
        text: [
          "See whether quality improves or slips over time.",
          "Voir si la qualité s’améliore ou se dégrade avec le temps.",
        ],
      },
    ],
    snippet: {
      label: "sonar-project.properties",
      code: `sonar.projectKey=demo-app
sonar.sources=src
sonar.host.url=http://localhost:9000
sonar.qualitygate.wait=true`,
    },
    habits: [
      [
        "Focus on new code first so the gate stays realistic.",
        "Se concentrer d’abord sur le nouveau code pour garder une gate réaliste.",
      ],
      [
        "Fix issues when they appear instead of letting them pile up.",
        "Corriger les problèmes dès qu’ils apparaissent plutôt que de les laisser s’accumuler.",
      ],
      [
        "Run the analysis in the pipeline, not only by hand.",
        "Lancer l’analyse dans le pipeline, pas seulement à la main.",
      ],
    ],
    pitfalls: [
      [
        "Ignoring the report until it has hundreds of issues.",
        "Ignorer le rapport jusqu’à ce qu’il contienne des centaines de problèmes.",
      ],
      [
        "Setting the gate so strict that people bypass it.",
        "Fixer une gate si stricte que les gens la contournent.",
      ],
    ],
    faq: {
      q: ["Does SonarQube replace code review?", "SonarQube remplace-t-il la revue de code ?"],
      a: [
        "No. It catches common problems automatically, which leaves reviewers free to discuss design and logic.",
        "Non. Il détecte automatiquement les problèmes courants, ce qui laisse les relecteurs discuter de conception et de logique.",
      ],
    },
    related: ["jenkins", "github-actions", "nexus"],
  },

  nexus: {
    category: ["Artifacts", "Artefacts"],
    stage: "build",
    tagline: [
      "A trusted store for every build you produce.",
      "Un dépôt de confiance pour chaque build produit.",
    ],
    what: [
      "Nexus Repository stores build outputs such as packages and container images, so what you deploy is versioned and traceable.",
      "Nexus Repository stocke les résultats de build, comme les paquets et les images de conteneur, pour que ce que vous déployez soit versionné et traçable.",
    ],
    gives: [
      {
        title: ["Versioned", "Versionné"],
        text: [
          "Every build keeps a version you can find again.",
          "Chaque build garde une version que l’on peut retrouver.",
        ],
      },
      {
        title: ["Traceable", "Traçable"],
        text: [
          "Know exactly what is running in each environment.",
          "Savoir exactement ce qui tourne dans chaque environnement.",
        ],
      },
      {
        title: ["Proxy", "Proxy"],
        text: [
          "Cache outside dependencies for faster, steadier builds.",
          "Mettre en cache les dépendances externes pour des builds plus rapides et plus stables.",
        ],
      },
    ],
    snippet: {
      label: "Terminal",
      code: `docker login nexus.example.com
docker tag demo-app:1.0.0 nexus.example.com/demo-app:1.0.0
docker push nexus.example.com/demo-app:1.0.0`,
    },
    habits: [
      ["Never overwrite a released version.", "Ne jamais écraser une version publiée."],
      ["Use clear version numbers.", "Utiliser des numéros de version clairs."],
      [
        "Clean up old snapshots on a schedule.",
        "Nettoyer les anciens snapshots de façon planifiée.",
      ],
    ],
    pitfalls: [
      [
        "Deploying a “latest” tag nobody can trace.",
        "Déployer un tag « latest » que personne ne peut tracer.",
      ],
      [
        "Letting storage grow without cleanup rules.",
        "Laisser le stockage croître sans règles de nettoyage.",
      ],
    ],
    faq: {
      q: ["Why store artifacts at all?", "Pourquoi stocker les artefacts ?"],
      a: [
        "So the exact build you tested is the one you deploy, and you can roll back to an earlier one.",
        "Pour que le build exact que vous avez testé soit celui que vous déployez, et pour pouvoir revenir à un build précédent.",
      ],
    },
    related: ["jenkins", "docker", "sonarqube"],
  },

  nginx: {
    category: ["Web server", "Serveur web"],
    stage: "scale",
    tagline: ["The front door for your web traffic.", "La porte d’entrée de votre trafic web."],
    what: [
      "NGINX serves web pages and acts as a reverse proxy, passing requests to your app while handling HTTPS, caching and load balancing.",
      "NGINX sert des pages web et joue le rôle de reverse proxy : il transmet les requêtes à votre application tout en gérant le HTTPS, le cache et la répartition de charge.",
    ],
    gives: [
      {
        title: ["Reverse proxy", "Reverse proxy"],
        text: [
          "Sends requests to the right app behind the scenes.",
          "Envoie les requêtes à la bonne application en coulisses.",
        ],
      },
      {
        title: ["HTTPS", "HTTPS"],
        text: [
          "Terminates TLS so your app doesn’t have to.",
          "Termine le TLS pour que votre application n’ait pas à le faire.",
        ],
      },
      {
        title: ["Static files", "Fichiers statiques"],
        text: ["Serves images and files quickly.", "Sert rapidement images et fichiers."],
      },
    ],
    snippet: {
      label: "nginx.conf",
      code: `server {
  listen 80;
  server_name app.example.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}`,
    },
    habits: [
      [
        "Test the config with nginx -t before reloading.",
        "Tester la configuration avec nginx -t avant de recharger.",
      ],
      ["Redirect HTTP to HTTPS.", "Rediriger HTTP vers HTTPS."],
      [
        "Keep one small config file per site.",
        "Garder un petit fichier de configuration par site.",
      ],
    ],
    pitfalls: [
      ["Reloading with a broken config.", "Recharger avec une configuration cassée."],
      [
        "Exposing server version details unnecessarily.",
        "Exposer inutilement la version du serveur.",
      ],
    ],
    faq: {
      q: ["What is a reverse proxy?", "Qu’est-ce qu’un reverse proxy ?"],
      a: [
        "A server that receives requests on behalf of your app and forwards them, adding things like HTTPS, caching and load balancing.",
        "Un serveur qui reçoit les requêtes à la place de votre application et les lui transmet, en ajoutant par exemple HTTPS, cache et répartition de charge.",
      ],
    },
    related: ["tomcat", "aws-ec2", "docker"],
  },

  tomcat: {
    category: ["App server", "Serveur d’applications"],
    stage: "deploy",
    tagline: ["A home for Java web applications.", "Un foyer pour les applications web Java."],
    what: [
      "Apache Tomcat runs Java web applications packaged as WAR files and serves them over HTTP.",
      "Apache Tomcat exécute des applications web Java empaquetées en fichiers WAR et les sert en HTTP.",
    ],
    gives: [
      {
        title: ["Run Java apps", "Exécuter des applications Java"],
        text: [
          "Drop a WAR file in and the app is live.",
          "Il suffit de déposer un fichier WAR pour que l’application soit en ligne.",
        ],
      },
      {
        title: ["Behind NGINX", "Derrière NGINX"],
        text: [
          "Pair it with NGINX for HTTPS and routing.",
          "L’associer à NGINX pour le HTTPS et le routage.",
        ],
      },
      {
        title: ["Lightweight", "Léger"],
        text: [
          "Simpler than a full application server.",
          "Plus simple qu’un serveur d’applications complet.",
        ],
      },
    ],
    snippet: {
      label: "Terminal",
      code: `cp target/app.war /opt/tomcat/webapps/
sudo systemctl restart tomcat`,
    },
    habits: [
      ["Run it as its own non-root user.", "L’exécuter avec son propre utilisateur non root."],
      ["Keep Tomcat and Java patched.", "Garder Tomcat et Java à jour."],
      [
        "Remove the sample apps from production.",
        "Retirer les applications d’exemple de la production.",
      ],
    ],
    pitfalls: [
      [
        "Leaving the manager app open to the internet.",
        "Laisser l’application manager ouverte sur Internet.",
      ],
      ["Giving the JVM too little memory.", "Donner trop peu de mémoire à la JVM."],
    ],
    faq: {
      q: ["What is a WAR file?", "Qu’est-ce qu’un fichier WAR ?"],
      a: [
        "A packaged Java web application: code, libraries and configuration in one file that Tomcat can deploy.",
        "Une application web Java empaquetée : code, bibliothèques et configuration dans un seul fichier que Tomcat peut déployer.",
      ],
    },
    related: ["nginx", "jenkins", "aws-ec2"],
  },

  php: {
    category: ["Language", "Langage"],
    stage: "build",
    tagline: [
      "A practical language for the web back end.",
      "Un langage pratique pour le back end web.",
    ],
    what: [
      "PHP runs on the server and builds web pages and APIs. It pairs naturally with MySQL and is available on almost every host.",
      "PHP s’exécute côté serveur et construit pages web et API. Il s’associe naturellement à MySQL et est disponible sur presque tous les hébergeurs.",
    ],
    gives: [
      {
        title: ["Web back ends", "Back ends web"],
        text: [
          "Handle forms, sessions and database queries.",
          "Gérer formulaires, sessions et requêtes de base de données.",
        ],
      },
      {
        title: ["Easy hosting", "Hébergement facile"],
        text: [
          "Runs on cheap shared hosting and on containers alike.",
          "Fonctionne aussi bien sur un hébergement mutualisé bon marché que dans des conteneurs.",
        ],
      },
      {
        title: ["Mature", "Mature"],
        text: [
          "Years of libraries, tools and answers online.",
          "Des années de bibliothèques, d’outils et de réponses en ligne.",
        ],
      },
    ],
    snippet: {
      label: "providers.php",
      code: `<?php
$pdo = new PDO('mysql:host=localhost;dbname=app', $user, $pass);
$stmt = $pdo->prepare('SELECT * FROM providers WHERE field = ?');
$stmt->execute([$field]);
$providers = $stmt->fetchAll(PDO::FETCH_ASSOC);`,
    },
    habits: [
      [
        "Use prepared statements for every query.",
        "Utiliser des requêtes préparées pour chaque requête.",
      ],
      [
        "Validate and escape all input and output.",
        "Valider et échapper toutes les entrées et sorties.",
      ],
      ["Use Composer to manage dependencies.", "Utiliser Composer pour gérer les dépendances."],
    ],
    pitfalls: [
      ["Building SQL by joining strings.", "Construire du SQL en concaténant des chaînes."],
      [
        "Showing error details to visitors in production.",
        "Afficher les détails d’erreur aux visiteurs en production.",
      ],
    ],
    faq: {
      q: ["Is PHP still relevant?", "PHP est-il encore pertinent ?"],
      a: [
        "Yes. It powers a large share of the web and keeps improving, which makes it a solid choice for many business applications.",
        "Oui. Il fait tourner une grande part du web et continue de progresser, ce qui en fait un choix solide pour de nombreuses applications d’entreprise.",
      ],
    },
    related: ["mysql", "nginx", "docker"],
  },

  mysql: {
    category: ["Database", "Base de données"],
    stage: "deploy",
    tagline: ["A reliable relational database.", "Une base de données relationnelle fiable."],
    what: [
      "MySQL stores data in tables you can query with SQL. It is widely used, well documented and a common partner for PHP.",
      "MySQL stocke les données dans des tables que l’on interroge en SQL. Il est très répandu, bien documenté et partenaire courant de PHP.",
    ],
    gives: [
      {
        title: ["Structured data", "Données structurées"],
        text: [
          "Records, users and listings fit naturally into tables.",
          "Dossiers, utilisateurs et annonces se rangent naturellement dans des tables.",
        ],
      },
      {
        title: ["Fast queries", "Requêtes rapides"],
        text: [
          "Indexes keep searches quick as data grows.",
          "Les index gardent les recherches rapides quand les données grossissent.",
        ],
      },
      {
        title: ["Backups", "Sauvegardes"],
        text: [
          "Dumps and snapshots protect the data you can’t lose.",
          "Les dumps et snapshots protègent les données qu’on ne peut pas perdre.",
        ],
      },
    ],
    snippet: {
      label: "schema.sql",
      code: `CREATE TABLE records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  status VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_records_status ON records (status);`,
    },
    habits: [
      [
        "Add indexes for the columns you search on.",
        "Ajouter des index sur les colonnes utilisées pour chercher.",
      ],
      [
        "Back up regularly and test the restore.",
        "Sauvegarder régulièrement et tester la restauration.",
      ],
      [
        "Give each app its own database user with minimal rights.",
        "Donner à chaque application son propre utilisateur avec des droits minimaux.",
      ],
    ],
    pitfalls: [
      ["Backups nobody has ever restored.", "Des sauvegardes que personne n’a jamais restaurées."],
      [
        "Using the root user from the application.",
        "Utiliser l’utilisateur root depuis l’application.",
      ],
    ],
    faq: {
      q: ["How do I keep data safe?", "Comment garder les données en sécurité ?"],
      a: [
        "Use least-privilege users, back up on a schedule, and practise restoring so you know the backups work.",
        "Utilisez des utilisateurs à privilèges minimaux, sauvegardez de façon planifiée et entraînez-vous à restaurer pour savoir que les sauvegardes fonctionnent.",
      ],
    },
    related: ["php", "docker", "aws-ec2"],
  },

  react: {
    category: ["Framework", "Framework"],
    stage: "build",
    tagline: [
      "Build interfaces from small, reusable pieces.",
      "Construire des interfaces à partir de petits composants réutilisables.",
    ],
    what: [
      "React builds user interfaces from components. When data changes, it updates only the parts of the page that need it.",
      "React construit des interfaces à partir de composants. Quand les données changent, il ne met à jour que les parties de la page concernées.",
    ],
    gives: [
      {
        title: ["Components", "Composants"],
        text: [
          "Buttons, cards and forms are built once and reused.",
          "Boutons, cartes et formulaires sont construits une fois et réutilisés.",
        ],
      },
      {
        title: ["Interactivity", "Interactivité"],
        text: [
          "State makes live, responsive interfaces simple.",
          "L’état rend les interfaces vivantes et réactives simples à construire.",
        ],
      },
      {
        title: ["Ecosystem", "Écosystème"],
        text: [
          "Frameworks like Next.js build on top of it.",
          "Des frameworks comme Next.js s’appuient dessus.",
        ],
      },
    ],
    snippet: {
      label: "Counter.jsx",
      code: `function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}`,
    },
    habits: [
      ["Keep components small and focused.", "Garder des composants petits et ciblés."],
      [
        "Keep state as close as possible to where it is used.",
        "Garder l’état au plus près de son usage.",
      ],
      ["Give list items stable keys.", "Donner des clés stables aux éléments de liste."],
    ],
    pitfalls: [
      ["Putting everything in one giant component.", "Tout mettre dans un seul composant géant."],
      ["Storing derived data in state.", "Stocker dans l’état des données dérivées."],
    ],
    faq: {
      q: ["React or Next.js?", "React ou Next.js ?"],
      a: [
        "React builds the interface. Next.js adds routing, server rendering and tooling around it, as on this site.",
        "React construit l’interface. Next.js ajoute le routage, le rendu côté serveur et les outils autour, comme sur ce site.",
      ],
    },
    related: ["nodejs", "tailwind-css", "github"],
  },

  nodejs: {
    category: ["Runtime", "Environnement d’exécution"],
    stage: "build",
    tagline: ["JavaScript on the server.", "JavaScript côté serveur."],
    what: [
      "Node.js runs JavaScript outside the browser, which makes it a natural choice for APIs, tooling and the build steps behind modern front ends.",
      "Node.js exécute JavaScript en dehors du navigateur, ce qui en fait un choix naturel pour les API, les outils et les étapes de build des interfaces modernes.",
    ],
    gives: [
      {
        title: ["APIs", "API"],
        text: [
          "Build back ends in the same language as the front end.",
          "Construire des back ends dans le même langage que le front end.",
        ],
      },
      {
        title: ["Tooling", "Outils"],
        text: [
          "Build tools and test runners run on Node.",
          "Les outils de build et de test s’exécutent sur Node.",
        ],
      },
      {
        title: ["npm", "npm"],
        text: [
          "A huge library of packages to build on.",
          "Une immense bibliothèque de paquets sur laquelle s’appuyer.",
        ],
      },
    ],
    snippet: {
      label: "server.js",
      code: `import express from "express";

const app = express();

app.get("/health", (req, res) => res.json({ ok: true }));

app.listen(3000);`,
    },
    habits: [
      ["Use an LTS version in production.", "Utiliser une version LTS en production."],
      [
        "Commit the lockfile so installs are repeatable.",
        "Valider le fichier de verrouillage pour des installations reproductibles.",
      ],
      [
        "Handle errors and unhandled rejections explicitly.",
        "Gérer explicitement les erreurs et les rejets non gérés.",
      ],
    ],
    pitfalls: [
      [
        "Blocking the event loop with heavy work.",
        "Bloquer la boucle d’événements avec un traitement lourd.",
      ],
      [
        "Trusting every npm package without checking.",
        "Faire confiance à chaque paquet npm sans vérifier.",
      ],
    ],
    faq: {
      q: ["Is Node.js a language?", "Node.js est-il un langage ?"],
      a: [
        "No. JavaScript is the language. Node.js is the runtime that lets it run on a server.",
        "Non. JavaScript est le langage. Node.js est l’environnement qui lui permet de s’exécuter sur un serveur.",
      ],
    },
    related: ["react", "docker", "github-actions"],
  },

  "tailwind-css": {
    category: ["Styling", "Styles"],
    stage: "build",
    tagline: [
      "Style directly in your markup with utility classes.",
      "Styler directement dans le balisage avec des classes utilitaires.",
    ],
    what: [
      "Tailwind CSS gives you small utility classes for spacing, colour and layout, so you design in the markup instead of writing separate stylesheets.",
      "Tailwind CSS fournit de petites classes utilitaires pour les espacements, les couleurs et la mise en page : on dessine directement dans le balisage plutôt que d’écrire des feuilles de style séparées.",
    ],
    gives: [
      {
        title: ["Fast to build", "Rapide à construire"],
        text: [
          "Style a component without leaving the file.",
          "Styler un composant sans quitter le fichier.",
        ],
      },
      {
        title: ["Consistent", "Cohérent"],
        text: [
          "A shared scale keeps spacing and colours coherent.",
          "Une échelle commune garde espacements et couleurs cohérents.",
        ],
      },
      {
        title: ["Small output", "Sortie légère"],
        text: [
          "Only the classes you use end up in the CSS.",
          "Seules les classes utilisées finissent dans le CSS.",
        ],
      },
    ],
    snippet: {
      label: "button.html",
      code: `<button class="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">
  Save
</button>`,
    },
    habits: [
      [
        "Define your colours and fonts as theme tokens.",
        "Définir couleurs et polices comme des tokens de thème.",
      ],
      [
        "Extract repeated patterns into components.",
        "Extraire les motifs répétés dans des composants.",
      ],
      [
        "Design mobile first, then add larger breakpoints.",
        "Concevoir d’abord pour mobile, puis ajouter les points de rupture plus larges.",
      ],
    ],
    pitfalls: [
      [
        "Building class names by joining strings.",
        "Construire des noms de classes en concaténant des chaînes.",
      ],
      [
        "Repeating long class lists instead of making a component.",
        "Répéter de longues listes de classes au lieu de créer un composant.",
      ],
    ],
    faq: {
      q: ["Doesn’t it make HTML messy?", "Cela n’alourdit-il pas le HTML ?"],
      a: [
        "Classes get long, but components keep that in one place, and you never hunt through a separate stylesheet.",
        "Les classes s’allongent, mais les composants les gardent au même endroit, et l’on ne fouille jamais une feuille de style séparée.",
      ],
    },
    related: ["react", "nodejs", "github"],
  },

  expressvpn: {
    category: ["Network security", "Sécurité réseau"],
    stage: "scale",
    tagline: [
      "A private, encrypted tunnel for your connection.",
      "Un tunnel privé et chiffré pour votre connexion.",
    ],
    what: [
      "A VPN encrypts the traffic between your device and the VPN server, which protects you on public networks and helps reach services safely.",
      "Un VPN chiffre le trafic entre votre appareil et le serveur VPN, ce qui vous protège sur les réseaux publics et aide à accéder aux services en sécurité.",
    ],
    gives: [
      {
        title: ["Public Wi-Fi", "Wi-Fi public"],
        text: [
          "Keeps your traffic private on networks you don’t control.",
          "Garde votre trafic privé sur des réseaux que vous ne contrôlez pas.",
        ],
      },
      {
        title: ["Remote work", "Travail à distance"],
        text: [
          "A safer connection when working from anywhere.",
          "Une connexion plus sûre pour travailler de n’importe où.",
        ],
      },
      {
        title: ["Consistent access", "Accès constant"],
        text: [
          "Reach services reliably from different locations.",
          "Accéder aux services de façon fiable depuis différents endroits.",
        ],
      },
    ],
    snippet: {
      label: "Command line (Linux)",
      code: `expressvpn connect
expressvpn status`,
    },
    habits: [
      ["Turn it on before using public Wi-Fi.", "L’activer avant d’utiliser un Wi-Fi public."],
      ["Keep the app updated.", "Garder l’application à jour."],
      [
        "Use it alongside strong passwords and two-factor authentication.",
        "L’utiliser avec des mots de passe solides et l’authentification à deux facteurs.",
      ],
    ],
    pitfalls: [
      [
        "Thinking a VPN makes you anonymous or immune to attacks.",
        "Croire qu’un VPN vous rend anonyme ou invulnérable.",
      ],
      [
        "Staying connected to a slow server out of habit.",
        "Rester connecté à un serveur lent par habitude.",
      ],
    ],
    faq: {
      q: ["Does a VPN replace other security?", "Un VPN remplace-t-il les autres protections ?"],
      a: [
        "No. It protects the connection, not your devices or accounts, so you still need updates, strong passwords and two-factor authentication.",
        "Non. Il protège la connexion, pas vos appareils ni vos comptes : il faut toujours des mises à jour, des mots de passe solides et l’authentification à deux facteurs.",
      ],
    },
    related: ["github", "aws-ec2", "nginx"],
  },
};
