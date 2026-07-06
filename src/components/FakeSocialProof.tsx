import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

const NAMES_FR = ["Alex", "Léo", "Nathan", "Emma", "Lucas", "Hugo", "Louis", "Chloé", "Mathis", "Sacha", "Noah", "Jules"];
const NAMES_EN = ["Alex", "Ryan", "Nathan", "Emma", "Ethan", "Liam", "Noah", "Chloe", "Mason", "Jack", "Owen", "Zack"];
const GAMES = ["Rivals", "Doors", "Blox Fruits", "Grow A Garden", "Steal a Brainrot", "Blade Ball", "Da Hood"];

interface Props {
  language: "fr" | "en";
  enabled: boolean;
}

const FakeSocialProof = ({ language, enabled }: Props) => {
  useEffect(() => {
    if (!enabled) return;
    const names = language === "fr" ? NAMES_FR : NAMES_EN;
    let stopped = false;

    const tick = () => {
      if (stopped) return;
      const name = names[Math.floor(Math.random() * names.length)];
      const game = GAMES[Math.floor(Math.random() * GAMES.length)];
      const mins = 1 + Math.floor(Math.random() * 20);
      toast({
        title: language === "fr" ? `${name} vient d'injecter` : `${name} just injected`,
        description: language === "fr"
          ? `Sur ${game} · il y a ${mins} min`
          : `On ${game} · ${mins} min ago`,
      });
      const delay = 18000 + Math.random() * 22000;
      setTimeout(tick, delay);
    };

    const start = setTimeout(tick, 8000);
    return () => { stopped = true; clearTimeout(start); };
  }, [language, enabled]);

  return null;
};

export default FakeSocialProof;
