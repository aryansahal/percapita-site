"use client";

import { useState } from "react";
import {
  EMPTY_ENQUIRY,
  isValid,
  submitEnquiry,
  TOPICS,
  type Enquiry,
} from "@/lib/enquiry";
import { CONTACT } from "@/lib/content";
import { CheckCircleIcon } from "./icons";

const INPUT_CLASS =
  "w-full rounded-[2px] border border-field bg-white px-[14px] py-[13px] font-[inherit] text-[14px] text-plum outline-none transition-colors duration-150 focus:border-purple-accent";

const LABEL_CLASS =
  "mb-[7px] block text-[10px] font-bold tracking-[0.16em] uppercase text-muted";

type Status = "idle" | "submitting" | "error";

export function ContactForm() {
  const [enquiry, setEnquiry] = useState<Enquiry>(EMPTY_ENQUIRY);
  const [sentName, setSentName] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const valid = isValid(enquiry);
  const set = <K extends keyof Enquiry>(key: K, value: Enquiry[K]) =>
    setEnquiry((prev) => ({ ...prev, [key]: value }));

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!valid || status === "submitting") return;
    setStatus("submitting");
    try {
      await submitEnquiry(enquiry);
      setSentName(enquiry.name.trim().split(" ")[0]);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setEnquiry(EMPTY_ENQUIRY);
    setSentName(null);
    setStatus("idle");
  }

  if (sentName) {
    return (
      <div className="min-w-0 bg-white px-[clamp(22px,3vw,36px)] py-[clamp(26px,3.5vw,38px)] text-plum">
        <div className="flex flex-col items-start gap-[14px] py-10">
          <CheckCircleIcon className="text-purple-accent" />
          <p className="text-[20px] font-bold tracking-[-0.02em]">
            Thank you, {sentName}.
          </p>
          <p className="text-[14px] leading-[1.75] text-ink-3">
            Your enquiry has reached us. An advisor will be in touch within one
            working day. For anything urgent, WhatsApp {CONTACT.whatsappLabel}.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-1.5 cursor-pointer rounded-[2px] border border-field bg-transparent px-[18px] py-[11px] font-[inherit] text-[12.5px] font-semibold text-purple transition-colors duration-150 hover:border-purple"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
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

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[18px]">
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
          <p role="alert" className="text-[12px] leading-[1.7] text-purple">
            Something went wrong sending your enquiry. Please try again, or
            WhatsApp us on {CONTACT.whatsappLabel}.
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
