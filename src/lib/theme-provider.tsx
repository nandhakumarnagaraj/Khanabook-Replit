import { createContext, useContext, useEffect, type ReactNode } from "react";

export type Theme = "light";

interface ThemeContextType {
  theme: "light";
}

const defaultContext: ThemeContextType = {
  theme: "light",
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

const THEME_STORAGE_KEY = "khanabook-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, "light");
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  return <ThemeContext.Provider value={defaultContext}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context ?? defaultContext;
}
