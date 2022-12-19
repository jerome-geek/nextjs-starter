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
import MainCategoryBanners from 'components/Banner/MainCategoryBanners';
import BANNER from 'const/banner';
import { isMobile } from 'utils/styles/responsive';
import { sortBanners } from 'utils/banners';
import { banner, productSection } from 'api/display';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import PRODUCT_SECTION from 'const/productSection';
import { BY, SALE_STATUS } from 'models';
import NewReleases from 'components/Product/NewReleases';
import LayoutResponsive from 'components/shared/LayoutResponsive';

const Home: NextPage = () => {
    const { width } = useWindowSize();
    const [bandBannerVisible, setBandBannerVisible] = useState(true);

    const onBandBannerCloseClick = () => {
        setBandBannerVisible(false);
    };

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

    const { data: newReleasesData } = useQuery(
        ['product_section', PRODUCT_SECTION.NEW_RELEASE],
        async () =>
            await productSection.getProductSection(
                PRODUCT_SECTION.NEW_RELEASE,
                {
                    by: BY.ADMIN_SETTING,
                    soldout: false,
                    saleStatus: SALE_STATUS.ONSALE,
                    pageNumber: 1,
                    pageSize: 10,
                    hasTotalCount: false,
                    hasOptionValues: false,
                },
            ),
        {
            select: ({ data }) => data,
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

            <LayoutResponsive>
                {/* 카테고리 아이콘 리스트 */}
                {mainBannerData?.mainCategoryBanner?.accounts && (
                    <MainCategoryBanners
                        banners={sortBanners(
                            mainBannerData?.mainCategoryBanner?.accounts[0]
                                .banners,
                        )}
                    />
                )}

                {/* TODO: New Release */}
                {newReleasesData?.products && (
                    <NewReleases
                        settings={{
                            ...settings,
                        }}
                        title='New Releases'
                        products={newReleasesData.products}
                    />
                )}
            </LayoutResponsive>
        </div>
    );
};

export default Home;
