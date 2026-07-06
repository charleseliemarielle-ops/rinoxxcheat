import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

/**
 * Focus mode: press F to toggle. Hides nav, footer, and background layers
 * so the user can focus on the main content.
 */
export const useFocusMode = (labels: { on: string; off: string }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "f" || e.key === "F") {
        setActive((v) => {
          const next = !v;
          toast({ title: next ? labels.on : labels.off });
          return next;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [labels]);

  useEffect(() => {
    const root = document.documentElement;
    if (active) root.classList.add("focus-mode");
    else root.classList.remove("focus-mode");
  }, [active]);

  return active;
};
