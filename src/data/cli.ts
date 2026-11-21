import type { Text } from "@/lib/i18n";

export type CliTool = {
  slug: string;
  name: string;
  about: Text;
  check: string;
  help: string;
  flags: { use: string; what: Text }[];
  tip: Text;
};

export const cliTools: CliTool[] = [
  {
    slug: "git",
    name: "Git",
    about: [
      "Tracks every change to your code and lets a team work together.",
      "Suit chaque modification du code et permet à une équipe de travailler ensemble.",
    ],
    check: "git --version",
    help: "git help commit",
    flags: [
      {
        use: "git commit -m",
        what: ["Write the message on the command line", "Écrire le message en ligne de commande"],
      },
      {
        use: "git switch -c",
        what: ["Create a branch and move to it", "Créer une branche et s’y placer"],
      },
      {
        use: "git log --oneline",
        what: ["One short line per commit", "Une ligne courte par commit"],
      },
      {
        use: "git push -u",
        what: ["Remember where this branch is published", "Mémoriser où cette branche est publiée"],
      },
    ],
    tip: [
      "Run git status often. It tells you what to do next.",
      "Lancez souvent git status. Il vous dit quoi faire ensuite.",
    ],
  },
  {
    slug: "docker",
    name: "Docker",
    about: [
      "Builds images and runs them as containers.",
      "Construit des images et les exécute comme conteneurs.",
    ],
    check: "docker --version",
    help: "docker run --help",
    flags: [
      {
        use: "-p 8080:80",
        what: [
          "Map port 80 in the container to 8080 on your machine",
          "Relier le port 80 du conteneur au 8080 de votre machine",
        ],
      },
      { use: "-d", what: ["Run in the background", "Exécuter en arrière-plan"] },
      {
        use: "--rm",
        what: ["Delete the container when it stops", "Supprimer le conteneur à son arrêt"],
      },
      {
        use: "-v data:/var/lib/data",
        what: ["Keep data in a named volume", "Garder les données dans un volume nommé"],
      },
    ],
    tip: [
      "Tag images with a version so you always know what is running.",
      "Taguez les images avec une version pour toujours savoir ce qui tourne.",
    ],
  },
  {
    slug: "kubectl",
    name: "kubectl",
    about: [
      "Talks to a Kubernetes cluster: inspect, apply, scale and debug.",
      "Dialogue avec un cluster Kubernetes : inspecter, appliquer, mettre à l’échelle et déboguer.",
    ],
    check: "kubectl version --client",
    help: "kubectl get --help",
    flags: [
      {
        use: "-n my-namespace",
        what: ["Work in one namespace", "Travailler dans un seul namespace"],
      },
      {
        use: "-o yaml",
        what: ["Print the full object as YAML", "Afficher l’objet complet en YAML"],
      },
      { use: "-f file.yaml", what: ["Use a file as input", "Utiliser un fichier en entrée"] },
      {
        use: "--context kind-demo",
        what: ["Pick which cluster to talk to", "Choisir le cluster avec lequel dialoguer"],
      },
    ],
    tip: [
      "Check the context before you apply anything, so you never change the wrong cluster.",
      "Vérifiez le contexte avant d’appliquer, pour ne jamais modifier le mauvais cluster.",
    ],
  },
  {
    slug: "terraform",
    name: "Terraform",
    about: [
      "Creates and changes infrastructure from files.",
      "Crée et modifie l’infrastructure à partir de fichiers.",
    ],
    check: "terraform version",
    help: "terraform plan -help",
    flags: [
      {
        use: "init -upgrade",
        what: [
          "Download providers, taking newer allowed versions",
          "Télécharger les fournisseurs, en prenant les versions plus récentes autorisées",
        ],
      },
      {
        use: "plan -out=tfplan",
        what: ["Save the plan to a file", "Enregistrer le plan dans un fichier"],
      },
      {
        use: "apply tfplan",
        what: ["Apply exactly the plan you reviewed", "Appliquer exactement le plan relu"],
      },
      {
        use: '-var "name=demo"',
        what: ["Pass a value for a variable", "Passer une valeur pour une variable"],
      },
    ],
    tip: [
      "Always read the plan. Apply the saved plan, not a fresh guess.",
      "Lisez toujours le plan. Appliquez le plan enregistré, pas une nouvelle supposition.",
    ],
  },
  {
    slug: "aws",
    name: "AWS CLI",
    about: [
      "Controls AWS services from the terminal.",
      "Pilote les services AWS depuis le terminal.",
    ],
    check: "aws --version",
    help: "aws ec2 help",
    flags: [
      {
        use: "--profile work",
        what: ["Use a named set of credentials", "Utiliser un jeu d’identifiants nommé"],
      },
      { use: "--region eu-west-1", what: ["Choose the region", "Choisir la région"] },
      {
        use: "--output table",
        what: [
          "Print results as a readable table",
          "Afficher les résultats sous forme de tableau lisible",
        ],
      },
      {
        use: '--query "Reservations[].Instances[].InstanceId"',
        what: ["Keep only the fields you need", "Ne garder que les champs utiles"],
      },
    ],
    tip: [
      "Set a default profile and region once, then check them before every change.",
      "Définissez un profil et une région par défaut, puis vérifiez-les avant chaque changement.",
    ],
  },
  {
    slug: "npm",
    name: "npm",
    about: [
      "Installs packages and runs the scripts of a Node.js project.",
      "Installe des paquets et exécute les scripts d’un projet Node.js.",
    ],
    check: "npm --version",
    help: "npm help install",
    flags: [
      {
        use: "npm ci",
        what: [
          "Clean, repeatable install from the lockfile",
          "Installation propre et reproductible depuis le fichier de verrouillage",
        ],
      },
      {
        use: "--omit=dev",
        what: ["Skip development-only packages", "Ignorer les paquets réservés au développement"],
      },
      {
        use: "npm run <script>",
        what: ["Run a script from package.json", "Exécuter un script de package.json"],
      },
      {
        use: "npm audit",
        what: [
          "List known vulnerabilities in dependencies",
          "Lister les vulnérabilités connues des dépendances",
        ],
      },
    ],
    tip: [
      "Use npm ci in pipelines and npm install on your own machine.",
      "Utilisez npm ci dans les pipelines et npm install sur votre machine.",
    ],
  },
];
