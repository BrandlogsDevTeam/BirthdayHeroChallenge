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
        // https://nvscstkpbvmpgfdaqlqk.supabase.co/storage/v1/object/public/public-image/f74844b4-0174-4867-8587-ffbf37df2059.jpg
        protocol: "https",
        hostname: "nvscstkpbvmpgfdaqlqk.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "birthdayforhunger-dev.s3.amazonaws.com",
        pathname: "/**", // This allows any path after the hostname
      },
    ],
  },
};

export default nextConfig;
