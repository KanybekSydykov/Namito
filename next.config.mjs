/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        host: "0.0.0.0",
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname:'namito.kg'
            }
        ]
    },
    output: "standalone",
    
};

export default nextConfig;
