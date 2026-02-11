export const dynamic = "force-dynamic";

import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const FREE_DAILY_LIMIT = 2;

// Universal rich HTML output instruction for ALL tools
const RICH_HTML_BASE = `
【出力形式】必ず ---HTML_START--- と ---HTML_END--- で囲んだHTMLブロックを出力してください。
テキスト説明は不要です。全てHTMLの中に含めてください。

【デザインルール】
- スタンドアロンHTML（外部リソース不要）、インラインstyleのみ使用
- font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Hiragino Sans', sans-serif
- 幅は100%、max-width:480px、margin:0 auto
- カード型レイアウト: 角丸12px、box-shadow: 0 2px 12px rgba(0,0,0,0.08)
- セクション見出し: 左にカラーバー(4px)付き、絵文字アイコン付き
- 配色は統一感のあるカラースキームで、グラデーション活用
- 余白をしっかり取り、読みやすく
- 重要な情報は太字・色付き・バッジ表示
- リスト項目はカード化して視覚的に区別`;

// Tool-specific extra instructions
const TOOL_EXTRAS: Record<string, string> = {
  // Travel
  plan: `【追加】日程をタイムライン形式で表示：左に日付バッジ（丸い円+日目）、右に詳細カード。各日のヘッダーはグラデーション背景。
場所名にはピンアイコン(📍)を付け、移動手段にはアイコン(✈️🚗🚶)を表示。
最後にシンプルなルートマップをSVGで描画（点と線で主要スポットをつなぐ地図風イラスト）。`,
  spot: `【追加】各スポットをカード形式で表示。評価を星(★)で表示。カテゴリごとに色分け。
地図風のシンプルなSVGイラスト(点と線)でスポット位置関係を示してください。`,
  pack: `【追加】持ち物をカテゴリ別カードで表示。チェックリスト形式(☐)で、重要度を色分け（赤=必須、黄=推奨、灰=あると便利）。`,

  // Design
  logo: `【追加】3つのロゴコンセプトをSVGで実際に描画（各200x200px）。ブランド名・シンボル・配色を含む。横並びに配置。`,
  color: `【追加】カラースウォッチを丸い円(60x60px)で表示、HEXコード付き。メイン/サブ/アクセントに分類。グラデーション例も表示。`,
  mockup: `【追加】モバイルUIモックアップをHTML/CSSで実際に描画。375x667pxのスマホフレーム(角丸+影)内にUI要素を配置。`,
  thumbnail: `【追加】YouTubeサムネイル(16:9比率)をHTML/CSSで実際にデザイン。グラデーション背景、大きな太字テキスト、インパクトのある配色。`,

  // Finance / Money
  invoice: `【追加】請求書をテーブルレイアウトで表示。ヘッダーに会社名、明細行、合計金額は大きく強調。`,
  budget: `【追加】予算をSVGの棒グラフ/円グラフで視覚化。カテゴリごとに色分け。`,

  // Food
  recipe: `【追加】レシピをカード形式で表示。調理時間・難易度バッジ付き。材料リストと手順をステップ番号付きで。`,
  calorie: `【追加】栄養素をプログレスバーで視覚化。カロリーは大きく円形ゲージ風に。PFC比率をSVG円グラフで表示。`,
  arrange: `【追加】盛り付けレイアウトをSVGで描画。皿の上の配置を図解。`,

  // Health / Fitness
  menu: `【追加】トレーニングメニューをタイムライン形式で。セット数・回数をバッジ表示。部位ごとに色分け。`,
  routine: `【追加】ルーティンをタイムライン形式で表示。時間帯を色グラデーションで区別（朝=暖色、夜=寒色）。`,

  // Education
  summary: `【追加】要約をマインドマップ風にSVGで視覚化。キーポイントをカード化して接続線で結ぶ。`,
  quiz: `【追加】クイズをインタラクティブなカード形式で。選択肢をボタン風に。正解は目立つ色で。`,

  // Real estate / Interior
  floor: `【追加】間取り/家具配置をSVGで描画。部屋の形を長方形で表し、家具アイコンを配置。`,
  interior: `【追加】インテリア提案をムードボード風に。色パレットスウォッチ付き。`,
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

    const toolExtra = (toolId && TOOL_EXTRAS[toolId]) ? "\n" + TOOL_EXTRAS[toolId] : "";

    const client = new Anthropic();
    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4096,
      system:
        aiPrompt +
        localeInstruction +
        "\n\n" + RICH_HTML_BASE +
        toolExtra,
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
