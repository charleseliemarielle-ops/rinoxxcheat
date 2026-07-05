import { GitCommit } from "lucide-react";

type Entry = { version: string; date: string; changes: string[] };

export default function Changelog({ title, desc, entries }: { title: string; desc: string; entries: Entry[] }) {
  return (
    <section aria-label="Changelog" className="max-w-3xl mx-auto mt-24">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold tracking-tight mb-2">{title}</h2>
        <p className="text-muted-foreground">{desc}</p>
      </div>
      <div className="space-y-4">
        {entries.map((e, i) => (
          <div
            key={e.version}
            className="glass rounded-xl p-5 hover:border-primary/40 transition-all animate-fade-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <GitCommit className="h-4 w-4 text-primary" />
                <span className="font-semibold">{e.version}</span>
              </div>
              <span className="text-xs text-muted-foreground">{e.date}</span>
            </div>
            <ul className="space-y-1.5">
              {e.changes.map((c, j) => (
                <li key={j} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary mt-1">›</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
