/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_ENDPOINT.substring(8)}`, // Remove "https" do endpoint
      },
    ],
  },
};

export default nextConfig;