import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Hide the Next.js Dev Tools badge in development (temporary)
  devIndicators: false,
  // Prefer this app’s lockfile over a parent monorepo lockfile
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "daikinindia.com",
        pathname: "/sites/default/files/**",
      },
      {
        protocol: "https",
        hostname: "www.daikinindia.com",
        pathname: "/sites/default/files/**",
      },
    ],
  },
};

export default nextConfig;
