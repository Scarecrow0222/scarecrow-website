/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.st-note.com"
      },
      {
        protocol: "https",
        hostname: "note.com"
      }
    ]
  }
};

export default nextConfig;
