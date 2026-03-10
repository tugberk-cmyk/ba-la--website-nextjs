"use client"

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/* Stripe-identical button kit */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold ring-offset-background transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /* Stripe primary — filled indigo/violet, subtle shadow, slight lift on hover */
        default:
          "bg-primary text-primary-foreground rounded-[4px] hover:bg-[hsl(243,80%,55%)] active:scale-[0.98] shadow-[0_2px_8px_hsl(243_80%_62%/0.30)] hover:shadow-[0_4px_16px_hsl(243_80%_62%/0.40)]",
        /* Stripe destructive */
        destructive:
          "bg-destructive text-destructive-foreground rounded-[4px] hover:bg-destructive/90 active:scale-[0.98]",
        /* Stripe outline — clean border, no fill, dark text */
        outline:
          "border border-border bg-background text-foreground rounded-[4px] hover:bg-muted active:scale-[0.98]",
        /* Stripe secondary — muted fill */
        secondary:
          "bg-secondary text-secondary-foreground rounded-[4px] hover:bg-secondary/80 active:scale-[0.98]",
        /* Ghost */
        ghost:
          "hover:bg-muted text-foreground rounded-[4px] active:scale-[0.98]",
        /* Link */
        link: "text-primary underline-offset-4 hover:underline",
        /* Stripe white (used on dark/colored backgrounds) */
        white:
          "bg-white text-[hsl(243,80%,52%)] rounded-[4px] hover:bg-white/90 active:scale-[0.98] font-semibold shadow-sm",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-8 px-3.5 py-1.5 text-xs",
        lg: "h-12 px-7 py-3 text-base",
        xl: "h-14 px-9 py-4 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
