"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/theme-context";
import { FontGlitchText } from "@/components/font-glitch-text";

const terminalNavItems = [
  { href: "/", label: "~/" },
  { href: "/work", label: "work/" },
  { href: "/witchcraft", label: "witchcraft.js" },
  { href: "/about", label: "about.txt" },
  { href: "/contact", label: "contact.md" },
];

const editorialNavItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/witchcraft", label: "Witchcraft" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function NavMenu() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const navItems = theme === "editorial" ? editorialNavItems : terminalNavItems;

  return (
    <div
      className="mb-12 pb-6 border-b text-sm"
      style={{
        borderColor: "var(--border)",
        fontFamily: theme === "editorial" ? "var(--font-heading)" : "var(--font-mono)",
        letterSpacing: theme === "editorial" ? "0.05em" : "normal"
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color: isActive ? "var(--accent)" : "var(--muted)",
                  textDecoration: isActive ? "underline" : "none",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <button
          onClick={() => setTheme(theme === "terminal" ? "editorial" : "terminal")}
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem"
          }}
        >
          {theme === "editorial" ? "◐" : `--theme=${theme}`}
        </button>
      </div>
    </div>
  );
}
