import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Sparkles, ShieldCheck, Zap, CheckCircle2, Play, Gamepad2 } from "lucide-react";

const STEPS = [
  "Connecting to target server...",
  "Locating account...",
  "Bypassing protection...",
  "Injecting cheat module...",
];

const GAMES = [
  "Fortnite",
  "Roblox",
  "Valorant",
  "CS2",
  "Call of Duty",
  "Minecraft",
  "GTA V",
  "Apex Legends",
];

const Index = () => {
  const [target, setTarget] = useState("");
  const [game, setGame] = useState("");
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.title = "RinoxCheat — Cheats & Account Hack 2026";
    const desc =
      "RinoxCheat: the best cheats for every game and a tool to hack any account. Fast, undetected, 2026.";
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
        title: "Missing info",
        description: "Enter the target account (username, email, ID...).",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setDone(false);
    setSteps([]);

    const payload = `Game: ${game || "—"}\nTarget: ${target}`;
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
    <main className="relative min-h-screen flex flex-col items-center px-4 py-12 sm:py-16">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, hsl(var(--primary) / 0.15), transparent 60%)",
        }}
      />

      <header className="text-center max-w-xl w-full mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-muted-foreground text-xs mb-5 border border-border">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>RinoxCheat · 2026 Edition</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-3">
          The #1 Cheats & Account Hack Tool
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Get the best cheats on every game and hack any account in seconds. Undetected, fast, free.
        </p>
      </header>

      <section
        aria-label="Cheat & hack panel"
        className="w-full max-w-md bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-xl shadow-black/40"
      >
        <label htmlFor="game" className="block text-sm font-medium mb-2">
          Game
        </label>
        <div className="relative">
          <Gamepad2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <select
            id="game"
            value={game}
            onChange={(e) => setGame(e.target.value)}
            disabled={loading}
            className="w-full h-11 pl-9 pr-3 rounded-lg bg-input border border-border text-foreground text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary appearance-none"
          >
            <option value="">Select a game</option>
            {GAMES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <label htmlFor="target" className="block text-sm font-medium mt-5 mb-2">
          Target account
        </label>
        <Input
          id="target"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          disabled={loading}
          placeholder="Username, email, ID..."
          maxLength={5000}
          className="h-11 rounded-lg bg-input border-border focus-visible:ring-primary"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Your request is securely transmitted.
        </p>

        <Button
          onClick={handleHack}
          disabled={loading}
          className="w-full mt-5 h-12 rounded-lg font-medium text-base"
        >
          {loading ? "Processing..." : "Start Hack"}
        </Button>

        {(steps.length > 0 || done) && (
          <div className="mt-6 space-y-2">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>{s}</span>
              </div>
            ))}
            {done && (
              <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/30">
                <div className="flex items-center gap-2 font-medium text-primary mb-1">
                  <CheckCircle2 className="h-4 w-4" />
                  Request submitted
                </div>
                <p className="text-sm text-foreground/80">
                  Access will be granted within 2–3 minutes.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Undetected
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Zap className="h-4 w-4 text-primary" />
            Instant
          </div>
        </div>
      </section>

      <section aria-label="Tutorial video" className="w-full max-w-md mt-12">
        <div className="flex items-center gap-2 mb-3">
          <Play className="h-4 w-4 text-primary" />
          <h2 className="text-base font-medium">How it works — Tutorial</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Watch this quick guide before launching your first hack.
        </p>
        <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-card">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/boFceTxmo5o"
            title="Tutorial — RinoxCheat"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>

      <footer className="mt-12 text-center text-xs text-muted-foreground/70">
        <p>Private tool · Use at your own risk</p>
      </footer>
    </main>
  );
};

export default Index;
