export const dynamic = "force-dynamic";

import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const FREE_DAILY_LIMIT = 2;

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
      max_tokens: 1024,
      system:
        aiPrompt +
        localeInstruction +
        "\n\n出力は箇条書きで5〜7行程度にしてください。各行は絵文字で始めてください。簡潔に。",
      messages: [{ role: "user", content: userInput }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
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

    return NextResponse.json({ results: lines, remaining });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("AI processing error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
