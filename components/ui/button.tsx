"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/lib/hooks";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref" | "style"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      magnetic = true,
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const magneticProps = useMagnetic({ distance: magnetic ? 15 : 0 });

    const variants = {
      primary:
        "bg-foreground text-background hover:bg-foreground/90 dark:bg-foreground dark:text-background",
      secondary:
        "border border-foreground/20 hover:border-foreground/40 hover:bg-foreground/5",
      ghost: "hover:bg-foreground/5",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg",
    };

    const baseClasses = cn(
      "inline-flex items-center justify-center rounded-[2px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 border border-transparent",
      variants[variant],
      sizes[size],
      variant === "secondary" && "border border-foreground/20",
      className
    );

    if (asChild) {
      const { style, ...slotProps } = props;
      return (
        <Slot className={baseClasses} style={style} {...(slotProps as React.ComponentPropsWithoutRef<typeof Slot>)}>
          {children}
        </Slot>
      );
    }

    const motionProps = {
      whileHover: { opacity: 0.85 },
      whileTap: { opacity: 0.75 },
      ...magneticProps.style,
    };

    if (magnetic) {
      return (
        <motion.button
          ref={magneticProps.ref as any}
          className={baseClasses}
          {...motionProps}
          {...props}
        >
          {children}
        </motion.button>
      );
    }

    const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;

    return (
      <button ref={ref} className={baseClasses} {...buttonProps}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
