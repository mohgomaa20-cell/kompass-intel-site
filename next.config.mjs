/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ckrdgxlakkyrzajkmmwy.supabase.co',
      },
    ],
  },
};

export default nextConfig;
