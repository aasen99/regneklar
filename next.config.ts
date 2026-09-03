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
      {
        source: "/kalkulator/boliglan-kalkulator",
        destination: "/kalkulator/lanekalkulator",
        permanent: true,
      },
      {
        source: "/kalkulator/boliglanskalkulator",
        destination: "/kalkulator/lanekalkulator",
        permanent: true,
      },
      {
        source: "/kalkulator/hvor-mye-kan-jeg-lane",
        destination: "/kalkulator/laneramme",
        permanent: true,
      },
      {
        source: "/kalkulator/bmi-kalkulator",
        destination: "/kalkulator/bmi",
        permanent: true,
      },
      {
        source: "/kalkulator/kalorikalkulator",
        destination: "/kalkulator/kaloribehov",
        permanent: true,
      },
      {
        source: "/kalkulator/malingskalkulator",
        destination: "/kalkulator/maling",
        permanent: true,
      },
      {
        source: "/kalkulator/prosentkalkulator",
        destination: "/kalkulator/prosent",
        permanent: true,
      },
      {
        source: "/kalkulator/feriepengekalkulator",
        destination: "/kalkulator/feriepenger",
        permanent: true,
      },
      {
        source: "/kalkulator/loypekalkulator",
        destination: "/kalkulator/km-t-min-km",
        permanent: true,
      },
      {
        source: "/kalkulator/lopekalkulator",
        destination: "/kalkulator/km-t-min-km",
        permanent: true,
      },
      {
        source: "/kalkulator/tempokalkulator",
        destination: "/kalkulator/km-t-min-km",
        permanent: true,
      },
      {
        source: "/kalkulator/makspuls-kalkulator",
        destination: "/kalkulator/makspuls",
        permanent: true,
      },
      {
        source: "/kalkulator/arealkalkulator",
        destination: "/kalkulator/areal",
        permanent: true,
      },
      {
        source: "/kalkulator/ohms-lov-kalkulator",
        destination: "/kalkulator/ohms-lov",
        permanent: true,
      },
      {
        source: "/kalkulator/mva-kalkulator",
        destination: "/kalkulator/mva",
        permanent: true,
      },
      {
        source: "/kalkulator/moms-kalkulator",
        destination: "/kalkulator/mva",
        permanent: true,
      },
      {
        source: "/kalkulator/rentesrente",
        destination: "/kalkulator/rentes-rente",
        permanent: true,
      },
      {
        source: "/kalkulator/rentes-rente-kalkulator",
        destination: "/kalkulator/rentes-rente",
        permanent: true,
      },
      {
        source: "/kalkulator/brokkalkulator",
        destination: "/kalkulator/brok",
        permanent: true,
      },
      {
        source: "/kalkulator/gjennomsnittskalkulator",
        destination: "/kalkulator/gjennomsnitt",
        permanent: true,
      },
      {
        source: "/kalkulator/graviditetskalkulator",
        destination: "/kalkulator/graviditetsuke",
        permanent: true,
      },
      {
        source: "/kalkulator/egenkapitalkalkulator",
        destination: "/kalkulator/egenkapital-bolig",
        permanent: true,
      },
      {
        source: "/kalkulator/bsu-kalkulator",
        destination: "/kalkulator/bsu",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
