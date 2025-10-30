
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: [
//       "utfs.io"  // Changed from uploadthing.com to utfs.io
//     ]
//   }
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["utfs.io"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ Add this to ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;