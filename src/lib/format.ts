export function parseNumber(value: string | undefined): number | null {
  if (value == null) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  const normalized = trimmed.replace(/\s/g, "").replace(",", ".");
  const n = Number(normalized);
  return Number.isFinite(n) ? n : null;
}

export function num(input: Record<string, string>, id: string): number {
  return parseNumber(input[id]) ?? Number.NaN;
}

export function formatNumber(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return "–";
  return new Intl.NumberFormat("nb-NO", {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatInteger(value: number): string {
  if (!Number.isFinite(value)) return "–";
  return new Intl.NumberFormat("nb-NO", { maximumFractionDigits: 0 }).format(
    Math.round(value),
  );
}

export function formatCurrency(value: number, digits = 0): string {
  if (!Number.isFinite(value)) return "–";
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}

export function formatPercent(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return "–";
  return `${formatNumber(value, digits)} %`;
}

export function formatResult(item: {
  value: number | string;
  kind?: string;
  digits?: number;
  unit?: string;
}): string {
  if (typeof item.value === "string") return item.value;
  const digits = item.digits ?? 2;
  let formatted: string;
  switch (item.kind) {
    case "currency":
      formatted = formatCurrency(item.value, digits);
      break;
    case "percent":
      formatted = formatPercent(item.value, digits);
      break;
    case "integer":
      formatted = formatInteger(item.value);
      break;
    default:
      formatted = formatNumber(item.value, digits);
  }
  if (item.unit && item.kind !== "currency" && item.kind !== "percent") {
    return `${formatted} ${item.unit}`;
  }
  return formatted;
}

export function daysBetween(a: Date, b: Date): number {
  const ms = 1000 * 60 * 60 * 24;
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((utcB - utcA) / ms);
}

export function parseDate(value: string | undefined): Date | null {
  if (!value) return null;
  const d = new Date(`${value}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** "4:30" eller "4,5" → minutter som desimaltall. */
export function parsePaceMinutes(value: string | undefined): number | null {
  if (!value) return null;
  const t = value.trim();
  if (!t) return null;
  if (t.includes(":")) {
    const parts = t.split(":").map((p) => Number(p.replace(",", ".")));
    if (parts.length !== 2 || parts.some((p) => !Number.isFinite(p))) return null;
    return parts[0] + parts[1] / 60;
  }
  const n = Number(t.replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

/** "25:30" eller "1:23:45" → sekunder. */
export function parseRaceSeconds(value: string | undefined): number | null {
  if (!value) return null;
  const t = value.trim();
  if (!t) return null;
  if (t.includes(":")) {
    const parts = t.split(":").map((p) => Number(p.replace(",", ".")));
    if (parts.some((p) => !Number.isFinite(p))) return null;
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    return null;
  }
  const n = Number(t.replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

export function formatHms(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds) || totalSeconds < 0) return "–";
  const s = Math.round(totalSeconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }
  return `${m}:${String(sec).padStart(2, "0")}`;
}

export function formatPace(minPerKm: number): string {
  if (!Number.isFinite(minPerKm) || minPerKm <= 0) return "–";
  let sec = Math.round(minPerKm * 60);
  let min = Math.floor(sec / 60);
  sec = sec % 60;
  if (sec === 60) {
    min += 1;
    sec = 0;
  }
  return `${min}:${String(sec).padStart(2, "0")}`;
}
