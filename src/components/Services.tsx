import { Diamond } from "./icons";

const FD_SOURCES = [
  "Banks",
  "Financial institutions",
  "Housing finance companies",
  "Certain corporates offering deposit schemes",
];

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[11px] font-bold tracking-[0.16em] uppercase text-violet">
      {children}
    </h3>
  );
}

function CardBody({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-[14px] leading-[1.8] text-ink-3">{children}</p>
  );
}

/** A detail line with a bolded lead-in, as used on the Mutual Funds card. */
function Detail({ lead, children }: { lead: string; children: React.ReactNode }) {
  return (
    <div>
      <strong className="text-plum">{lead}</strong> {children}
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-surface">
      <div className="shell py-[clamp(52px,6.5vw,88px)]">
        <p className="eyebrow mb-5 text-violet">Services</p>
        <h2 className="text-[clamp(26px,3.6vw,36px)] leading-[1.2] font-bold tracking-[-0.03em] text-plum">
          Investments, deposits, and protection.
        </h2>

        <div className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-px bg-hair-2">
          <article className="bg-white px-[clamp(22px,3vw,32px)] py-[clamp(28px,3.5vw,36px)]">
            <CardLabel>Mutual Funds</CardLabel>
            <CardBody>
              In today&rsquo;s economy, keeping money only in a savings account
              may not protect against inflation. Mutual funds provide a way to
              participate in financial markets with professional management,
              diversification, and transparency.
            </CardBody>
            <div className="mt-[22px] flex flex-col gap-3 border-t border-hair pt-5 text-[13px] leading-[1.65] text-ink-2">
              <Detail lead="Professional Management.">
                Managed by qualified fund managers.
              </Detail>
              <Detail lead="Transparency and Regulation.">
                Funds are regulated and audited, with clear reporting on
                performance and strategies.
              </Detail>
              <Detail lead="Diversification.">
                Access to a broad range of investments, reducing reliance on a
                single asset.
              </Detail>
            </div>
          </article>

          <article className="bg-white px-[clamp(22px,3vw,32px)] py-[clamp(28px,3.5vw,36px)]">
            <CardLabel>Fixed Deposits</CardLabel>
            <CardBody>
              Fixed deposits remain a popular option for those who value
              stability and predictable returns. The interest rate, duration,
              and maturity amount are defined upfront, providing clarity for
              investors who prioritize capital preservation.
            </CardBody>
            <div className="mt-[22px] border-t border-hair pt-5">
              <h4 className="mb-3 text-[11px] font-bold tracking-[0.12em] uppercase text-muted-2">
                Where FDs Are Offered
              </h4>
              <ul className="flex list-none flex-col gap-[9px] text-[13px] leading-[1.6] text-ink-2">
                {FD_SOURCES.map((source) => (
                  <li key={source} className="flex items-baseline gap-2.5">
                    <Diamond className="flex-none text-[8px] text-violet" />
                    <span>{source}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="bg-white px-[clamp(22px,3vw,32px)] py-[clamp(28px,3.5vw,36px)]">
            <CardLabel>General Insurance</CardLabel>
            <CardBody>
              General insurance provides protection for assets such as vehicles,
              property, and health against unexpected financial risks. At
              Percapita, we help clients explore suitable insurance options to
              safeguard what matters most.
            </CardBody>
            <div className="mt-[22px] flex flex-col gap-3 border-t border-hair pt-5 text-[13px] leading-[1.65] text-ink-2">
              <Detail lead="Transparency and Regulation.">
                Policies are regulated, with defined terms and disclosures.
              </Detail>
              <Detail lead="Suitability First.">
                Cover is matched to the assets and risks that matter to you.
              </Detail>
            </div>
          </article>
        </div>

        <p className="mt-[26px] max-w-[900px] text-[11px] leading-[1.8] text-muted">
          When considering fixed deposits, it is important to review the
          credibility of the institution, check credit ratings, and understand
          regulatory oversight. While FDs provide stability, they are best
          viewed as part of a diversified financial plan that balances safety
          with long term goals.
        </p>
      </div>
    </section>
  );
}
