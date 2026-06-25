// theme.ts
export type Theme = "light" | "dark" | "system";

export const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const setTheme = (theme: Theme) => {
  if (typeof window === "undefined") return;
  
  const actualTheme = theme === "system" ? getSystemTheme() : theme;
  const root = document.documentElement;

  if (actualTheme === "dark") {
    root.classList.add("dark");
    root.style.colorScheme = "dark"; // Optionnel : force les barres de défilement en sombre
  } else {
    root.classList.remove("dark");
    root.style.colorScheme = "light";
  }

  if (theme !== "system") {
    localStorage.setItem("theme", theme);
  } else {
    localStorage.removeItem("theme");
  }
};

export const getTheme = (): Theme => {
  if (typeof window === "undefined") return "system";
  const saved = localStorage.getItem("theme") as Theme | null;
  return saved || "system";
};

export const initializeTheme = () => {
  const theme = getTheme();
  setTheme(theme);
};
