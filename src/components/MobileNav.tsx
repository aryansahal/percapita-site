"use client";

import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "@/lib/content";

/**
 * Nav menu for narrow screens.
 *
 * Replaces the horizontally scrolling nav below 768px, where it collapsed to a
 * ~65px sliver and was effectively unusable. The Client Login button stays in
 * the bar rather than moving in here — it is the primary call to action and
 * there is room for it at 390px.
 */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 flex-none cursor-pointer items-center justify-center rounded-[2px] border border-hair text-plum transition-colors duration-150 hover:border-purple"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <>
              <path d="M4 4l10 10" />
              <path d="M14 4L4 14" />
            </>
          ) : (
            <>
              <path d="M2.5 5h13" />
              <path d="M2.5 9h13" />
              <path d="M2.5 13h13" />
            </>
          )}
        </svg>
      </button>

      {/* Sits under the sticky bar; the header is the positioning context. */}
      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-hair bg-white"
      >
        <nav aria-label="Primary" className="shell flex flex-col py-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-hair py-[14px] text-[15px] font-medium text-ink-2 transition-colors duration-150 last:border-b-0 hover:text-purple-accent"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
