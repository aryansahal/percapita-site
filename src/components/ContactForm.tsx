"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  EMPTY_ENQUIRY,
  isValid,
  submitEnquiry,
  TOPICS,
  type Enquiry,
} from "@/lib/enquiry";
import { CONTACT } from "@/lib/content";

const INPUT_CLASS =
  "w-full rounded-[2px] border border-field bg-white px-[14px] py-[13px] font-[inherit] text-[14px] text-plum outline-none transition-colors duration-150 focus:border-purple-accent";

const LABEL_CLASS =
  "mb-[7px] block text-[10px] font-bold tracking-[0.16em] uppercase text-muted";

type Status = "idle" | "submitting" | "error";

export function ContactForm() {
  const router = useRouter();
  const [enquiry, setEnquiry] = useState<Enquiry>(EMPTY_ENQUIRY);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const valid = isValid(enquiry);
  const set = <K extends keyof Enquiry>(key: K, value: Enquiry[K]) =>
    setEnquiry((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!valid || status === "submitting") return;
    setStatus("submitting");
    setErrorMessage("");
    try {
      await submitEnquiry(enquiry);
      // A destination URL, so analytics and ad platforms have something to
      // count. Stay in "submitting" through the navigation, or the button
      // flicks back to enabled while the next page loads.
      router.push("/thank-you");
    } catch (error) {
      setErrorMessage(
        error instanceof Error && error.message
          ? error.message
          : "Could not send your enquiry.",
      );
      setStatus("error");
    }
  }

  return (
    <div className="min-w-0 bg-white px-[clamp(22px,3vw,36px)] py-[clamp(26px,3.5vw,38px)] text-plum">
      <h3 className="text-[19px] font-bold tracking-[-0.02em]">
        Request a consultation
      </h3>
      <p className="mt-2 mb-[26px] text-[13px] leading-[1.7] text-ink-5">
        Tell us a little about what you need. There is no cost and no
        obligation.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="relative flex flex-col gap-[18px]"
      >
        <div>
          <label htmlFor="enquiry-name" className={LABEL_CLASS}>
            Full Name
          </label>
          <input
            id="enquiry-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={enquiry.name}
            onChange={(e) => set("name", e.target.value)}
            className={INPUT_CLASS}
          />
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-[14px]">
          <div>
            <label htmlFor="enquiry-email" className={LABEL_CLASS}>
              Email
            </label>
            <input
              id="enquiry-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={enquiry.email}
              onChange={(e) => set("email", e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label htmlFor="enquiry-phone" className={LABEL_CLASS}>
              Phone
            </label>
            <input
              id="enquiry-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+91"
              value={enquiry.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={INPUT_CLASS}
            />
          </div>
        </div>

        <fieldset className="border-0 p-0">
          <legend className={LABEL_CLASS}>What can we help with</legend>
          <div className="flex flex-wrap gap-2">
            {TOPICS.map((topic) => {
              const selected = enquiry.topic === topic;
              return (
                <button
                  key={topic}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => set("topic", topic)}
                  className={`cursor-pointer rounded-full border px-[14px] py-[9px] font-[inherit] text-[12px] font-semibold transition-colors duration-150 ${
                    selected
                      ? "border-purple bg-purple text-white"
                      : "border-field bg-white text-ink-3 hover:border-purple-accent"
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div>
          <label htmlFor="enquiry-message" className={LABEL_CLASS}>
            Message{" "}
            <span className="font-medium tracking-normal normal-case text-muted-3">
              (optional)
            </span>
          </label>
          <textarea
            id="enquiry-message"
            name="message"
            rows={3}
            placeholder="Anything you would like us to know before we speak"
            value={enquiry.message}
            onChange={(e) => set("message", e.target.value)}
            className={`${INPUT_CLASS} resize-y leading-[1.6]`}
          />
        </div>

        {/* Honeypot. Positioned off-screen rather than hidden: a bot that
            parses the DOM fills it, a person never sees it. Anything in here
            makes the server accept and discard the request. */}
        <div
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor="enquiry-company">Company</label>
          <input
            id="enquiry-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={enquiry.company}
            onChange={(e) => set("company", e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={!valid || status === "submitting"}
          className={`rounded-[2px] border-0 px-[22px] py-4 font-[inherit] text-[13.5px] font-bold transition-colors duration-150 ${
            valid
              ? "cursor-pointer bg-purple text-white hover:bg-purple-hover"
              : "cursor-not-allowed bg-[#EFE8F6] text-muted-3"
          }`}
        >
          {status === "submitting"
            ? "Sending…"
            : valid
              ? "Request a Consultation"
              : "Add your name and email"}
        </button>

        {/* OPEN ITEM: the error state was never designed. This is a plain
            fallback in existing tokens — replace once the client signs off. */}
        {status === "error" ? (
          <p
            role="alert"
            className="border-l-2 border-purple bg-surface px-4 py-3 text-[12.5px] leading-[1.7] text-ink-2"
          >
            {errorMessage} You can also WhatsApp us on{" "}
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-purple hover:text-purple-accent"
            >
              {CONTACT.whatsappLabel}
            </a>
            .
          </p>
        ) : null}

        <p className="text-[11px] leading-[1.7] text-muted">
          By submitting, you agree to be contacted about your enquiry. Percapita
          provides advisory services only and does not guarantee financial
          outcomes.
        </p>
      </form>
    </div>
  );
}
