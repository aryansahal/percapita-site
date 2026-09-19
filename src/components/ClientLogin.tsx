"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import { CLIENT_LOGIN, loginHost } from "@/lib/clientLogin";
import { CONTACT } from "@/lib/content";
import { MailIcon, WhatsAppIcon } from "./icons";

const ClientLoginContext = createContext<() => void>(() => {});

/**
 * Wraps the page so the header and footer triggers share one dialog.
 * Children stay server components — they are passed through, not re-rendered
 * on the client.
 */
export function ClientLoginProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = useCallback(() => ref.current?.showModal(), []);

  return (
    <ClientLoginContext.Provider value={open}>
      {children}
      <ClientLoginDialog ref={ref} />
    </ClientLoginContext.Provider>
  );
}

/**
 * The Client Login entry point.
 *
 * Rendered as a real anchor to the destination, with the click intercepted to
 * open the dialog. Without JavaScript it still goes somewhere sensible, and
 * middle-click and "open in new tab" keep working.
 */
export function ClientLoginTrigger({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const open = useContext(ClientLoginContext);
  return (
    <a
      href={CLIENT_LOGIN.url ?? "#contact"}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        open();
      }}
    >
      {children}
    </a>
  );
}

function ClientLoginDialog({ ref }: { ref: React.Ref<HTMLDialogElement> }) {
  const host = loginHost();

  return (
    <dialog
      ref={ref}
      aria-labelledby="client-login-title"
      className="m-auto w-[min(440px,calc(100vw-40px))] border-0 bg-white p-0 text-plum backdrop:bg-plum/70"
      // Native <dialog> does not close on backdrop click; this adds it without
      // catching clicks inside the panel.
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      <div className="px-[clamp(22px,4vw,32px)] py-[clamp(24px,4vw,32px)]">
        <p className="eyebrow text-violet">Client Login</p>

        {CLIENT_LOGIN.url && host ? (
          <>
            <h2
              id="client-login-title"
              className="mt-[18px] text-[21px] leading-[1.25] font-bold tracking-[-0.025em]"
            >
              Continue to your investment account.
            </h2>
            <p className="mt-3 text-[13.5px] leading-[1.7] text-ink-3">
              Your account is held on {CLIENT_LOGIN.platformName}, the
              transaction platform Percapita uses. You will sign in there with
              the credentials issued to you — Percapita does not handle your
              password.
            </p>

            {/* Naming the destination is the point: a client who has seen this
                panel can recognise a spoofed login later. */}
            <div className="mt-5 border border-hair bg-surface px-4 py-[14px]">
              <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-muted">
                You will be taken to
              </p>
              <p className="mt-1.5 font-mono text-[14px] font-bold break-all text-plum">
                {host}
              </p>
              <p className="mt-2 text-[12px] leading-[1.6] text-ink-5">
                Check your browser shows this address before entering your
                password.
              </p>
            </div>

            {/* Opens in a new tab so percapita.in survives the hand-off —
                the closest thing to "not leaving" that is available while
                InvestWell sends X-Frame-Options: SAMEORIGIN and blocks being
                embedded. Drop target/rel to go back to same-tab. */}
            <a
              href={CLIENT_LOGIN.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block rounded-[2px] bg-purple px-[22px] py-4 text-center text-[13.5px] font-bold text-white transition-colors duration-150 hover:bg-purple-hover"
            >
              Continue to Sign In
            </a>

            <p className="mt-4 text-[11px] leading-[1.7] text-muted">
              Percapita will never ask for your platform password on
              percapita.in, by email, or over WhatsApp.
            </p>
          </>
        ) : (
          <>
            <h2
              id="client-login-title"
              className="mt-[18px] text-[21px] leading-[1.25] font-bold tracking-[-0.025em]"
            >
              Client login is not live yet.
            </h2>
            <p className="mt-3 text-[13.5px] leading-[1.7] text-ink-3">
              Online account access is being set up. In the meantime your
              advisor can pull any statement or valuation you need — just ask.
            </p>
          </>
        )}

        <div className="mt-6 flex flex-col gap-2.5 border-t border-hair pt-5">
          <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-muted">
            Trouble signing in
          </p>
          <a
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 text-[13.5px] text-purple transition-colors duration-150 hover:text-purple-accent"
          >
            <WhatsAppIcon size={15} className="flex-none" />
            <span>{CONTACT.whatsappLabel}</span>
          </a>
          <a
            href={CONTACT.emailHref}
            className="flex items-center gap-2.5 text-[13.5px] text-purple transition-colors duration-150 hover:text-purple-accent"
          >
            <MailIcon size={15} className="flex-none" />
            <span>{CONTACT.email}</span>
          </a>
        </div>

        <form method="dialog" className="mt-6">
          <button
            type="submit"
            className="w-full cursor-pointer rounded-[2px] border border-field bg-transparent px-[18px] py-3 text-[12.5px] font-semibold text-ink-3 transition-colors duration-150 hover:border-purple hover:text-purple"
          >
            Close
          </button>
        </form>
      </div>
    </dialog>
  );
}
