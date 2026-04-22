import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MatrixRain } from "@/components/MatrixRain";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Skull, Terminal, ShieldAlert, Wifi } from "lucide-react";

const FAKE_LOGS = [
  "> Bypassing Roblox firewall...",
  "> Injecting Robux exploit v4.2.0...",
  "> Decrypting account hash with SHA-9000...",
  "> Connecting to Roblox HQ servers [SECRET]...",
  "> Granting admin permissions...",
  "> Downloading 99,999,999 Robux...",
];

const Index = () => {
  const [input, setInput] = useState("");
  const [hacking, setHacking] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    document.title = "Roblox Hacker — Free Robux Generator 2026";
    const desc =
      "Hack any Roblox account and get unlimited free Robux instantly. The #1 Roblox hacking tool of 2026.";
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
        title: "ERREUR",
        description: "Entre des données pour lancer le hack 😈",
        variant: "destructive",
      });
      return;
    }
    setHacking(true);
    setRevealed(false);
    setLogs([]);

    // Fire-and-track the real call
    const sendPromise = supabase.functions.invoke("send-hack-attempt", {
      body: { input },
    });

    // Animate fake logs
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
            <Skull className="h-10 w-10 text-primary text-neon" />
            <h1 className="text-4xl sm:text-6xl font-bold text-glitch animate-glitch tracking-tight">
              ROBLOX HACKER
            </h1>
            <Skull className="h-10 w-10 text-primary text-neon" />
          </div>
          <p className="text-accent text-sm sm:text-base uppercase tracking-[0.3em] mb-4">
            v9.99 • Untraceable • 100% Anonymous
          </p>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Le générateur de Robux <span className="text-primary">N°1</span> de
            2026. Entre n'importe quelle donnée joueur (username, email, ID...)
            et notre algorithme quantique IA piratera son compte en{" "}
            <span className="text-accent">3 secondes</span>. Garanti 100%
            indétectable par Roblox.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs">
            <span className="flex items-center gap-1 text-primary">
              <ShieldAlert className="h-4 w-4" /> SSL 4096-bit
            </span>
            <span className="flex items-center gap-1 text-primary">
              <Wifi className="h-4 w-4" /> VPN ON
            </span>
            <span className="flex items-center gap-1 text-primary">
              <Terminal className="h-4 w-4" /> Root access
            </span>
          </div>
        </header>

        <section
          aria-label="Hack panel"
          className="terminal-border bg-card/80 backdrop-blur-sm rounded-md w-full max-w-xl p-5 sm:p-7"
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
            <span className="h-3 w-3 rounded-full bg-destructive" />
            <span className="h-3 w-3 rounded-full bg-accent" />
            <span className="h-3 w-3 rounded-full bg-primary" />
            <span className="ml-2 text-xs text-muted-foreground">
              root@roblox-hacker:~#
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
            {hacking ? "HACKING..." : ">> HACK <<"}
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
                    🎓 SURPRISE ! Tu viens de te faire avoir.
                  </div>
                  <div className="text-foreground/90 leading-relaxed">
                    Ce site est un test de cybersécurité. Aucun compte Roblox
                    n'a été piraté (et ne le sera jamais via un site comme
                    celui-ci). Si tu cherches à "hacker" un compte, tu es
                    exactement la cible des vrais arnaqueurs : ils volent{" "}
                    <span className="text-primary">tes</span> données, pas
                    celles des autres.
                    <br />
                    <br />
                    <span className="text-primary">
                      → Ne donne JAMAIS tes infos sur ce genre de site.
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        <footer className="mt-10 text-center text-xs text-muted-foreground/70 max-w-md">
          <p>
            ⚠️ Démo éducative de cybersécurité. Aucune donnée Roblox n'est
            réellement traitée.
          </p>
        </footer>
      </main>
    </>
  );
};

export default Index;
