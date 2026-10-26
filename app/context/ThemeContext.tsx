"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
  setTheme: () => {},
});

function applyThemeToDOM(t: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.setAttribute("data-theme", t);
  root.style.colorScheme = t;
  if (t === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
  } else {
    root.classList.add("light");
    root.classList.remove("dark");
  }
}

let currentTheme: Theme = "dark";
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): Theme {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("vybro_theme");
      if (saved === "light" || saved === "dark") {
        currentTheme = saved;
      }
    } catch {
      // storage unavailable
    }
  }
  return currentTheme;
}

function getServerSnapshot(): Theme {
  return "dark"; // Default is always DARK
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setTheme = (newTheme: Theme) => {
    currentTheme = newTheme;
    applyThemeToDOM(newTheme);
    try {
      localStorage.setItem("vybro_theme", newTheme);
    } catch {
      // storage unavailable
    }
    listeners.forEach((listener) => listener());
  };

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
