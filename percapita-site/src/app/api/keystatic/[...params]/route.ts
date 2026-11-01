import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../../keystatic.config";

// Keystatic throws at build time when GitHub mode has no app credentials. Until
// the KEYSTATIC_* variables are set on the host, the editor answers 404 rather
// than failing every deploy. See docs/INSIGHTS-EDITOR.md.
const configured =
  process.env.NODE_ENV === "development" ||
  Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
      process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
      process.env.KEYSTATIC_SECRET,
  );

const notConfigured = () => new Response("Not Found", { status: 404 });

export const { POST, GET } = configured
  ? makeRouteHandler({ config })
  : { POST: notConfigured, GET: notConfigured };
