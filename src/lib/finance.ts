/** Felles finansberegninger for lån og effektiv rente. */

export function annuityPayment(
  principal: number,
  annualRatePercent: number,
  years: number,
  periodsPerYear: number,
): number {
  const n = years * periodsPerYear;
  if (n <= 0 || principal <= 0) return Number.NaN;
  const r = annualRatePercent / 100 / periodsPerYear;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

/** Effektiv årsrente (IRR) fra kontantstrømmer, annualisert. */
export function irrAnnualized(
  cashFlows: number[],
  periodsPerYear: number,
): number {
  if (cashFlows.length < 2 || periodsPerYear <= 0) return Number.NaN;

  let rate = 0.01;
  for (let iter = 0; iter < 200; iter++) {
    let npv = 0;
    let dnpv = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      const denom = Math.pow(1 + rate, t);
      npv += cashFlows[t] / denom;
      if (t > 0) {
        dnpv -= (t * cashFlows[t]) / Math.pow(1 + rate, t + 1);
      }
    }
    if (Math.abs(npv) < 1e-9) break;
    if (Math.abs(dnpv) < 1e-12) break;
    rate -= npv / dnpv;
    if (!Number.isFinite(rate)) return Number.NaN;
  }

  return (Math.pow(1 + rate, periodsPerYear) - 1) * 100;
}

export function effectiveLoanRate(params: {
  principal: number;
  annualRatePercent: number;
  years: number;
  periodsPerYear: number;
  establishmentFee: number;
  termFee: number;
}): number {
  const {
    principal,
    annualRatePercent,
    years,
    periodsPerYear,
    establishmentFee,
    termFee,
  } = params;
  const pmt = annuityPayment(
    principal,
    annualRatePercent,
    years,
    periodsPerYear,
  );
  if (!Number.isFinite(pmt)) return Number.NaN;

  const n = years * periodsPerYear;
  const flows: number[] = [principal - establishmentFee];
  for (let i = 0; i < n; i++) flows.push(-(pmt + termFee));

  return irrAnnualized(flows, periodsPerYear);
}
