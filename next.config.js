// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

// module.exports = nextConfig

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    env: {
        BASE_URL: process.env.BASE_URL,
    },

    webpack(conf) {
        conf.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        svgoConfig: {
                            plugins: [
                                {
                                    // Ena4RasterImages: false,
                                    removeStyleElement: false,
                                    removeUnknownsAndDefaults: false,
                                    // Enable svgr's svg to fill the size
                                    removeViewBox: false,
                                },
                            ],
                        },
                    },
                },
            ],
        });
        // 절대경로
        conf.resolve.modules.push(__dirname);
        return conf;
    },
});
