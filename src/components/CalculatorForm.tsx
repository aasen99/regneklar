"use client";

import { useMemo, useState } from "react";
import { getCalculator } from "@/lib/catalog";
import { formatResult } from "@/lib/format";
import type { Field } from "@/lib/types";

function initialValues(fields: Field[]): Record<string, string> {
  const values: Record<string, string> = {};
  for (const field of fields) {
    values[field.id] =
      field.defaultValue == null ? "" : String(field.defaultValue);
  }
  return values;
}

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-line bg-paper px-3 py-2.5 text-ink outline-none ring-pine/25 focus:ring-2";

export function CalculatorForm({ slug }: { slug: string }) {
  const calculator = getCalculator(slug);
  const [values, setValues] = useState(() =>
    calculator ? initialValues(calculator.fields) : {},
  );

  const results = useMemo(() => {
    if (!calculator) return [];
    return calculator.compute(values);
  }, [calculator, values]);

  if (!calculator) return null;

  function update(id: string, value: string) {
    setValues((prev) => ({ ...prev, [id]: value }));
  }

  const primary = results.find((r) => r.primary) ?? results[0];
  const rest = results.filter((r) => r !== primary);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,20rem)]">
      <form
        className="space-y-4 rounded-2xl border border-line bg-sand p-5 sm:p-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <p className="text-xs uppercase tracking-[0.16em] text-pine">
          Fyll inn
        </p>
        {calculator.fields.map((field) => (
          <label key={field.id} className="block">
            <span className="text-sm font-medium text-ink">
              {field.label}
              {field.unit ? (
                <span className="font-normal text-ink-soft"> ({field.unit})</span>
              ) : null}
            </span>
            {field.type === "select" ? (
              <select
                className={fieldClass}
                value={values[field.id] ?? ""}
                onChange={(e) => update(field.id, e.target.value)}
              >
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className={fieldClass}
                type={field.type === "date" ? "date" : "text"}
                inputMode={field.type === "number" ? "decimal" : undefined}
                value={values[field.id] ?? ""}
                placeholder={field.placeholder}
                min={field.type === "date" ? field.min : undefined}
                max={field.type === "date" ? field.max : undefined}
                onChange={(e) => update(field.id, e.target.value)}
              />
            )}
            {field.hint ? (
              <span className="mt-1 block text-xs text-ink-soft">{field.hint}</span>
            ) : null}
          </label>
        ))}
      </form>

      <aside className="rounded-2xl bg-pine-dark p-5 text-sand sm:p-6">
        <p className="text-[11px] uppercase tracking-[0.18em] text-sand/55">
          Resultat
        </p>
        {primary ? (
          <>
            <p className="mt-3 text-sm text-sand/70">{primary.label}</p>
            <p className="mt-1 font-serif text-3xl leading-tight">
              {formatResult(primary)}
            </p>
            {primary.hint ? (
              <p className="mt-2 text-sm text-sand/60">{primary.hint}</p>
            ) : null}
            <ul className="mt-6 space-y-3 border-t border-white/10 pt-4">
              {rest.map((item) => (
                <li key={item.id}>
                  <p className="text-xs text-sand/55">{item.label}</p>
                  <p className="text-lg">{formatResult(item)}</p>
                  {item.hint ? (
                    <p className="text-xs text-sand/45">{item.hint}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-4 text-sand/70">Fyll inn feltene for å regne ut.</p>
        )}
      </aside>
    </div>
  );
}
