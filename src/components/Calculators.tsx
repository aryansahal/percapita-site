"use client";

import { useState } from "react";
import {
  CALCULATOR_TABS,
  DEFAULTS,
  goalResult,
  retirementResult,
  sipResult,
  taxResult,
  type CalculatorResult,
  type CalculatorTab,
} from "@/lib/calculators";

/**
 * Wealth calculators.
 *
 * Each calculator keeps its own inputs, so switching tabs and coming back
 * preserves what you had set.
 */
export function Calculators() {
  const [tab, setTab] = useState<CalculatorTab>("SIP Returns");
  const [sip, setSip] = useState(DEFAULTS.sip);
  const [goal, setGoal] = useState(DEFAULTS.goal);
  const [tax, setTax] = useState(DEFAULTS.tax);
  const [ret, setRet] = useState(DEFAULTS.ret);

  let result: CalculatorResult;
  let onFieldChange: (key: string, value: number) => void;

  switch (tab) {
    case "Wealth Goal":
      result = goalResult(goal);
      onFieldChange = (key, value) => setGoal((s) => ({ ...s, [key]: value }));
      break;
    case "Tax Savings (80C)":
      result = taxResult(tax);
      onFieldChange = (key, value) => setTax((s) => ({ ...s, [key]: value }));
      break;
    case "Retirement Corpus":
      result = retirementResult(ret);
      onFieldChange = (key, value) => setRet((s) => ({ ...s, [key]: value }));
      break;
    default:
      result = sipResult(sip);
      onFieldChange = (key, value) => setSip((s) => ({ ...s, [key]: value }));
  }

  const panelId = `calculator-panel-${tab.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <section id="calculators" className="bg-white">
      <div className="shell py-[clamp(52px,6.5vw,88px)]">
        <p className="eyebrow mb-5 text-violet">Calculators</p>
        <h2 className="text-[clamp(27px,3.8vw,38px)] leading-[1.2] font-bold tracking-[-0.03em] text-plum">
          Run the numbers on your future.
        </h2>

        <div
          role="tablist"
          aria-label="Calculators"
          className="mt-10 flex flex-wrap gap-x-[30px] gap-y-4 border-b border-hair-2"
        >
          {CALCULATOR_TABS.map((name) => {
            const active = name === tab;
            return (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={active ? panelId : undefined}
                onClick={() => setTab(name)}
                className={`-mb-px cursor-pointer border-b-2 pb-4 text-[11.5px] font-bold tracking-[0.14em] whitespace-nowrap uppercase transition-colors duration-150 ${
                  active
                    ? "border-purple text-plum"
                    : "border-transparent text-muted-2 hover:text-ink-3"
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>

        <div
          id={panelId}
          role="tabpanel"
          className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-[clamp(36px,5vw,56px)]"
        >
          <div className="flex min-w-0 flex-col gap-[30px]">
            {result.fields.map((field) => (
              <div key={field.key}>
                <label
                  htmlFor={`calc-${field.key}`}
                  className="block text-[10.5px] font-bold tracking-[0.14em] uppercase text-muted"
                >
                  {field.label}
                </label>
                <output
                  htmlFor={`calc-${field.key}`}
                  className="mt-[9px] block text-[23px] font-bold tracking-[-0.02em] text-plum"
                >
                  {field.display}
                </output>
                <input
                  id={`calc-${field.key}`}
                  type="range"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={field.value}
                  onChange={(e) => onFieldChange(field.key, +e.target.value)}
                />
                <div className="flex justify-between gap-3 text-[10.5px] whitespace-nowrap text-muted-3">
                  <span>{field.minLabel}</span>
                  <span>{field.maxLabel}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="min-w-0 bg-plum px-[clamp(22px,3vw,34px)] pt-[clamp(28px,3.5vw,36px)] pb-[30px] text-white">
            <p className="text-[10.5px] font-bold tracking-[0.16em] uppercase text-on-dark-3">
              {result.resultLabel}
            </p>
            <p
              aria-live="polite"
              className="mt-3 text-[clamp(32px,4.4vw,44px)] font-bold tracking-[-0.035em]"
            >
              {result.resultValue}
            </p>

            <dl className="mt-[26px] flex flex-col">
              {result.rows.map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between gap-4 border-b border-white/[0.14] py-[13px] text-[13px]"
                >
                  <dt className="text-on-dark-3">{row.label}</dt>
                  <dd className="font-semibold">{row.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 text-[10.5px] leading-[1.7] text-on-dark-muted-6">
              {result.note}
            </p>

            <a
              href="#contact"
              className="mt-6 block bg-lilac px-5 py-[15px] text-center text-[13px] font-bold text-plum transition-colors duration-150 hover:bg-lilac-light"
            >
              {result.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
