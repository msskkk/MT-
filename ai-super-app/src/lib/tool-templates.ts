// Tool-specific JSON prompts + HTML renderers with AI image generation
// Image generation: Pollinations.ai (free, no API key)

interface ToolTemplate {
  prompt: string;
  render: (raw: string, userInput: string) => string;
}

// Robust JSON parser: handles ```json blocks, truncated JSON, etc.
function parseJSON(raw: string): unknown | null {
  // Extract from code block
  const m = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  let str = m ? m[1].trim() : raw.trim();
  // If starts with text before {, strip it
  const braceIdx = str.indexOf("{");
  if (braceIdx > 0) str = str.slice(braceIdx);
  // Try parsing as-is
  try { return JSON.parse(str); } catch {}
  // Try fixing truncated JSON: add closing brackets
  for (let i = 0; i < 10; i++) {
    str += str.includes("[") && !str.endsWith("]") ? "]" : "}";
    try { return JSON.parse(str); } catch {}
  }
  return null;
}

// Image URL generator (Pollinations.ai - free FLUX model)
function imgUrl(prompt: string, w = 512, h = 512, seed?: number): string {
  const s = seed ?? Math.floor(Math.random() * 100000);
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${w}&height=${h}&seed=${s}&nologo=true`;
}

const F = `-apple-system,BlinkMacSystemFont,'Segoe UI','Hiragino Sans',sans-serif`;

// ═══════════════════════════════════════════════
//  LOGO
// ═══════════════════════════════════════════════
const logo: ToolTemplate = {
  prompt: `必ずJSON形式のみで回答（他のテキスト不要）:
{"concepts":[{"name":"コンセプト名","tagline":"一言説明","imagePrompt":"English prompt for AI image generator: professional logo design, [describe style/colors/shape], white background, minimal, vector style","colors":{"primary":"#hex","secondary":"#hex"}}]}
3つのコンセプトを提案。imagePromptは英語で、ロゴ生成AI用の詳細なプロンプトを書いてください。`,
  render: (raw, userInput) => {
    const d = parseJSON(raw) as { concepts: Array<{
      name: string; tagline: string; imagePrompt: string;
      colors: { primary: string; secondary: string };
    }> } | null;
    if (!d?.concepts?.length) return "";

    let html = `<div style="font-family:${F};max-width:480px;margin:0 auto;">
      <div style="text-align:center;padding:16px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:16px;color:#fff;margin-bottom:20px;">
        <div style="font-size:18px;font-weight:800;">ロゴデザイン提案</div>
        <div style="font-size:12px;opacity:0.8;margin-top:4px;">${userInput.split('\n')[0]}</div>
      </div>`;

    d.concepts.forEach((c, i) => {
      const p = c.colors?.primary || "#667eea";
      const s = c.colors?.secondary || "#764ba2";
      const prompt = c.imagePrompt || `professional modern logo design for ${c.name}, minimal, vector, white background`;
      html += `<div style="background:#fff;border-radius:16px;overflow:hidden;margin-bottom:16px;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
        <div style="aspect-ratio:4/3;background:#f8fafc;display:flex;align-items:center;justify-content:center;overflow:hidden;">
          <img src="${imgUrl(prompt, 768, 576, i * 1000)}" style="width:100%;height:100%;object-fit:cover;" alt="${c.name}" loading="lazy"/>
        </div>
        <div style="padding:16px;">
          <div style="font-size:16px;font-weight:800;color:#1e293b;">${c.name}</div>
          <div style="font-size:12px;color:#64748b;margin-top:2px;">${c.tagline || ""}</div>
          <div style="display:flex;gap:8px;margin-top:12px;align-items:center;">
            <div style="width:28px;height:28px;border-radius:50%;background:${p};box-shadow:0 1px 4px ${p}60;"></div>
            <div style="width:28px;height:28px;border-radius:50%;background:${s};box-shadow:0 1px 4px ${s}60;"></div>
            <span style="font-size:10px;color:#94a3b8;margin-left:4px;">${p} / ${s}</span>
          </div>
        </div>
      </div>`;
    });
    html += `</div>`;
    return html;
  },
};

// ═══════════════════════════════════════════════
//  TRAVEL PLAN
// ═══════════════════════════════════════════════
const plan: ToolTemplate = {
  prompt: `必ずJSON形式のみで回答（他のテキスト不要）:
{"title":"旅行タイトル","days":[{"day":1,"theme":"テーマ","imagePrompt":"English: beautiful photo of [specific place/scenery], travel photography","activities":[{"time":"09:00","title":"名称","detail":"詳細","icon":"絵文字","cost":"¥5000"}],"hotel":{"name":"ホテル名","area":"エリア","price":"¥25000/泊","rating":4.5}}],"budget":{"transport":150000,"hotel":120000,"food":50000,"activity":30000},"tips":["tip1","tip2"]}
imagePromptは各日の目玉スポットの英語写真プロンプト。日数が多い場合は主要な日のみ詳細に（最大5日分）。`,
  render: (raw, _userInput) => {
    const d = parseJSON(raw) as {
      title: string;
      days: Array<{
        day: number; theme: string; imagePrompt?: string;
        activities: Array<{ time: string; title: string; detail: string; icon: string; cost: string }>;
        hotel?: { name: string; area: string; price: string; rating: number };
      }>;
      budget?: Record<string, number>;
      tips?: string[];
    } | null;
    if (!d?.days?.length) return "";

    const gradients = ["#667eea,#764ba2", "#f093fb,#f5576c", "#4facfe,#00f2fe", "#43e97b,#38f9d7", "#fa709a,#fee140"];
    let html = `<div style="font-family:${F};max-width:480px;margin:0 auto;">`;
    // Title
    html += `<div style="background:linear-gradient(135deg,#4facfe,#00f2fe);color:#fff;padding:20px;border-radius:16px;margin-bottom:20px;text-align:center;">
      <div style="font-size:20px;font-weight:800;">${d.title || "旅行プラン"}</div>
      <div style="font-size:12px;opacity:0.8;margin-top:4px;">${d.days.length}日間</div>
    </div>`;

    d.days.forEach((day, di) => {
      const g = gradients[di % gradients.length];
      // Day photo
      if (day.imagePrompt) {
        html += `<div style="border-radius:16px;overflow:hidden;margin-bottom:4px;position:relative;">
          <img src="${imgUrl(day.imagePrompt, 800, 400, di * 100)}" style="width:100%;aspect-ratio:2/1;object-fit:cover;display:block;" loading="lazy"/>
          <div style="position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,rgba(0,0,0,0.7));padding:12px 16px;">
            <span style="background:linear-gradient(135deg,${g});padding:4px 12px;border-radius:99px;font-size:12px;font-weight:800;color:#fff;">Day ${day.day}</span>
            <div style="font-size:15px;font-weight:700;color:#fff;margin-top:4px;">${day.theme}</div>
          </div>
        </div>`;
      } else {
        html += `<div style="display:flex;align-items:center;gap:12px;margin:16px 0 8px;">
          <div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,${g});display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:14px;flex-shrink:0;">D${day.day}</div>
          <div style="font-size:14px;font-weight:700;color:#1e293b;">${day.theme}</div>
        </div>`;
      }

      // Activities
      day.activities?.forEach((a) => {
        html += `<div style="display:flex;gap:10px;padding:10px 12px;margin:4px 0 4px 20px;background:#fff;border-radius:12px;box-shadow:0 1px 4px rgba(0,0,0,0.05);border-left:3px solid ${g.split(",")[0]};align-items:flex-start;">
          <span style="font-size:18px;margin-top:1px;">${a.icon || "📍"}</span>
          <div style="flex:1;min-width:0;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:11px;color:#6366f1;font-weight:700;">${a.time || ""}</span>
              ${a.cost ? `<span style="font-size:10px;color:#059669;background:#ecfdf5;padding:2px 8px;border-radius:99px;font-weight:600;">${a.cost}</span>` : ""}
            </div>
            <div style="font-size:13px;font-weight:700;color:#1e293b;margin-top:2px;">${a.title}</div>
            ${a.detail ? `<div style="font-size:11px;color:#64748b;margin-top:1px;line-height:1.4;">${a.detail}</div>` : ""}
          </div>
        </div>`;
      });

      // Hotel
      if (day.hotel) {
        const h = day.hotel;
        const stars = "★".repeat(Math.floor(h.rating || 4)) + (h.rating % 1 >= 0.5 ? "☆" : "");
        html += `<div style="margin:8px 0 16px 20px;background:linear-gradient(135deg,#fef3c7,#fde68a);border-radius:12px;padding:12px;border:1px solid #fcd34d;">
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:16px;">🏨</span>
            <span style="font-size:13px;font-weight:700;color:#92400e;">${h.name}</span>
          </div>
          <div style="display:flex;gap:10px;font-size:11px;color:#a16207;margin-top:4px;">
            <span>📍${h.area || ""}</span><span style="color:#d97706;">${stars}</span><span style="font-weight:700;">${h.price || ""}</span>
          </div>
        </div>`;
      }
    });

    // Budget chart
    if (d.budget) {
      const entries = Object.entries(d.budget).filter(([, v]) => v > 0);
      const total = entries.reduce((s, [, v]) => s + v, 0);
      const bc = ["#6366f1", "#ec4899", "#14b8a6", "#f59e0b", "#8b5cf6"];
      const labels: Record<string, string> = { transport: "交通費", hotel: "宿泊費", food: "食費", activity: "アクティビティ", other: "その他" };
      html += `<div style="background:#fff;border-radius:16px;padding:16px;margin:16px 0;border:1px solid #e2e8f0;">
        <div style="font-size:14px;font-weight:700;color:#1e293b;margin-bottom:12px;">💰 予算: ¥${total.toLocaleString()}</div>`;
      entries.forEach(([k, v], i) => {
        const pct = Math.round(v / total * 100);
        html += `<div style="margin-bottom:8px;">
          <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px;">
            <span style="color:#64748b;">${labels[k] || k}</span><span style="font-weight:700;color:#1e293b;">¥${v.toLocaleString()} (${pct}%)</span>
          </div>
          <div style="height:8px;background:#f1f5f9;border-radius:4px;overflow:hidden;">
            <div style="height:100%;width:${pct}%;background:${bc[i % bc.length]};border-radius:4px;"></div>
          </div>
        </div>`;
      });
      html += `</div>`;
    }

    // Tips
    if (d.tips?.length) {
      html += `<div style="background:#f0fdf4;border-radius:12px;padding:14px;border:1px solid #bbf7d0;">
        <div style="font-size:13px;font-weight:700;color:#166534;margin-bottom:6px;">💡 ポイント</div>`;
      d.tips.forEach((t) => { html += `<div style="font-size:11px;color:#15803d;padding:3px 0;">✓ ${t}</div>`; });
      html += `</div>`;
    }
    html += `</div>`;
    return html;
  },
};

// ═══════════════════════════════════════════════
//  COLOR PALETTE
// ═══════════════════════════════════════════════
const color: ToolTemplate = {
  prompt: `必ずJSON形式のみで回答（他のテキスト不要）:
{"name":"パレット名","description":"説明","colors":[{"hex":"#hex","name":"色名","usage":"用途"}],"combinations":[{"name":"組み合わせ名","bg":"#hex","text":"#hex","accent":"#hex"}]}
5-7色提案。`,
  render: (raw, _userInput) => {
    const d = parseJSON(raw) as { name: string; description: string; colors: Array<{ hex: string; name: string; usage: string }>; combinations?: Array<{ name: string; bg: string; text: string; accent: string }> } | null;
    if (!d?.colors?.length) return "";
    let html = `<div style="font-family:${F};max-width:480px;margin:0 auto;">
      <div style="text-align:center;margin-bottom:16px;"><div style="font-size:16px;font-weight:800;color:#1e293b;">${d.name || ""}</div><div style="font-size:12px;color:#64748b;margin-top:4px;">${d.description || ""}</div></div>
      <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-bottom:20px;">`;
    d.colors.forEach((c) => {
      const lum = parseInt(c.hex.slice(1, 3), 16) * 0.299 + parseInt(c.hex.slice(3, 5), 16) * 0.587 + parseInt(c.hex.slice(5, 7), 16) * 0.114;
      html += `<div style="text-align:center;"><div style="width:64px;height:64px;border-radius:16px;background:${c.hex};box-shadow:0 2px 8px ${c.hex}40;display:flex;align-items:center;justify-content:center;"><span style="font-size:9px;color:${lum < 128 ? "#fff" : "#000"};opacity:0.7;">${c.hex}</span></div>
        <div style="font-size:10px;font-weight:600;color:#1e293b;margin-top:6px;">${c.name}</div><div style="font-size:9px;color:#94a3b8;">${c.usage}</div></div>`;
    });
    html += `</div>`;
    if (d.combinations?.length) {
      html += `<div style="font-size:13px;font-weight:700;color:#1e293b;margin-bottom:8px;">組み合わせ</div>`;
      d.combinations.forEach((c) => {
        html += `<div style="background:${c.bg};color:${c.text};padding:16px;border-radius:12px;margin-bottom:8px;">
          <div style="font-size:14px;font-weight:700;">${c.name}</div><div style="font-size:11px;opacity:0.8;">Sample text</div>
          ${c.accent ? `<div style="display:inline-block;background:${c.accent};color:#fff;padding:4px 12px;border-radius:6px;font-size:11px;font-weight:600;margin-top:8px;">Button</div>` : ""}
        </div>`;
      });
    }
    html += `</div>`;
    return html;
  },
};

// ═══════════════════════════════════════════════
//  THUMBNAIL
// ═══════════════════════════════════════════════
const thumbnail: ToolTemplate = {
  prompt: `必ずJSON形式のみで回答（他のテキスト不要）:
{"title":"メインテキスト","subtitle":"サブテキスト","imagePrompt":"English: eye-catching YouTube thumbnail, [describe visual], vibrant, high contrast, 16:9","badge":"バッジ(例:必見,衝撃)","colors":{"text":"#hex","accent":"#hex"}}`,
  render: (raw, _userInput) => {
    const d = parseJSON(raw) as { title: string; subtitle: string; imagePrompt: string; badge: string; colors: { text: string; accent: string } } | null;
    if (!d) return "";
    const prompt = d.imagePrompt || `eye-catching YouTube thumbnail design, vibrant, ${d.title}`;
    const tc = d.colors?.text || "#ffffff";
    const ac = d.colors?.accent || "#ff0044";
    let html = `<div style="font-family:${F};max-width:480px;margin:0 auto;">
      <div style="text-align:center;font-size:12px;color:#64748b;margin-bottom:8px;">YouTubeサムネイル</div>
      <div style="aspect-ratio:16/9;border-radius:16px;overflow:hidden;position:relative;box-shadow:0 4px 20px rgba(0,0,0,0.15);">
        <img src="${imgUrl(prompt, 1280, 720)}" style="width:100%;height:100%;object-fit:cover;display:block;" loading="lazy"/>
        <div style="position:absolute;inset:0;background:linear-gradient(transparent 30%,rgba(0,0,0,0.6));display:flex;flex-direction:column;justify-content:flex-end;padding:20px;">
          ${d.badge ? `<div style="position:absolute;top:12px;left:12px;background:${ac};color:#fff;padding:4px 14px;border-radius:6px;font-size:13px;font-weight:900;">${d.badge}</div>` : ""}
          <div style="font-size:24px;font-weight:900;color:${tc};text-shadow:2px 2px 8px rgba(0,0,0,0.5);line-height:1.2;">${d.title || ""}</div>
          ${d.subtitle ? `<div style="font-size:13px;color:${tc};opacity:0.9;margin-top:4px;text-shadow:1px 1px 4px rgba(0,0,0,0.5);">${d.subtitle}</div>` : ""}
        </div>
      </div>
    </div>`;
    return html;
  },
};

// ═══════════════════════════════════════════════
//  MOCKUP
// ═══════════════════════════════════════════════
const mockup: ToolTemplate = {
  prompt: `必ずJSON形式のみで回答（他のテキスト不要）:
{"screenName":"画面名","colors":{"primary":"#hex","bg":"#hex","text":"#hex"},"header":{"title":"タイトル","subtitle":"サブ"},"sections":[{"type":"cards|list|hero","title":"セクション名","items":[{"icon":"絵文字","title":"名前","subtitle":"説明","value":"値"}]}],"bottomNav":[{"icon":"絵文字","label":"ラベル","active":true}]}`,
  render: (raw, _userInput) => {
    const d = parseJSON(raw) as { screenName: string; colors: { primary: string; bg: string; text: string }; header: { title: string; subtitle: string }; sections: Array<{ type: string; title: string; items: Array<{ icon: string; title: string; subtitle: string; value: string }> }>; bottomNav: Array<{ icon: string; label: string; active: boolean }> } | null;
    if (!d) return "";
    const c = d.colors || { primary: "#6366f1", bg: "#f8fafc", text: "#1e293b" };
    let html = `<div style="font-family:${F};max-width:375px;margin:0 auto;background:${c.bg};border-radius:28px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.12);border:6px solid #1e293b;">
      <div style="background:${c.primary};padding:8px 16px 0;display:flex;justify-content:space-between;font-size:10px;color:#fff;font-weight:600;"><span>9:41</span><span>📶🔋</span></div>
      <div style="background:${c.primary};padding:14px 16px 20px;"><div style="font-size:20px;font-weight:800;color:#fff;">${d.header?.title || ""}</div><div style="font-size:11px;color:rgba(255,255,255,0.7);margin-top:2px;">${d.header?.subtitle || ""}</div></div>`;
    d.sections?.forEach((sec) => {
      html += `<div style="padding:12px 16px;">`;
      if (sec.title) html += `<div style="font-size:13px;font-weight:700;color:${c.text};margin-bottom:8px;">${sec.title}</div>`;
      if (sec.type === "cards") {
        html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">`;
        sec.items?.forEach((item) => { html += `<div style="background:#fff;padding:12px;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.06);"><div style="font-size:18px;">${item.icon || ""}</div><div style="font-size:12px;font-weight:700;color:${c.text};margin-top:4px;">${item.title}</div>${item.value ? `<div style="font-size:16px;font-weight:800;color:${c.primary};">${item.value}</div>` : ""}<div style="font-size:10px;color:#94a3b8;margin-top:2px;">${item.subtitle || ""}</div></div>`; });
        html += `</div>`;
      } else {
        sec.items?.forEach((item) => { html += `<div style="display:flex;align-items:center;gap:10px;padding:10px;background:#fff;border-radius:10px;margin-bottom:6px;box-shadow:0 1px 2px rgba(0,0,0,0.04);"><span style="font-size:20px;">${item.icon || "📌"}</span><div style="flex:1;"><div style="font-size:12px;font-weight:600;color:${c.text};">${item.title}</div><div style="font-size:10px;color:#94a3b8;">${item.subtitle || ""}</div></div>${item.value ? `<span style="font-size:11px;font-weight:700;color:${c.primary};">${item.value}</span>` : ""}</div>`; });
      }
      html += `</div>`;
    });
    if (d.bottomNav?.length) {
      html += `<div style="display:flex;border-top:1px solid #e2e8f0;background:#fff;padding:8px 0 12px;">`;
      d.bottomNav.forEach((n) => { html += `<div style="flex:1;text-align:center;opacity:${n.active ? "1" : "0.4"};"><div style="font-size:18px;">${n.icon}</div><div style="font-size:9px;font-weight:600;color:${n.active ? c.primary : "#94a3b8"};">${n.label}</div></div>`; });
      html += `</div>`;
    }
    html += `</div>`;
    return html;
  },
};

// ═══════════════════════════════════════════════
//  RECIPE
// ═══════════════════════════════════════════════
const recipe: ToolTemplate = {
  prompt: `必ずJSON形式のみで回答（他のテキスト不要）:
{"recipes":[{"name":"レシピ名","imagePrompt":"English: appetizing photo of [dish name], food photography, top view","time":"調理時間","difficulty":"簡単/普通/本格的","servings":"人数","ingredients":[{"name":"材料","amount":"分量"}],"steps":["手順1","手順2"]}]}`,
  render: (raw, _userInput) => {
    const d = parseJSON(raw) as { recipes: Array<{ name: string; imagePrompt?: string; time: string; difficulty: string; servings: string; ingredients: Array<{ name: string; amount: string }>; steps: string[] }> } | null;
    if (!d?.recipes?.length) return "";
    const dc: Record<string, string> = { "簡単": "#22c55e", "普通": "#f59e0b", "本格的": "#ef4444" };
    let html = `<div style="font-family:${F};max-width:480px;margin:0 auto;">`;
    d.recipes.forEach((r, i) => {
      const prompt = r.imagePrompt || `delicious ${r.name}, food photography, appetizing`;
      html += `<div style="background:#fff;border-radius:16px;overflow:hidden;margin-bottom:16px;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
        <div style="aspect-ratio:16/9;overflow:hidden;"><img src="${imgUrl(prompt, 800, 450, i * 200)}" style="width:100%;height:100%;object-fit:cover;" loading="lazy"/></div>
        <div style="padding:16px;">
          <div style="font-size:18px;font-weight:800;color:#1e293b;">${r.name}</div>
          <div style="display:flex;gap:6px;margin-top:8px;">
            <span style="background:#f1f5f9;padding:3px 10px;border-radius:99px;font-size:10px;font-weight:600;">⏰ ${r.time}</span>
            <span style="background:${dc[r.difficulty] || "#6366f1"}20;color:${dc[r.difficulty] || "#6366f1"};padding:3px 10px;border-radius:99px;font-size:10px;font-weight:600;">${r.difficulty}</span>
            <span style="background:#f1f5f9;padding:3px 10px;border-radius:99px;font-size:10px;font-weight:600;">👤 ${r.servings}</span>
          </div>
          <div style="font-size:13px;font-weight:700;color:#1e293b;margin:12px 0 6px;">📝 材料</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px;">`;
      r.ingredients?.forEach((ing) => { html += `<div style="display:flex;justify-content:space-between;font-size:11px;padding:4px 8px;background:#f8fafc;border-radius:6px;"><span style="color:#475569;">${ing.name}</span><span style="font-weight:600;">${ing.amount}</span></div>`; });
      html += `</div><div style="font-size:13px;font-weight:700;color:#1e293b;margin:12px 0 6px;">👨‍🍳 作り方</div>`;
      r.steps?.forEach((step, si) => { html += `<div style="display:flex;gap:10px;margin-bottom:8px;"><div style="width:22px;height:22px;border-radius:50%;background:linear-gradient(135deg,#ff9a56,#ff6a88);color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;flex-shrink:0;">${si + 1}</div><div style="font-size:12px;color:#475569;line-height:1.5;padding-top:2px;">${step}</div></div>`; });
      html += `</div></div>`;
    });
    html += `</div>`;
    return html;
  },
};

// ═══════════════════════════════════════════════
//  CALORIE
// ═══════════════════════════════════════════════
const calorie: ToolTemplate = {
  prompt: `必ずJSON形式のみで回答（他のテキスト不要）:
{"totalCalories":650,"rating":"A|B|C|D","items":[{"name":"食品名","calories":250,"protein":10,"fat":5,"carbs":30}],"totalNutrients":{"protein":25,"fat":20,"carbs":80},"advice":["アドバイス1","アドバイス2"]}`,
  render: (raw, _userInput) => {
    const d = parseJSON(raw) as { totalCalories: number; rating: string; items: Array<{ name: string; calories: number; protein: number; fat: number; carbs: number }>; totalNutrients: { protein: number; fat: number; carbs: number }; advice: string[] } | null;
    if (!d) return "";
    const rc: Record<string, string> = { A: "#22c55e", B: "#84cc16", C: "#f59e0b", D: "#ef4444" };
    let html = `<div style="font-family:${F};max-width:480px;margin:0 auto;">
      <div style="background:linear-gradient(135deg,#667eea,#764ba2);border-radius:16px;padding:20px;color:#fff;text-align:center;margin-bottom:16px;">
        <div style="font-size:12px;opacity:0.8;">推定カロリー</div>
        <div style="font-size:42px;font-weight:900;line-height:1;">${d.totalCalories || 0}</div>
        <div style="font-size:14px;opacity:0.8;">kcal</div>
        <div style="display:inline-block;background:${rc[d.rating] || "#6366f1"};padding:4px 16px;border-radius:99px;font-size:13px;font-weight:800;margin-top:8px;">評価: ${d.rating || "B"}</div>
      </div>`;
    if (d.totalNutrients) {
      const n = d.totalNutrients, total = n.protein + n.fat + n.carbs;
      const nuts = [{ name: "タンパク質", v: n.protein, c: "#ef4444" }, { name: "脂質", v: n.fat, c: "#f59e0b" }, { name: "炭水化物", v: n.carbs, c: "#3b82f6" }];
      html += `<div style="background:#fff;border-radius:12px;padding:14px;margin-bottom:12px;border:1px solid #e2e8f0;">
        <div style="font-size:13px;font-weight:700;margin-bottom:10px;">PFCバランス</div>
        <div style="display:flex;height:12px;border-radius:6px;overflow:hidden;margin-bottom:12px;">`;
      nuts.forEach((nt) => { html += `<div style="width:${total ? (nt.v / total * 100).toFixed(1) : 33}%;background:${nt.c};"></div>`; });
      html += `</div>`;
      nuts.forEach((nt) => { html += `<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;"><div style="width:10px;height:10px;border-radius:3px;background:${nt.c};"></div><span style="font-size:11px;color:#64748b;flex:1;">${nt.name}</span><span style="font-size:12px;font-weight:700;">${nt.v}g</span></div>`; });
      html += `</div>`;
    }
    if (d.items?.length) {
      html += `<div style="background:#fff;border-radius:12px;padding:14px;margin-bottom:12px;border:1px solid #e2e8f0;"><div style="font-size:13px;font-weight:700;margin-bottom:8px;">内訳</div>`;
      d.items.forEach((item) => { html += `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9;font-size:12px;"><span style="color:#475569;">${item.name}</span><span style="font-weight:700;">${item.calories}kcal</span></div>`; });
      html += `</div>`;
    }
    if (d.advice?.length) {
      html += `<div style="background:#eff6ff;border-radius:12px;padding:14px;border:1px solid #bfdbfe;"><div style="font-size:13px;font-weight:700;color:#1e40af;margin-bottom:6px;">💡 アドバイス</div>`;
      d.advice.forEach((a) => { html += `<div style="font-size:11px;color:#1e40af;padding:3px 0;">• ${a}</div>`; });
      html += `</div>`;
    }
    html += `</div>`;
    return html;
  },
};

// ═══════════════════════════════════════════════
//  EXPORTS
// ═══════════════════════════════════════════════
export const TOOL_TEMPLATES: Record<string, ToolTemplate> = {
  logo, color, mockup, thumbnail, plan, recipe, calorie,
  spot: { ...plan, prompt: plan.prompt.replace("旅行タイトル", "おすすめスポット") },
};

export function getToolPrompt(toolId: string): string | null {
  return TOOL_TEMPLATES[toolId]?.prompt || null;
}

export function renderToolHtml(toolId: string, rawOutput: string, userInput: string): string | null {
  const tmpl = TOOL_TEMPLATES[toolId];
  if (!tmpl) return null;
  try {
    const result = tmpl.render(rawOutput, userInput);
    return result || null;
  } catch {
    return null;
  }
}
