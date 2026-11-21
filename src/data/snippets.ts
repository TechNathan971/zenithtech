import type { Text } from "@/lib/i18n";

export type SnippetFile = { label: string; code: string };
export type Snippet = {
  id: string;
  kind: "snippet" | "sample";
  lang: string;
  title: Text;
  text: Text;
  files: SnippetFile[];
};

export const snippets: Snippet[] = [
  {
    id: "wait-for-url",
    kind: "snippet",
    lang: "bash",
    title: ["Wait until a URL is healthy", "Attendre qu’une URL soit en bonne santé"],
    text: [
      "Poll a health endpoint after a deploy and fail if it never comes up.",
      "Interroger un endpoint de santé après un déploiement et échouer s’il ne répond jamais.",
    ],
    files: [
      {
        label: "wait-for-url.sh",
        code: `#!/usr/bin/env bash
set -euo pipefail

URL="$1"
for i in $(seq 1 30); do
  if curl -fsS "$URL" > /dev/null; then
    echo "Healthy"
    exit 0
  fi
  sleep 2
done

echo "Still not healthy after 60 seconds" >&2
exit 1`,
      },
    ],
  },
  {
    id: "nightly-workflow",
    kind: "snippet",
    lang: "yaml",
    title: ["A nightly scheduled workflow", "Un workflow planifié chaque nuit"],
    text: [
      "Run a job every night at 02:00 UTC, and let you start it by hand too.",
      "Lancer un job chaque nuit à 02:00 UTC, et pouvoir aussi le démarrer à la main.",
    ],
    files: [
      {
        label: ".github/workflows/nightly.yml",
        code: `name: Nightly
on:
  schedule:
    - cron: "0 2 * * *"
  workflow_dispatch:

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm audit --audit-level=high`,
      },
    ],
  },
  {
    id: "multi-stage-node",
    kind: "snippet",
    lang: "dockerfile",
    title: ["Multi-stage Node build", "Build Node en plusieurs étapes"],
    text: [
      "Build in one stage, ship only the result in a small final image.",
      "Construire dans une étape, ne livrer que le résultat dans une petite image finale.",
    ],
    files: [
      {
        label: "Dockerfile",
        code: `FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm ci --omit=dev
USER node
CMD ["node", "dist/server.js"]`,
      },
    ],
  },
  {
    id: "mysql-app-user",
    kind: "snippet",
    lang: "sql",
    title: ["A MySQL user with limited rights", "Un utilisateur MySQL aux droits limités"],
    text: [
      "Give an application only what it needs on its own database.",
      "Donner à une application uniquement ce dont elle a besoin sur sa propre base.",
    ],
    files: [
      {
        label: "create-user.sql",
        code: `CREATE DATABASE app;
CREATE USER 'app'@'%' IDENTIFIED BY '<choose-a-strong-password>';
GRANT SELECT, INSERT, UPDATE, DELETE ON app.* TO 'app'@'%';
FLUSH PRIVILEGES;`,
      },
    ],
  },
  {
    id: "nginx-proxy",
    kind: "snippet",
    lang: "nginx",
    title: ["Reverse proxy to a Node app", "Reverse proxy vers une application Node"],
    text: [
      "Let NGINX receive requests on port 80 and pass them to your app.",
      "Laisser NGINX recevoir les requêtes sur le port 80 et les transmettre à votre application.",
    ],
    files: [
      {
        label: "/etc/nginx/conf.d/app.conf",
        code: `server {
  listen 80;
  server_name example.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}`,
      },
    ],
  },
  {
    id: "retry-backoff",
    kind: "snippet",
    lang: "js",
    title: ["Retry with backoff", "Réessayer avec un délai croissant"],
    text: [
      "Retry a failing call, waiting a little longer each time.",
      "Réessayer un appel qui échoue, en attendant un peu plus à chaque fois.",
    ],
    files: [
      {
        label: "retry.js",
        code: `export async function retry(task, attempts = 4, delayMs = 500) {
  for (let i = 0; i < attempts; i++) {
    try {
      return await task();
    } catch (error) {
      if (i === attempts - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, delayMs * 2 ** i));
    }
  }
}`,
      },
    ],
  },

  {
    id: "express-health-test",
    kind: "sample",
    lang: "js",
    title: [
      "Express API with a health check and a test",
      "API Express avec contrôle de santé et test",
    ],
    text: [
      "A tiny API, a test that proves it works, and the scripts to run both. Uses Node’s built-in test runner.",
      "Une minuscule API, un test qui prouve qu’elle fonctionne, et les scripts pour lancer les deux. Utilise le lanceur de tests intégré à Node.",
    ],
    files: [
      {
        label: "package.json",
        code: `{
  "name": "demo-api",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "test": "node --test"
  },
  "dependencies": {
    "express": "^4.19.2"
  }
}`,
      },
      {
        label: "app.js",
        code: `import express from "express";

export const app = express();

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});`,
      },
      {
        label: "server.js",
        code: `import { app } from "./app.js";

app.listen(3000, () => console.log("Listening on 3000"));`,
      },
      {
        label: "health.test.js",
        code: `import test from "node:test";
import assert from "node:assert/strict";
import { app } from "./app.js";

test("health returns ok", async () => {
  const server = app.listen(0);
  const { port } = server.address();

  const res = await fetch("http://localhost:" + port + "/health");
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { status: "ok" });

  server.close();
});`,
      },
    ],
  },
  {
    id: "backup-retention",
    kind: "sample",
    lang: "bash",
    title: ["Nightly backup with retention", "Sauvegarde nocturne avec rétention"],
    text: [
      "Dump a database, compress it, and delete backups older than a week. Schedule it with cron.",
      "Exporter une base, la compresser, et supprimer les sauvegardes de plus d’une semaine. À planifier avec cron.",
    ],
    files: [
      {
        label: "backup.sh",
        code: `#!/usr/bin/env bash
set -euo pipefail

BACKUP_DIR="/srv/backups"
mkdir -p "$BACKUP_DIR"

FILE="$BACKUP_DIR/app-$(date +%F).sql.gz"
mysqldump -u backup -p"$DB_PASSWORD" app | gzip > "$FILE"
echo "Saved $FILE"

find "$BACKUP_DIR" -name "app-*.sql.gz" -mtime +7 -delete
echo "Old backups removed"`,
      },
      {
        label: "crontab -e",
        code: `0 2 * * * DB_PASSWORD="$(cat /etc/backup.secret)" /srv/scripts/backup.sh >> /var/log/backup.log 2>&1`,
      },
    ],
  },
  {
    id: "compose-healthcheck",
    kind: "sample",
    lang: "yaml",
    title: [
      "Compose stack that waits for its database",
      "Pile Compose qui attend sa base de données",
    ],
    text: [
      "The web container starts only once MySQL reports it is healthy, which avoids start-up errors.",
      "Le conteneur web ne démarre que lorsque MySQL se déclare en bonne santé, ce qui évite les erreurs au démarrage.",
    ],
    files: [
      {
        label: "docker-compose.yml",
        code: `services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      DB_HOST: db
      DB_PASSWORD: $DB_PASSWORD
    depends_on:
      db:
        condition: service_healthy

  db:
    image: mysql:8
    environment:
      MYSQL_DATABASE: app
      MYSQL_ROOT_PASSWORD: $DB_PASSWORD
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 5s
      timeout: 3s
      retries: 10
    volumes:
      - db-data:/var/lib/mysql

volumes:
  db-data:`,
      },
      {
        label: ".env (not committed)",
        code: `DB_PASSWORD=<choose-a-strong-password>`,
      },
    ],
  },
];
