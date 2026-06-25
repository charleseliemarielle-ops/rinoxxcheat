// theme.ts
export const initializeTheme = () => {
  if (typeof window === "undefined") return;
  
  const root = document.documentElement;
  root.classList.add("dark");
  root.style.colorScheme = "dark"; // Force aussi les barres de défilement en sombre
};
