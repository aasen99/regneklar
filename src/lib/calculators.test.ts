import { describe, expect, it } from "vitest";
import { getCalculator } from "@/lib/catalog";
import { annuityPayment, effectiveLoanRate } from "@/lib/finance";
import { parseNumber } from "@/lib/format";
import { validateField } from "@/lib/validate";

function compute(slug: string, input: Record<string, string>) {
  const calculator = getCalculator(slug);
  if (!calculator) throw new Error(`Missing calculator: ${slug}`);
  return calculator.compute(input);
}

function primaryValue(slug: string, input: Record<string, string>) {
  const results = compute(slug, input);
  const primary = results.find((r) => r.primary) ?? results[0];
  return primary?.value;
}

describe("lanekalkulator", () => {
  it("beregner månedlig termin for 1 mill, 5 %, 25 år", () => {
    const monthly = annuityPayment(1_000_000, 5, 25, 12);
    expect(monthly).toBeGreaterThan(5840);
    expect(monthly).toBeLessThan(5850);

    const fromCalc = primaryValue("lanekalkulator", {
      belop: "1000000",
      rente: "5",
      aar: "25",
    });
    expect(fromCalc).toBeGreaterThan(5840);
    expect(fromCalc).toBeLessThan(5850);
  });
});

describe("egenkapital-bolig", () => {
  it("bruker 10 % egenkapital og lånebehov", () => {
    const results = compute("egenkapital-bolig", {
      pris: "4500000",
      krav: "10",
      doktype: "borettslag",
      grunnlag: "4500000",
    });
    const ek = results.find((r) => r.id === "ek")?.value;
    const lan = results.find((r) => r.id === "lan")?.value;
    expect(ek).toBe(450_000);
    expect(lan).toBe(4_050_000);
  });
});

describe("laneramme", () => {
  it("har 90 % som standard belåningsgrad", () => {
    const calculator = getCalculator("laneramme");
    const belaning = calculator?.fields.find((f) => f.id === "belaning");
    expect(belaning?.defaultValue).toBe(90);
  });

  it("trekker eksisterende gjeld fra gjeldsgradtaket", () => {
    const withoutDebt = primaryValue("laneramme", {
      inntekt: "650000",
      gjeld: "0",
      multipel: "5",
      ek: "600000",
      belaning: "90",
    });
    const withDebt = primaryValue("laneramme", {
      inntekt: "650000",
      gjeld: "500000",
      multipel: "5",
      ek: "600000",
      belaning: "90",
    });
    expect(withoutDebt).toBeGreaterThan(withDebt as number);
    expect((withoutDebt as number) - (withDebt as number)).toBe(500_000);
  });

  it("begrenses av både inntekt og egenkapital", () => {
    const results = compute("laneramme", {
      inntekt: "650000",
      gjeld: "0",
      multipel: "5",
      ek: "100000",
      belaning: "90",
    });
    const fraInntekt = results.find((r) => r.id === "inntektstak")?.value;
    const fraEk = results.find((r) => r.id === "ektak")?.value;
    const maks = results.find((r) => r.id === "lan")?.value;
    expect(maks).toBe(Math.min(fraInntekt as number, fraEk as number));
  });
});

describe("feriepenger", () => {
  it.each([
    ["10.2", 56_100],
    ["12", 66_000],
    ["12.5", 68_750],
    ["14.3", 78_650],
  ])("regner % sats korrekt", (sats, expected) => {
    const value = primaryValue("feriepenger", {
      grunnlag: "550000",
      sats,
    });
    expect(value).toBeCloseTo(expected, 0);
  });
});

describe("BSU", () => {
  it("bruker standardgrenser fra registeret", () => {
    const calculator = getCalculator("bsu");
    expect(calculator?.fields.find((f) => f.id === "innskudd")?.defaultValue).toBe(
      27_500,
    );
    expect(calculator?.fields.find((f) => f.id === "fradrag")?.defaultValue).toBe(10);
    expect(calculator?.fields.find((f) => f.id === "tak")?.defaultValue).toBe(300_000);
  });

  it("respekterer totalgrensen", () => {
    const saldo = primaryValue("bsu", {
      innskudd: "27500",
      aar: "20",
      rente: "4.5",
      fradrag: "10",
      tak: "300000",
    });
    expect(saldo as number).toBeLessThanOrEqual(300_000 * 1.1);
    const innskutt = compute("bsu", {
      innskudd: "27500",
      aar: "20",
      rente: "4.5",
      fradrag: "10",
      tak: "300000",
    }).find((r) => r.id === "innskutt")?.value;
    expect(innskutt).toBeLessThanOrEqual(300_000);
  });
});

describe("effektiv rente", () => {
  it("gir høyere rente enn nominell når gebyrer er med", () => {
    const eff = primaryValue("effektiv-rente", {
      belop: "2000000",
      nominell: "5.5",
      aar: "25",
      terminer: "12",
      etablering: "3000",
      termin: "70",
    });
    expect(eff as number).toBeGreaterThan(5.5);
    expect(effectiveLoanRate({
      principal: 2_000_000,
      annualRatePercent: 5.5,
      years: 25,
      periodsPerYear: 12,
      establishmentFee: 3000,
      termFee: 70,
    })).toBeCloseTo(eff as number, 2);
  });
});

describe("inputhåndtering", () => {
  it("parser desimalkomma og punktum", () => {
    expect(parseNumber("3,14")).toBe(3.14);
    expect(parseNumber("3.14")).toBe(3.14);
  });

  it("validerer negative tall og tomme felt", () => {
    expect(validateField({ id: "x", label: "X", type: "number" }, "")).toBeNull();
    expect(
      validateField({ id: "x", label: "X", type: "number" }, "-5"),
    ).toBe("Kan ikke være negativt");
    expect(
      validateField({ id: "x", label: "X", type: "number", max: 100 }, "150"),
    ).toBe("Høyst 100");
  });
});
