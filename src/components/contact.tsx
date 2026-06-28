import type { SiteContent } from "@/lib/types";
import { Reveal } from "./reveal";
import { Section, Container } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ContactProps {
  content: SiteContent;
}

export function Contact({ content }: ContactProps) {
  const links = [
    { label: "Email", href: `mailto:${content.personal.email}` },
    { label: "GitHub", href: content.personal.github },
    { label: "WhatsApp", href: content.personal.whatsapp },
    { label: "LinkedIn", href: content.personal.linkedin },
  ] as const;

  return (
    <Section id="contact" centered aria-labelledby="contact-heading">
      <Container>
        <Reveal>
          <p className="mb-2.5 text-[13px] font-medium tracking-[0.14px] text-muted-foreground">
            {content.copy.contactLabel}
          </p>
          <h2
            id="contact-heading"
            className="mb-12 text-[clamp(32px,5vw,48px)] font-light leading-[1.08] tracking-[-0.96px] text-foreground"
          >
            {content.copy.contactHeading}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="flex flex-wrap justify-center gap-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={cn(buttonVariants({ variant: "pill" }))}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
