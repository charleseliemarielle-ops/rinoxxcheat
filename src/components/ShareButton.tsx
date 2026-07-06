import { useState } from "react";
import { Share2, Copy, Check, Twitter, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Props {
  label: string;
  copied: string;
  shareText: string;
}

const ShareButton = ({ label, copied, shareText }: Props) => {
  const [open, setOpen] = useState(false);
  const [copiedState, setCopiedState] = useState(false);

  const url = typeof window !== "undefined" ? window.location.href : "";

  const doCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedState(true);
      toast({ title: copied });
      setTimeout(() => setCopiedState(false), 1600);
    } catch {}
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 sm:left-auto sm:right-24 sm:translate-x-0">
      <div className="relative">
        {open && (
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-0 glass rounded-xl p-2 flex items-center gap-1 animate-scale-in shadow-[0_20px_40px_-10px_hsl(var(--primary)/0.4)] whitespace-nowrap">
            <button
              onClick={doCopy}
              className="h-9 w-9 rounded-lg hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
              aria-label="Copy link"
            >
              {copiedState ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
            </button>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-lg hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
              aria-label="Share on X"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${url}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-lg hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
              aria-label="Share on WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={label}
          className="h-11 w-11 rounded-full glass border border-primary/30 flex items-center justify-center text-primary hover:scale-110 hover:border-primary/60 transition-all shadow-[0_8px_30px_-8px_hsl(var(--primary)/0.5)]"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ShareButton;
