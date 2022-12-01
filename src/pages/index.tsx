import { useState, useMemo } from 'react';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useQuery } from 'react-query';
import { useWindowSize } from 'usehooks-ts';
import { filter, head, pipe } from '@fxts/core';
import { A11y, Navigation, Pagination } from 'swiper';
import { SwiperProps } from 'swiper/react';

import BandBanner from 'components/Banner/BandBanner';
import MainSlideBanner from 'components/Banner/MainSlideBanner';
import styles from '../styles/Home.module.css';
import BANNER from 'const/banner';
import { isMobile } from 'utils/styles/responsive';
import { sortBanners } from 'utils/banners';
import { banner } from 'api/display';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Home: NextPage = () => {
    const { width } = useWindowSize();
    const [bandBannerVisible, setBandBannerVisible] = useState(true);

    const onBandBannerCloseClick = () => {
        setBandBannerVisible(false);
    };
    console.log(`env: ${process.env.NODE_ENV}`);

    const getMainBannerCode = useMemo(
        () =>
            isMobile(width)
                ? BANNER.MAIN_MOBILE_BANNER
                : BANNER.MAIN_WEB_BANNER,
        [width],
    );

    const { data: mainBannerData } = useQuery(
        ['mainBanner', getMainBannerCode],
        async () =>
            await banner.getBanners([
                getMainBannerCode,
                BANNER.MAIN_BAND_BANNER,
                BANNER.MAIN_CATEGORY_BANNER,
                BANNER.MAIN_ETC_BANNER,
            ]),
        {
            select: ({ data }) => {
                const filteredBannerData = (code: string) =>
                    pipe(
                        data,
                        filter((a) => a.code === code),
                        head,
                    );

                return {
                    mainBandBanner: filteredBannerData(BANNER.MAIN_BAND_BANNER),
                    mainBanner: filteredBannerData(getMainBannerCode),
                    mainCategoryBanner: filteredBannerData(
                        BANNER.MAIN_CATEGORY_BANNER,
                    ),
                    mainETCBanner: filteredBannerData(BANNER.MAIN_ETC_BANNER),
                };
            },
        },
    );

    const settings = useMemo<SwiperProps>(
        () => ({
            modules: [Navigation, Pagination, A11y],
            observer: true,
            resizeObserver: true,
            spaceBetween: 50,
            slidesPerView: 1,
            navigation: true,
            pagination: true,
            style: {
                transform: 'translate3d(0, 0, 0)',
                zIndex: 0,
                marginBottom: '60px',
            },
        }),
        [],
    );

    return (
        <div>
            <NextSeo
                title='home'
                description='home description'
                canonical='https://example.com'
                openGraph={{
                    url: 'https://example.com',
                }}
            />

            {bandBannerVisible &&
                mainBannerData?.mainBandBanner?.accounts[0]?.banners && (
                    <BandBanner
                        title={
                            mainBannerData.mainBandBanner.accounts[0].banners[0]
                                .name
                        }
                        url={
                            mainBannerData.mainBandBanner.accounts[0].banners[0]
                                .videoUrl ??
                            mainBannerData.mainBandBanner.accounts[0].banners[0]
                                .landingUrl
                        }
                        onCloseClick={onBandBannerCloseClick}
                    />
                )}

            {/* 메인 슬라이드 배너 */}
            {mainBannerData?.mainBanner?.accounts[1]?.banners && (
                <MainSlideBanner
                    settings={{
                        ...settings,
                        style:
                            width > 428
                                ? {
                                      ...settings.style,
                                      height: '828px',
                                  }
                                : {
                                      ...settings.style,
                                      height: '410px',
                                  },
                    }}
                    banners={sortBanners(
                        mainBannerData.mainBanner.accounts[1]?.banners,
                    )}
                />
            )}

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href='https://nextjs.org'>Next.js!</a>
                </h1>

                <p className={styles.description}>
                    Get started by editing{' '}
                    <code className={styles.code}>pages/index.tsx</code>
                </p>

                <div className={styles.grid}>
                    <a href='https://nextjs.org/docs' className={styles.card}>
                        <h2>Documentation &rarr;</h2>
                        <p>
                            Find in-depth information about Next.js features and
                            API.
                        </p>
                    </a>

                    <a href='https://nextjs.org/learn' className={styles.card}>
                        <h2>Learn &rarr;</h2>
                        <p>
                            Learn about Next.js in an interactive course with
                            quizzes!
                        </p>
                    </a>

                    <a
                        href='https://github.com/vercel/next.js/tree/canary/examples'
                        className={styles.card}
                    >
                        <h2>Examples &rarr;</h2>
                        <p>
                            Discover and deploy boilerplate example Next.js
                            projects.
                        </p>
                    </a>

                    <a
                        href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
                        target='_blank'
                        rel='noopener noreferrer'
                        className={styles.card}
                    >
                        <h2>Deploy &rarr;</h2>
                        <p>
                            Instantly deploy your Next.js site to a public URL
                            with Vercel.
                        </p>
                    </a>
                </div>
            </main>
        </div>
    );
};

export default Home;
