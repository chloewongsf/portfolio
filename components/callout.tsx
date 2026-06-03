import { ReactNode } from "react";

interface CalloutProps {
  children: ReactNode;
  title?: string;
}

export function Callout({ children, title }: CalloutProps) {
  return (
    <div
      className="p-4"
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--accent)",
        borderRadius: "var(--radius)",
        borderLeft: "4px solid var(--accent)",
      }}
    >
      {title && (
        <h4 className="font-medium mb-2" style={{ color: "var(--accent)" }}>
          {title}
        </h4>
      )}
      <div style={{ color: "var(--fg)" }}>{children}</div>
    </div>
  );
}
