import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/api/portraits/**",
      },
      {
        protocol: "https",
        hostname: "birthdayforhunger-dev.s3.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
