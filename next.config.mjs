/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 'cdn.elearningindustry.com',
          },
        ],
      },
};

export default nextConfig;
