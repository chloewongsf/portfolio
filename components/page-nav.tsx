"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function PageNav() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      setScrolled(currentScrollY > 24);

      if (currentScrollY < 48) {
        setVisible(true);
      } else if (Math.abs(delta) > 5) {
        setVisible(delta < 0);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        skip to main content
      </a>

      <div
        aria-hidden="true"
        onMouseEnter={() => setVisible(true)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          height: "3rem",
        }}
      />
      <nav
        className="page-nav"
        onMouseEnter={() => setVisible(true)}
        style={{
          position: "fixed",
          top: "clamp(0.75rem, 2vw, 2rem)",
          left: "clamp(0.75rem, 2vw, 2rem)",
          right: "clamp(0.75rem, 2vw, 2rem)",
          zIndex: 10000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "0.5rem 0.875rem",
          border: "1px solid rgba(242,242,242,0.18)",
          borderRadius: "4px",
          backgroundColor: scrolled
            ? "rgba(17,17,17,0.88)"
            : "rgba(17,17,17,0.58)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.08)" : "none",
          transform: visible
            ? "translateY(0)"
            : "translateY(calc(-100% - 1.5rem))",
          opacity: visible ? 1 : 0,
          transition:
            "transform 0.34s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.24s ease, background-color 0.25s ease, box-shadow 0.25s ease",
        }}
      >
        <Link
          className="page-nav-brand"
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            color: "#f2f2f2",
            textDecoration: "none",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: "0.42rem",
              height: "0.42rem",
              flex: "0 0 auto",
              backgroundColor: "#3a7878",
              transform: "rotate(45deg)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.84rem",
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: "0.01em",
            }}
          >
            chloe wong
          </span>
        </Link>

        <div
          className="page-nav-links"
          style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
        >
          {[
            { href: "/work", label: "work" },
            { href: "/about", label: "about" },
            { href: "/contact", label: "contact" },
          ].map(({ href, label }) => {
            const active =
              pathname === href || (pathname?.startsWith(`${href}/`) ?? false);

            return (
              <Link
                className={`page-nav-link${active ? " is-active" : ""}`}
                key={href}
                href={href}
                style={{
                  position: "relative",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.78rem",
                  color: active ? "#f2f2f2" : "#aaaaaa",
                  textDecoration: "none",
                  padding: "0.35rem 0.25rem",
                  transition: "color 0.2s ease, transform 0.16s cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              >
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
