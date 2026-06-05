import type { SiteContent } from "@/lib/types";
import { SectionNav } from "@/components/section-nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Education } from "@/components/education";
import { Contact } from "@/components/contact";

interface HomePageProps {
  content: SiteContent;
}

export function HomePage({ content }: HomePageProps) {
  return (
    <div lang={content.locale} dir={content.dir}>
      <SectionNav
        navLinks={content.navLinks}
        label={content.copy.sectionNavLabel}
      />
      <main id="main">
        <Hero content={content} />
        <About content={content} />
        <Skills skills={content.skills} section={content.sections.skills} />
        <Experience content={content} />
        <Projects content={content} />
        <Education content={content} />
        <Contact content={content} />
      </main>
    </div>
  );
}
