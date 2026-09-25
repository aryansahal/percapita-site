assa# Setting up email for the contact form

Written for whoever administers `percapita.in` — the Zoho account and the DNS.
Some of this needs the domain registrar, not the website.

Until step 2 is done the contact form returns 503 and shows its error state.
That is deliberate: an enquiry that visibly fails can be retried, one that
silently disappears cannot.

---

## What is already true

Checked against live DNS on 23 September 2026:

|                       | Value                       | Meaning                                                 |
| --------------------- | --------------------------- | ------------------------------------------------------- |
| MX                    | `mx.zoho.com`, `mx2`, `mx3` | Mail is on Zoho, `.com` data centre (not `.in`) |
| SPF                   | `v=spf1 include:zoho.com ~all` | Done |
| DKIM                  | `zohomail._domainkey`, verified by Zoho | Done |
| DMARC                 | `v=DMARC1; p=none; rua=mailto:lead@percapita.in` | Done, monitoring only |
| A                     | `216.198.79.1`              | Vercel |

**All three email records are live.** Steps 1 to 3 below are complete and kept
for reference. What remains is raising DMARC above `p=none` once the reports
come back clean.

---

**Verified end to end on 23 September 2026.** `smtp.zoho.com:587` authenticates
as `lead@percapita.in`, a test message was accepted, and a POST to
`/api/enquiry` returned `{"ok":true}` with no send errors in the log - meaning
both the notification and the visitor confirmation went out. What remains is
step 3, the DNS.

## 1. Get an app password from Zoho

The form signs in to the mailbox to send. If two-factor authentication is on —
and it should be — **the normal mailbox password will not work here.** Zoho
rejects it with `535 Authentication Failed`.

1. Sign in at <https://accounts.zoho.com> as `lead@percapita.in`.
2. **Security → App Passwords → Generate New Password.**
3. Name it `Percapita website form` so it can be revoked on its own later.
4. Copy the password. Zoho shows it once.

`lead@percapita.in` is the mailbox the site signs in as and where enquiries
land. Note that the site _displays_ `contact@percapita.in` to visitors, so both
mailboxes need to be watched.

> An app password is scoped to this one use and can be revoked without
> touching the mailbox password. Do not put the mailbox password here.

## 2. Put the credentials in the environment

Copy `.env.example` to `.env.local` for local work, and set the same values in
the host's environment for production. Never commit either.

```
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_USER=lead@percapita.in
SMTP_PASS=<the app password from step 1>
ENQUIRY_TO=lead@percapita.in
```

**Use `smtp.zoho.com`, not `smtppro`.** Tested against the live server on
23 September 2026: `smtp.zoho.com` authenticates on both 587 and 465;
`smtppro.zoho.com` refuses with `554 5.7.8 Access Restricted` on both.
`smtppro` is the paid-plan host and this account's plan does not permit it.
The `.in` hosts fail too, which confirms the account is in the `.com` data
centre.

Then check it:

```
node scripts/test-email.mjs          # credentials only
node scripts/test-email.mjs --send   # and deliver a test message
```

Verifying separately from sending is deliberate: a wrong password and a
blocked port fail at different stages, and the form's 503 cannot tell you
which. The script names the likely cause on failure.

## 3. Add the three DNS records

At the registrar for `percapita.in` (nameservers are
`ns1-4.mysecurecloudhost.com`, so this is the cPanel **Zone Editor** unless
DNS is managed elsewhere).

Without these, mail from the domain is far more likely to be filtered as
spam, and nothing stops anyone forging `@percapita.in` in a From line. The
site sends two emails per enquiry — the notification to Percapita and the
confirmation back to the visitor — and the confirmation goes to a member of
the public, so it is the one that matters most.

**SPF** — says which servers may send as this domain.

```
Type: TXT     Host: @ (or percapita.in)
Value: v=spf1 include:zoho.com ~all
```

> Only ever have **one** SPF record. Two is a permanent error, not a warning:
> receivers treat it as `permerror` and it is worse than having none. If the
> host has already added one for cPanel mail, merge the `include:` into it
> rather than adding a second.

**DKIM** — cryptographically signs the mail. Zoho generates this one.

1. <https://mailadmin.zoho.com> → **Domains → percapita.in → Email
   Configuration → DKIM → Add**.
2. Zoho prints a long public key and tells you the selector. **The default
   selector is `zohomail`, not `zoho`** - use whatever that screen shows.
3. Add it as TXT at host `<selector>._domainkey`, e.g.
   `zohomail._domainkey.percapita.in.`
4. Return to Zoho and press **Verify**.

**DMARC** — tells receivers what to do when SPF and DKIM fail, and asks for
reports.

```
Type: TXT     Host: _dmarc
Value: v=DMARC1; p=none; rua=mailto:contact@percapita.in; pct=100
```

> Start at `p=none`. It changes nothing about delivery and only collects
> reports. Once those reports show all legitimate mail passing — a few weeks —
> tighten to `p=quarantine` and then `p=reject`. Going straight to `reject`
> can silently kill real mail from systems nobody remembered, such as an
> invoicing tool or the host's own forms.

DNS takes minutes to a few hours. Verify with:

```
nslookup -type=TXT percapita.in
nslookup -type=TXT _dmarc.percapita.in
nslookup -type=TXT zohomail._domainkey.percapita.in
```

## 4. One cPanel trap

The website host also runs a mail server. If cPanel holds local mailboxes for
`lead@` or `contact@percapita.in`, the server delivers to **itself** instead of
sending to Zoho, and those messages land in a cPanel mailbox nobody reads.

In cPanel: **Email → Email Routing → percapita.in → Remote Mail Exchanger.**

Worth confirming even if no local mailbox exists, because the default is
"Automatically Detect Configuration" and it does not always detect correctly.

## 5. End-to-end check

1. `node scripts/test-email.mjs --send` → arrives in the Zoho inbox.
2. Deploy, submit the real form, and confirm **both** emails arrive: the
   notification to Percapita, and the confirmation to the address submitted.
3. Check whether either landed in spam. If so, re-check step 3 — that is
   exactly what SPF, DKIM and DMARC fix.
4. Reply to the notification. It should address the enquirer, not Percapita:
   the visitor's address is in `Reply-To`, because putting it in `From` gets
   the mail rejected by SPF and DMARC.

---

## When something fails

| Symptom                                                       | Cause                                                                                                                                                                  |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `554 5.7.8 Access Restricted`                                 | Right password, wrong host. Use `smtp.zoho.com`, not `smtppro.zoho.com`                                                                                                |
| `535 Authentication Failed`                                   | Mailbox password used instead of an app password, or the app password was revoked                                                                                      |
| `ETIMEDOUT` / `ECONNREFUSED`                                  | Outbound 587 blocked, or the host name is wrong                                                                                                                        |
| Form shows its error state, logs say "SMTP is not configured" | `SMTP_PASS` is not set in the deployed environment. Setting it in `.env.local` does not affect production                                                              |
| Mail sends but lands in spam                                  | Step 3 is incomplete                                                                                                                                                   |
| Notification arrives, confirmation does not                   | Expected to be non-fatal — the confirmation is sent in its own try/catch so a bounce cannot fail the enquiry. Check the server log for `confirmation to sender failed` |
