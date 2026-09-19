import { WHAT_WE_DO } from "@/lib/content";
import { Diamond } from "./icons";

export function WhatWeDo() {
  return (
    <section id="what-we-do" className="bg-plum-dark text-white">
      <div className="shell section-y">
        <p className="eyebrow mb-[22px] text-lilac">What We Do</p>
        <h2 className="max-w-[900px] text-[clamp(27px,3.8vw,38px)] leading-[1.2] font-bold tracking-[-0.03em]">
          Unified financial planning and investment advisory.
        </h2>
        <p className="mt-5 max-w-[620px] text-[14.5px] leading-[1.8] text-on-dark-3">
          We integrate financial planning and investment guidance into one
          service, designed to evolve with your goals and provide long term
          clarity. We continuously review and refine strategies, offering
          regular reporting and personal reviews to keep your plan aligned with
          your life.
        </p>

        <div className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[clamp(36px,5vw,64px)]">
          {WHAT_WE_DO.map((column) => (
            <div key={column.heading}>
              <h3 className="border-b border-white/[0.18] pb-4 text-[11px] font-bold tracking-[0.16em] uppercase text-lilac">
                {column.heading}
              </h3>
              <ul className="mt-[22px] flex list-none flex-col gap-[15px] text-[13.5px] leading-[1.65] text-on-dark">
                {column.items.map((item) => (
                  <li key={item} className="flex items-baseline gap-3">
                    <Diamond className="flex-none text-[8px] text-lilac" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-14 max-w-[1000px] text-[11px] leading-[1.85] text-on-dark-muted-5">
          Percapita provides advisory services only. We do not guarantee
          financial outcomes. All financial products are subject to the terms,
          conditions, and regulations of the issuing institutions. Clients are
          encouraged to review official documents carefully before making
          decisions.
        </p>
      </div>
    </section>
  );
}
