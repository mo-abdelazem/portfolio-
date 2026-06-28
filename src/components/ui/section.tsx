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
        "px-[var(--px)] py-[var(--section-py)]",
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
      className={cn("mx-auto w-full max-w-[var(--max-width)]", className)}
      {...props}
    />
  );
}

/** Eyebrow label + section title, wrapped in a single reveal. */
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
      <p className="mb-2.5 text-[13px] font-medium tracking-[0.14px] text-muted-foreground">
        {label}
      </p>
      <h2
        id={id}
        className="mb-12 text-[clamp(32px,5vw,48px)] font-light leading-[1.08] tracking-[-0.96px] text-foreground"
      >
        {title}
      </h2>
    </Reveal>
  );
}
