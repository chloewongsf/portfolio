interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
}

export function Tag({ children, variant = "default" }: TagProps) {
  return (
    <span
      className="inline-block px-2 py-1 text-xs font-medium rounded"
      style={{
        backgroundColor: variant === "accent" ? "var(--accent)" : "var(--card)",
        color: variant === "accent" ? "var(--bg)" : "var(--muted)",
        border: variant === "default" ? "1px solid var(--border)" : "none",
      }}
    >
      {children}
    </span>
  );
}
