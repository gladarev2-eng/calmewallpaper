import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-xs font-extralight uppercase tracking-[0.15em] ring-offset-background transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent text-foreground border border-foreground hover:bg-foreground hover:text-background",
        destructive: "bg-transparent text-destructive border border-destructive hover:bg-destructive hover:text-destructive-foreground",
        outline: "bg-transparent text-foreground border border-foreground/30 hover:bg-foreground hover:text-background hover:border-foreground",
        secondary: "bg-transparent text-foreground border border-foreground/20 hover:bg-foreground hover:text-background",
        ghost: "bg-transparent hover:bg-foreground/5",
        link: "text-foreground underline-offset-4 hover:underline font-extralight",
      },
      size: {
        default: "h-12 px-10 py-4",
        sm: "h-10 px-6 py-3",
        lg: "h-14 px-12 py-5",
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
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };