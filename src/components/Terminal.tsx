import { useEffect, useRef, useState } from "react";
import { TerminalSquare, X } from "lucide-react";

interface Line {
  type: "in" | "out";
  text: string;
}

const HELP = [
  "Available commands:",
  "  help       — show this menu",
  "  about      — about RinoxCheat",
  "  cheats     — list available cheats",
  "  status     — system status",
  "  clear      — clear terminal",
  "  exit       — close terminal",
];

const CHEATS = [
  "  [OK] Aimbot v2.4",
  "  [OK] ESP / Wallhack",
  "  [OK] Fly / Speed / No-Clip",
  "  [OK] Auto Farm",
  "  [OK] God Mode",
];

const Terminal = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>([
    { type: "out", text: "RinoxCheat Shell v3.0" },
    { type: "out", text: "Type 'help' to get started." },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "t" || e.key === "T") {
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  const run = (cmd: string) => {
    const c = cmd.trim().toLowerCase();
    const next: Line[] = [{ type: "in", text: cmd }];
    if (c === "help") HELP.forEach((t) => next.push({ type: "out", text: t }));
    else if (c === "about") next.push({ type: "out", text: "RinoxCheat — 100% free & safe Roblox cheats. Since 2024." });
    else if (c === "cheats") CHEATS.forEach((t) => next.push({ type: "out", text: t }));
    else if (c === "status") next.push({ type: "out", text: "All systems operational · uptime 99.98%" });
    else if (c === "clear") { setLines([]); setInput(""); return; }
    else if (c === "exit") { setOpen(false); setInput(""); return; }
    else if (c === "") { setLines((l) => [...l, ...next]); setInput(""); return; }
    else next.push({ type: "out", text: `command not found: ${cmd}` });
    setLines((l) => [...l, ...next]);
    setInput("");
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Open terminal"
        title="Terminal (T)"
        className="fixed bottom-6 left-6 z-40 h-11 w-11 rounded-full glass border border-primary/30 flex items-center justify-center text-primary hover:scale-110 hover:border-primary/60 transition-all shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.5)]"
      >
        <TerminalSquare className="h-5 w-5" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-backdrop-in">
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-2xl h-[420px] rounded-xl overflow-hidden border border-border bg-black/90 shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.5)] animate-modal-in flex flex-col">
        <div className="flex items-center justify-between px-3 py-2 border-b border-border/60 bg-secondary/40">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <TerminalSquare className="h-3.5 w-3.5 text-primary" />
            rinox@shell:~
          </div>
          <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 font-mono text-xs text-primary/90 space-y-0.5">
          {lines.map((l, i) => (
            <div key={i} className={l.type === "in" ? "text-foreground" : "whitespace-pre"}>
              {l.type === "in" ? `$ ${l.text}` : l.text}
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); run(input); }}
          className="flex items-center gap-2 px-3 py-2 border-t border-border/60 bg-secondary/20"
        >
          <span className="text-primary font-mono text-xs">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none font-mono text-xs text-foreground"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
