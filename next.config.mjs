/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ucarecdn.com",
            },
            {
                protocol: "https",
                hostname: "shkewl.vercel.app",
            },
            {
                protocol: "https",
                hostname: "img.freepik.com",
            },
        ],
    },
};

export default nextConfig;
