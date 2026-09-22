import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { confirmationHtml, confirmationText } from "@/lib/confirmationEmail";
import { CONTACT } from "@/lib/content";
import { TOPICS } from "@/lib/enquiry";

/**
 * Consultation form endpoint.
 *
 * Validation is repeated here rather than trusted from the client. The check
 * in the form is a UX gate; anyone can POST to this route directly.
 *
 * Configure with SMTP credentials for the mailbox the enquiry should arrive
 * in (see .env.example). If they are absent the route returns 503 and the form
 * shows its error state - deliberately loud, because an enquiry that silently
 * disappears is worse than one that visibly fails and can be retried.
 */

export const runtime = "nodejs";

const MAX = { name: 120, email: 200, phone: 40, message: 4000 } as const;

/**
 * Crude per-IP throttle. In-memory, so it resets on deploy and is per-instance
 * - enough to blunt a script, not a substitute for a real limiter if the form
 * ever gets seriously targeted.
 */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many enquiries. Please try again shortly." },
      { status: 429 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: a field hidden from people and irresistible to bots. Accept the
  // request so the bot sees success and does not retry, but send nothing.
  if (clean(payload.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name, MAX.name);
  const email = clean(payload.email, MAX.email);
  const phone = clean(payload.phone, MAX.phone);
  const message = clean(payload.message, MAX.message);
  const topic = clean(payload.topic, 60);

  if (name.length < 2) {
    return NextResponse.json({ error: "Please add your name." }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json(
      { error: "Please add a valid email address." },
      { status: 400 },
    );
  }
  if (topic && !TOPICS.includes(topic as (typeof TOPICS)[number])) {
    return NextResponse.json({ error: "Unknown topic." }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ENQUIRY_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("[enquiry] SMTP is not configured; enquiry not sent.");
    return NextResponse.json(
      { error: "Enquiries are temporarily unavailable. Please email us." },
      { status: 503 },
    );
  }

  const port = Number(SMTP_PORT) || 587;
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const lines = [
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Phone:   ${phone || "not given"}`,
    `Topic:   ${topic || "not given"}`,
    "",
    "Message:",
    message || "(none)",
    "",
    `Received: ${new Date().toISOString()}`,
  ];

  try {
    await transport.sendMail({
      // From must be a mailbox the SMTP account may send as, so the visitor's
      // address goes in Reply-To instead - putting it in From gets the mail
      // rejected by SPF/DMARC.
      from: `"Percapita website" <${SMTP_USER}>`,
      to: ENQUIRY_TO || CONTACT.email,
      replyTo: `"${name}" <${email}>`,
      subject: `New enquiry: ${name}${topic ? ` (${topic})` : ""}`,
      text: lines.join("\n"),
    });
  } catch (error) {
    console.error("[enquiry] send failed:", error);
    return NextResponse.json(
      { error: "We could not send that. Please try again or WhatsApp us." },
      { status: 502 },
    );
  }

  // Confirmation to the enquirer. Deliberately after the notification and in
  // its own try/catch: the enquiry has already reached Percapita by this
  // point, so a bounced confirmation must not fail the request and push
  // someone into submitting again.
  //
  // It sends to an address nobody has verified, which is a small spam vector.
  // The per-IP throttle above is what keeps that bounded.
  try {
    const firstName = name.split(" ")[0];
    await transport.sendMail({
      from: `"Percapita Advisors" <${SMTP_USER}>`,
      to: `"${name}" <${email}>`,
      replyTo: ENQUIRY_TO || CONTACT.email,
      subject: `Thanks for getting in touch, ${firstName}`,
      text: confirmationText(firstName, topic, phone, message),
      html: confirmationHtml(firstName, topic, phone, message),
    });
  } catch (error) {
    console.error("[enquiry] confirmation to sender failed:", error);
  }

  return NextResponse.json({ ok: true });
}
