export type CategoryId =
  | "okonomi"
  | "helse"
  | "matematikk"
  | "enheter"
  | "hverdag"
  | "bygg"
  | "mat"
  | "skole"
  | "fysikk"
  | "elektro"
  | "sport";

export type FieldType = "number" | "select" | "date" | "text";

export type Field = {
  id: string;
  label: string;
  hint?: string;
  type: FieldType;
  unit?: string;
  options?: { value: string; label: string }[];
  defaultValue?: string | number;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
};

export type ResultKind = "number" | "currency" | "percent" | "integer" | "text";

export type ResultItem = {
  id: string;
  label: string;
  value: number | string;
  kind?: ResultKind;
  digits?: number;
  unit?: string;
  hint?: string;
  primary?: boolean;
};

export type Calculator = {
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  category: CategoryId;
  tags: string[];
  fields: Field[];
  formula?: string;
  explanation?: string;
  disclaimer?: string;
  popular?: boolean;
  compute: (input: Record<string, string>) => ResultItem[];
};

export type Formula = {
  slug: string;
  title: string;
  category: CategoryId;
  expression: string;
  variables: { symbol: string; meaning: string }[];
  explanation: string;
  calculatorSlug?: string;
};

export type Category = {
  id: CategoryId;
  title: string;
  description: string;
  blurb: string;
};
