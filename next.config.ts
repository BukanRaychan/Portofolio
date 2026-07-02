import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Multi-image drops can be several MB each; keep headroom so the form
      // body isn't truncated (which silently drops fields like work_id).
      bodySizeLimit: '100mb',
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "cdn.simpleicons.org" },
      { protocol: "https", hostname: "rqxyjnamaluzgezwvkul.supabase.co" },
    ],
  },
};

export default nextConfig;
