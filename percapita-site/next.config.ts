import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root; a stray lockfile in the user home confuses inference.
  turbopack: { root: __dirname },
  // Keystatic's GitHub mode redirects localhost to 127.0.0.1 in development
  // (GitHub's OAuth callback needs it); without this the dev server rejects it.
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    // Placeholder photography only — see OPEN-ITEMS.md. Replace with licensed
    // client assets served from /public and drop this block.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
