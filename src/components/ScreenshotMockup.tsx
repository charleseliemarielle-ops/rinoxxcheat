import { Crosshair, Eye, Wind, ShieldCheck } from "lucide-react";

interface Props {
  title: string;
  desc: string;
  labels: { aimbot: string; esp: string; fly: string; safe: string; status: string };
}

const ScreenshotMockup = ({ title, desc, labels }: Props) => (
  <section className="max-w-5xl mx-auto mt-24">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-semibold tracking-tight mb-2">{title}</h2>
      <p className="text-muted-foreground">{desc}</p>
    </div>
    <div className="glass rounded-2xl overflow-hidden border-2 border-border shadow-[0_30px_80px_-20px_hsl(var(--primary)/0.4)] hover:shadow-[0_40px_100px_-20px_hsl(var(--primary)/0.6)] transition-all duration-500 hover:-translate-y-2">
      {/* macOS-style title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-secondary/60 border-b border-border">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-muted-foreground font-mono">RinoxCheat Loader — v3.0</span>
      </div>
      {/* Body */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-background to-secondary/20">
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: Crosshair, label: labels.aimbot, val: "98%", active: true },
            { icon: Eye, label: labels.esp, val: "ON", active: true },
            { icon: Wind, label: labels.fly, val: "ON", active: true },
            { icon: ShieldCheck, label: labels.safe, val: "100%", active: true },
          ].map((row, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/60 border border-border animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-2.5">
                <row.icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{row.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-primary font-mono">{row.val}</span>
                <span className="h-2 w-2 rounded-full bg-primary live-dot" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 p-3 rounded-lg bg-primary/5 border border-primary/20 flex items-center gap-2 text-xs font-mono text-primary/80">
          <span className="h-1.5 w-1.5 rounded-full bg-primary live-dot" />
          <span>{labels.status}</span>
        </div>
      </div>
    </div>
  </section>
);

export default ScreenshotMockup;
