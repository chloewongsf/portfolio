"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "terminal" | "editorial";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  introComplete: boolean;
  setIntroComplete: (complete: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = useState<Theme>("terminal");
  const [mounted, setMounted] = useState(false);
  const [introComplete, setIntroCompleteState] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedIntro = localStorage.getItem("portfolio-intro-complete");

    if (savedIntro === "true") {
      setIntroCompleteState(true);
    }
    // Always use terminal theme
    document.documentElement.setAttribute("data-theme", "terminal");
  }, []);

  const setTheme = () => {
    // Theme is always terminal, no-op
  };

  const setIntroComplete = (complete: boolean) => {
    setIntroCompleteState(complete);
    localStorage.setItem("portfolio-intro-complete", String(complete));
  };

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, introComplete, setIntroComplete }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
