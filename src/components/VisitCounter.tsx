import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

const KEY = "rinox-visit-count";
const BASE = 42189;

interface Props {
  label: string;
}

const VisitCounter = ({ label }: Props) => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      let n: number;
      if (stored) {
        n = parseInt(stored, 10);
      } else {
        n = BASE + Math.floor(Math.random() * 400);
        localStorage.setItem(KEY, String(n));
      }
      setCount(n);
    } catch {
      setCount(BASE);
    }
  }, []);

  if (count === null) return null;

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <Eye className="h-3 w-3 text-primary" />
      <span className="tabular-nums">
        {label} <span className="text-foreground font-medium">{count.toLocaleString()}</span>
      </span>
    </span>
  );
};

export default VisitCounter;
