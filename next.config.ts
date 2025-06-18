import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */

    // Enable source maps for client and server.
    productionBrowserSourceMaps: true,
    webpack: (config, {isServer}) => {
        if (isServer) {
            config.devtool = 'source-map'
        }
        return config
    },
};

export default nextConfig;

module.exports = {
    output: 'standalone',
}
