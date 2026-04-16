import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    // Allow SVG files to pass through the image optimiser.
    // "dangerous" refers to the fact that SVGs can contain scripts —
    // since all our SVGs are local and trusted, this is safe here.
    dangerouslyAllowSVG: true,

    // Recommended security header when serving SVGs
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
