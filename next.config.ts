import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Add this to see detailed errors in production
  productionBrowserSourceMaps: true,
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
        // https://nvscstkpbvmpgfdaqlqk.supabase.co/storage/v1/object/public/public-image/f74844b4-0174-4867-8587-ffbf37df2059.jpg
        protocol: "https",
        hostname: "glazygamnqctfmteqrfv.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "birthdayforhunger-dev.s3.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "main.dx6j5bfbtiw5l.amplifyapp.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};

export default nextConfig;
