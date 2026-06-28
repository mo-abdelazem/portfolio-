import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex select-none items-center justify-center gap-2 rounded-full font-medium transition-[transform,opacity,box-shadow,background-color,color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:-translate-y-0.5 hover:opacity-90",
        outline:
          "bg-[var(--bg-warm)] text-foreground shadow-[var(--shadow-warm)] hover:-translate-y-0.5 hover:shadow-[rgba(78,50,23,0.07)_0px_8px_24px]",
        pill: "bg-card text-foreground shadow-[var(--shadow-elevated)] hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-none",
      },
      size: {
        default: "px-7 py-3 text-[15px]",
        sm: "px-[18px] py-2 text-sm",
        lg: "px-8 py-3.5 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
