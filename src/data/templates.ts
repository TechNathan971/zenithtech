import type { Text } from "@/lib/i18n";

export type Template = {
  filename: string;
  title: Text;
  text: Text;
  content: string;
};

export const templates: Template[] = [
  {
    filename: "ci.yml",
    title: ["GitHub Actions CI for Node.js", "CI GitHub Actions pour Node.js"],
    text: [
      "Install, test and build on every push and pull request. Save it as .github/workflows/ci.yml.",
      "Installer, tester et construire à chaque push et pull request. Enregistrez-le dans .github/workflows/ci.yml.",
    ],
    content: `name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
`,
  },
  {
    filename: "Dockerfile",
    title: ["Node.js Dockerfile", "Dockerfile Node.js"],
    text: [
      "A small production image that runs as a non-root user.",
      "Une petite image de production exécutée par un utilisateur non root.",
    ],
    content: `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
USER node
EXPOSE 3000
CMD ["node", "server.js"]
`,
  },
  {
    filename: "docker-compose.yml",
    title: ["Compose: app and MySQL", "Compose : application et MySQL"],
    text: [
      "A web app and a database. Put DB_PASSWORD in a .env file next to it.",
      "Une application web et une base de données. Mettez DB_PASSWORD dans un fichier .env à côté.",
    ],
    content: `services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      DB_HOST: db
      DB_PASSWORD: $DB_PASSWORD
    depends_on:
      - db
  db:
    image: mysql:8
    environment:
      MYSQL_DATABASE: app
      MYSQL_ROOT_PASSWORD: $DB_PASSWORD
    volumes:
      - db-data:/var/lib/mysql

volumes:
  db-data:
`,
  },
  {
    filename: "k8s.yaml",
    title: ["Kubernetes Deployment and Service", "Deployment et Service Kubernetes"],
    text: [
      "Two copies of an app, a readiness probe, resource limits and a Service in front.",
      "Deux copies d’une application, une sonde de disponibilité, des limites de ressources et un Service devant.",
    ],
    content: `apiVersion: apps/v1
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
          image: registry.example.com/demo-app:1.0.0
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
              memory: 256Mi
---
apiVersion: v1
kind: Service
metadata:
  name: web
spec:
  selector:
    app: web
  ports:
    - port: 80
      targetPort: 3000
`,
  },
  {
    filename: "README.md",
    title: ["Project README", "README de projet"],
    text: [
      "A clear structure for explaining what a project is and how to run it.",
      "Une structure claire pour expliquer ce qu’est un projet et comment le lancer.",
    ],
    content: `# Project name

One sentence about what this project does and who it is for.

## Run it

1. Clone the repository
2. Copy .env.example to .env and fill in the values
3. Run: npm ci && npm start

## Test it

Run: npm test

## How it is deployed

Describe the pipeline, where it runs and how to roll back.

## Contact

Who to ask when something is unclear.
`,
  },
  {
    filename: "runbook.md",
    title: ["Incident runbook", "Runbook d’incident"],
    text: [
      "A page to fill in before something breaks, so nobody has to improvise at 3 a.m.",
      "Une page à remplir avant que quelque chose casse, pour que personne n’improvise à 3 h du matin.",
    ],
    content: `# Runbook: <service name>

## What it does
One or two sentences.

## How to tell it is broken
- Which alert fires
- Which page or endpoint to check

## First steps
1. Check the health endpoint
2. Read the latest logs
3. Check the last deployment

## How to roll back
Write the exact commands here.

## Who to call
Name, role and how to reach them.

## After the incident
- What happened and when
- How long it took to restore service
- What will change so it does not repeat
`,
  },
];
