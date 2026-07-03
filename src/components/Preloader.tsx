import { useEffect, useState } from "react";
import { Crosshair } from "lucide-react";

const Preloader = () => {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setProgress((p) => Math.min(100, p + Math.random() * 18 + 6));
    }, 130);
    const timeout = window.setTimeout(() => {
      setFadeOut(true);
      window.setTimeout(() => setVisible(false), 500);
    }, 1600);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-[hsl(var(--primary-glow))] bg-[length:200%_200%] animate-gradient-pan flex items-center justify-center shadow-[0_0_40px_hsl(var(--primary)/0.5)]">
          <Crosshair className="h-8 w-8 text-primary-foreground animate-spin-slow" />
        </div>
        <div className="absolute inset-0 rounded-2xl border-2 border-primary/40 animate-ping" />
      </div>
      <div className="mt-8 w-56 h-1 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-[hsl(var(--primary-glow))] transition-all duration-200"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
      <p className="mt-4 text-xs text-muted-foreground tracking-widest uppercase">
        Loading RinoxCheat
      </p>
    </div>
  );
};

export default Preloader;
