import "./src/app/env.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/plataforma-boom",
        destination:
          "https://valentinjadot.notion.site/Plataforma-Boom-introducci-n-8b007091ff1d49bbb13734130fabfcac?pvs=4",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
