import { parseDate, parseNumber } from "./format";
import type { Field } from "./types";

export function validateField(field: Field, value: string): string | null {
  if (field.type === "select" || field.type === "text") return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  if (field.type === "date") {
    return parseDate(trimmed) ? null : "Ugyldig dato";
  }

  const n = parseNumber(trimmed);
  if (n === null) return "Skriv inn et tall";

  if (field.min != null && n < field.min) {
    return `Minst ${field.min}`;
  }
  if (field.max != null && n > field.max) {
    return `Høyst ${field.max}`;
  }
  if (n < 0 && (field.min == null || field.min >= 0)) {
    return "Kan ikke være negativt";
  }

  return null;
}
