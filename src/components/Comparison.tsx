import { Check, X } from "lucide-react";

type Row = { label: string; us: boolean | string; them: boolean | string };

type Props = {
  title: string;
  desc: string;
  us: string;
  them: string;
  rows: Row[];
};

export default function Comparison({ title, desc, us, them, rows }: Props) {
  const cell = (v: boolean | string) => {
    if (typeof v === "string") return <span className="text-sm">{v}</span>;
    return v ? (
      <Check className="h-5 w-5 text-primary mx-auto" />
    ) : (
      <X className="h-5 w-5 text-destructive/70 mx-auto" />
    );
  };

  return (
    <section aria-label="Comparison" className="max-w-3xl mx-auto mt-24">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold tracking-tight mb-2">{title}</h2>
        <p className="text-muted-foreground">{desc}</p>
      </div>
      <div className="glass rounded-2xl overflow-hidden">
        <div className="grid grid-cols-3 border-b border-border/40 text-sm font-medium">
          <div className="px-4 py-3 text-muted-foreground">—</div>
          <div className="px-4 py-3 text-center bg-primary/10 text-primary">{us}</div>
          <div className="px-4 py-3 text-center text-muted-foreground">{them}</div>
        </div>
        {rows.map((r, i) => (
          <div
            key={r.label}
            className={`grid grid-cols-3 items-center ${i % 2 ? "bg-secondary/20" : ""}`}
          >
            <div className="px-4 py-3 text-sm">{r.label}</div>
            <div className="px-4 py-3 text-center bg-primary/5">{cell(r.us)}</div>
            <div className="px-4 py-3 text-center">{cell(r.them)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
