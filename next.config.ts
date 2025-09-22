import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // allow common external image hosts used in the project and local CMS host
    domains: ["picsum.photos", "cms.secnews.local"],
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "http", hostname: "cms.secnews.local" },
    ],
  },
};

export default nextConfig;
