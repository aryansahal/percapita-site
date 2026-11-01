import type { Metadata } from "next";
import KeystaticApp from "./keystatic";
import "./keystatic.css";

export const metadata: Metadata = {
  title: "Insights editor",
  robots: { index: false, follow: false },
};

/**
 * Nested under the site's root layout rather than given its own: a second root
 * layout would need the experimental global-not-found. Keystatic's styles are
 * unlayered, so they win over Tailwind's preflight in `@layer base`.
 */
export default function KeystaticLayout() {
  return <KeystaticApp />;
}
