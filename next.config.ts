import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const isAnalyze = process.env.ANALYZE === "true";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    JWT_SECRET: 'lasu-hostel-complaint-system-jwt-secret-2024-production-ready-super-secure-key-make-it-very-long-and-random-xyz789'
  }
};

// export default nextConfig;
export default withBundleAnalyzer({
  enabled: isAnalyze,
})(nextConfig);
