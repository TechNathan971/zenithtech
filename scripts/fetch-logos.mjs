/* eslint-disable no-undef */
// Downloads each tool's logo once into public/logos, so the site never depends on
// a third-party server at runtime. The logos come from the free Simple Icons collection.
// Logos are trademarks of their owners and are shown only to indicate the tools I use.
import { mkdir, writeFile } from "node:fs/promises";

const logos = [
  { file: "docker", slugs: ["docker"] },
  { file: "kubernetes", slugs: ["kubernetes"] },
  { file: "aws-ec2", slugs: ["amazonec2", "amazonaws"] },
  { file: "github", slugs: ["github"] },
  { file: "gitlab", slugs: ["gitlab"] },
  { file: "github-actions", slugs: ["githubactions"] },
  { file: "jenkins", slugs: ["jenkins"] },
  { file: "sonarqube", slugs: ["sonarqubeserver", "sonarqube", "sonarqubecloud"] },
  { file: "nexus", slugs: ["sonatype"] },
  { file: "nginx", slugs: ["nginx"] },
  { file: "tomcat", slugs: ["apachetomcat"] },
  { file: "php", slugs: ["php"] },
  { file: "mysql", slugs: ["mysql"] },
  { file: "react", slugs: ["react"] },
  { file: "nodejs", slugs: ["nodedotjs"] },
  { file: "tailwind-css", slugs: ["tailwindcss"] },
  { file: "expressvpn", slugs: ["expressvpn"] },
];

await mkdir("public/logos", { recursive: true });

let missing = 0;
for (const logo of logos) {
  let saved = false;
  for (const slug of logo.slugs) {
    try {
      const response = await fetch(`https://cdn.simpleicons.org/${slug}`);
      if (!response.ok) continue;
      const svg = await response.text();
      if (!svg.includes("<svg")) continue;
      await writeFile(`public/logos/${logo.file}.svg`, svg);
      console.log(`✓ ${logo.file}`);
      saved = true;
      break;
    } catch {
      // network hiccup: try the next name
    }
  }
  if (!saved) {
    missing += 1;
    console.log(`✗ ${logo.file}: not found, the site will show its name instead`);
  }
}

console.log(missing === 0 ? "\nAll logos downloaded." : `\n${missing} logo(s) missing.`);
