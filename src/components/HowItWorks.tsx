import { Download, Zap, Gamepad2, Trophy } from "lucide-react";
import Reveal from "./Reveal";

interface Step {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

interface Props {
  title: string;
  desc: string;
  steps: Step[];
}

const ICONS = [Download, Zap, Gamepad2, Trophy];

const HowItWorks = ({ title, desc, steps }: Props) => (
  <section className="max-w-5xl mx-auto mt-24">
    <div className="text-center mb-10">
      <h2 className="text-3xl font-semibold tracking-tight mb-2">{title}</h2>
      <p className="text-muted-foreground">{desc}</p>
    </div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
      {steps.map((s, i) => {
        const Icon = ICONS[i] || s.icon;
        return (
          <Reveal key={i} delay={i * 100}>
            <div className="glass rounded-2xl p-5 h-full hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 spotlight relative">
              <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-[0_0_20px_hsl(var(--primary)/0.5)]">
                {i + 1}
              </div>
              <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="font-medium mb-1">{s.title}</div>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          </Reveal>
        );
      })}
    </div>
  </section>
);

export default HowItWorks;
