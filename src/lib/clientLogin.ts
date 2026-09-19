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
   * OPEN ITEM: set this to the real sign-in URL.
   *
   * Strongly prefer a white-label subdomain the platform vendor CNAMEs for
   * you — `https://invest.percapita.in` — over the vendor's own domain. Same
   * brand, honest URL, TLS on your domain, and they still handle every
   * credential. Most vendors support this; ask for it before launch.
   *
   * While this is null the launcher degrades to a contact panel rather than
   * shipping a button that goes somewhere wrong.
   */
  url: null as string | null,

  /** How the destination is described to clients. */
  platformName: "the Percapita investment platform",
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
