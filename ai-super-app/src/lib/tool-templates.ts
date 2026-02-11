// Tool-specific JSON prompts and HTML renderers
// Strategy: AI outputs structured JSON → Server renders purpose-built HTML

interface ToolTemplate {
  prompt: string;
  render: (raw: string) => string;
}

function parseJSON(raw: string): unknown | null {
  try {
    // Try to extract JSON from markdown code block or raw text
    const m = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    const str = m ? m[1].trim() : raw.trim();
    return JSON.parse(str);
  } catch {
    return null;
  }
}

const S = `-apple-system,BlinkMacSystemFont,'Segoe UI','Hiragino Sans',sans-serif`;

// ============================================================
// LOGO TOOL
// ============================================================
const logo: ToolTemplate = {
  prompt: `必ず以下のJSON形式のみで回答してください（JSONだけ、説明テキスト不要）:
{
  "concepts": [
    {
      "name": "コンセプト名",
      "tagline": "一言説明",
      "symbol": "シンボルの詳しい形状（例:六角形の中にM、円形の波線、三角を組み合わせた鳥）",
      "colors": { "primary": "#hex色", "secondary": "#hex色", "bg": "#hex色" },
      "fontStyle": "sans-serif|serif|monospace"
    }
  ]
}
3つのコンセプトを提案してください。`,
  render: (raw: string) => {
    const d = parseJSON(raw) as { concepts: Array<{
      name: string; tagline: string; symbol: string;
      colors: { primary: string; secondary: string; bg: string };
      fontStyle: string;
    }> } | null;
    if (!d?.concepts) return "";

    let html = `<div style="font-family:${S};max-width:480px;margin:0 auto;">`;
    html += `<div style="text-align:center;margin-bottom:20px;font-size:15px;font-weight:700;color:#1e293b;">ロゴコンセプト提案</div>`;

    d.concepts.forEach((c, i) => {
      const p = c.colors?.primary || "#667eea";
      const s = c.colors?.secondary || "#764ba2";
      const bg = c.colors?.bg || "#f8fafc";
      const font = c.fontStyle === "serif" ? "Georgia,serif" : c.fontStyle === "monospace" ? "'Courier New',monospace" : `${S}`;
      const brandName = c.name || `Concept ${i + 1}`;

      // Generate SVG logo
      const svgs = [
        // Pattern 1: Circle with initial
        `<svg viewBox="0 0 120 120" width="120" height="120"><defs><linearGradient id="g${i}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${p}"/><stop offset="100%" style="stop-color:${s}"/></linearGradient></defs><circle cx="60" cy="60" r="54" fill="url(#g${i})"/><text x="60" y="72" text-anchor="middle" font-size="48" font-weight="bold" fill="#fff" font-family="${font}">${brandName.charAt(0)}</text></svg>`,
        // Pattern 2: Rounded square
        `<svg viewBox="0 0 120 120" width="120" height="120"><defs><linearGradient id="h${i}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${p}"/><stop offset="100%" style="stop-color:${s}"/></linearGradient></defs><rect x="10" y="10" width="100" height="100" rx="24" fill="url(#h${i})"/><text x="60" y="72" text-anchor="middle" font-size="42" font-weight="bold" fill="#fff" font-family="${font}">${brandName.slice(0, 2)}</text></svg>`,
        // Pattern 3: Hexagon
        `<svg viewBox="0 0 120 120" width="120" height="120"><defs><linearGradient id="j${i}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${p}"/><stop offset="100%" style="stop-color:${s}"/></linearGradient></defs><polygon points="60,6 110,33 110,87 60,114 10,87 10,33" fill="url(#j${i})"/><text x="60" y="72" text-anchor="middle" font-size="36" font-weight="bold" fill="#fff" font-family="${font}">${brandName.charAt(0)}</text></svg>`,
      ];

      html += `<div style="background:${bg};border-radius:16px;padding:20px;margin-bottom:16px;border:1px solid #e2e8f0;">
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px;">
          ${svgs[i % 3]}
          <div>
            <div style="font-size:18px;font-weight:800;color:${p};font-family:${font};">${brandName}</div>
            <div style="font-size:12px;color:#64748b;margin-top:4px;">${c.tagline || ""}</div>
          </div>
        </div>
        <div style="font-size:12px;color:#475569;margin-bottom:12px;">${c.symbol || ""}</div>
        <div style="display:flex;gap:8px;align-items:center;">
          <div style="width:32px;height:32px;border-radius:50%;background:${p};border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.15);"></div>
          <div style="width:32px;height:32px;border-radius:50%;background:${s};border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,0.15);"></div>
          <div style="width:32px;height:32px;border-radius:50%;background:${bg};border:2px solid #e2e8f0;box-shadow:0 1px 3px rgba(0,0,0,0.15);"></div>
          <span style="font-size:10px;color:#94a3b8;margin-left:4px;">${p} / ${s}</span>
        </div>
      </div>`;
    });

    html += `</div>`;
    return html;
  },
};

// ============================================================
// TRAVEL PLAN TOOL
// ============================================================
const plan: ToolTemplate = {
  prompt: `必ず以下のJSON形式のみで回答してください（JSONだけ、説明テキスト不要）:
{
  "title": "旅行プランのタイトル",
  "days": [
    {
      "day": 1,
      "theme": "この日のテーマ",
      "activities": [
        { "time": "09:00", "title": "アクティビティ名", "detail": "詳細説明（場所、所要時間など）", "icon": "✈️", "cost": "¥5,000" }
      ],
      "hotel": { "name": "ホテル名", "area": "エリア", "price": "¥25,000/泊", "rating": 4.5 }
    }
  ],
  "budget": { "transport": 150000, "hotel": 120000, "food": 50000, "activity": 30000, "other": 20000 },
  "tips": ["ポイント1", "ポイント2", "ポイント3"]
}
各日に3-5個のアクティビティ、ホテル情報を必ず含めてください。予算は円で。`,
  render: (raw: string) => {
    const d = parseJSON(raw) as {
      title: string;
      days: Array<{
        day: number; theme: string;
        activities: Array<{ time: string; title: string; detail: string; icon: string; cost: string }>;
        hotel?: { name: string; area: string; price: string; rating: number };
      }>;
      budget: Record<string, number>;
      tips: string[];
    } | null;
    if (!d?.days) return "";

    const gradients = ["#667eea,#764ba2", "#f093fb,#f5576c", "#4facfe,#00f2fe", "#43e97b,#38f9d7", "#fa709a,#fee140", "#a18cd1,#fbc2eb", "#ffecd2,#fcb69f"];

    let html = `<div style="font-family:${S};max-width:480px;margin:0 auto;">`;
    // Title
    html += `<div style="background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;padding:20px;border-radius:16px;margin-bottom:20px;text-align:center;">
      <div style="font-size:20px;font-weight:800;">${d.title || "旅行プラン"}</div>
      <div style="font-size:12px;opacity:0.8;margin-top:4px;">${d.days.length}日間のプラン</div>
    </div>`;

    // Days
    d.days.forEach((day, di) => {
      const g = gradients[di % gradients.length];
      html += `<div style="margin-bottom:20px;">`;
      // Day header
      html += `<div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
        <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,${g});display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:16px;flex-shrink:0;">Day${day.day}</div>
        <div style="font-size:14px;font-weight:700;color:#1e293b;">${day.theme || ""}</div>
      </div>`;

      // Timeline
      day.activities?.forEach((a, ai) => {
        const isLast = ai === (day.activities?.length || 0) - 1;
        html += `<div style="display:flex;gap:12px;margin-left:23px;padding-left:24px;border-left:2px solid ${isLast ? "transparent" : "#e2e8f0"};padding-bottom:${isLast ? "4" : "12"}px;">
          <div style="position:relative;">
            <div style="position:absolute;left:-33px;top:2px;width:20px;height:20px;border-radius:50%;background:#fff;border:2px solid #cbd5e1;display:flex;align-items:center;justify-content:center;font-size:10px;">${a.icon || "📍"}</div>
          </div>
          <div style="background:#fff;border-radius:12px;padding:12px 14px;flex:1;box-shadow:0 1px 4px rgba(0,0,0,0.06);border:1px solid #f1f5f9;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:11px;color:#6366f1;font-weight:700;">${a.time || ""}</span>
              ${a.cost ? `<span style="font-size:10px;color:#059669;background:#ecfdf5;padding:2px 8px;border-radius:99px;font-weight:600;">${a.cost}</span>` : ""}
            </div>
            <div style="font-size:13px;font-weight:700;color:#1e293b;margin-top:4px;">${a.title}</div>
            <div style="font-size:11px;color:#64748b;margin-top:2px;line-height:1.5;">${a.detail || ""}</div>
          </div>
        </div>`;
      });

      // Hotel
      if (day.hotel) {
        const h = day.hotel;
        const stars = "★".repeat(Math.floor(h.rating || 4)) + (h.rating % 1 >= 0.5 ? "☆" : "");
        html += `<div style="margin-left:23px;padding-left:24px;margin-top:8px;">
          <div style="background:linear-gradient(135deg,#fef3c7,#fde68a);border-radius:12px;padding:12px 14px;border:1px solid #fcd34d;">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
              <span style="font-size:14px;">🏨</span>
              <span style="font-size:12px;font-weight:700;color:#92400e;">${h.name}</span>
            </div>
            <div style="display:flex;gap:12px;font-size:11px;color:#a16207;">
              <span>📍 ${h.area || ""}</span>
              <span style="color:#d97706;font-weight:600;">${stars}</span>
              <span style="font-weight:700;">${h.price || ""}</span>
            </div>
          </div>
        </div>`;
      }
      html += `</div>`;
    });

    // Budget
    if (d.budget) {
      const entries = Object.entries(d.budget).filter(([, v]) => v > 0);
      const total = entries.reduce((s, [, v]) => s + v, 0);
      const budgetColors = ["#6366f1", "#ec4899", "#14b8a6", "#f59e0b", "#8b5cf6", "#06b6d4"];
      const labels: Record<string, string> = { transport: "交通費", hotel: "宿泊費", food: "食費", activity: "アクティビティ", other: "その他", shopping: "買い物" };

      html += `<div style="background:#fff;border-radius:16px;padding:16px;margin:20px 0;border:1px solid #e2e8f0;box-shadow:0 1px 4px rgba(0,0,0,0.06);">
        <div style="font-size:14px;font-weight:700;color:#1e293b;margin-bottom:12px;">💰 予算概算</div>
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
          <svg viewBox="0 0 100 100" width="100" height="100">`;
      let angle = 0;
      entries.forEach(([, v], i) => {
        const pct = v / total;
        const a1 = angle * Math.PI / 180;
        angle += pct * 360;
        const a2 = angle * Math.PI / 180;
        const large = pct > 0.5 ? 1 : 0;
        const x1 = 50 + 40 * Math.cos(a1), y1 = 50 + 40 * Math.sin(a1);
        const x2 = 50 + 40 * Math.cos(a2), y2 = 50 + 40 * Math.sin(a2);
        html += `<path d="M50,50 L${x1},${y1} A40,40 0 ${large},1 ${x2},${y2} Z" fill="${budgetColors[i % budgetColors.length]}"/>`;
      });
      html += `<text x="50" y="48" text-anchor="middle" font-size="8" font-weight="bold" fill="#1e293b">合計</text>
        <text x="50" y="60" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">¥${total.toLocaleString()}</text>
        </svg><div style="flex:1;">`;
      entries.forEach(([k, v], i) => {
        html += `<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
          <div style="width:10px;height:10px;border-radius:3px;background:${budgetColors[i % budgetColors.length]};flex-shrink:0;"></div>
          <span style="font-size:11px;color:#64748b;flex:1;">${labels[k] || k}</span>
          <span style="font-size:11px;font-weight:700;color:#1e293b;">¥${v.toLocaleString()}</span>
        </div>`;
      });
      html += `</div></div></div>`;
    }

    // Tips
    if (d.tips?.length) {
      html += `<div style="background:#f0fdf4;border-radius:12px;padding:14px;border:1px solid #bbf7d0;">
        <div style="font-size:13px;font-weight:700;color:#166534;margin-bottom:8px;">💡 旅のポイント</div>`;
      d.tips.forEach((tip) => {
        html += `<div style="font-size:12px;color:#15803d;padding:4px 0;display:flex;gap:6px;">
          <span style="color:#22c55e;">✓</span><span>${tip}</span>
        </div>`;
      });
      html += `</div>`;
    }

    html += `</div>`;
    return html;
  },
};

// ============================================================
// COLOR PALETTE TOOL
// ============================================================
const color: ToolTemplate = {
  prompt: `必ず以下のJSON形式のみで回答してください（JSONだけ、説明テキスト不要）:
{
  "name": "パレット名",
  "description": "パレットの説明",
  "colors": [
    { "hex": "#hex色", "name": "色名", "usage": "使用用途（メイン/アクセント/背景など）" }
  ],
  "combinations": [
    { "name": "組み合わせ名（例:ヘッダー）", "bg": "#hex色", "text": "#hex色", "accent": "#hex色" }
  ]
}
5-7色のパレットを提案してください。`,
  render: (raw: string) => {
    const d = parseJSON(raw) as {
      name: string; description: string;
      colors: Array<{ hex: string; name: string; usage: string }>;
      combinations: Array<{ name: string; bg: string; text: string; accent: string }>;
    } | null;
    if (!d?.colors) return "";

    let html = `<div style="font-family:${S};max-width:480px;margin:0 auto;">`;
    html += `<div style="text-align:center;margin-bottom:16px;">
      <div style="font-size:16px;font-weight:800;color:#1e293b;">${d.name || "カラーパレット"}</div>
      <div style="font-size:12px;color:#64748b;margin-top:4px;">${d.description || ""}</div>
    </div>`;

    // Color swatches
    html += `<div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-bottom:20px;">`;
    d.colors.forEach((c) => {
      const isDark = parseInt(c.hex.slice(1, 3), 16) * 0.299 + parseInt(c.hex.slice(3, 5), 16) * 0.587 + parseInt(c.hex.slice(5, 7), 16) * 0.114 < 128;
      html += `<div style="text-align:center;">
        <div style="width:64px;height:64px;border-radius:16px;background:${c.hex};box-shadow:0 2px 8px ${c.hex}40;display:flex;align-items:center;justify-content:center;">
          <span style="font-size:9px;color:${isDark ? "#fff" : "#000"};opacity:0.7;">${c.hex}</span>
        </div>
        <div style="font-size:10px;font-weight:600;color:#1e293b;margin-top:6px;">${c.name}</div>
        <div style="font-size:9px;color:#94a3b8;">${c.usage}</div>
      </div>`;
    });
    html += `</div>`;

    // Combinations preview
    if (d.combinations?.length) {
      html += `<div style="font-size:13px;font-weight:700;color:#1e293b;margin-bottom:8px;">組み合わせプレビュー</div>`;
      d.combinations.forEach((c) => {
        html += `<div style="background:${c.bg};color:${c.text};padding:16px;border-radius:12px;margin-bottom:8px;border:1px solid #e2e8f0;">
          <div style="font-size:14px;font-weight:700;margin-bottom:4px;">${c.name}</div>
          <div style="font-size:11px;opacity:0.8;">サンプルテキスト — The quick brown fox</div>
          ${c.accent ? `<div style="display:inline-block;background:${c.accent};color:#fff;padding:4px 12px;border-radius:6px;font-size:11px;font-weight:600;margin-top:8px;">ボタン</div>` : ""}
        </div>`;
      });
    }

    html += `</div>`;
    return html;
  },
};

// ============================================================
// MOCKUP TOOL
// ============================================================
const mockup: ToolTemplate = {
  prompt: `必ず以下のJSON形式のみで回答してください（JSONだけ、説明テキスト不要）:
{
  "screenName": "画面名",
  "style": "スタイル説明",
  "colors": { "primary": "#hex色", "bg": "#hex色", "card": "#hex色", "text": "#hex色" },
  "header": { "title": "タイトル", "subtitle": "サブタイトル" },
  "sections": [
    {
      "type": "hero|cards|list|form|stats|nav",
      "title": "セクション名",
      "items": [
        { "icon": "絵文字", "title": "項目名", "subtitle": "説明", "value": "値(任意)" }
      ]
    }
  ],
  "bottomNav": [{ "icon": "絵文字", "label": "ラベル", "active": true }]
}`,
  render: (raw: string) => {
    const d = parseJSON(raw) as {
      screenName: string; style: string;
      colors: { primary: string; bg: string; card: string; text: string };
      header: { title: string; subtitle: string };
      sections: Array<{ type: string; title: string; items: Array<{ icon: string; title: string; subtitle: string; value: string }> }>;
      bottomNav: Array<{ icon: string; label: string; active: boolean }>;
    } | null;
    if (!d) return "";

    const c = d.colors || { primary: "#6366f1", bg: "#f8fafc", card: "#ffffff", text: "#1e293b" };

    let html = `<div style="font-family:${S};max-width:375px;margin:0 auto;background:${c.bg};border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);border:8px solid #1e293b;position:relative;">`;
    // Status bar
    html += `<div style="background:${c.primary};padding:8px 16px 0;display:flex;justify-content:space-between;align-items:center;">
      <span style="font-size:10px;color:#fff;font-weight:600;">9:41</span>
      <span style="font-size:10px;color:#fff;">📶 🔋</span>
    </div>`;
    // Header
    html += `<div style="background:${c.primary};padding:12px 16px 20px;">
      <div style="font-size:20px;font-weight:800;color:#fff;">${d.header?.title || d.screenName || "App"}</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.7);margin-top:2px;">${d.header?.subtitle || ""}</div>
    </div>`;
    // Sections
    d.sections?.forEach((sec) => {
      html += `<div style="padding:12px 16px;">`;
      if (sec.title) html += `<div style="font-size:13px;font-weight:700;color:${c.text};margin-bottom:8px;">${sec.title}</div>`;
      if (sec.type === "cards" || sec.type === "stats") {
        html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">`;
        sec.items?.forEach((item) => {
          html += `<div style="background:${c.card};padding:12px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.06);">
            <div style="font-size:18px;margin-bottom:4px;">${item.icon || ""}</div>
            <div style="font-size:12px;font-weight:700;color:${c.text};">${item.title}</div>
            ${item.value ? `<div style="font-size:16px;font-weight:800;color:${c.primary};margin-top:2px;">${item.value}</div>` : ""}
            <div style="font-size:10px;color:#94a3b8;margin-top:2px;">${item.subtitle || ""}</div>
          </div>`;
        });
        html += `</div>`;
      } else {
        sec.items?.forEach((item) => {
          html += `<div style="display:flex;align-items:center;gap:10px;padding:10px;background:${c.card};border-radius:10px;margin-bottom:6px;box-shadow:0 1px 2px rgba(0,0,0,0.04);">
            <span style="font-size:20px;">${item.icon || "📌"}</span>
            <div style="flex:1;">
              <div style="font-size:12px;font-weight:600;color:${c.text};">${item.title}</div>
              <div style="font-size:10px;color:#94a3b8;">${item.subtitle || ""}</div>
            </div>
            ${item.value ? `<span style="font-size:11px;font-weight:700;color:${c.primary};">${item.value}</span>` : ""}
          </div>`;
        });
      }
      html += `</div>`;
    });
    // Bottom nav
    if (d.bottomNav?.length) {
      html += `<div style="display:flex;border-top:1px solid #e2e8f0;background:${c.card};padding:8px 0 12px;">`;
      d.bottomNav.forEach((n) => {
        html += `<div style="flex:1;text-align:center;opacity:${n.active ? "1" : "0.4"};">
          <div style="font-size:18px;">${n.icon}</div>
          <div style="font-size:9px;font-weight:600;color:${n.active ? c.primary : "#94a3b8"};">${n.label}</div>
        </div>`;
      });
      html += `</div>`;
    }
    html += `</div>`;
    return html;
  },
};

// ============================================================
// THUMBNAIL TOOL
// ============================================================
const thumbnail: ToolTemplate = {
  prompt: `必ず以下のJSON形式のみで回答してください（JSONだけ、説明テキスト不要）:
{
  "title": "メインテキスト（短く、インパクト大）",
  "subtitle": "サブテキスト",
  "style": "dark|light|colorful|gradient",
  "colors": { "bg1": "#hex色", "bg2": "#hex色", "text": "#hex色", "accent": "#hex色" },
  "emoji": "メイン絵文字",
  "badge": "バッジテキスト（例: 衝撃, 必見, 速報）",
  "layout": "center|left|split"
}`,
  render: (raw: string) => {
    const d = parseJSON(raw) as {
      title: string; subtitle: string; style: string;
      colors: { bg1: string; bg2: string; text: string; accent: string };
      emoji: string; badge: string; layout: string;
    } | null;
    if (!d) return "";

    const c = d.colors || { bg1: "#1e1e2e", bg2: "#6366f1", text: "#ffffff", accent: "#fbbf24" };
    html: ``;

    let html = `<div style="font-family:${S};max-width:480px;margin:0 auto;">
      <div style="text-align:center;font-size:12px;color:#64748b;margin-bottom:8px;">YouTubeサムネイルプレビュー</div>
      <div style="aspect-ratio:16/9;background:linear-gradient(135deg,${c.bg1},${c.bg2});border-radius:16px;overflow:hidden;display:flex;align-items:center;justify-content:center;padding:24px;position:relative;box-shadow:0 4px 16px rgba(0,0,0,0.15);">`;

    // Badge
    if (d.badge) {
      html += `<div style="position:absolute;top:16px;left:16px;background:${c.accent};color:#000;padding:4px 12px;border-radius:6px;font-size:12px;font-weight:900;letter-spacing:1px;">${d.badge}</div>`;
    }
    // Emoji
    if (d.emoji) {
      html += `<div style="position:absolute;${d.layout === "left" ? "right:24px;top:50%;transform:translateY(-50%)" : "right:24px;bottom:24px"};font-size:64px;opacity:0.9;">${d.emoji}</div>`;
    }
    // Text
    html += `<div style="${d.layout === "left" ? "text-align:left;padding-right:80px;" : "text-align:center;"}">
        <div style="font-size:28px;font-weight:900;color:${c.text};line-height:1.2;text-shadow:2px 2px 8px rgba(0,0,0,0.3);letter-spacing:-0.5px;">${d.title || ""}</div>
        ${d.subtitle ? `<div style="font-size:14px;color:${c.text};opacity:0.8;margin-top:8px;font-weight:600;">${d.subtitle}</div>` : ""}
      </div>`;

    html += `</div></div>`;
    return html;
  },
};

// ============================================================
// RECIPE TOOL
// ============================================================
const recipe: ToolTemplate = {
  prompt: `必ず以下のJSON形式のみで回答してください（JSONだけ、説明テキスト不要）:
{
  "recipes": [
    {
      "name": "レシピ名",
      "emoji": "料理の絵文字",
      "time": "調理時間",
      "difficulty": "簡単/普通/本格的",
      "servings": "人数",
      "ingredients": [{ "name": "材料名", "amount": "分量" }],
      "steps": ["手順1", "手順2", "手順3"]
    }
  ]
}`,
  render: (raw: string) => {
    const d = parseJSON(raw) as { recipes: Array<{
      name: string; emoji: string; time: string; difficulty: string; servings: string;
      ingredients: Array<{ name: string; amount: string }>;
      steps: string[];
    }> } | null;
    if (!d?.recipes) return "";

    const diffColors: Record<string, string> = { "簡単": "#22c55e", "普通": "#f59e0b", "本格的": "#ef4444" };

    let html = `<div style="font-family:${S};max-width:480px;margin:0 auto;">`;
    d.recipes.forEach((r) => {
      const dc = diffColors[r.difficulty] || "#6366f1";
      html += `<div style="background:#fff;border-radius:16px;overflow:hidden;margin-bottom:16px;box-shadow:0 2px 8px rgba(0,0,0,0.06);border:1px solid #f1f5f9;">
        <div style="background:linear-gradient(135deg,#ff9a56,#ff6a88);padding:16px;color:#fff;">
          <div style="font-size:28px;margin-bottom:4px;">${r.emoji || "🍳"}</div>
          <div style="font-size:18px;font-weight:800;">${r.name}</div>
          <div style="display:flex;gap:8px;margin-top:8px;">
            <span style="background:rgba(255,255,255,0.25);padding:2px 8px;border-radius:99px;font-size:10px;">⏰ ${r.time}</span>
            <span style="background:${dc};padding:2px 8px;border-radius:99px;font-size:10px;">${r.difficulty}</span>
            <span style="background:rgba(255,255,255,0.25);padding:2px 8px;border-radius:99px;font-size:10px;">👤 ${r.servings}</span>
          </div>
        </div>
        <div style="padding:16px;">
          <div style="font-size:13px;font-weight:700;color:#1e293b;margin-bottom:8px;">📝 材料</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:16px;">`;
      r.ingredients?.forEach((ing) => {
        html += `<div style="display:flex;justify-content:space-between;font-size:11px;padding:4px 8px;background:#f8fafc;border-radius:6px;">
          <span style="color:#475569;">${ing.name}</span>
          <span style="color:#1e293b;font-weight:600;">${ing.amount}</span>
        </div>`;
      });
      html += `</div>
          <div style="font-size:13px;font-weight:700;color:#1e293b;margin-bottom:8px;">👨‍🍳 手順</div>`;
      r.steps?.forEach((step, i) => {
        html += `<div style="display:flex;gap:10px;margin-bottom:8px;">
          <div style="width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,#ff9a56,#ff6a88);color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;">${i + 1}</div>
          <div style="font-size:12px;color:#475569;line-height:1.5;padding-top:3px;">${step}</div>
        </div>`;
      });
      html += `</div></div>`;
    });
    html += `</div>`;
    return html;
  },
};

// ============================================================
// CALORIE TOOL
// ============================================================
const calorie: ToolTemplate = {
  prompt: `必ず以下のJSON形式のみで回答してください（JSONだけ、説明テキスト不要）:
{
  "totalCalories": 650,
  "rating": "A/B/C/D（栄養バランス評価）",
  "items": [{ "name": "食品名", "calories": 250, "protein": 10, "fat": 5, "carbs": 30 }],
  "totalNutrients": { "protein": 25, "fat": 20, "carbs": 80 },
  "advice": ["アドバイス1", "アドバイス2"]
}`,
  render: (raw: string) => {
    const d = parseJSON(raw) as {
      totalCalories: number; rating: string;
      items: Array<{ name: string; calories: number; protein: number; fat: number; carbs: number }>;
      totalNutrients: { protein: number; fat: number; carbs: number };
      advice: string[];
    } | null;
    if (!d) return "";

    const ratingColors: Record<string, string> = { A: "#22c55e", B: "#84cc16", C: "#f59e0b", D: "#ef4444" };
    const rc = ratingColors[d.rating] || "#6366f1";

    let html = `<div style="font-family:${S};max-width:480px;margin:0 auto;">`;
    // Calorie header
    html += `<div style="background:linear-gradient(135deg,#667eea,#764ba2);border-radius:16px;padding:20px;color:#fff;text-align:center;margin-bottom:16px;">
      <div style="font-size:12px;opacity:0.8;">推定カロリー</div>
      <div style="font-size:42px;font-weight:900;line-height:1;">${d.totalCalories || 0}</div>
      <div style="font-size:14px;opacity:0.8;">kcal</div>
      <div style="display:inline-block;background:${rc};padding:4px 16px;border-radius:99px;font-size:13px;font-weight:800;margin-top:8px;">評価: ${d.rating || "B"}</div>
    </div>`;

    // PFC bars
    if (d.totalNutrients) {
      const n = d.totalNutrients;
      const total = n.protein + n.fat + n.carbs;
      const nutrients = [
        { name: "タンパク質", val: n.protein, color: "#ef4444", unit: "g" },
        { name: "脂質", val: n.fat, color: "#f59e0b", unit: "g" },
        { name: "炭水化物", val: n.carbs, color: "#3b82f6", unit: "g" },
      ];
      html += `<div style="background:#fff;border-radius:12px;padding:14px;margin-bottom:12px;border:1px solid #e2e8f0;">
        <div style="font-size:13px;font-weight:700;color:#1e293b;margin-bottom:10px;">PFCバランス</div>
        <div style="display:flex;height:12px;border-radius:6px;overflow:hidden;margin-bottom:12px;">`;
      nutrients.forEach((nt) => {
        html += `<div style="width:${(nt.val / total * 100).toFixed(1)}%;background:${nt.color};"></div>`;
      });
      html += `</div>`;
      nutrients.forEach((nt) => {
        html += `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <div style="width:10px;height:10px;border-radius:3px;background:${nt.color};"></div>
          <span style="font-size:11px;color:#64748b;flex:1;">${nt.name}</span>
          <span style="font-size:12px;font-weight:700;color:#1e293b;">${nt.val}${nt.unit}</span>
        </div>`;
      });
      html += `</div>`;
    }

    // Items
    if (d.items?.length) {
      html += `<div style="background:#fff;border-radius:12px;padding:14px;margin-bottom:12px;border:1px solid #e2e8f0;">
        <div style="font-size:13px;font-weight:700;color:#1e293b;margin-bottom:8px;">内訳</div>`;
      d.items.forEach((item) => {
        html += `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9;font-size:12px;">
          <span style="color:#475569;">${item.name}</span>
          <span style="font-weight:700;color:#1e293b;">${item.calories} kcal</span>
        </div>`;
      });
      html += `</div>`;
    }

    // Advice
    if (d.advice?.length) {
      html += `<div style="background:#eff6ff;border-radius:12px;padding:14px;border:1px solid #bfdbfe;">
        <div style="font-size:13px;font-weight:700;color:#1e40af;margin-bottom:6px;">💡 アドバイス</div>`;
      d.advice.forEach((a) => {
        html += `<div style="font-size:11px;color:#1e40af;padding:3px 0;">• ${a}</div>`;
      });
      html += `</div>`;
    }
    html += `</div>`;
    return html;
  },
};

// ============================================================
// EXPORTS
// ============================================================
export const TOOL_TEMPLATES: Record<string, ToolTemplate> = {
  logo, color, mockup, thumbnail, plan, recipe, calorie,
  // Aliases: some bundles have same tool IDs
  spot: { ...plan, prompt: plan.prompt.replace("旅行プランのタイトル", "おすすめスポット") },
};

export function getToolPrompt(toolId: string): string | null {
  return TOOL_TEMPLATES[toolId]?.prompt || null;
}

export function renderToolHtml(toolId: string, rawOutput: string): string | null {
  const tmpl = TOOL_TEMPLATES[toolId];
  if (!tmpl) return null;
  try {
    return tmpl.render(rawOutput);
  } catch {
    return null;
  }
}
