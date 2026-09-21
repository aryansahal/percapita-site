import Image from "next/image";
import { NAV_LINKS, WORDMARK } from "@/lib/content";
import { ClientLoginTrigger } from "./ClientLogin";
import { MobileNav } from "./MobileNav";

/**
 * Sticky header. One 78px row at every width.
 *
 * Below 768px the links move into a menu panel (see MobileNav) — laid out
 * inline they collapsed to a ~65px scrolling sliver. The Client Login button
 * stays in the bar at every width; it fits at 390px and is the primary CTA.
 *
 * Note: the inline nav must NOT use `justify-content: flex-end`. Combined with
 * `overflow-x: auto` that pushes overflow past the start edge, where scrolling
 * cannot reach it, and the links paint over the logo. The flexible spacer
 * before the nav is what right-aligns it.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-hair bg-white">
      <div className="mx-auto flex h-[78px] max-w-[1200px] flex-nowrap items-center gap-[clamp(14px,3vw,40px)] px-[clamp(16px,3vw,32px)]">
        <a href="#" className="flex-none" aria-label="Percapita, home">
          <Image
            src={WORDMARK.src}
            alt="Percapita"
            width={WORDMARK.w}
            height={WORDMARK.h}
            sizes="168px"
            priority
            className="h-auto w-[clamp(112px,15vw,168px)] object-contain"
          />
        </a>

        {/* Flexible spacer — right-aligns what follows without flex-end. */}
        <div className="min-w-0 flex-auto" />

        <nav
          aria-label="Primary"
          className="hidden min-w-0 flex-nowrap items-center gap-[clamp(18px,2.4vw,30px)] overflow-x-auto md:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ flex: "0 1 auto" }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex-none whitespace-nowrap text-[13.5px] font-medium text-ink-2 transition-colors duration-150 hover:text-purple-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <ClientLoginTrigger className="flex-none rounded-[2px] bg-purple px-[clamp(14px,3vw,22px)] py-3 text-[13px] font-semibold whitespace-nowrap text-white transition-colors duration-150 hover:bg-purple-hover">
          Client Login
        </ClientLoginTrigger>

        <MobileNav />
      </div>
    </header>
  );
}
