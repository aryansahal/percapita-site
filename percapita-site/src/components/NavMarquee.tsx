import { fetchSchemeNavs, type SchemeNav } from "@/lib/nav";

/**
 * Scrolling band of current scheme NAVs, sourced from AMFI. Sits below the
 * hero; the fund-house logo marquee is a separate band above the footer.
 *
 * If AMFI is unreachable this renders nothing and the page simply closes up.
 * It must NOT fall back to the logo marquee — that band is already on the page
 * further down, and a failed fetch would render it twice.
 *
 * Spacing sits on each item rather than in a flex `gap` for the same reason as
 * the logo marquee: a gap only falls *between* items, so half the duplicated
 * track would not equal one full set and the -50% loop would visibly jump.
 */
export async function NavMarquee() {
  const navs = await fetchSchemeNavs();
  if (!navs || navs.length === 0) return null;

  const asOn = navs[0].date;
  const track = [...navs, ...navs];

  return (
    <section
      aria-label="Scheme net asset values"
      className="overflow-hidden border-y border-hair bg-white"
    >
      <div className="shell flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 pt-[26px] pb-[10px]">
        <h2 className="text-[10.5px] font-bold tracking-[0.18em] uppercase text-muted-2">
          Scheme NAVs · Regular Plan, Growth
        </h2>
        <p className="text-[10.5px] font-medium tracking-[0.06em] text-muted-3">
          As on {asOn} · Source: AMFI
        </p>
      </div>

      <div className="pc-marquee-mask relative pt-[14px] pb-[22px]">
        <ul className="pc-marquee-track flex w-max list-none items-stretch">
          {track.map((item, i) => (
            <li
              key={`${item.code}-${i}`}
              className="flex-none"
              aria-hidden={i >= navs.length}
              style={{ paddingRight: 56 }}
            >
              <NavItem item={item} />
            </li>
          ))}
        </ul>
      </div>

      <div className="shell pb-[22px]">
        <p className="text-[10.5px] leading-[1.7] text-muted-3">
          Net asset values are published by AMFI and are not indicative of
          future returns. Percapita distributes Regular Plans only.
        </p>
      </div>
    </section>
  );
}

function NavItem({ item }: { item: SchemeNav }) {
  return (
    <div className="flex h-full flex-col justify-center border-l border-hair pl-4">
      <p className="text-[9.5px] font-bold tracking-[0.16em] uppercase text-violet">
        {item.house}
      </p>
      <p className="mt-[5px] text-[13px] leading-[1.3] font-medium whitespace-nowrap text-ink-3">
        {item.scheme}
      </p>
      <p className="mt-[3px] text-[16px] font-bold tracking-[-0.01em] tabular-nums text-plum">
        {item.nav}
      </p>
    </div>
  );
}
