// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
// }

// module.exports = nextConfig
const { i18n } = require('./next-i18next.config');
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
            issuer: { and: [/\.(js|ts|md)x?$/] },
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        prettier: false,
                        svgo: true,
                        titleProp: true,
                        svgoConfig: {
                            plugins: [
                                {
                                    name: 'preset-default',
                                    params: {
                                        overrides: { removeViewBox: false },
                                    },
                                    // Enable figma's wrong mask-type attribute work
                                    removeRasterImages: false,
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

    i18n,
});
