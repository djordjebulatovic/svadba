import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // JSON fajlovi vendora se čitaju sa diska; ovo osigurava da budu uključeni i na Vercelu.
  outputFileTracingIncludes: {
    "/*": ["./data/vendors/**/*"],
  },
  async headers() {
    return [
      {
        // Demo stranice nikada ne smeju u pretraživače.
        source: "/demo/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
