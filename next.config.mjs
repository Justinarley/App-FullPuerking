/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',  // Esto hará que las solicitudes a /api sean redirigidas
        destination: 'http://localhost:4000/:path*',  // Al backend
      },
    ];
  },
};

export default nextConfig;
