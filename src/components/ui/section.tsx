import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

/** Full-width page section with the shared vertical rhythm. */
export function Section({
  className,
  centered = false,
  ...props
}: React.HTMLAttributes<HTMLElement> & { centered?: boolean }) {
  return (
    <section
      className={cn(
        "px-(--px) py-(--section-py) relative",
        centered && "text-center",
        className,
      )}
      {...props}
    />
  );
}

/** Constrains content to the site reading width. */
export function Container({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-(--max-width)", className)}
      {...props}
    />
  );
}

/** Eyebrow label + section title, wrapped in a single reveal with cyber typography. */
export function SectionHeading({
  label,
  title,
  id,
}: {
  label: string;
  title: string;
  id?: string;
}) {
  return (
    <Reveal>
      <div className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-(--accent)">
        <span className="opacity-40">{"//"}</span>
        <span>{label}</span>
      </div>
      <h2
        id={id}
        className="mb-12 text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-foreground"
      >
        {title}
      </h2>
    </Reveal>
  );
}
