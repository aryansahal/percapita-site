import { CONTACT } from "@/lib/content";
import { WhatsAppIcon } from "./icons";

/**
 * Floating WhatsApp button, bottom right, follows the page down.
 *
 * Deliberately a plain anchor, not a chat widget. The third-party widgets
 * that do this (Tidio, WATI and the rest) load a script that sets cookies and
 * reports every visit to their servers. The policy page states that this site
 * sets no cookies and sends nothing to third parties, and that has to stay
 * true. This costs zero client JavaScript and does the same job: it opens
 * WhatsApp.
 *
 * z-40 keeps it under the sticky header (z-50) and under the Client Login
 * dialog, so it never floats over a modal.
 *
 * `md:` offsets are larger because the desktop footer has more breathing
 * room; at phone widths it sits just clear of the browser's own chrome.
 */
export function WhatsAppFab() {
  return (
    <a
      href={CONTACT.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Message Percapita on WhatsApp at ${CONTACT.whatsappLabel}`}
      className="group fixed right-4 bottom-4 z-40 flex items-center gap-0 rounded-full bg-[#25D366] py-3.5 pr-3.5 pl-3.5 text-white shadow-[0_6px_24px_rgba(0,0,0,0.22)] transition-all duration-200 hover:bg-[#1FB855] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple md:right-7 md:bottom-7"
    >
      <WhatsAppIcon size={24} className="flex-none" />
      {/* The label expands on hover on pointer devices and stays hidden on
          touch, where there is no hover and the icon is already understood. */}
      <span className="max-w-0 overflow-hidden text-[13.5px] font-semibold whitespace-nowrap opacity-0 transition-all duration-200 group-hover:max-w-[160px] group-hover:pl-2.5 group-hover:opacity-100 group-focus-visible:max-w-[160px] group-focus-visible:pl-2.5 group-focus-visible:opacity-100">
        Chat with us
      </span>
    </a>
  );
}
