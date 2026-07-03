interface Props {
  items: string[];
}

const Marquee = ({ items }: Props) => {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-4 border-y border-border/50 bg-card/30 backdrop-blur">
      <div className="flex gap-8 marquee-track whitespace-nowrap">
        {doubled.map((it, i) => (
          <span
            key={i}
            className="text-sm text-muted-foreground flex items-center gap-2 shrink-0"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
            {it}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
