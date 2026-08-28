import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "regneklar.no" }],
        destination: "https://www.regneklar.no/:path*",
        permanent: true,
      },
      {
        source: "/kategori/helse",
        destination: "/kategori/sport",
        permanent: true,
      },
      {
        source: "/kalkulator/karaktersnitt",
        destination: "/kalkulator/karakterkalkulator",
        permanent: true,
      },
      {
        source: "/kalkulator/termin",
        destination: "/kalkulator/terminkalkulator",
        permanent: true,
      },
      {
        source: "/kalkulator/effekt",
        destination: "/kalkulator/effekt-kalkulator",
        permanent: true,
      },
      {
        source: "/kalkulator/pytagoras",
        destination: "/kalkulator/pythagoras",
        permanent: true,
      },
      {
        source: "/kalkulator/pytagoras-setning",
        destination: "/kalkulator/pythagoras",
        permanent: true,
      },
      {
        source: "/kalkulator/snitt-kalkulator",
        destination: "/kalkulator/karakterkalkulator",
        permanent: true,
      },
      {
        source: "/kalkulator/vitnemal-snitt",
        destination: "/kalkulator/karakterkalkulator",
        permanent: true,
      },
      {
        source: "/kalkulator/regne-ut-snitt-vitnemal",
        destination: "/kalkulator/karakterkalkulator",
        permanent: true,
      },
      {
        source: "/kalkulator/volum-av-kule",
        destination: "/kalkulator/volum-kule",
        permanent: true,
      },
      {
        source: "/kalkulator/volum-av-kule-kalkulator",
        destination: "/kalkulator/volum-kule",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
