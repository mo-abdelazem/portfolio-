import type { SiteContent } from "@/lib/types";
import { Reveal } from "./reveal";

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
    <section id="contact" className="section section--centered" aria-labelledby="contact-heading">
      <div className="section__inner">
        <Reveal>
          <p className="section__label">{content.copy.contactLabel}</p>
          <h2 id="contact-heading" className="section__title">
            {content.copy.contactHeading}
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="contact__links">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="contact__pill"
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
