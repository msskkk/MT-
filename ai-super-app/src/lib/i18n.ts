export const LOCALES = ["ja", "en", "zh", "ko"] as const;
export type Locale = (typeof LOCALES)[number];

const LOCALE_LABELS: Record<Locale, string> = {
  ja: "日本語",
  en: "English",
  zh: "中文",
  ko: "한국어",
};

export function getLocaleLabel(locale: Locale): string {
  return LOCALE_LABELS[locale];
}

let dictCache: Record<string, Record<string, unknown>> = {};

export async function loadDict(locale: Locale): Promise<Record<string, unknown>> {
  if (dictCache[locale]) return dictCache[locale];
  const [main, tools] = await Promise.all([
    import(`@/i18n/${locale}.json`).then((m) => m.default),
    import(`@/i18n/tools-${locale}.json`)
      .then((m) => m.default)
      .catch(() => ({})),
  ]);
  dictCache[locale] = { ...main, ...tools };
  return dictCache[locale];
}

export function t(
  dict: Record<string, unknown>,
  key: string,
  vars?: Record<string, string | number>
): string {
  const parts = key.split(".");
  let val: unknown = dict;
  for (const p of parts) {
    if (val && typeof val === "object") {
      val = (val as Record<string, unknown>)[p];
    } else {
      return key;
    }
  }
  if (typeof val !== "string") return key;
  if (vars) {
    return val.replace(/\{\{(\w+)\}\}/g, (_, k) => String(vars[k] ?? ""));
  }
  return val;
}
