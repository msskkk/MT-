import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { aiPrompt, userInput, locale } = await req.json();

    if (!aiPrompt || !userInput) {
      return NextResponse.json(
        { error: "Missing aiPrompt or userInput" },
        { status: 400 }
      );
    }

    const localeInstruction =
      locale && locale !== "ja"
        ? `\n\n重要: ユーザーの言語は${locale === "en" ? "英語" : locale === "zh" ? "中国語" : locale === "ko" ? "韓国語" : locale}です。必ずその言語で回答してください。`
        : "";

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

    return NextResponse.json({ results: lines });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("AI processing error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
