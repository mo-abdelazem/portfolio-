import type { SiteContent } from "@/lib/types";

interface FooterProps {
  content: SiteContent;
}

export function Footer({ content }: FooterProps) {
  return (
    <footer className="w-full border-t border-white/5 bg-[#050706] py-10 px-(--px)">
      <div className="mx-auto flex max-w-(--max-width) flex-col items-center justify-between gap-4 font-mono text-xs text-muted-foreground sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="font-bold text-foreground">[MA]</span>
          <span className="opacity-30">/</span>
          <span>{content.personal.name}</span>
        </div>
        
        <p className="text-center">
          &copy; {new Date().getFullYear()} {content.personal.name}. {content.copy.footerRights}
        </p>

        <div className="flex items-center gap-2 text-(--accent)">
          <span className="h-1.5 w-1.5 rounded-full bg-(--accent)" />
          <span>ALL SYSTEMS NOMINAL</span>
        </div>
      </div>
    </footer>
  );
}
