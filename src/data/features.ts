export type FeatureId =
  "pipelines" | "containers" | "iac" | "observability" | "security" | "automation";

export type Feature = {
  id: FeatureId;
  title: string;
  href: string;
  short: string; // shown on the tile
  summary: string; // shown in the pop-up
  bullets: string[];
  tags: string[];
  cta: string;
  surface: string; // gradient behind the mockup
  span: string; // grid columns on large screens
  split?: boolean; // text on the left, mockup on the right
};

export const features: Feature[] = [
  {
    id: "pipelines",
    title: "Pipelines that ship code safely and often",
    href: "/topics/pipelines",
    short:
      "Build, test, scan and deploy on every push, so shipping becomes routine instead of an event.",
    summary:
      "Continuous integration and delivery is where DevOps pays off. I build pipelines that run the tests, check for problems and deploy automatically, with a clear record of what changed, who approved it and where it went.",
    bullets: [
      "Every push is built, tested and scanned automatically",
      "Environments promoted step by step, with approvals where they matter",
      "Failures reported where developers already work",
    ],
    tags: ["GitHub Actions", "Docker", "Git"],
    cta: "Read about pipelines",
    surface: "bg-linear-to-br from-orange-100 via-coral-400/40 to-pink-300",
    span: "lg:col-span-4",
  },
  {
    id: "containers",
    title: "Containers and Kubernetes, from laptop to cluster",
    href: "/topics/containers",
    short:
      "Package an app once, run it anywhere, and let the cluster scale it up and down as demand changes.",
    summary:
      "Containers make software behave the same on every machine, and Kubernetes keeps it running at scale. This is about small reproducible images, safe rollouts, health checks and autoscaling that responds to real load.",
    bullets: [
      "Small, reproducible images with pinned versions",
      "Rolling updates, health checks and automatic recovery",
      "Local clusters for testing before anything goes live",
    ],
    tags: ["Docker", "Kubernetes", "Helm"],
    cta: "Read about containers",
    surface: "bg-linear-to-br from-brand-100 via-violet-200 to-pink-200",
    span: "lg:col-span-2",
  },
  {
    id: "iac",
    title: "Infrastructure as code you can review and repeat",
    href: "/topics/infrastructure-as-code",
    short:
      "Describe servers, networks and clusters in files, review the changes like any other code, then apply them the same way every time.",
    summary:
      "When infrastructure lives in version control, changes get reviewed, history is kept and environments stop drifting apart. I use plan-before-apply workflows so surprises show up early, with reusable modules for the pieces every project needs.",
    bullets: [
      "A plan step that shows exactly what will change",
      "Reusable modules for networks, clusters and storage",
      "State and secrets handled safely",
    ],
    tags: ["Terraform", "Ansible", "Git"],
    cta: "Read about infrastructure as code",
    surface: "bg-linear-to-br from-violet-300 via-brand-300 to-brand-500",
    span: "lg:col-span-6",
    split: true,
  },
  {
    id: "observability",
    title: "Observability: know how your systems are doing",
    href: "/topics/observability",
    short:
      "Metrics, logs and traces turn guessing into knowing, and good alerts tell you before your users do.",
    summary:
      "You cannot fix what you cannot see. This covers dashboards built around what users actually feel, alerts that are worth waking up for, and the habit of writing short post-incident notes so the same problem doesn't return.",
    bullets: [
      "Dashboards built around user experience",
      "Alerts that are actionable, not noisy",
      "Post-incident reviews that improve the system",
    ],
    tags: ["Prometheus", "Grafana", "OpenTelemetry"],
    cta: "Read about observability",
    surface: "bg-linear-to-br from-pink-100 via-white to-violet-100",
    span: "lg:col-span-2",
  },
  {
    id: "security",
    title: "Security built into every step",
    href: "/topics/security",
    short:
      "Catch leaked secrets, vulnerable packages and risky settings while the code is still being written.",
    summary:
      "Security works best when it is part of the pipeline, not a review at the end. Automated checks flag problems on every pull request, so fixing them is cheap and nothing risky reaches production unnoticed.",
    bullets: [
      "Secret and dependency scanning on every pull request",
      "Container images checked before they ship",
      "Least-privilege access by default",
    ],
    tags: ["Trivy", "Dependabot", "OPA"],
    cta: "Read about security",
    surface: "bg-linear-to-br from-pink-200 via-fuchsia-300 to-violet-300",
    span: "lg:col-span-2",
  },
  {
    id: "automation",
    title: "Automate the boring parts",
    href: "/topics/automation",
    short:
      "Scripts and scheduled jobs that handle repetitive work, so time goes to the problems that need a person.",
    summary:
      "Patching, backups, clean-ups and reports should not depend on someone remembering. Good automation is idempotent, safe to re-run, and tells you when something needs attention.",
    bullets: [
      "Patching, backups and clean-ups on a schedule",
      "Idempotent scripts that are safe to re-run",
      "Notifications when something needs a human",
    ],
    tags: ["Bash", "Python", "PowerShell"],
    cta: "Read about automation",
    surface: "bg-linear-to-br from-brand-50 via-brand-100 to-violet-200",
    span: "lg:col-span-2",
  },
];
