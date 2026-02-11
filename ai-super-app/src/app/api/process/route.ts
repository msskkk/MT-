export const dynamic = "force-dynamic";

import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const FREE_DAILY_LIMIT = 2;

// Server-side text → styled HTML converter (100% reliable, no model dependency)
const COLORS = [
  { bg: "linear-gradient(135deg,#667eea,#764ba2)", light: "#f0f4ff", border: "#667eea", text: "#4338ca" },
  { bg: "linear-gradient(135deg,#f093fb,#f5576c)", light: "#fef0f7", border: "#f5576c", text: "#be185d" },
  { bg: "linear-gradient(135deg,#4facfe,#00f2fe)", light: "#eff8ff", border: "#4facfe", text: "#0369a1" },
  { bg: "linear-gradient(135deg,#43e97b,#38f9d7)", light: "#f0fdf9", border: "#43e97b", text: "#047857" },
  { bg: "linear-gradient(135deg,#fa709a,#fee140)", light: "#fff7ed", border: "#fa709a", text: "#c2410c" },
];

function textToStyledHtml(text: string): string {
  const lines = text.split("\n").filter((l) => l.trim());
  const S = `font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Hiragino Sans',sans-serif`;
  let html = `<div style="max-width:480px;margin:0 auto;${S};">`;
  let colorIdx = 0;
  let inCards = false;

  for (const line of lines) {
    const t = line.trim();
    if (!t) continue;

    const bold = (s: string) =>
      s.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#1e293b;">$1</strong>');

    // # Heading
    if (t.startsWith("# ")) {
      if (inCards) { html += "</div>"; inCards = false; }
      const c = COLORS[colorIdx % COLORS.length];
      html += `<div style="background:${c.bg};color:#fff;padding:16px 20px;border-radius:14px;margin:16px 0 12px;font-size:17px;font-weight:800;letter-spacing:0.3px;">${t.slice(2)}</div>`;
      colorIdx++;
      continue;
    }

    // **Section header**
    if (t.startsWith("**") && t.endsWith("**") && !t.includes("**:") && t.indexOf("**", 2) === t.length - 2) {
      if (inCards) { html += "</div>"; }
      const c = COLORS[colorIdx % COLORS.length];
      html += `<div style="margin:20px 0 8px;padding:12px 16px;background:${c.light};border-left:4px solid ${c.border};border-radius:0 10px 10px 0;font-weight:700;color:${c.text};font-size:14px;">${t.slice(2, -2)}</div>`;
      html += '<div style="padding:0 2px;">';
      inCards = true;
      colorIdx++;
      continue;
    }

    // Line starting with emoji → card
    const emojiRe = /^(\p{Emoji_Presentation}|\p{Extended_Pictographic})\s*/u;
    const em = t.match(emojiRe);
    if (em) {
      const emoji = em[0].trim();
      const rest = bold(t.slice(em[0].length));
      html += `<div style="display:flex;align-items:flex-start;gap:10px;padding:12px 14px;margin:6px 0;background:#fff;border-radius:12px;box-shadow:0 1px 6px rgba(0,0,0,0.06);font-size:13px;line-height:1.6;">
        <span style="font-size:20px;flex-shrink:0;margin-top:1px;">${emoji}</span>
        <span style="color:#334155;">${rest}</span></div>`;
      continue;
    }

    // Bullet: - or ・ or •
    if (t.startsWith("- ") || t.startsWith("・") || t.startsWith("• ")) {
      const content = bold(t.replace(/^[-・•]\s*/, ""));
      html += `<div style="display:flex;align-items:flex-start;gap:8px;padding:8px 14px;margin:4px 0;font-size:13px;line-height:1.6;color:#475569;">
        <span style="color:#94a3b8;font-size:8px;margin-top:6px;">●</span>
        <span>${content}</span></div>`;
      continue;
    }

    // Default text
    html += `<div style="padding:6px 14px;font-size:13px;color:#475569;line-height:1.6;">${bold(t)}</div>`;
  }

  if (inCards) html += "</div>";
  html += "</div>";
  return html;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function POST(req: NextRequest) {
  try {
    const { aiPrompt, userInput, locale, bundleId, toolId } = await req.json();

    if (!aiPrompt || !userInput) {
      return NextResponse.json(
        { error: "Missing aiPrompt or userInput" },
        { status: 400 }
      );
    }

    // Usage check (DB available only)
    let userId: string | null = null;
    let isPremium = false;

    if (prisma) {
      try {
        const { getServerSession } = await import("next-auth");
        const { authOptions } = await import("@/lib/auth");
        const session = await getServerSession(authOptions);

        if (session?.user?.email) {
          const user = await prisma.user.findUnique({
            where: { email: session.user.email },
          });
          if (user) {
            userId = user.id;
            isPremium = user.isPremium;

            if (!isPremium) {
              const usage = await prisma.usage.findUnique({
                where: { userId_date: { userId: user.id, date: today() } },
              });
              if (usage && usage.count >= FREE_DAILY_LIMIT) {
                return NextResponse.json(
                  { error: "daily_limit", remaining: 0 },
                  { status: 429 }
                );
              }
            }
          }
        }
      } catch {
        // Auth/DB not available, continue without
      }
    }

    const localeInstruction =
      locale && locale !== "ja"
        ? `\n\n重要: ユーザーの言語は${locale === "en" ? "英語" : locale === "zh" ? "中国語" : locale === "ko" ? "韓国語" : locale}です。必ずその言語で回答してください。`
        : "";

    const client = new Anthropic();
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      system:
        aiPrompt +
        localeInstruction +
        "\n\n見やすく構造化して出力してください。# で大見出し、**太字** でセクション見出しを使い、各項目は絵文字で始めてください。箇条書きで整理してください。",
      messages: [{ role: "user", content: userInput }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Always generate styled HTML from text
    const html = textToStyledHtml(text);

    const lines = text
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    // Record usage & save history (DB available only)
    if (prisma && userId) {
      try {
        await prisma.usage.upsert({
          where: { userId_date: { userId, date: today() } },
          update: { count: { increment: 1 } },
          create: { userId, date: today(), count: 1 },
        });

        if (bundleId && toolId) {
          await prisma.history.create({
            data: {
              userId,
              bundleId,
              toolId,
              input: userInput.slice(0, 500),
              output: JSON.stringify(lines),
              locale: locale || "ja",
            },
          });
        }
      } catch {
        // DB write failed, continue
      }
    }

    // Compute remaining uses
    let remaining = FREE_DAILY_LIMIT;
    if (prisma && userId && !isPremium) {
      try {
        const usage = await prisma.usage.findUnique({
          where: { userId_date: { userId, date: today() } },
        });
        remaining = Math.max(0, FREE_DAILY_LIMIT - (usage?.count ?? 0));
      } catch {
        // ignore
      }
    } else if (isPremium) {
      remaining = -1;
    }

    return NextResponse.json({ results: lines, remaining, html });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("AI processing error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
