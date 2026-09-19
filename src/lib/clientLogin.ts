/**
 * Client Login destination.
 *
 * Percapita does not own these credentials — client accounts live on a
 * third-party transaction platform. This site must therefore never render a
 * password field for that platform, never proxy a sign-in, and never iframe
 * the platform's login page. Collecting someone else's credentials is
 * credential interception however well intentioned: it breaks the platform's
 * terms, defeats password managers (which key on origin), stops the user
 * verifying the TLS certificate, and makes Percapita liable for passwords it
 * had no reason to hold.
 *
 * What we do instead: an in-page launcher that names the destination and
 * hands over. See OPEN-ITEMS.md for the white-label subdomain recommendation,
 * which is the version of this that genuinely keeps users on percapita.in.
 */
export const CLIENT_LOGIN = {
  /**
   * Percapita's tenant on InvestWell. The `#/login` fragment is the platform's
   * client-side route, so keep the path intact rather than trimming to the
   * host.
   *
   * Worth revisiting: this is already a per-tenant subdomain, so InvestWell
   * clearly supports white-labelling. Ask whether they will also CNAME a
   * custom domain — `invest.percapita.in` — which would put the sign-in on
   * Percapita's own domain with a certificate to match. Better done before
   * launch than after clients have bookmarked this one. See OPEN-ITEMS.md.
   *
   * If this is ever set back to null the launcher degrades to a contact panel
   * rather than shipping a button that goes somewhere wrong.
   */
  url: "https://percapita.investwell.app/app/#/login" as string | null,

  /** How the destination is named to clients, so they can recognise it. */
  platformName: "InvestWell",
} as const;

/** The host clients should expect to see in the address bar, for verification. */
export function loginHost(): string | null {
  if (!CLIENT_LOGIN.url) return null;
  try {
    return new URL(CLIENT_LOGIN.url).host;
  } catch {
    return null;
  }
}
