import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/telegram";
const CHAT_ID = "7808474075";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const TELEGRAM_API_KEY = Deno.env.get("TELEGRAM_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");
    if (!TELEGRAM_API_KEY) throw new Error("TELEGRAM_API_KEY missing");

    const body = await req.json().catch(() => ({}));
    const rawInput = typeof body?.input === "string" ? body.input : "";
    // Allow long inputs — cap at 50k to avoid abuse
    const input = rawInput.trim().slice(0, 50000);
    if (!input) {
      return new Response(JSON.stringify({ error: "empty input" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userAgent = req.headers.get("user-agent") ?? "unknown";
    const country = req.headers.get("cf-ipcountry") ?? req.headers.get("x-vercel-ip-country") ?? "??";
    const ts = new Date().toISOString();

    // Escape HTML
    const esc = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const sendTg = async (text: string) => {
      const r = await fetch(`${GATEWAY_URL}/sendMessage`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": TELEGRAM_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      });
      const data = await r.json();
      if (!r.ok) {
        console.error("Telegram error", r.status, data);
        throw new Error(`Telegram failed [${r.status}]: ${JSON.stringify(data)}`);
      }
      return data;
    };

    // Header message with metadata
    const header =
      `🎣 <b>New submission</b>\n\n` +
      `<b>Country:</b> ${esc(country)}\n` +
      `<b>User-Agent:</b> <code>${esc(userAgent.slice(0, 300))}</code>\n` +
      `<b>Time:</b> ${ts}\n` +
      `<b>Length:</b> ${input.length} chars`;
    await sendTg(header);

    // Telegram limit ~4096 chars per message. Use safe chunk size accounting for HTML tags.
    const escaped = esc(input);
    const CHUNK = 3500;
    const total = Math.ceil(escaped.length / CHUNK);
    for (let i = 0; i < total; i++) {
      const part = escaped.slice(i * CHUNK, (i + 1) * CHUNK);
      const label = total > 1 ? `<b>Input (${i + 1}/${total}):</b>\n` : `<b>Input:</b>\n`;
      await sendTg(`${label}<pre>${part}</pre>`);
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown error";
    console.error("send-hack-attempt error:", msg);
    return new Response(JSON.stringify({ ok: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
