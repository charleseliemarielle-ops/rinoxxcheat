// Theme management utility
export type Theme = "light" | "dark" | "system";

export const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const setTheme = (theme: Theme) => {
  const actualTheme =
    theme === "system" ? getSystemTheme() : theme;
  const root = document.documentElement;

  if (actualTheme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  if (theme !== "system") {
    localStorage.setItem("theme", theme);
  } else {
    localStorage.removeItem("theme");
  }
};

export const getTheme = (): Theme => {
  if (typeof window === "undefined") return "dark";
  const saved = localStorage.getItem("theme") as Theme | null;
  if (saved) return saved;
  return "system";
};

export const initializeTheme = () => {
  const theme = getTheme();
  setTheme(theme);
};
