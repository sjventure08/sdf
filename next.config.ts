import type { NextConfig } from "next";

// Security headers for every page. Kept compatible with the site's 3D scenes,
// animations and the map on the contact page.
const securityHeaders = [
  // Only ever load the site over HTTPS (applies once it is served over HTTPS).
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  // Stop other sites from showing these pages in a frame (protects the form from clickjacking).
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Stop browsers from guessing file types.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Don't send full page URLs to other sites.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), payment=(), usb=()" },
];

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev:true,
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Registration responses must never be stored by browsers or proxies.
        source: "/api/membership",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
      {
        // The success page shows an application number; keep it out of shared caches.
        source: "/membership/success",
        headers: [{ key: "Cache-Control", value: "private, no-store" }],
      },
    ];
  },
};

export default nextConfig;
