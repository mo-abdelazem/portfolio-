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
