import Image from "next/image";
import { brochure } from "@/lib/brochure";
import { MOBILE_APP } from "@/lib/clientLogin";
import {
  CONTACT,
  FOOTER_COMPANY,
  FOOTER_SERVICES,
  WORDMARK,
} from "@/lib/content";
import { AppleIcon, MailIcon, PlayIcon, UserIcon, WhatsAppIcon } from "./icons";
import { ClientLoginTrigger } from "./ClientLogin";

const LINK_CLASS =
  "text-[13.5px] text-on-dark-link transition-colors duration-150 hover:text-lilac";

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-[18px] text-[10px] font-bold tracking-[0.18em] uppercase text-on-dark-muted-2">
      {children}
    </h3>
  );
}

/** OPEN ITEM: both store links point at #contact — real URLs needed. */
function StoreButton({
  href,
  icon,
  kicker,
  name,
}: {
  href: string;
  icon: React.ReactNode;
  kicker: string;
  name: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2.5 rounded-md border border-white/[0.22] px-[14px] py-2 text-white transition-colors duration-150 hover:border-lilac"
    >
      {icon}
      <span className="flex flex-col leading-[1.15]">
        <span className="text-[8.5px] tracking-[0.1em] uppercase text-on-dark-muted-2">
          {kicker}
        </span>
        <span className="text-[13px] font-bold">{name}</span>
      </span>
    </a>
  );
}

export function SiteFooter() {
  const pdf = brochure();

  return (
    <footer className="bg-aubergine text-white">
      <div className="shell grid grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-[clamp(32px,4vw,48px)] pt-[clamp(48px,6vw,72px)] pb-10">
        <div>
          {/* The wordmark has a baked-in white background, so the plate is
              intentional. A transparent SVG would let it go. */}
          <Image
            src={WORDMARK.src}
            alt="Percapita"
            width={WORDMARK.w}
            height={WORDMARK.h}
            sizes="186px"
            className="h-auto w-[186px] bg-white object-contain px-[18px] py-[14px]"
          />
          <p className="mt-[18px] max-w-[290px] text-[15px] leading-[1.4] font-bold tracking-[-0.015em] text-white">
            Your money. Your goals. Your next move.
          </p>
          <p className="mt-2.5 max-w-[290px] text-[13px] leading-[1.75] text-on-dark-muted-2">
            Independent financial guidance for today&rsquo;s goals and
            tomorrow&rsquo;s plans.
          </p>
          <div className="mt-5 text-[12px] leading-[1.7] text-on-dark-muted-2">
            <p className="font-bold text-on-dark-link">{CONTACT.arn}</p>
            <p>Initial Date : 20/01/2015</p>
            <p>Valid till : 01/04/2027</p>
          </div>
        </div>

        <div>
          <ColumnHeading>Services</ColumnHeading>
          <ul className="flex list-none flex-col gap-3">
            {FOOTER_SERVICES.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={LINK_CLASS}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnHeading>Company</ColumnHeading>
          <ul className="flex list-none flex-col gap-3">
            {FOOTER_COMPANY.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={LINK_CLASS}>
                  {link.label}
                </a>
              </li>
            ))}
            {/* Only rendered when the PDF is actually on disk - see
                lib/brochure.ts. The size is in the label because this is a
                download, and people on mobile data should know before they
                tap. */}
            {pdf ? (
              <li>
                <a
                  href={pdf.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK_CLASS}
                >
                  Brochure{" "}
                  <span className="text-on-dark-muted-2">
                    (PDF, {pdf.size})
                  </span>
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <div>
          <ColumnHeading>Get In Touch</ColumnHeading>
          <ul className="flex list-none flex-col gap-2.5">
            <li>
              <a
                href={CONTACT.emailHref}
                className={`flex items-center gap-2.5 ${LINK_CLASS}`}
              >
                <MailIcon size={15} className="flex-none" />
                <span>{CONTACT.email}</span>
              </a>
            </li>
            <li>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2.5 ${LINK_CLASS}`}
              >
                <WhatsAppIcon size={15} className="flex-none" />
                <span>{CONTACT.whatsappLabel}</span>
              </a>
            </li>
            <li>
              <ClientLoginTrigger
                className={`flex items-center gap-2.5 ${LINK_CLASS}`}
              >
                <UserIcon size={15} className="flex-none" />
                <span>Client Login</span>
              </ClientLoginTrigger>
            </li>
          </ul>

          <div className="mt-[26px]">
            <h3 className="mb-2 text-[10px] font-bold tracking-[0.18em] uppercase text-on-dark-muted-2">
              Mobile App
            </h3>
            {/* Client-specified wording. Note the store listings are branded
                "Mint by Investwell", not Percapita, so this line no longer
                warns anyone where the tap lands. See OPEN-ITEMS.md. */}
            <p className="mb-3 text-[11.5px] leading-[1.6] text-on-dark-muted-3">
              Download our app to track your portfolio on the go
            </p>
            <div className="flex flex-col gap-[9px]">
              <StoreButton
                href={MOBILE_APP.appStore}
                icon={<AppleIcon className="flex-none" />}
                kicker="Download on the"
                name="App Store"
              />
              <StoreButton
                href={MOBILE_APP.playStore}
                icon={<PlayIcon className="flex-none" />}
                kicker="Get it on"
                name="Google Play"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Client-supplied regulatory copy — reproduce verbatim. */}
      <div className="shell pb-[34px]">
        <div className="flex flex-col gap-3 border-t border-white/10 pt-[30px]">
          <p className="text-[11.5px] leading-[1.85] text-on-dark-muted-3">
            <span className="font-semibold text-on-dark-strong">
              Disclaimer :
            </span>{" "}
            Investments in Mutual Funds are subject to market risks. Please read
            all scheme-related documents carefully before investing. Mutual Fund
            schemes do not assure or guarantee returns, and past performance may
            or may not be sustained in the future. There is no certainty that
            the investment objective of any suggested scheme will be achieved.
            Investors are advised to review exit loads, total expense ratios
            (TER), and other applicable costs before making any investment
            decisions.
          </p>
          <p className="text-[11.5px] leading-[1.85] text-on-dark-muted-3">
            Percapita deals in{" "}
            <strong className="font-bold text-on-dark-link">
              Regular Plans only
            </strong>{" "}
            for Mutual Fund schemes and earns a trailing commission on client
            investments. Disclosure of commission earnings is provided to
            clients at the time of investment. Check your Securities /MF/ Bonds
            in the consolidated account statement issued by NSDL/CDSL every
            month.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-wrap justify-between gap-4 py-5 text-[11px] text-on-dark-muted-4">
          <span>Copyright © Percapita Services. All rights reserved.</span>
          <span>
            AMFI Registered Mutual Fund Distributor · {CONTACT.arn}
          </span>
        </div>
      </div>
    </footer>
  );
}
