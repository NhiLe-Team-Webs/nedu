/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nedu.nhi.sg',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
    ],
  },
  allowedDevOrigins: [
    'localhost:5000',
    'achenial-kali-unargumentatively.ngrok-free.dev'
  ],
}

module.exports = nextConfig
