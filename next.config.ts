import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const isAnalyze = process.env.ANALYZE === "true";

const nextConfig: NextConfig = {
  // ✅ Remove JWT_SECRET from here - use .env files only
  
  // ✅ Security Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self'",
              "connect-src 'self'",
              "frame-ancestors 'none'"
            ].join('; ')
          }
        ]
      }
    ]
  },

  // ✅ Image Optimization
  images: {
    domains: ['res.cloudinary.com', 'localhost'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ✅ Performance Optimizations
  compress: true,
  poweredByHeader: false, // Remove X-Powered-By header
  
  // ✅ Experimental Features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  // ✅ TypeScript Configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // ✅ ESLint Configuration
  eslint: {
    ignoreDuringBuilds: false,
  },

  // ✅ Redirects for Security
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/staff/dashboard',
        permanent: true,
      }
    ]
  },

  // ✅ Environment Variables (only non-sensitive ones)
  env: {
    APP_NAME: 'LASU Hostel Complaint System',
    APP_VERSION: '1.0.0',
    DATABASE_URL: process.env.DATABASE_URL,
  },

  // ✅ Output Configuration for Production
  output: process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? 'standalone' : undefined,
  
  // ✅ Bundle Analysis in Development
  productionBrowserSourceMaps: false, // Disable source maps in production
};

export default withBundleAnalyzer({
  enabled: isAnalyze,
})(nextConfig);
