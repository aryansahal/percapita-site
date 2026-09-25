import fs from "node:fs";
import path from "node:path";

/**
 * The downloadable brochure.
 *
 * Checked on disk at build time rather than hard-linked. The file is supplied
 * by the client and lives outside the code, so a hard link would ship a 404
 * the moment it is missing or renamed. Absent file, absent link - the site
 * simply does not offer a download.
 *
 * To publish it: drop the PDF at `public/percapita-brochure.pdf` and rebuild.
 * The footer and contact links appear on their own.
 *
 * Node APIs only - import from server components.
 */

const PUBLIC_PATH = "/percapita-brochure.pdf";

export interface Brochure {
  href: string;
  /** "2.4 MB", for the link label. People deserve to know what they are about
   *  to download before they tap it on mobile data. */
  size: string;
}

function formatSize(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)} MB`;
  return `${Math.round(bytes / 1024)} KB`;
}

export function brochure(): Brochure | null {
  try {
    const file = path.join(process.cwd(), "public", PUBLIC_PATH.slice(1));
    const stat = fs.statSync(file);
    if (!stat.isFile() || stat.size === 0) return null;
    return { href: PUBLIC_PATH, size: formatSize(stat.size) };
  } catch {
    return null;
  }
}
