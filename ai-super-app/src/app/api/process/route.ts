export const dynamic = "force-dynamic";

import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const FREE_DAILY_LIMIT = 2;

// Tools that should generate visual HTML/SVG output
const VISUAL_TOOLS: Record<string, string> = {
  logo: `必ず以下の形式で出力してください：
まず各コンセプトの説明を日本語で箇条書き（3案）。
その後、---HTML_START---と---HTML_END---で囲んだ1つのHTMLブロックを出力。
HTMLはスタンドアロン（外部リソース不要）で、3つのロゴをSVGで描いてください。
各ロゴは200x200px程度で、ブランド名・シンボル・配色を含めてください。
背景は白にしてください。全体を横並びに配置してください。`,

  color: `必ず以下の形式で出力してください：
まずカラーパレットの説明を日本語で箇条書き。
その後、---HTML_START---と---HTML_END---で囲んだ1つのHTMLブロックを出力。
HTMLはスタンドアロンで、抽出した色をカラースウォッチとして表示してください。
各色は80x80pxの正方形で、その下にHEXコードと色名を表示。
全体をflexboxで横並びに配置し、見やすくデザインしてください。`,

  mockup: `必ず以下の形式で出力してください：
まずUI/UXの構成説明を日本語で箇条書き。
その後、---HTML_START---と---HTML_END---で囲んだ1つのHTMLブロックを出力。
HTMLはスタンドアロンで、モックアップをHTML/CSSで実際に描画してください。
モバイルアプリ風のUIを375x667pxのフレーム内に描画。
ヘッダー、ナビゲーション、コンテンツ、ボタンなどの要素を含めてください。
色やフォントサイズも指定のスタイルに合わせてください。`,

  thumbnail: `必ず以下の形式で出力してください：
まずサムネイルデザインの構成説明を日本語で箇条書き。
その後、---HTML_START---と---HTML_END---で囲んだ1つのHTMLブロックを出力。
HTMLはスタンドアロンで、YouTubeサムネイル(1280x720px比率)をHTML/CSSで実際に描画してください。
テキスト配置、背景グラデーション、フォントサイズ、色使いを実装してください。
インパクトのあるデザインにしてください。`,
};

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

    const isVisual = toolId && toolId in VISUAL_TOOLS;
    const visualInstruction = isVisual ? "\n\n" + VISUAL_TOOLS[toolId] : "";
    const defaultInstruction = isVisual
      ? ""
      : "\n\n出力は箇条書きで5〜7行程度にしてください。各行は絵文字で始めてください。簡潔に。";

    const client = new Anthropic();
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: isVisual ? 4096 : 1024,
      system:
        aiPrompt +
        localeInstruction +
        visualInstruction +
        defaultInstruction,
      messages: [{ role: "user", content: userInput }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Extract HTML block if present
    let html: string | null = null;
    const htmlMatch = text.match(/---HTML_START---([\s\S]*?)---HTML_END---/);
    if (htmlMatch) {
      html = htmlMatch[1].trim();
    }

    const textWithoutHtml = text
      .replace(/---HTML_START---[\s\S]*?---HTML_END---/, "")
      .trim();
    const lines = textWithoutHtml
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

    return NextResponse.json({ results: lines, remaining, ...(html ? { html } : {}) });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("AI processing error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
