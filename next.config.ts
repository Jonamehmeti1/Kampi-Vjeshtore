import type { NextConfig } from "next";

// Keep the local preview free of the development indicator.
const nextConfig: NextConfig = {
  devIndicators: false,
};

export default nextConfig;
