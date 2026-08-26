import type { Calculator } from "../types";
import { num } from "../format";
import { allNumbers, result } from "../helpers";

export const fotoCalculators: Calculator[] = [
  {
    slug: "eksponeringstrekant",
    title: "Eksponeringstrekant",
    shortTitle: "Eksponering",
    description:
      "Se relativ eksponering (EV) fra blender, lukker og ISO, og sammenlign to oppsett.",
    category: "foto",
    tags: ["eksponering", "blender", "lukker", "iso", "foto"],
    popular: true,
    fields: [
      {
        id: "f",
        label: "Blender (f/)",
        type: "number",
        defaultValue: 2.8,
        step: 0.1,
      },
      {
        id: "lukker",
        label: "Lukkertid",
        type: "number",
        defaultValue: 125,
        hint: "Som nevner: 125 = 1/125 s. Bruk 0,5 for 0,5 s.",
      },
      {
        id: "iso",
        label: "ISO",
        type: "number",
        defaultValue: 100,
      },
      {
        id: "f2",
        label: "Sammenlign: blender",
        type: "number",
        defaultValue: 4,
        step: 0.1,
      },
      {
        id: "lukker2",
        label: "Sammenlign: lukker",
        type: "number",
        defaultValue: 60,
      },
      {
        id: "iso2",
        label: "Sammenlign: ISO",
        type: "number",
        defaultValue: 100,
      },
    ],
    formula: "EV₁₀₀ ≈ log₂(N² / t) − log₂(ISO/100)",
    explanation:
      "Høyere EV er mørkere eksponering (mindre lys på sensoren). Ett stopp = dobling/halvering av lys.",
    compute(input) {
      const f = num(input, "f");
      const lukker = num(input, "lukker");
      const iso = num(input, "iso");
      if (!allNumbers([f, lukker, iso]) || f <= 0 || lukker <= 0 || iso <= 0) {
        return [];
      }
      const t = lukker >= 1 ? 1 / lukker : lukker;
      const ev = Math.log2((f * f) / t) - Math.log2(iso / 100);
      const f2 = num(input, "f2");
      const lukker2 = num(input, "lukker2");
      const iso2 = num(input, "iso2");
      const out = [
        result("ev", "EV (ved ISO 100-skala)", ev, {
          digits: 2,
          primary: true,
        }),
      ];
      if (allNumbers([f2, lukker2, iso2]) && f2 > 0 && lukker2 > 0 && iso2 > 0) {
        const t2 = lukker2 >= 1 ? 1 / lukker2 : lukker2;
        const ev2 = Math.log2((f2 * f2) / t2) - Math.log2(iso2 / 100);
        out.push(
          result("ev2", "EV sammenligning", ev2, { digits: 2 }),
          result("diff", "Forskjell", ev2 - ev, {
            digits: 2,
            unit: "stopp",
            hint: "Positivt = sammenligningen er mørkere.",
          }),
        );
      }
      return out;
    },
  },
  {
    slug: "crop-faktor",
    title: "Crop-faktor og brennvidde",
    shortTitle: "Crop-faktor",
    description:
      "Finn ekvivalent fullformat-brennvidde og synsvinkel-tilnærming.",
    category: "foto",
    tags: ["crop", "brennvidde", "aps-c", "foto"],
    popular: true,
    fields: [
      {
        id: "mm",
        label: "Brennvidde",
        type: "number",
        unit: "mm",
        defaultValue: 35,
      },
      {
        id: "crop",
        label: "Crop-faktor",
        type: "select",
        defaultValue: "1.5",
        options: [
          { value: "1", label: "Fullformat (1×)" },
          { value: "1.5", label: "APS-C Nikon/Sony (1,5×)" },
          { value: "1.6", label: "APS-C Canon (1,6×)" },
          { value: "2", label: "Micro Four Thirds (2×)" },
        ],
      },
    ],
    formula: "FF-ekvivalent = f · crop",
    explanation:
      "Crop-sensor ser «tighter» ut. 35 mm på 1,5× crop tilsvarer ca. 52,5 mm på fullformat i synsfelt.",
    compute(input) {
      const mm = num(input, "mm");
      const crop = Number(input.crop);
      if (!Number.isFinite(mm) || mm <= 0 || !Number.isFinite(crop)) return [];
      return [
        result("ff", "Fullformat-ekvivalent", mm * crop, {
          digits: 1,
          unit: "mm",
          primary: true,
        }),
        result("crop", "Crop-faktor", crop, { digits: 2 }),
      ];
    },
  },
  {
    slug: "utskriftsstorrelse",
    title: "Utskriftsstørrelse og DPI",
    shortTitle: "Utskrift",
    description:
      "Regn ut utskriftsstørrelse fra bildeoppløsning og ønsket DPI.",
    category: "foto",
    tags: ["dpi", "utskrift", "oppløsning", "foto"],
    fields: [
      {
        id: "bredde",
        label: "Bildebredde",
        type: "number",
        unit: "px",
        defaultValue: 6000,
      },
      {
        id: "hoyde",
        label: "Bildehøyde",
        type: "number",
        unit: "px",
        defaultValue: 4000,
      },
      {
        id: "dpi",
        label: "Utskriftsoppløsning",
        type: "number",
        unit: "dpi",
        defaultValue: 300,
        hint: "300 dpi er vanlig for skarp foto-utskrift. 150 dpi for storformat på avstand.",
      },
    ],
    formula: "tommer = piksler / DPI     cm = tommer · 2,54",
    explanation:
      "Flere piksler eller lavere DPI gir større fysisk utskrift. Under ca. 150–200 dpi synes piksler på nært hold.",
    compute(input) {
      const w = num(input, "bredde");
      const h = num(input, "hoyde");
      const dpi = num(input, "dpi");
      if (!allNumbers([w, h, dpi]) || dpi <= 0) return [];
      const wIn = w / dpi;
      const hIn = h / dpi;
      return [
        result("cm", "Utskriftsstørrelse", `${(wIn * 2.54).toFixed(1)} × ${(hIn * 2.54).toFixed(1)} cm`, {
          kind: "text",
          primary: true,
        }),
        result("in", "I tommer", `${wIn.toFixed(2)} × ${hIn.toFixed(2)} in`, {
          kind: "text",
        }),
        result("mp", "Megapiksler", (w * h) / 1e6, { digits: 2 }),
      ];
    },
  },
  {
    slug: "lukker-tommelfinger",
    title: "Lukkertid tommelfingerregel",
    shortTitle: "Lukkertid",
    description:
      "Anslå tregeste håndholdte lukkertid fra brennvidde og crop (1/f-regelen).",
    category: "foto",
    tags: ["lukkertid", "håndholdt", "rystelse", "foto"],
    fields: [
      {
        id: "mm",
        label: "Brennvidde",
        type: "number",
        unit: "mm",
        defaultValue: 50,
      },
      {
        id: "crop",
        label: "Crop-faktor",
        type: "number",
        defaultValue: 1,
        step: 0.1,
      },
      {
        id: "ibis",
        label: "Bildestabilisering",
        type: "select",
        defaultValue: "0",
        options: [
          { value: "0", label: "Ingen" },
          { value: "2", label: "Ca. 2 stopp" },
          { value: "4", label: "Ca. 4 stopp" },
          { value: "6", label: "Ca. 6 stopp" },
        ],
      },
    ],
    formula: "t ≈ 1 / (f · crop)     med IBIS: t · 2^stopp",
    explanation:
      "Klassisk 1/f-regel på fullformat. Stabilisering lar deg gå tregere – men motivbevegelse krever fortsatt rask lukker.",
    compute(input) {
      const mm = num(input, "mm");
      const crop = num(input, "crop");
      const ibis = Number(input.ibis) || 0;
      if (!allNumbers([mm, crop]) || mm <= 0 || crop <= 0) return [];
      const base = mm * crop;
      const t = (1 / base) * Math.pow(2, ibis);
      const denom = 1 / t;
      return [
        result(
          "anbefalt",
          "Anbefalt lukker (ca.)",
          denom >= 1 ? `1/${Math.round(denom)} s` : `${t.toFixed(2)} s`,
          { kind: "text", primary: true },
        ),
        result("eff", "Effektiv brennvidde", base, { digits: 0, unit: "mm" }),
      ];
    },
  },
  {
    slug: "dybdeskarphet-enkel",
    title: "Dybdeskarphet (forenklet)",
    shortTitle: "DoF",
    description:
      "Anslå hyperfokal avstand og total dybdeskarphet for gitt blender og fokus.",
    category: "foto",
    tags: ["dof", "dybdeskarphet", "hyperfokal", "foto"],
    fields: [
      {
        id: "f",
        label: "Blender (f/)",
        type: "number",
        defaultValue: 8,
        step: 0.1,
      },
      {
        id: "mm",
        label: "Brennvidde",
        type: "number",
        unit: "mm",
        defaultValue: 35,
      },
      {
        id: "fokus",
        label: "Fokusavstand",
        type: "number",
        unit: "m",
        defaultValue: 5,
      },
      {
        id: "coc",
        label: "Sirkel for utydelighet",
        type: "number",
        unit: "mm",
        defaultValue: 0.03,
        hint: "Ca. 0,03 mm for fullformat, 0,02 for APS-C.",
      },
    ],
    formula: "H ≈ f² / (N · c) + f     (f i mm, H omregnet til meter)",
    explanation:
      "Hyperfokal og dybdeskarphet er forenklet. Bra til å forstå retning, ikke studio-kritisk nøyaktighet.",
    compute(input) {
      const N = num(input, "f");
      const f = num(input, "mm");
      const s = num(input, "fokus");
      const c = num(input, "coc");
      if (!allNumbers([N, f, s, c]) || N <= 0 || f <= 0 || s <= 0 || c <= 0) {
        return [];
      }
      const Hmm = (f * f) / (N * c) + f;
      const H = Hmm / 1000;
      const sMm = s * 1000;
      const Dn = (sMm * (Hmm - f)) / (Hmm + sMm - 2 * f);
      const Df =
        Hmm - sMm > 1e-6
          ? (sMm * (Hmm - f)) / (Hmm - sMm)
          : Number.POSITIVE_INFINITY;
      const near = Math.max(Dn, 0) / 1000;
      const far = Number.isFinite(Df) ? Df / 1000 : Number.POSITIVE_INFINITY;
      const total = Number.isFinite(far) ? far - near : Number.POSITIVE_INFINITY;
      const out = [
        result("H", "Hyperfokal avstand", H, {
          digits: 2,
          unit: "m",
          primary: true,
        }),
        result("near", "Nærgrense", near, { digits: 2, unit: "m" }),
      ];
      if (Number.isFinite(far)) {
        out.push(result("far", "Fjerngrense", far, { digits: 2, unit: "m" }));
        out.push(result("total", "Total DoF", total, { digits: 2, unit: "m" }));
      } else {
        out.push(result("far", "Fjerngrense", "∞", { kind: "text" }));
        out.push(result("total", "Total DoF", "∞", { kind: "text" }));
      }
      return out;
    },
  },
  {
    slug: "megapiksel",
    title: "Megapiksel og dimensjoner",
    shortTitle: "Megapiksel",
    description: "Regn ut megapiksler, eller finn høyde fra bredde og sideforhold.",
    category: "foto",
    tags: ["megapiksel", "oppløsning", "foto"],
    fields: [
      {
        id: "bredde",
        label: "Bredde",
        type: "number",
        unit: "px",
        defaultValue: 6000,
      },
      {
        id: "hoyde",
        label: "Høyde",
        type: "number",
        unit: "px",
        defaultValue: 4000,
      },
    ],
    formula: "MP = (bredde · høyde) / 1 000 000",
    explanation: "Sideforhold 3:2 er vanlig på speilrefleks/systemkamera.",
    compute(input) {
      const w = num(input, "bredde");
      const h = num(input, "hoyde");
      if (!allNumbers([w, h]) || w <= 0 || h <= 0) return [];
      const gcd = (a: number, b: number): number =>
        b < 1 ? a : gcd(b, a % b);
      const g = gcd(Math.round(w), Math.round(h));
      return [
        result("mp", "Megapiksler", (w * h) / 1e6, {
          digits: 2,
          primary: true,
        }),
        result("ratio", "Sideforhold", `${Math.round(w / g)}:${Math.round(h / g)}`, {
          kind: "text",
        }),
      ];
    },
  },
];
