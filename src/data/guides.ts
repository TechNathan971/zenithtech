import type { Text } from "@/lib/i18n";

export type GuideStep = {
  title: Text;
  text: Text;
  code?: { label: string; code: string };
  tip?: Text;
};

export type Guide = {
  slug: string;
  title: Text;
  summary: Text;
  level: Text;
  minutes: number;
  tools: string[]; // slugs of tool pages, for the logos
  needs: Text[];
  learn: Text[];
  steps: GuideStep[];
  mistakes: Text[];
  next: { href: string; label: Text }[];
};

export const guides: Guide[] = [
  {
    slug: "ci-pipeline",
    title: ["Set up a CI pipeline", "Mettre en place un pipeline CI"],
    summary: [
      "Build and test your code automatically on every push with GitHub Actions.",
      "Construire et tester votre code automatiquement à chaque push avec GitHub Actions.",
    ],
    level: ["Beginner", "Débutant"],
    minutes: 20,
    tools: ["github-actions", "github", "nodejs"],
    needs: [
      ["A GitHub repository with a Node.js project", "Un dépôt GitHub avec un projet Node.js"],
      [
        "A test command that works on your machine (npm test)",
        "Une commande de test qui fonctionne sur votre machine (npm test)",
      ],
    ],
    learn: [
      ["How a workflow file is structured", "Comment un fichier de workflow est structuré"],
      [
        "How to cache dependencies to save time",
        "Comment mettre les dépendances en cache pour gagner du temps",
      ],
      [
        "How to make a failing check block a merge",
        "Comment faire bloquer une fusion par un check en échec",
      ],
    ],
    steps: [
      {
        title: ["Create the workflow file", "Créer le fichier de workflow"],
        text: [
          "Add a YAML file under .github/workflows. GitHub runs it whenever one of the events you list happens.",
          "Ajoutez un fichier YAML dans .github/workflows. GitHub l’exécute chaque fois qu’un des événements listés se produit.",
        ],
        code: {
          label: ".github/workflows/ci.yml",
          code: `name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4`,
        },
      },
      {
        title: ["Install and test", "Installer et tester"],
        text: [
          "Set up Node, install dependencies with npm ci so installs are repeatable, then run the tests.",
          "Installez Node, puis les dépendances avec npm ci pour des installations reproductibles, et lancez les tests.",
        ],
        code: {
          label: "Add these to the steps",
          code: `      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test`,
        },
      },
      {
        title: ["Cache dependencies", "Mettre les dépendances en cache"],
        text: [
          "Caching the npm folder makes every later run much faster.",
          "Mettre en cache le dossier npm rend chaque exécution suivante beaucoup plus rapide.",
        ],
        code: {
          label: "Replace the setup-node step",
          code: `      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm`,
        },
        tip: [
          "Commit your package-lock.json: the cache and npm ci both rely on it.",
          "Validez votre package-lock.json : le cache et npm ci en dépendent.",
        ],
      },
      {
        title: ["Keep the build output", "Conserver le résultat du build"],
        text: [
          "Build the project and upload the result as an artifact, so you can download exactly what was tested.",
          "Construisez le projet et téléversez le résultat comme artefact, pour pouvoir télécharger exactement ce qui a été testé.",
        ],
        code: {
          label: "Add after the tests",
          code: `      - run: npm run build
      - uses: actions/upload-artifact@v4
        with:
          name: build
          path: dist`,
        },
      },
      {
        title: ["Require the check before merging", "Exiger le check avant la fusion"],
        text: [
          "In the repository settings, add a branch protection rule for main and require the CI check. From then on, a red build cannot be merged by accident.",
          "Dans les paramètres du dépôt, ajoutez une règle de protection pour main et exigez le check CI. Dès lors, un build rouge ne peut plus être fusionné par erreur.",
        ],
      },
    ],
    mistakes: [
      [
        "Putting passwords or tokens in the YAML instead of repository secrets.",
        "Mettre des mots de passe ou des jetons dans le YAML au lieu des secrets du dépôt.",
      ],
      [
        "Ignoring a failing build because “it works on my machine”.",
        "Ignorer un build en échec parce que « ça marche sur ma machine ».",
      ],
      ["Running everything in one huge job.", "Tout exécuter dans un seul gros job."],
    ],
    next: [
      {
        href: "/learn/guides/containerize-an-app",
        label: ["Next guide: containerize an app", "Guide suivant : conteneuriser une application"],
      },
      {
        href: "/stack/github-actions",
        label: ["Read about GitHub Actions", "Lire sur GitHub Actions"],
      },
    ],
  },

  {
    slug: "containerize-an-app",
    title: ["Containerize an app", "Conteneuriser une application"],
    summary: [
      "Package a Node.js app with Docker and run it next to a MySQL database.",
      "Empaqueter une application Node.js avec Docker et la lancer à côté d’une base MySQL.",
    ],
    level: ["Beginner", "Débutant"],
    minutes: 25,
    tools: ["docker", "mysql", "nodejs"],
    needs: [
      ["Docker installed on your machine", "Docker installé sur votre machine"],
      [
        "A small Node.js app that listens on port 3000",
        "Une petite application Node.js qui écoute sur le port 3000",
      ],
    ],
    learn: [
      ["How to write a Dockerfile", "Comment écrire un Dockerfile"],
      ["How to keep images small and clean", "Comment garder des images petites et propres"],
      [
        "How to run an app and its database with Compose",
        "Comment lancer une application et sa base avec Compose",
      ],
    ],
    steps: [
      {
        title: ["Write the Dockerfile", "Écrire le Dockerfile"],
        text: [
          "A Dockerfile lists the steps to build your image. Copy the package files first so Docker can reuse the cached dependency layer.",
          "Un Dockerfile liste les étapes de construction de l’image. Copiez d’abord les fichiers package pour que Docker réutilise la couche de dépendances en cache.",
        ],
        code: {
          label: "Dockerfile",
          code: `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]`,
        },
      },
      {
        title: ["Keep unwanted files out", "Écarter les fichiers inutiles"],
        text: [
          "A .dockerignore file stops folders such as node_modules and secrets from being copied into the image.",
          "Un fichier .dockerignore empêche des dossiers comme node_modules et des secrets d’être copiés dans l’image.",
        ],
        code: {
          label: ".dockerignore",
          code: `node_modules
.git
.env
Dockerfile
npm-debug.log`,
        },
        tip: [
          "A smaller build context means faster builds and no accidental secrets.",
          "Un contexte de build plus petit donne des builds plus rapides et aucun secret par accident.",
        ],
      },
      {
        title: ["Build and run it", "Le construire et le lancer"],
        text: [
          "Build the image with a clear version tag, then run it and map port 3000 to your machine.",
          "Construisez l’image avec un tag de version clair, puis lancez-la en reliant le port 3000 à votre machine.",
        ],
        code: {
          label: "Terminal",
          code: `docker build -t demo-app:1.0.0 .
docker run --rm -p 3000:3000 demo-app:1.0.0`,
        },
      },
      {
        title: ["Add a database with Compose", "Ajouter une base avec Compose"],
        text: [
          "Docker Compose describes several containers in one file. Put the password in a .env file next to it, never in the YAML.",
          "Docker Compose décrit plusieurs conteneurs dans un seul fichier. Mettez le mot de passe dans un fichier .env à côté, jamais dans le YAML.",
        ],
        code: {
          label: "docker-compose.yml",
          code: `services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      DB_HOST: db
      DB_USER: app
      DB_PASSWORD: $DB_PASSWORD
    depends_on:
      - db
  db:
    image: mysql:8
    environment:
      MYSQL_DATABASE: app
      MYSQL_USER: app
      MYSQL_PASSWORD: $DB_PASSWORD
      MYSQL_RANDOM_ROOT_PASSWORD: "yes"
    volumes:
      - db-data:/var/lib/mysql

volumes:
  db-data:`,
        },
      },
      {
        title: ["Share the image", "Partager l’image"],
        text: [
          "Tag the image for a registry and push it, so servers and teammates can pull exactly the same build.",
          "Taguez l’image pour un registre et poussez-la, pour que serveurs et collègues récupèrent exactement le même build.",
        ],
        code: {
          label: "Terminal",
          code: `docker tag demo-app:1.0.0 registry.example.com/demo-app:1.0.0
docker push registry.example.com/demo-app:1.0.0`,
        },
      },
    ],
    mistakes: [
      [
        "Using the latest tag, so nobody knows which version is running.",
        "Utiliser le tag latest, si bien que personne ne sait quelle version tourne.",
      ],
      [
        "Running the app as root inside the container.",
        "Exécuter l’application en root dans le conteneur.",
      ],
      [
        "Copying a .env file or keys into the image.",
        "Copier un fichier .env ou des clés dans l’image.",
      ],
    ],
    next: [
      {
        href: "/learn/guides/deploy-to-kubernetes",
        label: ["Next guide: deploy to Kubernetes", "Guide suivant : déployer sur Kubernetes"],
      },
      { href: "/stack/docker", label: ["Read about Docker", "Lire sur Docker"] },
    ],
  },

  {
    slug: "deploy-to-kubernetes",
    title: ["Deploy to Kubernetes", "Déployer sur Kubernetes"],
    summary: [
      "Run your container on a local Kubernetes cluster, expose it, then scale and update it safely.",
      "Faire tourner votre conteneur sur un cluster Kubernetes local, l’exposer, puis le mettre à l’échelle et le mettre à jour en sécurité.",
    ],
    level: ["Intermediate", "Intermédiaire"],
    minutes: 35,
    tools: ["kubernetes", "docker"],
    needs: [
      ["Docker, kind and kubectl installed", "Docker, kind et kubectl installés"],
      [
        "The demo-app:1.0.0 image from the previous guide",
        "L’image demo-app:1.0.0 du guide précédent",
      ],
    ],
    learn: [
      ["What a Deployment and a Service do", "Ce que font un Deployment et un Service"],
      [
        "How probes and limits keep apps healthy",
        "Comment les sondes et limites gardent les applications en bonne santé",
      ],
      ["How to roll out and roll back an update", "Comment déployer et annuler une mise à jour"],
    ],
    steps: [
      {
        title: ["Start a local cluster", "Démarrer un cluster local"],
        text: [
          "kind runs a real Kubernetes cluster inside Docker, which is perfect for learning without a cloud bill.",
          "kind fait tourner un vrai cluster Kubernetes dans Docker, idéal pour apprendre sans facture cloud.",
        ],
        code: {
          label: "Terminal",
          code: `kind create cluster --name demo
kubectl cluster-info --context kind-demo`,
        },
      },
      {
        title: ["Describe the app", "Décrire l’application"],
        text: [
          "A Deployment says what to run and how many copies. The readiness probe tells Kubernetes when a copy can receive traffic, and the limits stop one pod from starving the rest.",
          "Un Deployment dit quoi exécuter et en combien de copies. La sonde de disponibilité indique quand une copie peut recevoir du trafic, et les limites empêchent un pod d’affamer les autres.",
        ],
        code: {
          label: "deployment.yaml",
          code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 2
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
            - containerPort: 3000
          readinessProbe:
            httpGet:
              path: /health
              port: 3000
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              memory: 256Mi`,
        },
      },
      {
        title: ["Expose it with a Service", "L’exposer avec un Service"],
        text: [
          "A Service gives your pods one stable address, however many copies run and wherever they move.",
          "Un Service donne à vos pods une adresse stable, quel que soit le nombre de copies et leur emplacement.",
        ],
        code: {
          label: "service.yaml",
          code: `apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 3000`,
        },
      },
      {
        title: ["Apply it and look around", "L’appliquer et inspecter"],
        text: [
          "Load the image into the cluster, apply both files, then check the pods, read the logs and open the app through a port-forward.",
          "Chargez l’image dans le cluster, appliquez les deux fichiers, puis vérifiez les pods, lisez les logs et ouvrez l’application via un port-forward.",
        ],
        code: {
          label: "Terminal",
          code: `kind load docker-image demo-app:1.0.0 --name demo
kubectl apply -f deployment.yaml -f service.yaml
kubectl get pods
kubectl logs deploy/web
kubectl port-forward service/web 8080:80`,
        },
      },
      {
        title: ["Scale and roll out safely", "Mettre à l’échelle et déployer en sécurité"],
        text: [
          "Change the number of copies in one command, roll out a new image gradually, and undo it if something looks wrong.",
          "Changez le nombre de copies en une commande, déployez progressivement une nouvelle image et annulez si quelque chose semble anormal.",
        ],
        code: {
          label: "Terminal",
          code: `kubectl scale deploy/web --replicas=4
kubectl set image deploy/web web=demo-app:1.1.0
kubectl rollout status deploy/web
kubectl rollout undo deploy/web`,
        },
        tip: [
          "Keep the YAML in Git and apply from there, instead of editing live objects by hand.",
          "Gardez le YAML dans Git et appliquez depuis là, plutôt que de modifier les objets en direct à la main.",
        ],
      },
    ],
    mistakes: [
      ["Skipping probes and resource limits.", "Oublier les sondes et les limites de ressources."],
      ["Deploying an image tagged latest.", "Déployer une image taguée latest."],
      [
        "Using Kubernetes for a tiny app that one server could run.",
        "Utiliser Kubernetes pour une petite application qu’un seul serveur pourrait faire tourner.",
      ],
    ],
    next: [
      {
        href: "/learn/guides/monitor-with-prometheus",
        label: [
          "Next guide: monitor with Prometheus",
          "Guide suivant : superviser avec Prometheus",
        ],
      },
      { href: "/stack/kubernetes", label: ["Read about Kubernetes", "Lire sur Kubernetes"] },
    ],
  },

  {
    slug: "terraform-modules",
    title: ["Write Terraform modules", "Écrire des modules Terraform"],
    summary: [
      "Turn a web server on AWS into a reusable module that you can create and destroy with one command.",
      "Transformer un serveur web sur AWS en module réutilisable que l’on crée et détruit en une commande.",
    ],
    level: ["Intermediate", "Intermédiaire"],
    minutes: 35,
    tools: ["aws-ec2", "github"],
    needs: [
      [
        "Terraform installed and an AWS account with credentials configured",
        "Terraform installé et un compte AWS avec des identifiants configurés",
      ],
      ["An AMI id for your region", "Un identifiant d’AMI pour votre région"],
    ],
    learn: [
      ["How a module is laid out", "Comment un module est organisé"],
      [
        "How inputs and outputs connect modules",
        "Comment les entrées et sorties relient les modules",
      ],
      ["The plan, apply and destroy cycle", "Le cycle plan, apply et destroy"],
    ],
    steps: [
      {
        title: ["Lay out the module", "Organiser le module"],
        text: [
          "A module is just a folder with three files: the resources, the inputs and the outputs. Keep it small and focused on one job.",
          "Un module est simplement un dossier avec trois fichiers : les ressources, les entrées et les sorties. Gardez-le petit et centré sur une seule tâche.",
        ],
        code: {
          label: "Folder layout",
          code: `modules/
  web-server/
    main.tf
    variables.tf
    outputs.tf
main.tf`,
        },
      },
      {
        title: ["Declare the inputs", "Déclarer les entrées"],
        text: [
          "Variables are the module’s settings. Give sensible defaults to the ones that rarely change.",
          "Les variables sont les réglages du module. Donnez des valeurs par défaut raisonnables à celles qui changent rarement.",
        ],
        code: {
          label: "modules/web-server/variables.tf",
          code: `variable "name" {
  type = string
}

variable "ami_id" {
  type = string
}

variable "instance_type" {
  type    = string
  default = "t3.micro"
}`,
        },
      },
      {
        title: ["Describe the resources", "Décrire les ressources"],
        text: [
          "A security group that opens only port 80, and a server that uses it. Notice that nothing is hard-coded: everything comes from the inputs.",
          "Un groupe de sécurité qui n’ouvre que le port 80, et un serveur qui l’utilise. Notez que rien n’est écrit en dur : tout vient des entrées.",
        ],
        code: {
          label: "modules/web-server/main.tf",
          code: `resource "aws_security_group" "web" {
  name_prefix = "web-"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "web" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  vpc_security_group_ids = [aws_security_group.web.id]

  tags = {
    Name = var.name
  }
}`,
        },
      },
      {
        title: ["Expose the outputs", "Exposer les sorties"],
        text: [
          "Outputs are what the module hands back, such as the address you need to reach the server.",
          "Les sorties sont ce que le module renvoie, comme l’adresse nécessaire pour joindre le serveur.",
        ],
        code: {
          label: "modules/web-server/outputs.tf",
          code: `output "public_ip" {
  value = aws_instance.web.public_ip
}`,
        },
      },
      {
        title: ["Use the module", "Utiliser le module"],
        text: [
          "From the root folder, configure the provider and call your module with the inputs it needs. The same module can now be used again for another environment.",
          "Depuis le dossier racine, configurez le fournisseur et appelez votre module avec les entrées nécessaires. Le même module peut désormais servir pour un autre environnement.",
        ],
        code: {
          label: "main.tf",
          code: `provider "aws" {
  region = "eu-west-1"
}

module "web" {
  source = "./modules/web-server"
  name   = "demo"
  ami_id = "ami-xxxxxxxx"
}`,
        },
      },
      {
        title: ["Plan, apply and clean up", "Planifier, appliquer et nettoyer"],
        text: [
          "Always read the plan before applying it. When you are done experimenting, destroy everything so nothing keeps costing money.",
          "Lisez toujours le plan avant de l’appliquer. Quand vous avez fini d’expérimenter, détruisez tout pour que rien ne continue à coûter.",
        ],
        code: {
          label: "Terminal",
          code: `terraform init
terraform plan
terraform apply
terraform destroy`,
        },
        tip: [
          "Add terraform.tfstate and .terraform to .gitignore: state files can contain secrets.",
          "Ajoutez terraform.tfstate et .terraform au .gitignore : les fichiers d’état peuvent contenir des secrets.",
        ],
      },
    ],
    mistakes: [
      ["Committing state files to Git.", "Valider les fichiers d’état dans Git."],
      [
        "Hard-coding values that should be inputs.",
        "Écrire en dur des valeurs qui devraient être des entrées.",
      ],
      [
        "Building one giant module that does everything.",
        "Construire un module géant qui fait tout.",
      ],
    ],
    next: [
      {
        href: "/learn/guides/automate-with-scripts",
        label: [
          "Next guide: automate with scripts",
          "Guide suivant : automatiser avec des scripts",
        ],
      },
      { href: "/stack/aws-ec2", label: ["Read about AWS EC2", "Lire sur AWS EC2"] },
    ],
  },

  {
    slug: "monitor-with-prometheus",
    title: ["Monitor with Prometheus", "Superviser avec Prometheus"],
    summary: [
      "Collect metrics from your app, ask questions about them and get alerted when something breaks.",
      "Collecter les métriques de votre application, les interroger et être alerté quand quelque chose casse.",
    ],
    level: ["Intermediate", "Intermédiaire"],
    minutes: 35,
    tools: ["docker", "nodejs"],
    needs: [
      ["Docker with Compose installed", "Docker avec Compose installé"],
      ["A Node.js app with Express", "Une application Node.js avec Express"],
    ],
    learn: [
      ["How Prometheus scrapes metrics", "Comment Prometheus collecte les métriques"],
      ["How to query them with PromQL", "Comment les interroger avec PromQL"],
      ["How to write a useful alert", "Comment écrire une alerte utile"],
    ],
    steps: [
      {
        title: ["Run Prometheus and Grafana", "Lancer Prometheus et Grafana"],
        text: [
          "Prometheus collects and stores the numbers, and Grafana draws them. Compose starts both in seconds.",
          "Prometheus collecte et stocke les chiffres, Grafana les dessine. Compose démarre les deux en quelques secondes.",
        ],
        code: {
          label: "docker-compose.yml",
          code: `services:
  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"
  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"`,
        },
      },
      {
        title: ["Expose metrics from your app", "Exposer des métriques depuis l’application"],
        text: [
          "The prom-client library collects default metrics such as memory and CPU, and a /metrics endpoint lets Prometheus read them.",
          "La bibliothèque prom-client collecte des métriques par défaut, comme la mémoire et le CPU, et un endpoint /metrics permet à Prometheus de les lire.",
        ],
        code: {
          label: "server.js",
          code: `import client from "prom-client";
import express from "express";

const app = express();
client.collectDefaultMetrics();

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(3000);`,
        },
      },
      {
        title: ["Tell Prometheus where to look", "Indiquer à Prometheus où regarder"],
        text: [
          "The configuration lists the targets to scrape and how often. Here Prometheus asks your web app for its metrics every 15 seconds.",
          "La configuration liste les cibles à interroger et la fréquence. Ici, Prometheus demande ses métriques à votre application toutes les 15 secondes.",
        ],
        code: {
          label: "prometheus.yml",
          code: `global:
  scrape_interval: 15s

rule_files:
  - alerts.yml

scrape_configs:
  - job_name: web
    static_configs:
      - targets: ["web:3000"]`,
        },
      },
      {
        title: ["Ask a question with PromQL", "Poser une question avec PromQL"],
        text: [
          "PromQL is the query language. Once your app counts requests, these queries show the request rate, and the rate split by status code.",
          "PromQL est le langage de requête. Une fois que votre application compte les requêtes, ces requêtes montrent le débit, puis le débit par code de statut.",
        ],
        code: {
          label: "PromQL",
          code: `rate(http_requests_total[5m])
sum by (status) (rate(http_requests_total[5m]))`,
        },
      },
      {
        title: ["Add an alert that matters", "Ajouter une alerte qui compte"],
        text: [
          "Alert on what users feel, such as a rising share of failing requests, and wait a few minutes before firing so brief blips don’t wake anyone up.",
          "Alertez sur ce que ressentent les utilisateurs, comme une part croissante de requêtes en échec, et patientez quelques minutes avant de déclencher pour qu’un bref accroc ne réveille personne.",
        ],
        code: {
          label: "alerts.yml",
          code: `groups:
  - name: web
    rules:
      - alert: HighErrorRate
        expr: sum(rate(http_requests_total{status=~"5.."}[5m])) / sum(rate(http_requests_total[5m])) > 0.05
        for: 5m
        labels:
          severity: page
        annotations:
          summary: "More than 5% of requests are failing"`,
        },
        tip: [
          "Every alert should name an action. If nobody can act on it, remove it.",
          "Chaque alerte doit désigner une action. Si personne ne peut agir, supprimez-la.",
        ],
      },
    ],
    mistakes: [
      [
        "Alerting on everything, until nobody reads the alerts.",
        "Alerter sur tout, jusqu’à ce que plus personne ne lise les alertes.",
      ],
      [
        "Building dashboards nobody looks at.",
        "Construire des tableaux de bord que personne ne regarde.",
      ],
      [
        "Measuring servers but not what users experience.",
        "Mesurer les serveurs mais pas ce que vivent les utilisateurs.",
      ],
    ],
    next: [
      {
        href: "/learn/guides/secure-the-supply-chain",
        label: [
          "Next guide: secure the supply chain",
          "Guide suivant : sécuriser la chaîne logicielle",
        ],
      },
      {
        href: "/work/dora-metrics",
        label: ["See DORA metrics in my work", "Voir les métriques DORA dans mon travail"],
      },
    ],
  },

  {
    slug: "secure-the-supply-chain",
    title: ["Secure the supply chain", "Sécuriser la chaîne logicielle"],
    summary: [
      "Catch leaked secrets, vulnerable packages and risky images before they reach production.",
      "Détecter les secrets exposés, les paquets vulnérables et les images risquées avant la production.",
    ],
    level: ["Intermediate", "Intermédiaire"],
    minutes: 25,
    tools: ["github", "github-actions", "sonarqube"],
    needs: [
      [
        "A Git repository and a Docker image to scan",
        "Un dépôt Git et une image Docker à analyser",
      ],
      [
        "Gitleaks and Trivy installed (or Docker to run them)",
        "Gitleaks et Trivy installés (ou Docker pour les lancer)",
      ],
    ],
    learn: [
      [
        "How to find secrets that were committed by mistake",
        "Comment trouver des secrets validés par erreur",
      ],
      [
        "How to keep dependencies up to date automatically",
        "Comment garder les dépendances à jour automatiquement",
      ],
      ["How to stop a risky build from shipping", "Comment empêcher un build risqué d’être livré"],
    ],
    steps: [
      {
        title: ["Look for leaked secrets", "Chercher les secrets exposés"],
        text: [
          "Gitleaks scans your files and your whole Git history for keys and passwords. Run it before you do anything else.",
          "Gitleaks analyse vos fichiers et tout l’historique Git à la recherche de clés et de mots de passe. Lancez-le avant tout le reste.",
        ],
        code: {
          label: "Terminal",
          code: `gitleaks detect --source . --verbose`,
        },
        tip: [
          "If it finds a real secret, revoke it and create a new one. Deleting the line is not enough: it stays in the history.",
          "S’il trouve un vrai secret, révoquez-le et créez-en un nouveau. Supprimer la ligne ne suffit pas : il reste dans l’historique.",
        ],
      },
      {
        title: [
          "Update dependencies automatically",
          "Mettre à jour les dépendances automatiquement",
        ],
        text: [
          "Dependabot opens a pull request whenever a package has a new version, so updates stay small and regular.",
          "Dependabot ouvre une pull request dès qu’un paquet a une nouvelle version : les mises à jour restent petites et régulières.",
        ],
        code: {
          label: ".github/dependabot.yml",
          code: `version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"`,
        },
      },
      {
        title: ["Scan packages and images", "Analyser paquets et images"],
        text: [
          "Trivy checks your files and your container image against a database of known vulnerabilities.",
          "Trivy vérifie vos fichiers et votre image de conteneur par rapport à une base de vulnérabilités connues.",
        ],
        code: {
          label: "Terminal",
          code: `trivy fs .
trivy image demo-app:1.0.0`,
        },
      },
      {
        title: ["Pin what you can", "Fixer ce que l’on peut"],
        text: [
          "Use exact version tags for base images and install from the lockfile, so the build you tested is the build you ship.",
          "Utilisez des tags de version exacts pour les images de base et installez depuis le fichier de verrouillage : le build testé est celui que vous livrez.",
        ],
        code: {
          label: "Dockerfile and install step",
          code: `FROM node:20.11.1-alpine
RUN npm ci --omit=dev`,
        },
      },
      {
        title: ["Stop risky builds", "Bloquer les builds risqués"],
        text: [
          "Make the scan fail the pipeline when it finds serious problems, and require that check before merging.",
          "Faites échouer le pipeline quand l’analyse trouve des problèmes graves, et exigez ce check avant la fusion.",
        ],
        code: {
          label: "Terminal or pipeline step",
          code: `trivy image --exit-code 1 --severity HIGH,CRITICAL demo-app:1.0.0`,
        },
      },
    ],
    mistakes: [
      [
        "Ignoring alerts until there are hundreds.",
        "Ignorer les alertes jusqu’à en avoir des centaines.",
      ],
      [
        "Using unpinned actions and latest image tags.",
        "Utiliser des actions non fixées et des tags d’image latest.",
      ],
      [
        "Treating a leaked secret as fixed once the line is deleted.",
        "Considérer un secret exposé comme réglé une fois la ligne supprimée.",
      ],
    ],
    next: [
      {
        href: "/learn/guides/ci-pipeline",
        label: [
          "Build the pipeline these checks run in",
          "Construire le pipeline où ces vérifications s’exécutent",
        ],
      },
      { href: "/stack/sonarqube", label: ["Read about SonarQube", "Lire sur SonarQube"] },
    ],
  },

  {
    slug: "automate-with-scripts",
    title: ["Automate with scripts", "Automatiser avec des scripts"],
    summary: [
      "Write safe, repeatable shell scripts, schedule them and get told when they fail.",
      "Écrire des scripts shell sûrs et répétables, les planifier et être prévenu quand ils échouent.",
    ],
    level: ["Beginner", "Débutant"],
    minutes: 20,
    tools: ["docker", "aws-ec2"],
    needs: [
      ["A Linux or macOS terminal", "Un terminal Linux ou macOS"],
      [
        "A task you do by hand more than once",
        "Une tâche que vous faites à la main plus d’une fois",
      ],
    ],
    learn: [
      ["How to start a script safely", "Comment démarrer un script en sécurité"],
      ["How to make a script safe to run twice", "Comment rendre un script sûr à lancer deux fois"],
      [
        "How to schedule it and get alerted on failure",
        "Comment le planifier et être alerté en cas d’échec",
      ],
    ],
    steps: [
      {
        title: ["Start every script safely", "Démarrer chaque script en sécurité"],
        text: [
          "set -euo pipefail makes the script stop at the first error instead of carrying on in a broken state. Check your arguments before doing any work.",
          "set -euo pipefail arrête le script à la première erreur au lieu de continuer dans un état cassé. Vérifiez vos arguments avant de commencer le travail.",
        ],
        code: {
          label: "deploy.sh",
          code: `#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <app-dir>" >&2
  exit 1
fi

APP_DIR="$1"
cd "$APP_DIR"
git pull --ff-only
docker compose up -d --build
echo "Deployed $(date)"`,
        },
      },
      {
        title: ["Make it safe to run twice", "La rendre sûre à lancer deux fois"],
        text: [
          "An idempotent script gives the same result however many times it runs. Create folders with -p and check before you start things.",
          "Un script idempotent donne le même résultat quel que soit le nombre d’exécutions. Créez les dossiers avec -p et vérifiez avant de démarrer quoi que ce soit.",
        ],
        code: {
          label: "Examples",
          code: `mkdir -p /srv/backups

if ! docker ps --format '{{.Names}}' | grep -q '^web$'; then
  docker compose up -d
fi`,
        },
      },
      {
        title: ["Log what happens", "Journaliser ce qui se passe"],
        text: [
          "A tiny log function with a timestamp turns a mystery into a story you can read the next morning.",
          "Une petite fonction de journalisation avec horodatage transforme un mystère en histoire lisible le lendemain matin.",
        ],
        code: {
          label: "backup.sh",
          code: `log() { echo "[$(date '+%F %T')] $*"; }

log "Starting backup"
mysqldump -u backup -p"$DB_PASSWORD" app | gzip > "/srv/backups/app-$(date +%F).sql.gz"
log "Backup finished"`,
        },
      },
      {
        title: ["Schedule it with cron", "La planifier avec cron"],
        text: [
          "cron runs a command on a schedule. This line runs the backup every night at 2:00 and appends everything it prints to a log file.",
          "cron exécute une commande selon un planning. Cette ligne lance la sauvegarde chaque nuit à 2 h et ajoute tout ce qu’elle affiche à un fichier de log.",
        ],
        code: {
          label: "crontab -e",
          code: `0 2 * * * /srv/scripts/backup.sh >> /var/log/backup.log 2>&1`,
        },
      },
      {
        title: ["Get told when it fails", "Être prévenu en cas d’échec"],
        text: [
          "A trap runs a command when the script hits an error, for example a message to a chat webhook. Keep the address in an environment variable.",
          "Un trap exécute une commande quand le script rencontre une erreur, par exemple un message vers un webhook de messagerie. Gardez l’adresse dans une variable d’environnement.",
        ],
        code: {
          label: "Add near the top of the script",
          code: `trap 'curl -fsS -X POST -d "text=Backup failed" "$WEBHOOK_URL"' ERR`,
        },
      },
    ],
    mistakes: [
      [
        "Forgetting set -e, so a failure goes unnoticed.",
        "Oublier set -e, si bien qu’un échec passe inaperçu.",
      ],
      [
        "Hard-coding passwords inside the script.",
        "Écrire des mots de passe en dur dans le script.",
      ],
      [
        "Writing scripts that break when run a second time.",
        "Écrire des scripts qui cassent quand on les relance.",
      ],
    ],
    next: [
      { href: "/guides", label: ["See all guides", "Voir tous les guides"] },
      { href: "/stack/aws-ec2", label: ["Read about AWS EC2", "Lire sur AWS EC2"] },
    ],
  },
];
