import { CONTACT } from "./content";

/**
 * The confirmation sent back to whoever filled in the form.
 *
 * Transactional, not marketing: it acknowledges something the person just did.
 * It repeats what they sent so they have a record of it, and carries the
 * advisory-only line because this is outbound mail from an AMFI-registered
 * distributor. It must never read as advice or promise an outcome.
 */

const DISCLAIMER =
  "This is a confirmation of your enquiry, not investment advice. Investments are subject to market risks; read all scheme related documents carefully before investing. No investment outcome is guaranteed. Percapita is an AMFI registered mutual fund distributor, " +
  CONTACT.arn +
  ".";

export function confirmationText(
  firstName: string,
  topic: string,
  phone: string,
  message: string,
): string {
  return [
    `Hi ${firstName},`,
    "",
    "Thanks for reaching out. Your enquiry has reached us, and an advisor will be in touch within one working day.",
    "",
    "There is no cost and no obligation, and nothing happens until you decide it should.",
    "",
    "WHAT YOU SENT US",
    `  Topic:   ${topic || "not given"}`,
    `  Phone:   ${phone || "not given"}`,
    `  Message: ${message || "(none)"}`,
    "",
    `If anything is urgent, WhatsApp us on ${CONTACT.whatsappLabel} or just reply to this email.`,
    "",
    "Percapita Advisors",
    `AMFI Registered Mutual Fund Distributor, ${CONTACT.arn}`,
    "",
    DISCLAIMER,
  ].join("\n");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Type and rules only, with inline styles.
 *
 * No images: a blocked remote image is the usual way a branded email arrives
 * looking broken, and the mark would need a white plate anyway. Inline styles
 * because most clients strip <style> blocks. Table for the detail rows because
 * Outlook still does not lay out flex or grid.
 */
export function confirmationHtml(
  firstName: string,
  topic: string,
  phone: string,
  message: string,
): string {
  const row = (label: string, value: string) =>
    `<tr>` +
    `<td style="padding:5px 16px 5px 0;color:#8A8394;font-size:13px;white-space:nowrap;vertical-align:top">${label}</td>` +
    `<td style="padding:5px 0;color:#463F4E;font-size:14px;line-height:1.6">${escapeHtml(value)}</td>` +
    `</tr>`;

  return `<div style="margin:0;padding:24px;background:#F6F1FB;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif">
<div style="max-width:560px;margin:0 auto;background:#ffffff;padding:32px 28px">
<p style="margin:0;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#8B5CC7">Percapita Advisors</p>
<h1 style="margin:14px 0 0;font-size:22px;line-height:1.3;font-weight:700;color:#2E1547">Thanks for getting in touch, ${escapeHtml(firstName)}.</h1>
<p style="margin:16px 0 0;font-size:15px;line-height:1.7;color:#5C5465">Your enquiry has reached us, and an advisor will be in touch within one working day.</p>
<p style="margin:12px 0 0;font-size:15px;line-height:1.7;color:#5C5465">There is no cost and no obligation, and nothing happens until you decide it should.</p>
<p style="margin:28px 0 10px;font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#8A8394">What you sent us</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;border-top:1px solid #EBE4F2">${row("Topic", topic || "not given")}${row("Phone", phone || "not given")}${row("Message", message || "(none)")}</table>
<p style="margin:26px 0 0;padding-top:20px;border-top:1px solid #EBE4F2;font-size:14px;line-height:1.7;color:#5C5465">If anything is urgent, WhatsApp us on <a href="${CONTACT.whatsappHref}" style="color:#4B2478;font-weight:600;text-decoration:none">${CONTACT.whatsappLabel}</a> or just reply to this email.</p>
<p style="margin:24px 0 0;padding-top:18px;border-top:1px solid #EBE4F2;font-size:11px;line-height:1.8;color:#8A8394">${DISCLAIMER}</p>
</div></div>`;
}
