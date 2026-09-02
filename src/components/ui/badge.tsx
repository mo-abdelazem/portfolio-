import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full font-mono text-[12px] font-medium tracking-[0.14px]",
  {
    variants: {
      variant: {
        secondary:
          "bg-secondary px-3.5 py-1.5 text-secondary-foreground shadow-inset",
        solid: "bg-primary px-3.5 py-1.5 text-primary-foreground",
        outline:
          "px-3.5 py-1.5 text-muted-foreground shadow-ring",
      },
    },
    defaultVariants: { variant: "secondary" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
