import type { SiteContent } from "@/lib/types";

interface FooterProps {
  content: SiteContent;
}

export function Footer({ content }: FooterProps) {
  return (
    <footer className="footer">
      <p className="footer__text">
        &copy; {new Date().getFullYear()} {content.personal.name}. {content.copy.footerRights}
      </p>
    </footer>
  );
}
