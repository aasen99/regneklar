import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/kategori/helse",
        destination: "/kategori/sport",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
