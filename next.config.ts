import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const isAnalyze = process.env.ANALYZE === "true";

const nextConfig: NextConfig = {
  /* config options here */
};

// export default nextConfig;
export default withBundleAnalyzer({
  enabled: isAnalyze,
})(nextConfig);
