"use client";

import { useEffect, useRef, useState } from "react";
import { CHAT_CHANNELS, CHAT_INTRO, type ChatChannel } from "@/lib/chatLauncher";
import {
  ArrowRightIcon,
  ChatIcon,
  CloseIcon,
  MailIcon,
  WhatsAppIcon,
} from "./icons";

/**
 * Floating contact launcher, bottom right.
 *
 * A disclosure, not a modal: it does not trap focus or block the page, since
 * it is a shortcut rather than a task. Escape closes it, a click outside
 * closes it, and focus returns to the trigger so keyboard users are not
 * stranded at the end of the document.
 *
 * z-40 keeps it under the sticky header (z-50) and under the Client Login
 * dialog, so it never floats over a modal.
 */

function ChannelIcon({ kind }: { kind: ChatChannel["kind"] }) {
  if (kind === "whatsapp")
    return <WhatsAppIcon size={17} className="flex-none text-[#25D366]" />;
  if (kind === "email")
    return <MailIcon size={17} className="flex-none text-purple" />;
  return <ArrowRightIcon size={17} className="flex-none text-purple" />;
}

export function ChatLauncher() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    // Move focus into the panel so the first thing after opening is an
    // actionable link, not the trigger the user just pressed.
    panelRef.current?.querySelector("a")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 md:right-7 md:bottom-7"
    >
      <div
        ref={panelRef}
        id="chat-launcher-panel"
        hidden={!open}
        className="w-[min(calc(100vw-2rem),310px)] origin-bottom-right overflow-hidden rounded-[10px] border border-hair bg-white shadow-[0_14px_44px_rgba(28,10,45,0.24)]"
      >
        <div className="bg-plum px-[18px] py-[15px] text-white">
          <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-lilac">
            Percapita
          </p>
          <p className="mt-1.5 text-[15px] leading-[1.35] font-bold tracking-[-0.02em]">
            {CHAT_INTRO.heading}
          </p>
          <p className="mt-1.5 text-[11.5px] leading-[1.6] text-on-dark-2">
            {CHAT_INTRO.note}
          </p>
        </div>

        <ul className="flex list-none flex-col">
          {CHAT_CHANNELS.map((channel) => (
            <li key={channel.role} className="border-t border-hair first:border-t-0">
              <a
                href={channel.href}
                {...(channel.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-[18px] py-[13px] transition-colors duration-150 hover:bg-surface focus-visible:bg-surface focus-visible:outline-none"
              >
                <ChannelIcon kind={channel.kind} />
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold tracking-[0.14em] uppercase text-muted">
                    {channel.role}
                  </span>
                  <span className="mt-[3px] block truncate text-[13.5px] font-semibold text-plum">
                    {channel.name}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="chat-launcher-panel"
        aria-label={open ? "Close contact options" : "Contact Percapita"}
        className={`flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full text-white shadow-[0_6px_24px_rgba(0,0,0,0.22)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple ${
          open ? "bg-plum hover:bg-purple" : "bg-[#25D366] hover:bg-[#1FB855]"
        }`}
      >
        {open ? <CloseIcon size={20} /> : <ChatIcon size={23} />}
      </button>
    </div>
  );
}
