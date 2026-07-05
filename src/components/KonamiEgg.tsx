import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

const SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const COLORS = ["#22c55e", "#4ade80", "#86efac", "#16a34a", "#ffffff"];

export default function KonamiEgg({ label = "Mode Turbo activé 🚀" }: { label?: string }) {
  const [confetti, setConfetti] = useState<number[]>([]);

  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const expected = SEQUENCE[idx];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === expected.toLowerCase()) {
        idx++;
        if (idx === SEQUENCE.length) {
          idx = 0;
          fire();
        }
      } else {
        idx = key === SEQUENCE[0].toLowerCase() ? 1 : 0;
      }
    };
    const fire = () => {
      setConfetti(Array.from({ length: 60 }, (_, i) => i));
      toast({ title: "🎉 Easter egg !", description: label });
      setTimeout(() => setConfetti([]), 3200);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [label]);

  if (!confetti.length) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {confetti.map((i) => (
        <span
          key={i}
          className="animate-confetti"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `-${Math.random() * 20}px`,
            width: `${6 + (i % 4) * 2}px`,
            height: `${8 + (i % 3) * 3}px`,
            background: COLORS[i % COLORS.length],
            borderRadius: i % 2 ? "50%" : "2px",
            animationDelay: `${(i % 10) * 60}ms`,
            animationDuration: `${2.4 + (i % 5) * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}
