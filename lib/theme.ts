export type Theme = "light" | "dark";

export const STORAGE_KEY = "voltlabs-theme";

/** Fired on window whenever the theme changes, so toggles can re-read it. */
export const THEME_EVENT = "voltlabs:themechange";

/**
 * Runs before first paint, ahead of React, so the page never flashes the
 * light theme at someone who chose dark. Kept as a string because it has to
 * be inlined into <head> rather than loaded as a module.
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    var dark = stored === 'dark' || stored === 'light'
      ? stored === 'dark'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  } catch (e) {}
})();
`;
