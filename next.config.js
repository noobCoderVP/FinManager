/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        BASE_URL: "https://finmanager-backend-production.up.railway.app/",
        WEB_URL: "http://localhost:3000",
    },
};

module.exports = nextConfig;
