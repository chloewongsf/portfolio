import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  type = "button",
}: ButtonProps) {
  const baseStyles = "inline-block px-4 py-2 text-sm font-medium rounded transition-all";

  const variantStyles =
    variant === "primary"
      ? {
          backgroundColor: "var(--accent)",
          color: "var(--bg)",
          border: "none",
        }
      : {
          backgroundColor: "transparent",
          color: "var(--fg)",
          border: "1px solid var(--border)",
        };

  if (href) {
    return (
      <Link href={href} className={baseStyles} style={variantStyles}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseStyles} style={variantStyles}>
      {children}
    </button>
  );
}
