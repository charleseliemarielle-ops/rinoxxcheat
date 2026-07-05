import { useMemo, useState } from "react";
import { Search, Gamepad2 } from "lucide-react";

type Props = {
  title: string;
  desc: string;
  searchPlaceholder: string;
  emptyLabel: string;
};

const GAMES = [
  { name: "Blox Fruits", cat: "RPG" },
  { name: "Adopt Me!", cat: "Social" },
  { name: "Brookhaven", cat: "Social" },
  { name: "Grow A Garden", cat: "Farming" },
  { name: "Steal a Brainrot", cat: "Meme" },
  { name: "Rivals", cat: "Shooter" },
  { name: "Phantom Forces", cat: "Shooter" },
  { name: "Arsenal", cat: "Shooter" },
  { name: "Da Hood", cat: "Open World" },
  { name: "Murder Mystery 2", cat: "Party" },
  { name: "Doors", cat: "Horror" },
  { name: "Pet Simulator 99", cat: "Sim" },
  { name: "Jailbreak", cat: "Open World" },
  { name: "Bee Swarm Simulator", cat: "Sim" },
  { name: "Tower of Hell", cat: "Obby" },
  { name: "King Legacy", cat: "RPG" },
  { name: "Anime Dimensions", cat: "RPG" },
  { name: "Combat Warriors", cat: "PvP" },
];

const CATEGORIES = ["Tous", "Shooter", "RPG", "Social", "Sim", "Farming", "Open World", "Meme", "Horror", "Party", "Obby", "PvP"];

export default function GamesShowcase({ title, desc, searchPlaceholder, emptyLabel }: Props) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Tous");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return GAMES.filter(
      (g) =>
        (cat === "Tous" || g.cat === cat) &&
        (query === "" || g.name.toLowerCase().includes(query)),
    );
  }, [q, cat]);

  return (
    <section aria-label="Supported games" className="max-w-5xl mx-auto mt-24">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/60 text-xs text-muted-foreground mb-4">
          <Gamepad2 className="h-3.5 w-3.5 text-primary" /> Games
        </div>
        <h2 className="text-3xl font-semibold tracking-tight mb-2">{title}</h2>
        <p className="text-muted-foreground">{desc}</p>
      </div>

      <div className="glass rounded-2xl p-4 sm:p-5 mb-6">
        <div className="relative">
          <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full h-11 pl-10 pr-4 rounded-lg bg-input border border-border focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none text-sm transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-1 rounded-full text-xs border transition-all ${
                cat === c
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_hsl(var(--primary)/0.4)]"
                  : "bg-secondary/40 text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-xl py-10 text-center text-sm text-muted-foreground">{emptyLabel}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((g, i) => (
            <div
              key={g.name}
              className="spotlight glass rounded-xl p-4 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div className="text-sm font-medium truncate">{g.name}</div>
              <div className="text-[10px] uppercase tracking-widest text-primary mt-1">{g.cat}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
