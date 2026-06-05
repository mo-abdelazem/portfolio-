export interface Personal {
  readonly name: string;
  readonly title: string;
  readonly email: string;
  readonly phone: string;
  readonly location: string;
  readonly github: string;
  readonly linkedin: string;
  readonly whatsapp: string;
  readonly bio: string;
  readonly heroHeadline: string;
  readonly heroDescription: string;
}

export interface Experience {
  readonly role: string;
  readonly company: string;
  readonly period: string;
  readonly location: string;
  readonly bullets: readonly string[];
}

export interface Project {
  readonly name: string;
  readonly period: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly url: string;
}

export interface Education {
  readonly school: string;
  readonly degree: string;
  readonly period: string;
  readonly location: string;
}

export type Skills = Record<string, readonly string[]>;

export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export type Locale = "en" | "ar";

export interface RoadmapTopic {
  readonly key: string;
  readonly title: string;
}

export interface RoadmapSection {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly topics: readonly RoadmapTopic[];
}

export interface RoadmapCategory {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly sections: readonly RoadmapSection[];
}

export interface Detail {
  readonly label: string;
  readonly value: string;
}

export interface SiteCopy {
  readonly skipLink: string;
  readonly heroPrimaryCta: string;
  readonly heroSecondaryCta: string;
  readonly scrollLabel: string;
  readonly navCta: string;
  readonly navAriaLabel: string;
  readonly navOpenLabel: string;
  readonly navCloseLabel: string;
  readonly navTopLabel: string;
  readonly navMenuLabel: string;
  readonly languageSwitchLabel: string;
  readonly themeToggleLabel: string;
  readonly sectionNavLabel: string;
  readonly externalProjectLabel: string;
  readonly footerRights: string;
  readonly contactHeading: string;
  readonly contactLabel: string;
}

export interface SectionCopy {
  readonly label: string;
  readonly title: string;
}

export interface SiteContent {
  readonly locale: Locale;
  readonly dir: "ltr" | "rtl";
  readonly personal: Personal;
  readonly navLinks: readonly NavLink[];
  readonly details: readonly Detail[];
  readonly skills: Skills;
  readonly experience: readonly Experience[];
  readonly projects: readonly Project[];
  readonly education: readonly Education[];
  readonly sections: {
    readonly about: SectionCopy;
    readonly skills: SectionCopy;
    readonly experience: SectionCopy;
    readonly projects: SectionCopy;
    readonly education: SectionCopy;
  };
  readonly copy: SiteCopy;
}
