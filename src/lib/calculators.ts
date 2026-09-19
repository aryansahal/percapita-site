/**
 * Wealth calculator maths.
 *
 * Ported verbatim from the design prototype's logic class. All figures are
 * illustrative; the disclaimers rendered alongside each result are part of the
 * design, not decoration.
 */

export type CalculatorTab =
  | "SIP Returns"
  | "Wealth Goal"
  | "Tax Savings (80C)"
  | "Retirement Corpus";

export const CALCULATOR_TABS: CalculatorTab[] = [
  "SIP Returns",
  "Wealth Goal",
  "Tax Savings (80C)",
  "Retirement Corpus",
];

/** Compact INR: at or above 1 Cr and 1 L collapse to 2dp, else en-IN grouping. */
export function inr(n: number): string {
  const v = Math.round(n);
  if (v >= 1e7) return "₹" + (v / 1e7).toFixed(2) + " Cr";
  if (v >= 1e5) return "₹" + (v / 1e5).toFixed(2) + " L";
  return "₹" + v.toLocaleString("en-IN");
}

/** Full INR with en-IN grouping, never collapsed. */
export function plain(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

/** Future value of an annuity-due: monthly contributions made at period start. */
function sipFutureValue(monthly: number, annualRatePct: number, years: number) {
  const i = annualRatePct / 1200;
  const n = years * 12;
  return monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
}

/** The inverse: the monthly contribution that reaches a target corpus. */
function sipForTarget(target: number, annualRatePct: number, years: number) {
  const i = annualRatePct / 1200;
  const n = years * 12;
  return target / (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
}

export interface SliderField {
  key: string;
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  minLabel: string;
  maxLabel: string;
}

export interface CalculatorResult {
  fields: SliderField[];
  resultLabel: string;
  resultValue: string;
  rows: { label: string; value: string }[];
  note: string;
  cta: string;
}

export interface SipState {
  amount: number;
  rate: number;
  years: number;
}

export interface GoalState {
  target: number;
  rate: number;
  years: number;
}

export interface TaxState {
  income: number;
  invested: number;
}

export interface RetState {
  age: number;
  retireAge: number;
  expense: number;
}

export const DEFAULTS = {
  sip: { amount: 25000, rate: 12, years: 15 } as SipState,
  goal: { target: 10000000, rate: 12, years: 10 } as GoalState,
  tax: { income: 1800000, invested: 150000 } as TaxState,
  ret: { age: 36, retireAge: 60, expense: 150000 } as RetState,
};

export function sipResult(s: SipState): CalculatorResult {
  const fv = sipFutureValue(s.amount, s.rate, s.years);
  const invested = s.amount * s.years * 12;
  return {
    fields: [
      {
        key: "amount",
        label: "Monthly SIP Amount",
        value: s.amount,
        display: plain(s.amount),
        min: 1000,
        max: 500000,
        step: 1000,
        minLabel: "₹1,000",
        maxLabel: "₹5,00,000",
      },
      {
        key: "rate",
        label: "Expected Annual Return",
        value: s.rate,
        display: s.rate.toFixed(1) + "%",
        min: 4,
        max: 20,
        step: 0.5,
        minLabel: "4%",
        maxLabel: "20%",
      },
      {
        key: "years",
        label: "Investment Tenure",
        value: s.years,
        display: s.years + " Years",
        min: 1,
        max: 40,
        step: 1,
        minLabel: "1 Year",
        maxLabel: "40 Years",
      },
    ],
    resultLabel: "Total Corpus at Maturity",
    resultValue: inr(fv),
    rows: [
      { label: "Amount Invested", value: inr(invested) },
      { label: "Estimated Returns", value: inr(fv - invested) },
      { label: "Wealth Multiple", value: (fv / invested).toFixed(1) + "×" },
    ],
    note: "Illustrative only. Returns are assumed constant and are not guaranteed. Actual mutual fund returns vary with market conditions.",
    cta: "Talk to an advisor about SIP planning",
  };
}

export function goalResult(g: GoalState): CalculatorResult {
  const sip = sipForTarget(g.target, g.rate, g.years);
  const lump = g.target / Math.pow(1 + g.rate / 100, g.years);
  return {
    fields: [
      {
        key: "target",
        label: "Target Corpus",
        value: g.target,
        display: inr(g.target),
        min: 500000,
        max: 250000000,
        step: 500000,
        minLabel: "₹5 L",
        maxLabel: "₹25 Cr",
      },
      {
        key: "rate",
        label: "Expected Annual Return",
        value: g.rate,
        display: g.rate.toFixed(1) + "%",
        min: 4,
        max: 20,
        step: 0.5,
        minLabel: "4%",
        maxLabel: "20%",
      },
      {
        key: "years",
        label: "Years to Goal",
        value: g.years,
        display: g.years + " Years",
        min: 1,
        max: 40,
        step: 1,
        minLabel: "1 Year",
        maxLabel: "40 Years",
      },
    ],
    resultLabel: "Monthly SIP Required",
    resultValue: plain(sip),
    rows: [
      { label: "Target Corpus", value: inr(g.target) },
      { label: "Total Invested", value: inr(sip * g.years * 12) },
      { label: "Lump Sum Alternative", value: inr(lump) },
    ],
    note: "Assumes a constant rate of return and uninterrupted monthly contributions. Review your goal annually with your advisor.",
    cta: "Plan this goal with an advisor",
  };
}

export function taxResult(t: TaxState): CalculatorResult {
  const eligible = Math.min(t.invested, 150000);
  const slab =
    t.income > 1500000
      ? 0.3
      : t.income > 1200000
        ? 0.2
        : t.income > 900000
          ? 0.15
          : t.income > 600000
            ? 0.1
            : t.income > 300000
              ? 0.05
              : 0;
  const saved = eligible * slab * 1.04; // includes 4% cess
  return {
    fields: [
      {
        key: "income",
        label: "Annual Taxable Income",
        value: t.income,
        display: plain(t.income),
        min: 300000,
        max: 10000000,
        step: 50000,
        minLabel: "₹3 L",
        maxLabel: "₹1 Cr",
      },
      {
        key: "invested",
        label: "80C Investment This Year",
        value: t.invested,
        display: plain(t.invested),
        min: 0,
        max: 150000,
        step: 5000,
        minLabel: "₹0",
        maxLabel: "₹1.5 L",
      },
    ],
    resultLabel: "Estimated Tax Saved",
    resultValue: plain(saved),
    rows: [
      { label: "Eligible 80C Deduction", value: plain(eligible) },
      { label: "Marginal Slab Rate", value: (slab * 100).toFixed(0) + "%" },
      { label: "Unused 80C Headroom", value: plain(150000 - eligible) },
    ],
    note: "Old regime illustration including 4% cess, excluding surcharge. Section 80C is capped at ₹1.5 L. Not tax advice. Consult a qualified professional.",
    cta: "Review your tax structure with us",
  };
}

/** OPEN ITEM: chosen during design, not client-confirmed. Verify before launch. */
const RETIREMENT_ASSUMPTIONS = {
  inflation: 0.06,
  postRetirementReturn: 0.08,
  preRetirementReturn: 0.12,
  retirementYears: 20,
};

export function retirementResult(r: RetState): CalculatorResult {
  const {
    inflation,
    postRetirementReturn,
    preRetirementReturn,
    retirementYears,
  } = RETIREMENT_ASSUMPTIONS;
  const yrs = Math.max(r.retireAge - r.age, 1);
  const futureMonthly = r.expense * Math.pow(1 + inflation, yrs);
  const real = (1 + postRetirementReturn) / (1 + inflation) - 1;
  const corpus =
    (futureMonthly * 12 * (1 - Math.pow(1 + real, -retirementYears))) / real;
  const sip = sipForTarget(corpus, preRetirementReturn * 100, yrs);
  return {
    fields: [
      {
        key: "age",
        label: "Current Age",
        value: r.age,
        display: r.age + " Years",
        min: 22,
        max: 60,
        step: 1,
        minLabel: "22",
        maxLabel: "60",
      },
      {
        key: "retireAge",
        label: "Planned Retirement Age",
        value: r.retireAge,
        display: r.retireAge + " Years",
        min: 45,
        max: 75,
        step: 1,
        minLabel: "45",
        maxLabel: "75",
      },
      {
        key: "expense",
        label: "Monthly Expenses Today",
        value: r.expense,
        display: inr(r.expense) + " / mo",
        min: 20000,
        max: 1000000,
        step: 5000,
        minLabel: "₹20,000",
        maxLabel: "₹10 L",
      },
    ],
    resultLabel: "Retirement Corpus Required",
    resultValue: inr(corpus),
    rows: [
      { label: "Years to Retirement", value: yrs + " Years" },
      {
        label: "Inflation Adjusted Monthly Spend",
        value: inr(futureMonthly) + " /mo",
      },
      { label: "Monthly SIP Needed Today", value: plain(sip) },
    ],
    note: "Assumes 6% inflation, 8% post retirement return, 12% pre retirement return and a 20 year retirement. Illustrative only.",
    cta: "Build your retirement plan with us",
  };
}
