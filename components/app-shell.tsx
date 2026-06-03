"use client";

export function AppShell({ children }: { children: React.ReactNode }) {
  // All pages use the new white/minimal aesthetic — no terminal shell
  return <>{children}</>;
}
