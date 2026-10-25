import type { NextConfig } from "next";

// Security headers for every response (Google's CASA assessment scans the site).
// The Content-Security-Policy itself is set per request in proxy.ts, because it carries a nonce.
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  // Vercel serves public files with a wildcard origin; nothing outside the site needs to read them.
  { key: "Access-Control-Allow-Origin", value: "https://convolios.com" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
