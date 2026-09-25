/**
 * Proves the Zoho mailbox works before the site depends on it.
 *
 *   node scripts/test-email.mjs            verify credentials only
 *   node scripts/test-email.mjs --send     verify, then send a real test email
 *
 * Reads .env.local the way Next.js would. Run it from the project root.
 *
 * Verifying separately from sending matters: a bad app password and a blocked
 * port fail at different stages, and the route's 503 cannot tell you which.
 */
import fs from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";

const ENV_FILE = path.join(process.cwd(), ".env.local");

function loadEnv() {
  if (!fs.existsSync(ENV_FILE)) {
    console.error(`No .env.local at ${ENV_FILE}`);
    console.error("Copy .env.example to .env.local and fill in SMTP_PASS.");
    process.exit(1);
  }
  for (const line of fs.readFileSync(ENV_FILE, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    // Values are taken literally, quotes and all, matching dotenv only
    // closely enough for this check - do not reuse this as a parser.
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnv();

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ENQUIRY_TO } = process.env;

const missing = ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"].filter(
  (k) => !process.env[k],
);
if (missing.length) {
  console.error("Missing in .env.local: " + missing.join(", "));
  process.exit(1);
}

const port = Number(SMTP_PORT) || 587;
console.log(`host   ${SMTP_HOST}:${port} (secure: ${port === 465})`);
console.log(`user   ${SMTP_USER}`);
console.log(`pass   ${"*".repeat(Math.min(SMTP_PASS.length, 16))} (${SMTP_PASS.length} chars)`);
console.log(`to     ${ENQUIRY_TO || SMTP_USER}`);
console.log();

const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port,
  secure: port === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

try {
  await transport.verify();
  console.log("AUTH OK - Zoho accepted the credentials.");
} catch (error) {
  console.error("AUTH FAILED:", error.message);
  const hint =
    /554|access restricted/i.test(error.message)
      ? "Right password, wrong host for this plan. smtppro.zoho.com is the paid-plan server; use smtp.zoho.com."
      : /535|authentication failed/i.test(error.message)
      ? "Wrong password. If two-factor is on, a normal password will not work - generate an app password at accounts.zoho.com > Security > App Passwords."
      : /ETIMEDOUT|ECONNREFUSED|ENOTFOUND/i.test(error.message)
        ? "Could not reach the server. Check the host spelling, and whether your network blocks outbound 587."
        : "Check SMTP_HOST against Zoho Mail > Settings > Mail Accounts > IMAP/SMTP.";
  console.error("\n" + hint);
  process.exit(1);
}

if (!process.argv.includes("--send")) {
  console.log("\nRe-run with --send to deliver a test message.");
  process.exit(0);
}

const info = await transport.sendMail({
  from: { name: "Percapita website", address: SMTP_USER },
  to: ENQUIRY_TO || SMTP_USER,
  subject: "Test enquiry from the Percapita website",
  text: [
    "If you are reading this, the contact form can deliver mail.",
    "",
    "Sent by scripts/test-email.mjs.",
    `At: ${new Date().toISOString()}`,
  ].join("\n"),
});

console.log(`\nSENT - message id ${info.messageId}`);
console.log(`accepted: ${JSON.stringify(info.accepted)}`);
if (info.rejected.length) console.log(`rejected: ${JSON.stringify(info.rejected)}`);
console.log("\nCheck the inbox. If it landed in spam, SPF/DKIM/DMARC are not set up yet.");
