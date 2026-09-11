"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeProviderState {
  theme: "light" | "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeProviderContext = createContext<ThemeProviderState>({ theme: "light", setTheme: () => {} });

export function ThemeProvider({ children, ...props }: { children: ReactNode; attribute?: string; defaultTheme?: Theme; enableSystem?: boolean }) {
  const [theme, setThemeState] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme") as Theme | null;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    let initial: "light" | "dark" = "light";
    if (saved === "light" || saved === "dark") initial = saved;
    else if (saved === "system" && systemDark) initial = "dark";
    else if (saved === "system") initial = "light";
    setThemeState(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const setTheme = (newTheme: Theme) => {
    const resolved = newTheme === "system" ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : newTheme;
    setThemeState(resolved);
    document.documentElement.classList.toggle("dark", resolved === "dark");
    localStorage.setItem("theme", newTheme);
  };

  if (!mounted) return null;

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeProviderContext);
}
