import type { Personal, Skills, Experience, Project, Education, NavLink } from "./types";

export const PERSONAL = {
  name: "Mohamed Abdelazem",
  title: "Frontend Developer",
  email: "hello@mohamed.work",
  phone: "01281235865",
  location: "Damietta, Egypt",
  github: "https://github.com/mo-abdelazem",
  linkedin: "https://linkedin.com/in/mo-abdelazem",
  whatsapp: "https://wa.me/201281235865",
  bio: "Frontend Developer with production experience in React and Vue, focused on performance optimization. Skilled in TypeScript, accessible design, and building multilingual interfaces with full RTL/LTR support.",
  heroHeadline: "Building performant web experiences",
  heroDescription:
    "React & Vue developer focused on performance optimization, TypeScript, accessible design, and full RTL/LTR internationalization support.",
} as const satisfies Personal;

export const SKILLS = {
  Languages: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"],
  Frameworks: ["React.js", "Next.js", "Vue.js", "Nuxt.js"],
  "Styling & UI": [
    "Tailwind CSS",
    "Shadcn/ui",
    "Material UI",
    "Chakra UI",
    "SASS/LESS",
    "Framer Motion",
  ],
  "State & Data": [
    "Redux Toolkit",
    "Pinia",
    "Context API",
    "TanStack Query",
    "REST APIs",
  ],
  Testing: ["Jest", "React Testing Library", "Cypress"],
  "Tools & DevOps": [
    "Git",
    "GitHub Actions",
    "Vercel",
    "Docker",
    "Figma",
  ],
  "E-commerce & CMS": [
    "WordPress",
    "Shopify",
    "Salla",
    "Zid",
  ],
  Practices: [
    "i18n/RTL",
    "SEO",
    "Core Web Vitals",
    "Accessibility",
    "Agile/Scrum",
  ],
} as const satisfies Skills;

export const EXPERIENCE = [
  {
    role: "Frontend Web Developer",
    company: "TAG Creative Hub",
    period: "02/2025 – 01/2026",
    location: "Mansoura",
    bullets: [
      "Translated Figma prototypes into pixel-perfect accessible interfaces",
      "Architected high-converting landing pages with React.js, TypeScript, Tailwind CSS",
      "Optimized e-commerce frontend themes improving load times by 40%",
    ],
  },
  {
    role: "IoT Instructor",
    company: "SpimeSenseLabs, ITI",
    period: "07/2024 – 01/2025",
    location: "ITI branches",
    bullets: [
      "Delivered IoT training to undergraduate students",
      "Mentored students through hands-on projects",
    ],
  },
] as const satisfies readonly Experience[];

export const PROJECTS = [
  {
    name: "Argatall — WhatsApp Notification System",
    period: "02/2026 – Present",
    description:
      "WhatsApp bulk notification system with campaign/contact/task management, RBAC, bilingual support.",
    tags: ["Next.js 16", "React 19", "WaSender API"],
    url: "http://argatall.cloud/",
  },
  {
    name: "Emtethal — SaaS Compliance Platform",
    period: "11/2025 – 12/2025",
    description:
      "90–95 Lighthouse via SSR/SSG, full i18n RTL/LTR, performant scroll animations.",
    tags: ["Next.js", "Framer Motion", "i18n"],
    url: "https://www.emtethal.com/",
  },
  {
    name: "Napeeh — Educational Challenge Platform",
    period: "10/2025 – 12/2025",
    description:
      "Exams, quizzes, real-time tracking, adaptive difficulty, bilingual.",
    tags: ["Nuxt.js", "SSR", "i18n"],
    url: "https://www.napeeh.net/",
  },
] as const satisfies readonly Project[];

export const EDUCATION = [
  {
    school: "ITI/MCIT",
    degree: "9-Month Diploma, Open Source Applications Development",
    period: "10/2023 – 06/2024",
    location: "Mansoura",
  },
  {
    school: "Al-Azhar University",
    degree: "Bachelor of Commerce, Accounting and Finance",
    period: "2016 – 2020",
    location: "Cairo",
  },
] as const satisfies readonly Education[];

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const satisfies readonly NavLink[];
