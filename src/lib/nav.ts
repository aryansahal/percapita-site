/**
 * Daily scheme NAVs from AMFI.
 *
 * Source: https://www.amfiindia.com/spages/NAVAll.txt — AMFI's own published
 * feed, free and intended for exactly this use. Roughly 1.5 MB, ~18,000 rows,
 * refreshed once each business day.
 *
 * Percapita deals in REGULAR PLANS ONLY (see the footer disclosure), so this
 * must never surface Direct plan NAVs — they are lower-cost and showing them
 * would misrepresent what a client actually buys here.
 */

const AMFI_URL = "https://www.amfiindia.com/spages/NAVAll.txt";

/** Revalidate hourly. AMFI publishes once a day, late evening IST. */
const REVALIDATE_SECONDS = 3600;

/**
 * One flagship Regular/Growth scheme per fund house shown in the marquee.
 * Keyed by AMFI scheme code, which is stable across the renames that keep
 * happening to scheme *names* (Bluechip → Large Cap, and so on).
 */
export const TICKER_SCHEMES = [
  { code: "103504", house: "SBI" },
  { code: "112090", house: "Kotak" },
  { code: "106235", house: "Nippon India" },
  { code: "133836", house: "PGIM India" },
  { code: "108799", house: "Bandhan" },
  { code: "129048", house: "Motilal Oswal" },
  { code: "122640", house: "PPFAS" },
  { code: "103174", house: "Aditya Birla" },
  { code: "107578", house: "Mirae Asset" },
  { code: "113221", house: "Canara Robeco" },
  { code: "101762", house: "HDFC" },
  { code: "112098", house: "Invesco" },
  { code: "108466", house: "ICICI Prudential" },
  { code: "111940", house: "Edelweiss" },
  { code: "150185", house: "Baroda BNP Paribas" },
  { code: "105875", house: "DSP" },
] as const;

export interface SchemeNav {
  code: string;
  house: string;
  scheme: string;
  nav: string;
  date: string;
}

/** Anything that marks a row as an income-distribution variant, not Growth. */
const NOT_GROWTH = /idcw|dividend|bonus|payout|reinvest/i;

/**
 * The feed is not internally consistent: the Plan and Option columns are blank
 * on roughly 5,700 rows (older entries carry both inside the scheme name), and
 * Option appears as "Growth", "Growth Option", "GROWTH OPTION" and
 * "Regular Growth" depending on the fund house. Both checks below tolerate all
 * of those rather than matching one spelling.
 */
function isRegularGrowth(plan: string, option: string, name: string): boolean {
  const regular = /regular/i.test(plan)
    ? true
    : !plan.trim() && /regular/i.test(name) && !/direct/i.test(name);
  if (!regular) return false;

  const opt = option.trim();
  return opt
    ? /growth/i.test(opt) && !NOT_GROWTH.test(opt)
    : /growth/i.test(name) && !NOT_GROWTH.test(name);
}

/** Fund houses file names inconsistently; some shout. Tidy for display. */
function tidyName(name: string): string {
  let out = name.replace(/\s*\(erstwhile[^)]*\)/i, "").trim();
  if (out === out.toUpperCase()) {
    out = out
      .toLowerCase()
      .replace(/\b[a-z]/g, (c) => c.toUpperCase())
      .replace(/\bBnp\b/g, "BNP");
  }
  return out;
}

function formatNav(value: string): string {
  const n = Number(value);
  if (!Number.isFinite(n)) return "n/a";
  return "₹" + n.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** "18-Sep-2026" → "18 Sep 2026". */
function formatDate(raw: string): string {
  return raw.trim().replace(/-/g, " ");
}

/**
 * Returns the ticker schemes with current NAVs, or null if AMFI is
 * unreachable or the feed cannot be parsed. Callers fall back rather than
 * rendering a broken band.
 */
export async function fetchSchemeNavs(): Promise<SchemeNav[] | null> {
  const wanted = new Map<string, string>(
    TICKER_SCHEMES.map((s) => [s.code, s.house]),
  );

  let text: string;
  try {
    const res = await fetch(AMFI_URL, {
      headers: { "user-agent": "percapita.in NAV ticker" },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    text = await res.text();
  } catch {
    return null;
  }

  const found = new Map<string, SchemeNav>();
  for (const line of text.split("\n")) {
    if (!line.includes(";")) continue;
    const parts = line.split(";");
    if (parts.length !== 8) continue;

    const [code, , , name, plan, option, nav, date] = parts;
    const house = wanted.get(code);
    if (!house || found.has(code)) continue;
    if (!isRegularGrowth(plan, option, name)) continue;
    if (!Number.isFinite(Number(nav))) continue;

    found.set(code, {
      code,
      house,
      scheme: tidyName(name),
      nav: formatNav(nav),
      date: formatDate(date),
    });
  }

  if (found.size === 0) return null;

  // Preserve the configured order; drop anything the feed no longer carries.
  return TICKER_SCHEMES.map((s) => found.get(s.code)).filter(
    (s): s is SchemeNav => Boolean(s),
  );
}
