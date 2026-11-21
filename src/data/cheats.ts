import type { Text } from "@/lib/i18n";

export type Cheat = { cmd: string; what: Text };
export type CheatSheet = { slug: string; name: string; items: Cheat[] };

export const cheatSheets: CheatSheet[] = [
  {
    slug: "git",
    name: "Git",
    items: [
      { cmd: "git status", what: ["See what changed", "Voir ce qui a changé"] },
      {
        cmd: "git switch -c my-branch",
        what: ["Create and move to a new branch", "Créer une branche et s’y placer"],
      },
      { cmd: "git add .", what: ["Stage all changes", "Préparer tous les changements"] },
      {
        cmd: 'git commit -m "message"',
        what: [
          "Save the staged changes with a message",
          "Enregistrer les changements préparés avec un message",
        ],
      },
      {
        cmd: "git push -u origin my-branch",
        what: ["Publish a branch for the first time", "Publier une branche pour la première fois"],
      },
      {
        cmd: "git pull",
        what: [
          "Get the latest changes from the remote",
          "Récupérer les derniers changements du dépôt distant",
        ],
      },
      {
        cmd: "git log --oneline -5",
        what: [
          "Show the last five commits briefly",
          "Afficher brièvement les cinq derniers commits",
        ],
      },
      {
        cmd: "git stash",
        what: ["Put unfinished work aside", "Mettre de côté un travail non terminé"],
      },
      {
        cmd: "git diff",
        what: ["See the exact lines that changed", "Voir les lignes exactes qui ont changé"],
      },
      {
        cmd: "git restore file.txt",
        what: ["Throw away changes to one file", "Annuler les changements d’un fichier"],
      },
    ],
  },
  {
    slug: "docker",
    name: "Docker",
    items: [
      {
        cmd: "docker build -t app:1.0.0 .",
        what: ["Build an image and tag it", "Construire une image et la taguer"],
      },
      {
        cmd: "docker run --rm -p 3000:3000 app:1.0.0",
        what: ["Run a container and map a port", "Lancer un conteneur et relier un port"],
      },
      { cmd: "docker ps", what: ["List running containers", "Lister les conteneurs en cours"] },
      {
        cmd: "docker logs -f <container>",
        what: ["Follow a container’s logs", "Suivre les logs d’un conteneur"],
      },
      {
        cmd: "docker exec -it <container> sh",
        what: ["Open a shell inside a container", "Ouvrir un shell dans un conteneur"],
      },
      { cmd: "docker stop <container>", what: ["Stop a container", "Arrêter un conteneur"] },
      { cmd: "docker images", what: ["List local images", "Lister les images locales"] },
      {
        cmd: "docker compose up -d --build",
        what: ["Build and start a Compose stack", "Construire et démarrer une pile Compose"],
      },
      {
        cmd: "docker compose down",
        what: ["Stop and remove the stack", "Arrêter et supprimer la pile"],
      },
      {
        cmd: "docker system prune",
        what: ["Remove unused containers and images", "Supprimer conteneurs et images inutilisés"],
      },
    ],
  },
  {
    slug: "kubectl",
    name: "kubectl",
    items: [
      { cmd: "kubectl get pods", what: ["List pods", "Lister les pods"] },
      {
        cmd: "kubectl get all",
        what: [
          "List the main objects in a namespace",
          "Lister les objets principaux d’un namespace",
        ],
      },
      {
        cmd: "kubectl describe pod <pod>",
        what: [
          "Show details and recent events of a pod",
          "Afficher les détails et événements récents d’un pod",
        ],
      },
      {
        cmd: "kubectl logs deploy/web",
        what: ["Read the logs of a deployment", "Lire les logs d’un deployment"],
      },
      {
        cmd: "kubectl apply -f file.yaml",
        what: [
          "Create or update objects from a file",
          "Créer ou mettre à jour des objets depuis un fichier",
        ],
      },
      {
        cmd: "kubectl scale deploy/web --replicas=3",
        what: ["Change the number of copies", "Changer le nombre de copies"],
      },
      {
        cmd: "kubectl rollout status deploy/web",
        what: ["Watch an update progress", "Suivre l’avancement d’une mise à jour"],
      },
      {
        cmd: "kubectl rollout undo deploy/web",
        what: ["Go back to the previous version", "Revenir à la version précédente"],
      },
      {
        cmd: "kubectl port-forward service/web 8080:80",
        what: ["Reach a service from your machine", "Joindre un service depuis votre machine"],
      },
      {
        cmd: "kubectl config get-contexts",
        what: [
          "See which clusters you can talk to",
          "Voir avec quels clusters vous pouvez communiquer",
        ],
      },
    ],
  },
  {
    slug: "linux",
    name: "Linux",
    items: [
      {
        cmd: "ls -la",
        what: [
          "List files with details, including hidden ones",
          "Lister les fichiers avec détails, y compris cachés",
        ],
      },
      { cmd: "df -h", what: ["Check free disk space", "Vérifier l’espace disque libre"] },
      { cmd: "free -h", what: ["Check memory use", "Vérifier l’utilisation de la mémoire"] },
      {
        cmd: "ss -ltnp",
        what: [
          "See which programs listen on which ports",
          "Voir quels programmes écoutent sur quels ports",
        ],
      },
      {
        cmd: "tail -f /var/log/syslog",
        what: ["Follow a log file live", "Suivre un fichier de log en direct"],
      },
      {
        cmd: "journalctl -u nginx -n 50",
        what: ["Last 50 log lines of a service", "50 dernières lignes de log d’un service"],
      },
      {
        cmd: "systemctl status nginx",
        what: ["Check whether a service is running", "Vérifier si un service tourne"],
      },
      { cmd: "systemctl restart nginx", what: ["Restart a service", "Redémarrer un service"] },
      {
        cmd: 'grep -rn "text" .',
        what: [
          "Search for text in all files below here",
          "Chercher du texte dans tous les fichiers d’ici",
        ],
      },
      {
        cmd: "curl -fsS http://localhost:3000/health",
        what: ["Call a URL and fail on errors", "Appeler une URL et échouer en cas d’erreur"],
      },
    ],
  },
];
