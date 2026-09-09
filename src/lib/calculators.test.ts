import { describe, expect, it } from "vitest";
import { getCategory } from "@/lib/categories";
import { getCalculator } from "@/lib/catalog";
import {
  annuityPayment,
  effectiveLoanRate,
  monthlyRateFromEffectiveAnnual,
} from "@/lib/finance";
import {
  ceilStable,
  parseNumber,
  parseNumberList,
  parsePaceMinutes,
  parseRaceSeconds,
} from "@/lib/format";
import { getFormula } from "@/lib/formulas";
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

function resultById(slug: string, input: Record<string, string>, id: string) {
  return compute(slug, input).find((r) => r.id === id)?.value;
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

  it("måler tak mot innskutt, ikke saldo med renter", () => {
    const results = compute("bsu", {
      innskudd: "27500",
      aar: "11",
      rente: "4.5",
      fradrag: "10",
      tak: "300000",
    });
    expect(results.find((r) => r.id === "innskutt")?.value).toBe(300_000);
    const saldo = results.find((r) => r.id === "slutt")?.value as number;
    expect(saldo).toBeGreaterThan(300_000);
  });

  it("forrenter videre etter at innskuddstaket er nådd", () => {
    const atCap = compute("bsu", {
      innskudd: "27500",
      aar: "11",
      rente: "4.5",
      fradrag: "10",
      tak: "300000",
    }).find((r) => r.id === "slutt")?.value as number;
    const later = compute("bsu", {
      innskudd: "27500",
      aar: "20",
      rente: "4.5",
      fradrag: "10",
      tak: "300000",
    }).find((r) => r.id === "slutt")?.value as number;
    expect(later).toBeGreaterThan(atCap);
    expect(
      compute("bsu", {
        innskudd: "27500",
        aar: "20",
        rente: "4.5",
        fradrag: "10",
        tak: "300000",
      }).find((r) => r.id === "innskutt")?.value,
    ).toBe(300_000);
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
      validateField(
        { id: "x", label: "X", type: "number", allowNegative: true },
        "-5",
      ),
    ).toBeNull();
    expect(
      validateField({ id: "x", label: "X", type: "number", max: 100 }, "150"),
    ).toBe("Høyst 100");
  });

  it("parser tallister med norsk desimalkomma via semikolon", () => {
    expect(parseNumberList("12,5; 13,2")).toEqual([12.5, 13.2]);
    expect(parseNumberList("12.5 13.2")).toEqual([12.5, 13.2]);
    expect(parseNumberList("1; 2; 3")).toEqual([1, 2, 3]);
  });

  it("avviser ugyldige tempo-/tidsformater", () => {
    expect(parsePaceMinutes("4:30")).toBe(4.5);
    expect(parsePaceMinutes("4:90")).toBeNull();
    expect(parseRaceSeconds("25:30")).toBe(1530);
    expect(parseRaceSeconds("1:99")).toBeNull();
    expect(parseRaceSeconds("1:23:45")).toBe(5025);
  });

  it("ceilStable unngår flyttallsopprunding", () => {
    expect(ceilStable(48.00000000001)).toBe(48);
    expect(ceilStable(48.1)).toBe(49);
  });
});

describe("QA P0 negative verdier", () => {
  it("andregrad med b=-5", () => {
    const results = compute("andregrad", { a: "1", b: "-5", c: "6" });
    const roots = [results.find((r) => r.id === "x1")?.value, results.find((r) => r.id === "x2")?.value]
      .map(Number)
      .sort((a, b) => a - b);
    expect(roots[0]).toBeCloseTo(2, 5);
    expect(roots[1]).toBeCloseTo(3, 5);
  });

  it("dato-pluss bakover", () => {
    expect(
      primaryValue("dato-pluss", { dato: "2026-08-24", dager: "-14" }),
    ).toBe("10. august 2026");
  });

  it("varmeenergi med negativ ΔT", () => {
    expect(
      primaryValue("varmeenergi", { m: "1", c: "4186", dt: "-20" }),
    ).toBeCloseTo(-83720, 0);
  });

  it("bevegelse med negativ akselerasjon", () => {
    const results = compute("bevegelse", { v0: "20", a: "-2", t: "5" });
    expect(results.find((r) => r.id === "v")?.value).toBeCloseTo(10, 5);
    expect(results.find((r) => r.id === "s")?.value).toBeCloseTo(75, 5);
  });

  it("temperatur under null", () => {
    const results = compute("temperatur", { verdi: "-10", fra: "c" });
    expect(results.find((r) => r.id === "f")?.value).toBeCloseTo(14, 5);
    expect(results.find((r) => r.id === "k")?.value).toBeCloseTo(263.15, 5);
  });

  it("trigonometri med negative verdier", () => {
    expect(
      resultById("trigonometri", { modus: "fra_vinkel", vinkel: "-30", verdi: "0" }, "sin"),
    ).toBeCloseTo(-0.5, 5);
    expect(
      resultById("trigonometri", { modus: "arcsin", vinkel: "0", verdi: "-0.5" }, "deg"),
    ).toBeCloseTo(-30, 5);
  });
});

describe("QA P0/P1 finans og bygg", () => {
  it("kredittkort bruker effektiv månedsrente", () => {
    const rente = resultById(
      "kredittkort-renter",
      { saldo: "25000", rente: "22", betaling: "1500" },
      "rente",
    ) as number;
    expect(rente).toBeCloseTo(25000 * monthlyRateFromEffectiveAnnual(22), 2);
    expect(rente).toBeCloseTo(417.72, 1);
  });

  it("betong 4×3×10 cm gir 48 sekker", () => {
    const results = compute("betong", {
      l: "4",
      b: "3",
      h: "10",
      sekk: "25",
    });
    expect(results.find((r) => r.id === "m3")?.value).toBeCloseTo(1.2, 5);
    expect(results.find((r) => r.id === "sekker")?.value).toBe(48);
  });

  it("konfidensintervall bruker t når s er valgt", () => {
    const margin = resultById(
      "konfidensintervall",
      { snitt: "50", s: "10", n: "10", konf: "95", stype: "s" },
      "margin",
    ) as number;
    expect(margin).toBeCloseTo(7.154, 2);
  });

  it("rentes-rente tolker årlig avkastning som effektiv", () => {
    const slutt = primaryValue("rentes-rente", {
      start: "50000",
      maaned: "2000",
      rente: "6",
      aar: "15",
    }) as number;
    expect(slutt).toBeCloseTo(693652, -2);
  });

  it("standardavvik CV er ikke 0 når snitt er 0", () => {
    const cv = resultById(
      "standardavvik",
      { tall: "-1; 1", type: "utvalg" },
      "cv",
    );
    expect(cv).toBe("Ikke definert når gjennomsnitt = 0");
  });

  it("eksponeringstrekant støtter lukker i sekunder", () => {
    const t = resultById(
      "eksponeringstrekant",
      {
        f: "2.8",
        lukkerModus: "sekunder",
        lukker: "2",
        iso: "100",
        f2: "4",
        lukker2Modus: "nevner",
        lukker2: "60",
        iso2: "100",
      },
      "t",
    );
    expect(t).toBe(2);
  });
});

describe("aksjekalkulatorer", () => {
  it("beregner P/E", () => {
    expect(primaryValue("pe-ratio", { kurs: "150", eps: "10" })).toBe(15);
  });

  it("viser N/A for P/E når EPS ≤ 0", () => {
    expect(primaryValue("pe-ratio", { kurs: "150", eps: "0" })).toBe("N/A");
    expect(primaryValue("pe-ratio", { kurs: "150", eps: "-2" })).toBe("N/A");
  });

  it("beregner EPS", () => {
    expect(
      primaryValue("eps", { resultat: "2500000000", aksjer: "250000000" }),
    ).toBe(10);
  });

  it("beregner utbytteavkastning", () => {
    expect(
      primaryValue("utbytteavkastning", { dps: "6", kurs: "150" }),
    ).toBeCloseTo(4, 5);
  });

  it("beregner utbetalingsgrad", () => {
    expect(
      primaryValue("utbetalingsgrad", { dps: "6", eps: "10" }),
    ).toBeCloseTo(60, 5);
  });

  it("viser N/A for payout når EPS ≤ 0", () => {
    expect(primaryValue("utbetalingsgrad", { dps: "6", eps: "0" })).toBe("N/A");
    expect(primaryValue("utbetalingsgrad", { dps: "6", eps: "-1" })).toBe(
      "N/A",
    );
  });

  it("beregner markedsverdi", () => {
    expect(
      primaryValue("markedsverdi", { kurs: "150", aksjer: "250000000" }),
    ).toBe(37_500_000_000);
  });

  it("beregner P/B", () => {
    expect(primaryValue("pb-ratio", { kurs: "150", bvps: "80" })).toBeCloseTo(
      1.875,
      5,
    );
  });

  it("beregner ROE", () => {
    expect(
      primaryValue("roe", {
        resultat: "2500000000",
        ekStart: "20000000000",
        ekSlutt: "22000000000",
      }),
    ).toBeCloseTo((2_500_000_000 / 21_000_000_000) * 100, 5);
  });

  it("beregner gearing D/E", () => {
    expect(
      primaryValue("gearing", {
        gjeld: "15000000000",
        ek: "22000000000",
        eiendeler: "37000000000",
      }),
    ).toBeCloseTo((15_000_000_000 / 22_000_000_000) * 100, 5);
  });

  it("beregner net debt / EBITDA", () => {
    expect(
      primaryValue("net-debt-ebitda", {
        gjeld: "12000000000",
        kontanter: "3000000000",
        ebitda: "4000000000",
      }),
    ).toBeCloseTo(2.25, 5);
  });

  it("viser N/A for net debt/EBITDA når EBITDA ≤ 0", () => {
    expect(
      primaryValue("net-debt-ebitda", {
        gjeld: "12000000000",
        kontanter: "3000000000",
        ebitda: "0",
      }),
    ).toBe("N/A");
    expect(
      primaryValue("net-debt-ebitda", {
        gjeld: "12000000000",
        kontanter: "3000000000",
        ebitda: "-100",
      }),
    ).toBe("N/A");
  });

  it("beregner EV og EV/EBITDA", () => {
    const ev = primaryValue("enterprise-value", {
      mcap: "37500000000",
      gjeld: "12000000000",
      kontanter: "3000000000",
    });
    expect(ev).toBe(46_500_000_000);
    expect(
      primaryValue("ev-ebitda", { ev: "46500000000", ebitda: "4000000000" }),
    ).toBeCloseTo(11.625, 3);
  });

  it("viser N/A for EV/EBITDA når EBITDA ≤ 0", () => {
    expect(
      primaryValue("ev-ebitda", { ev: "46500000000", ebitda: "0" }),
    ).toBe("N/A");
    expect(
      primaryValue("ev-ebitda", { ev: "46500000000", ebitda: "-1" }),
    ).toBe("N/A");
  });

  it("beregner PEG", () => {
    expect(primaryValue("peg-ratio", { pe: "15", vekst: "12" })).toBeCloseTo(
      1.25,
      5,
    );
  });

  it("viser N/A for PEG uten positiv P/E og vekst", () => {
    expect(primaryValue("peg-ratio", { pe: "0", vekst: "12" })).toBe("N/A");
    expect(primaryValue("peg-ratio", { pe: "-5", vekst: "12" })).toBe("N/A");
    expect(primaryValue("peg-ratio", { pe: "15", vekst: "0" })).toBe("N/A");
    expect(primaryValue("peg-ratio", { pe: "15", vekst: "-3" })).toBe("N/A");
  });

  it("beregner totalavkastning", () => {
    // (150-120+8)/120 = 31.666...%
    expect(
      primaryValue("totalavkastning-aksje", {
        kjop: "120",
        salg: "150",
        utbytte: "8",
      }),
    ).toBeCloseTo(31.6667, 3);
  });

  it("beregner snittkurs fra flere kjøp", () => {
    expect(
      primaryValue("snittkurs-aksje", { kjop: "100:100; 100:200" }),
    ).toBe(150);
  });

  it("beregner break-even etter kurtasje", () => {
    expect(
      primaryValue("break-even-kurtasje", {
        kjop: "100",
        aksjer: "100",
        kurtasjeKjop: "49",
        kurtasjeSalg: "51",
      }),
    ).toBe(101);
  });

  it("krever kjøpskurs > 0 for break-even", () => {
    expect(
      compute("break-even-kurtasje", {
        kjop: "0",
        aksjer: "100",
        kurtasjeKjop: "49",
        kurtasjeSalg: "49",
      }),
    ).toEqual([]);
  });

  it("beregner utbytteinntekt", () => {
    expect(
      primaryValue("utbytteinntekt", {
        aksjer: "200",
        dps: "6",
        kurs: "150",
      }),
    ).toBe(1200);
  });

  it("beregner aksje-CAGR", () => {
    expect(
      primaryValue("cagr-aksje", {
        kjop: "100",
        salg: "180",
        aar: "5",
        utbytte: "0",
      }),
    ).toBeCloseTo((Math.pow(1.8, 1 / 5) - 1) * 100, 2);
  });

  it("har formler knyttet til aksjekalkulatorene", () => {
    expect(getFormula("pe-formel")?.calculatorSlug).toBe("pe-ratio");
    expect(getFormula("enterprise-value-formel")?.calculatorSlug).toBe(
      "enterprise-value",
    );
  });

  it("omtaler aksjer i økonomikategoriens beskrivelse", () => {
    const desc = getCategory("okonomi")?.description ?? "";
    expect(desc.toLowerCase()).toMatch(/aksjer/);
    expect(desc.toLowerCase()).toMatch(/verdsettelse/);
    expect(desc.toLowerCase()).toMatch(/utbytte/);
  });
});

describe("bettingkalkulatorer", () => {
  it("regner utbetaling og implisitt sannsynlighet", () => {
    const results = compute("odds-kalkulator", { odds: "2.5", innsats: "100" });
    expect(results.find((r) => r.id === "utbetaling")?.value).toBe(250);
    expect(results.find((r) => r.id === "gevinst")?.value).toBe(150);
    expect(results.find((r) => r.id === "implied")?.value).toBeCloseTo(40, 5);
  });

  it("flagger positiv EV som verdibett", () => {
    const results = compute("verdibett", {
      odds: "2.5",
      sannsynlighet: "45",
      innsats: "100",
    });
    // EV = 100 * (0.45 * 2.5 - 1) = 12.5
    expect(results.find((r) => r.id === "ev")?.value).toBeCloseTo(12.5, 5);
    expect(results.find((r) => r.id === "status")?.value).toMatch(/Positiv/);
  });

  it("anbefaler bankroll-innsats med ½ Kelly og tak", () => {
    // b=1.5, p=0.5, q=0.5 → f* = (0.75−0.5)/1.5 ≈ 16,67 %
    // ½ Kelly ≈ 8,33 % > tak 5 % → 5 % av 5000 = 250
    const results = compute("bankroll-kelly", {
      bankroll: "5000",
      odds: "2.5",
      sannsynlighet: "50",
      fraksjon: "0.5",
      tak: "5",
    });
    expect(results.find((r) => r.id === "kelly")?.value).toBeCloseTo(
      (100 * (1.5 * 0.5 - 0.5)) / 1.5,
      5,
    );
    expect(results.find((r) => r.id === "innsats")?.value).toBe(250);
    expect(results.find((r) => r.id === "status")?.value).toMatch(/taket/);
  });

  it("anbefaler ingen innsats uten edge", () => {
    const status = primaryValue("bankroll-kelly", {
      bankroll: "5000",
      odds: "2.0",
      sannsynlighet: "40",
      fraksjon: "0.5",
      tak: "5",
    });
    expect(status).toMatch(/Ingen innsats/);
  });
});
