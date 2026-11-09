const env = (value: string | undefined, fallback: string) =>
  value && value.trim() ? value.trim() : fallback;

// Values come from .env.local. The fallbacks below are only placeholders.
export const profile = {
  name: env(process.env.NEXT_PUBLIC_OWNER_NAME, "Gamse Nathanael Nwana"),
  role: env(process.env.NEXT_PUBLIC_OWNER_ROLE, "DevOps Engineer"),
  email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL, "gamsenathanae4@gmail.com"),
  phone: env(process.env.NEXT_PUBLIC_CONTACT_PHONE, "(+237) 650 070 387"),
  github: env(process.env.NEXT_PUBLIC_GITHUB_URL, "https://github.com/your-username"),
  linkedin: env(
    process.env.NEXT_PUBLIC_LINKEDIN_URL,
    "https://www.linkedin.com/in/gamse-nwan-924928360/",
  ),
};
