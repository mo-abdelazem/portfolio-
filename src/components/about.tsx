import type { SiteContent } from "@/lib/types";
import { Reveal } from "./reveal";
import { Section, Container, SectionHeading } from "@/components/ui/section";
import { Card } from "@/components/ui/card";

interface AboutProps {
  content: SiteContent;
}

export function About({ content }: AboutProps) {
  return (
    <Section id="about" aria-labelledby="about-heading">
      <Container>
        <SectionHeading
          id="about-heading"
          label={content.sections.about.label}
          title={content.sections.about.title}
        />
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">
          <Reveal delay={100}>
            <p className="text-lg leading-[1.6] tracking-[0.18px] text-secondary-foreground">
              {content.personal.bio}
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-4">
            {content.details.map((detail, i) => (
              <Reveal key={detail.label} delay={150 + i * 75}>
                <Card interactive className="rounded-[var(--radius-lg)] p-5">
                  <span className="mb-1.5 block text-xs font-medium tracking-[0.14px] text-muted-foreground">
                    {detail.label}
                  </span>
                  <span className="text-[15px] font-medium tracking-[0.15px] text-foreground">
                    {detail.value}
                  </span>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
