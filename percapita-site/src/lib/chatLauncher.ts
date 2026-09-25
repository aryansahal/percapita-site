import { CONTACT } from "./content";

/**
 * The floating contact launcher.
 *
 * Looks like a chat widget and behaves like one, but it is ours: no
 * third-party script, no cookies, nothing reported to anyone else. That
 * matters because /policy states in writing that this site sets no cookies
 * and sends nothing to third parties, and an AMFI-registered firm should not
 * publish a privacy commitment it then breaks.
 *
 * It is also honest about what it is. A real chat widget implies someone is
 * sitting behind it; these channels are the ones Percapita actually answers.
 * There is deliberately no green "Online" dot, because nothing here knows
 * whether anyone is.
 *
 * To show named advisors later - as competitors do - add entries with a
 * `name` and a per-person `href`. The component already renders them; only
 * this data needs to change.
 */

export interface ChatChannel {
  /** Small label above the value, e.g. "WhatsApp". */
  role: string;
  /** What the visitor will be talking to, e.g. the number or an advisor. */
  name: string;
  href: string;
  kind: "whatsapp" | "email" | "form";
  /** Opens a new tab. Not used for same-page anchors. */
  external: boolean;
}

export const CHAT_INTRO = {
  heading: "How would you like to talk?",
  /** Matches the promise already made beside the contact form. */
  note: "An advisor replies within one working day.",
} as const;

export const CHAT_CHANNELS: readonly ChatChannel[] = [
  {
    role: "WhatsApp",
    name: CONTACT.whatsappLabel,
    href: CONTACT.whatsappHref,
    kind: "whatsapp",
    external: true,
  },
  {
    role: "Email",
    name: CONTACT.email,
    href: CONTACT.emailHref,
    kind: "email",
    external: false,
  },
  {
    role: "Request a consultation",
    name: "No cost, no obligation",
    href: "/#contact",
    kind: "form",
    external: false,
  },
];
