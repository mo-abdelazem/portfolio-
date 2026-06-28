import { cn } from "@/lib/utils";

/** Surface card matching the portfolio elevation system. Set `interactive`
 *  for the lift-on-hover behaviour used by project/skill/detail cards. */
export function Card({
  className,
  interactive = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-xl)] bg-card text-card-foreground shadow-[var(--shadow-card)]",
        interactive &&
          "transition-[transform,box-shadow] duration-300 ease-[var(--ease-spring)] hover:-translate-y-[3px] hover:shadow-[var(--shadow-ring),rgba(0,0,0,0.04)_0px_4px_8px,rgba(0,0,0,0.03)_0px_12px_24px]",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-1.5", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-[22px] font-light leading-tight tracking-[-0.4px] text-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-base leading-[1.6] tracking-[0.16px] text-secondary-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props} />;
}
