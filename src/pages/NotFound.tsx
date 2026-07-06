import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Crosshair, Home, Ghost } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Background layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial)" }} />
        <div className="orb orb-1" />
        <div className="orb orb-2" />
      </div>

      <div className="relative text-center px-6 max-w-lg">
        <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-[hsl(var(--primary-glow))] flex items-center justify-center animate-badge-glow">
          <Ghost className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-8xl sm:text-9xl font-bold text-gradient bg-[length:200%_auto] animate-gradient-pan mb-2 tracking-tighter">
          404
        </h1>
        <p className="mb-2 text-2xl font-semibold">Game not found</p>
        <p className="mb-8 text-muted-foreground">
          Cette page a été bannie… ou n'a jamais existé. Retour à la base.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a
            href="/"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-primary text-primary-foreground font-medium shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.6)] hover:scale-105 transition-all"
          >
            <Home className="h-4 w-4" />
            Retour à l'accueil
          </a>
        </div>
        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Crosshair className="h-3 w-3 text-primary" />
          <span>RinoxCheat</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
