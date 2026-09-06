"use client";

import { useEffect, useSyncExternalStore } from "react";
import { STORAGE_KEY, THEME_EVENT, type Theme } from "@/lib/theme";

const readStored = (): Theme | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    // Storage can be unavailable (private mode, blocked cookies).
    return null;
  }
};

const apply = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  window.dispatchEvent(new Event(THEME_EVENT));
};

/* The theme lives on <html>, put there by the inline script in the layout
   before React ever runs, so it is external state as far as React is
   concerned. Reading it through useSyncExternalStore keeps the button label
   in step without a setState-in-effect. */
const subscribe = (onChange: () => void) => {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
};

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

// The server cannot know the visitor's theme; null renders a neutral label
// that is replaced on hydration.
const getServerSnapshot = (): Theme | null => null;

const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Follow the OS for as long as the visitor has not chosen for themselves.
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = (event: MediaQueryListEvent) => {
      if (readStored()) return;
      apply(event.matches ? "dark" : "light");
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  const toggle = () => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Preference will not persist, but the toggle still works this session.
    }
  };

  const label =
    theme === null
      ? "Switch between light and dark theme"
      : `Switch to ${theme === "dark" ? "light" : "dark"} theme`;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`p-2 rounded-lg text-gray-600 hover:text-[#EAA832] hover:bg-gray-100 transition-colors cursor-pointer ${className}`}
    >
      {/* Both icons are rendered and swapped by CSS, so the button is already
          correct on the first paint rather than after hydration. */}
      <svg
        className="w-5 h-5 dark:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
        />
      </svg>
      <svg
        className="w-5 h-5 hidden dark:block"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path
          strokeLinecap="round"
          d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        />
      </svg>
    </button>
  );
};

export default ThemeToggle;
