// /** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    reactStrictMode: true,
    images: {
        domains: ['rlyfaazj0.toastcdn.net'],
    },

    async rewrites() {
        return [
            {
                source: '/golf-course/search-realm.ajax.php/:path*',
                destination:
                    'https://voicecaddie.co.kr/golf-course/search-realm.ajax.php/:path*',
            },
        ];
    },

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
