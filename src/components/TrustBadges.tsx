import { ShieldCheck, Lock, BadgeCheck, Clock } from "lucide-react";

interface Props {
  items: { icon: "shield" | "lock" | "badge" | "clock"; label: string; sub: string }[];
}

const ICONS = {
  shield: ShieldCheck,
  lock: Lock,
  badge: BadgeCheck,
  clock: Clock,
};

const TrustBadges = ({ items }: Props) => (
  <section className="max-w-5xl mx-auto mt-20">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((it, i) => {
        const Icon = ICONS[it.icon];
        return (
          <div
            key={i}
            className="glass rounded-xl p-4 text-center hover:border-primary/40 hover:scale-105 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="h-10 w-10 mx-auto rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mb-2 animate-badge-glow">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="text-sm font-medium">{it.label}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{it.sub}</div>
          </div>
        );
      })}
    </div>
  </section>
);

export default TrustBadges;
