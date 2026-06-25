export const siteConfig = {
  name: "Northwise",
  tagline: "Direction over noise.",
  description:
    "Northwise builds strategic websites, landing pages and custom web platforms for businesses that need clarity, performance and growth. A web development studio in Northern Portugal.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://northwise.pt",
  locale: "en",
  email: process.env.CONTACT_TO_EMAIL ?? "hello@northwise.pt",
  location: "Northern Portugal",
  keywords: [
    "web development studio",
    "web design Portugal",
    "landing pages",
    "custom web platforms",
    "Next.js development",
    "SEO websites",
    "Northern Portugal web agency",
    "strategic websites",
  ],
  nav: [
    { label: "Solutions", href: "#solutions" },
    { label: "Process", href: "#process" },
    { label: "Care", href: "#care" },
    { label: "Thinking", href: "#thinking" },
    { label: "Start", href: "#start" },
  ],
  social: {
    linkedin: "https://www.linkedin.com/company/northwise",
    github: "https://github.com/northwise",
  },
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
