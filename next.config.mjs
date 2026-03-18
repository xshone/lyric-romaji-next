/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Ensure kuromoji (which uses Node.js fs) stays server-side only
    serverComponentsExternalPackages: ["kuromoji", "kuroshiro-analyzer-kuromoji"],
  },
}

export default nextConfig
