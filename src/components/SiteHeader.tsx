import Image from "next/image";
import { NAV_LINKS, WORDMARK } from "@/lib/content";

/**
 * Sticky header. Stays a single row at every width — the nav scrolls
 * horizontally rather than wrapping.
 *
 * Note: the nav must NOT use `justify-content: flex-end`. Combined with
 * `overflow-x: auto` that pushes overflow past the start edge, where scrolling
 * cannot reach it, and the links paint over the logo. The flexible spacer
 * before the nav is what right-aligns it.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-hair bg-white">
      <div className="mx-auto flex h-[78px] max-w-[1200px] flex-nowrap items-center gap-[clamp(20px,3vw,40px)] px-[clamp(16px,3vw,32px)]">
        <Image
          src={WORDMARK.src}
          alt="Percapita"
          width={WORDMARK.w}
          height={WORDMARK.h}
          sizes="168px"
          priority
          className="h-auto w-[clamp(118px,15vw,168px)] flex-none object-contain"
        />

        {/* Flexible spacer — right-aligns the nav without flex-end. */}
        <div className="min-w-0 flex-auto" />

        <nav
          aria-label="Primary"
          className="flex min-w-0 flex-nowrap items-center gap-[clamp(18px,2.4vw,30px)] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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

        <a
          href="#contact"
          className="flex-none rounded-[2px] bg-purple px-[22px] py-3 text-[13px] font-semibold whitespace-nowrap text-white transition-colors duration-150 hover:bg-purple-hover"
        >
          Client Login
        </a>
      </div>
    </header>
  );
}
