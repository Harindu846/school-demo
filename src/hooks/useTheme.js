import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "school_demo_theme"; // "light" | "dark" | "system"

function getSystemTheme() {
  return window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyThemeClass(resolvedTheme) {
  const root = document.documentElement; // <html>
  if (resolvedTheme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "light" || saved === "dark" || saved === "system"
      ? saved
      : "system";
  });

  const resolvedTheme = useMemo(() => {
    if (theme === "system") return getSystemTheme();
    return theme;
  }, [theme]);

  // Apply theme class whenever it changes
  useEffect(() => {
    applyThemeClass(resolvedTheme);
  }, [resolvedTheme]);

  // Save preference
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // If user chooses "system", react to OS theme changes live
  useEffect(() => {
    if (theme !== "system") return;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyThemeClass(getSystemTheme());

    // Safari fallback uses addListener/removeListener
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);

    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, [theme]);

  return { theme, setTheme, resolvedTheme };
}