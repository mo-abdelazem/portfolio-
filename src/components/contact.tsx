import { PERSONAL } from "@/lib/data";
import { Reveal } from "./reveal";

const LINKS = [
  { label: "Email", href: `mailto:${PERSONAL.email}` },
  { label: "GitHub", href: PERSONAL.github },
  { label: "WhatsApp", href: PERSONAL.whatsapp },
  { label: "LinkedIn", href: PERSONAL.linkedin },
] as const;

export function Contact() {
  return (
    <section id="contact" className="section section--centered" aria-labelledby="contact-heading">
      <div className="section__inner">
        <Reveal>
          <p className="section__label">Contact</p>
          <h2 id="contact-heading" className="section__title">
            Let&apos;s build together
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="contact__links">
            {LINKS.map((link) => (
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
