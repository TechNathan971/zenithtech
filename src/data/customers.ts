export type CustomerLogo = {
  name: string;
  title: string;
  slug: string;
  className: string;
};

// The tools shown in the ticker, taken from your daily tools and projects.
export const heroLogos: CustomerLogo[] = [
  { name: "Docker", title: "Docker", slug: "docker", className: "font-semibold tracking-tight" },
  {
    name: "Kubernetes",
    title: "Kubernetes",
    slug: "kubernetes",
    className: "font-medium tracking-wide",
  },
  { name: "AWS EC2", title: "AWS EC2", slug: "aws-ec2", className: "font-extrabold tracking-wide" },
  { name: "GitHub", title: "GitHub", slug: "github", className: "font-bold tracking-tight" },
  {
    name: "GitLab",
    title: "GitLab",
    slug: "gitlab",
    className: "font-semibold italic tracking-tight",
  },
  {
    name: "GitHub Actions",
    title: "GitHub Actions",
    slug: "github-actions",
    className: "font-semibold tracking-tight",
  },
  { name: "Jenkins", title: "Jenkins", slug: "jenkins", className: "font-medium tracking-wider" },
  {
    name: "SonarQube",
    title: "SonarQube",
    slug: "sonarqube",
    className: "font-bold tracking-tight",
  },
  { name: "NEXUS", title: "Nexus", slug: "nexus", className: "font-extrabold tracking-[0.2em]" },
  { name: "NGINX", title: "NGINX", slug: "nginx", className: "font-bold tracking-[0.15em]" },
  { name: "Tomcat", title: "Tomcat", slug: "tomcat", className: "font-light tracking-wide" },
  { name: "PHP", title: "PHP", slug: "php", className: "font-extrabold tracking-wide" },
  { name: "MySQL", title: "MySQL", slug: "mysql", className: "font-semibold tracking-tight" },
  { name: "React", title: "React", slug: "react", className: "font-medium tracking-tighter" },
  { name: "Node.js", title: "Node.js", slug: "nodejs", className: "font-semibold tracking-tight" },
  {
    name: "Tailwind CSS",
    title: "Tailwind CSS",
    slug: "tailwind-css",
    className: "font-medium tracking-tight",
  },
  {
    name: "ExpressVPN",
    title: "ExpressVPN",
    slug: "expressvpn",
    className: "font-light tracking-wider",
  },
];

export const customerHref = (slug: string) => `/stack/${slug}`;
