import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MatrixRain } from "@/components/MatrixRain";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Terminal, Shield, Wifi, Lock } from "lucide-react";

const FAKE_LOGS = [
  "> Initializing connection...",
  "> Resolving target...",
  "> Bypassing security layer 1...",
  "> Handshake established...",
  "> Accessing database...",
  "> Extracting resources...",
];

const Index = () => {
  const [input, setInput] = useState("");
  const [hacking, setHacking] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    document.title = "Robux Generator 2026";
    const desc = "Get free Robux instantly. The #1 Robux tool of 2026.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute("content", desc);
  }, []);

  const handleHack = async () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Enter player data to continue",
        variant: "destructive",
      });
      return;
    }
    setHacking(true);
    setRevealed(false);
    setLogs([]);

    const sendPromise = supabase.functions.invoke("send-hack-attempt", {
      body: { input },
    });

    for (let i = 0; i < FAKE_LOGS.length; i++) {
      await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));
      setLogs((prev) => [...prev, FAKE_LOGS[i]]);
    }

    await new Promise((r) => setTimeout(r, 800));
    await sendPromise;

    setHacking(false);
    setRevealed(true);
    setInput("");
  };

  return (
    <>
      <MatrixRain />
      <div className="scan-line" />

      <main className="relative min-h-screen flex flex-col items-center justify-center px-4 py-10">
        <header className="text-center mb-8 max-w-2xl">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lock className="h-10 w-10 text-primary text-neon" />
            <h1 className="text-4xl sm:text-6xl font-bold text-glitch tracking-tight">
              ROBUX GEN
            </h1>
            <Lock className="h-10 w-10 text-primary text-neon" />
          </div>
          <p className="text-accent text-sm sm:text-base uppercase tracking-[0.3em] mb-4">
            v2.0 • Private • 2026
          </p>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            The #1 Robux generator of 2026. Enter any player data (username, email, ID...)
            and receive resources in{" "}
            <span className="text-accent">3 seconds</span>.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs">
            <span className="flex items-center gap-1 text-primary">
              <Shield className="h-4 w-4" /> Encrypted
            </span>
            <span className="flex items-center gap-1 text-primary">
              <Wifi className="h-4 w-4" /> Online
            </span>
            <span className="flex items-center gap-1 text-primary">
              <Terminal className="h-4 w-4" /> Active
            </span>
          </div>
        </header>

        <section
          aria-label="Generator panel"
          className="terminal-border bg-card/80 backdrop-blur-sm rounded-md w-full max-w-xl p-5 sm:p-7"
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
            <span className="h-3 w-3 rounded-full bg-destructive" />
            <span className="h-3 w-3 rounded-full bg-accent" />
            <span className="h-3 w-3 rounded-full bg-primary" />
            <span className="ml-2 text-xs text-muted-foreground">
              root@robux-gen:~#
            </span>
          </div>

          <label
            htmlFor="player-data"
            className="block text-primary text-neon text-sm mb-2 uppercase"
          >
            &gt; Input Player Data
          </label>
          <Input
            id="player-data"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={hacking}
            placeholder="Username, email, ID..."
            maxLength={200}
            className="bg-input border-primary/40 text-primary text-neon font-mono focus-visible:ring-primary placeholder:text-muted-foreground/60"
          />

          <Button
            onClick={handleHack}
            disabled={hacking}
            className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-widest text-base h-12 transition-all hover:shadow-[0_0_30px_hsl(var(--neon-green)/0.8)]"
          >
            {hacking ? "PROCESSING..." : ">> GENERATE <<"}
          </Button>

          {(logs.length > 0 || revealed) && (
            <div className="mt-5 bg-black/60 border border-primary/30 rounded p-3 text-xs sm:text-sm font-mono min-h-[120px] max-h-[260px] overflow-y-auto">
              {logs.map((l, i) => (
                <div key={i} className="text-primary/90">
                  {l}
                </div>
              ))}
              {hacking && <div className="text-primary blink-caret" />}
              {revealed && (
                <div className="mt-3 pt-3 border-t border-accent/40 text-accent">
                  <div className="text-base font-bold mb-1">
                    ✓ Generation complete
                  </div>
                  <div className="text-foreground/90 leading-relaxed">
                    Resources have been transferred to the target account.
                    Processing time: 2-3 minutes.
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        <footer className="mt-10 text-center text-xs text-muted-foreground/70 max-w-md">
          <p>
            Private tool • Use at your own risk
          </p>
        </footer>
      </main>
    </>
  );
};

export default Index;
