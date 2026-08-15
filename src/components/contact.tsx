import type { SiteContent } from "@/lib/types";
import { Reveal } from "./reveal";
import { Section, Container } from "@/components/ui/section";

interface ContactProps {
  content: SiteContent;
}

function EmailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Contact({ content }: ContactProps) {
  const links = [
    {
      label: "Email",
      command: "email --send",
      href: `mailto:${content.personal.email}`,
      icon: <EmailIcon />,
      external: false,
    },
    {
      label: "GitHub",
      command: "github --open",
      href: content.personal.github,
      icon: <GitHubIcon />,
      external: true,
    },
    {
      label: "WhatsApp",
      command: "whatsapp --connect",
      href: content.personal.whatsapp,
      icon: <WhatsAppIcon />,
      external: true,
    },
    {
      label: "LinkedIn",
      command: "linkedin --open",
      href: content.personal.linkedin,
      icon: <LinkedInIcon />,
      external: true,
    },
  ];

  return (
    <Section id="contact" aria-labelledby="contact-heading">
      <Container>
        <Reveal>
          <div className="relative rounded-[var(--radius-xl)] border border-[var(--border)] bg-card overflow-hidden">
            {/* Top terminal bar */}
            <div className="flex items-center gap-2 border-b border-[var(--border)] px-6 py-3 bg-[rgba(0,0,0,0.2)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[rgba(255,255,255,0.15)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[rgba(255,255,255,0.15)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[rgba(183,255,114,0.5)]" />
              <span className="ms-3 font-mono text-[11px] text-muted-foreground">contact.sh</span>
              <div className="ms-auto flex items-center gap-1.5 font-mono text-[11px] text-[var(--accent)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                </span>
                ONLINE
              </div>
            </div>

            {/* Body */}
            <div className="px-8 py-12 md:px-14 md:py-16">
              <Reveal delay={100}>
                <p className="mb-3 font-mono text-[11px] text-muted-foreground uppercase tracking-widest">
                  {content.copy.contactLabel}
                </p>
                <h2
                  id="contact-heading"
                  className="mb-10 text-[clamp(28px,4vw,48px)] font-light leading-[1.08] tracking-[-0.96px] text-foreground max-w-[600px]"
                >
                  {content.copy.contactHeading}
                </h2>
              </Reveal>

              <Reveal delay={200}>
                <div className="flex flex-wrap gap-3">
                  {links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="group inline-flex items-center gap-2.5 rounded-lg border border-[var(--border)] bg-[rgba(0,0,0,0.2)] px-4 py-2.5 font-mono text-sm text-secondary-foreground transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[rgba(183,255,114,0.06)] hover:shadow-[0_0_16px_rgba(183,255,114,0.15)]"
                    >
                      <span className="text-[var(--accent)] opacity-60 group-hover:opacity-100 transition-opacity select-none">&gt;</span>
                      <span className="text-muted-foreground group-hover:text-[var(--accent)] transition-colors">{link.icon}</span>
                      <span>{link.command}</span>
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Background grid decoration */}
            <div
              className="pointer-events-none absolute bottom-0 end-0 h-48 w-48 opacity-[0.06]"
              style={{
                backgroundImage: "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                maskImage: "radial-gradient(circle at 100% 100%, black, transparent 70%)",
                WebkitMaskImage: "radial-gradient(circle at 100% 100%, black, transparent 70%)",
              }}
            />
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
