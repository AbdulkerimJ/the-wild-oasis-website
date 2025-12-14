import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [10, 40, 75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apcvxzolwfnohlhwpmtg.supabase.co",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
