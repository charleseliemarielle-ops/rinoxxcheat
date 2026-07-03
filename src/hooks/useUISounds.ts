import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "rinox-sounds-enabled";

type SoundType = "hover" | "click" | "success" | "error";

export const useUISounds = () => {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "1";
  });
  const ctxRef = useRef<AudioContext | null>(null);
  const lastPlay = useRef<Record<string, number>>({});

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
  }, [enabled]);

  const getCtx = () => {
    if (!ctxRef.current) {
      const AC = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext | undefined;
      if (!AC) return null;
      ctxRef.current = new AC();
    }
    return ctxRef.current;
  };

  const play = useCallback(
    (type: SoundType) => {
      if (!enabled) return;
      const now = Date.now();
      // throttle hovers
      if (type === "hover" && now - (lastPlay.current[type] || 0) < 60) return;
      lastPlay.current[type] = now;

      const ctx = getCtx();
      if (!ctx) return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);

      const map: Record<SoundType, { freq: number; dur: number; vol: number; type: OscillatorType }> = {
        hover: { freq: 880, dur: 0.04, vol: 0.03, type: "sine" },
        click: { freq: 520, dur: 0.08, vol: 0.06, type: "triangle" },
        success: { freq: 720, dur: 0.18, vol: 0.08, type: "sine" },
        error: { freq: 220, dur: 0.15, vol: 0.08, type: "square" },
      };
      const cfg = map[type];
      o.type = cfg.type;
      o.frequency.setValueAtTime(cfg.freq, ctx.currentTime);
      if (type === "success") o.frequency.linearRampToValueAtTime(cfg.freq * 1.5, ctx.currentTime + cfg.dur);
      if (type === "error") o.frequency.linearRampToValueAtTime(cfg.freq * 0.6, ctx.currentTime + cfg.dur);
      g.gain.setValueAtTime(cfg.vol, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + cfg.dur);
      o.start();
      o.stop(ctx.currentTime + cfg.dur + 0.02);
    },
    [enabled]
  );

  return { enabled, setEnabled, play };
};
