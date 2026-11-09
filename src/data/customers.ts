export type CustomerLogo = {
  name: string;
  title: string;
  slug: string;
  className: string;
};

// The tools shown in the ticker. Edit this list to match your real stack.
export const heroLogos: CustomerLogo[] = [
  { name: "Docker", title: "Docker", slug: "docker", className: "font-semibold tracking-tight" },
  {
    name: "Kubernetes",
    title: "Kubernetes",
    slug: "kubernetes",
    className: "font-medium tracking-wide",
  },
  {
    name: "TERRAFORM",
    title: "Terraform",
    slug: "terraform",
    className: "font-bold tracking-[0.18em]",
  },
  {
    name: "GitHub Actions",
    title: "GitHub Actions",
    slug: "github-actions",
    className: "font-semibold tracking-tight",
  },
  {
    name: "Prometheus",
    title: "Prometheus",
    slug: "prometheus",
    className: "font-light tracking-wider",
  },
  {
    name: "Grafana",
    title: "Grafana",
    slug: "grafana",
    className: "font-bold italic tracking-tight",
  },
  {
    name: "ANSIBLE",
    title: "Ansible",
    slug: "ansible",
    className: "font-extrabold tracking-widest",
  },
  { name: "Linux", title: "Linux", slug: "linux", className: "font-medium tracking-tighter" },
  { name: "AWS", title: "AWS", slug: "aws", className: "font-extrabold tracking-wide" },
  { name: "Python", title: "Python", slug: "python", className: "font-semibold tracking-tight" },
  { name: "Helm", title: "Helm", slug: "helm", className: "font-light tracking-[0.2em]" },
  { name: "Git", title: "Git", slug: "git", className: "font-bold tracking-tight" },
];

export const customerHref = (slug: string) => `/stack/${slug}`;
