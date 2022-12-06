import { FC, useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';
import { isBoolean } from '@fxts/core';
import { A11y, Navigation } from 'swiper';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import { useWindowSize } from 'usehooks-ts';
import dayjs from 'dayjs';

import MainCategory from 'components/Main/MainCategory';
import SlideButton from 'components/Button/SlideButton';
import { BannerInfo } from 'models/display';
import media from 'utils/styles/media';
import { getLinkTarget } from 'utils/html';
import BREAKPOINTS from 'const/breakpoints';

interface MainCategoryBannersProps {
    banners: BannerInfo[];
}

const StyledSlideButton = styled(SlideButton)`
    ${(props) =>
        props.slideButtonType === 'prev' &&
        css`
            left: -24px;
        `}

    ${(props) =>
        props.slideButtonType === 'next' &&
        css`
            right: -24px;
        `}
`;

const MainCategoryBannersWrapper = styled.div`
    margin-left: auto;
    margin-right: auto;
    position: relative;

    @media (min-width: 769px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        width: 640px;
        height: 72px;
        padding-top: 50px;
        padding-bottom: 156px;
    }

    ${media.small} {
        margin: 44px 16px;
    }
`;

const MainCategoryBanners: FC<MainCategoryBannersProps> = ({ banners }) => {
    const { width } = useWindowSize();
    const prevElRef = useRef(null);
    const nextElRef = useRef(null);

    const settings = useMemo<SwiperProps>(
        () => ({
            modules: [Navigation, A11y],
            observer: true,
            resizeObserver: true,
            slidesPerView: 4,
            navigation: true,
            pagination: true,
            style:
                width > BREAKPOINTS.SMALL
                    ? { width: '360px' }
                    : { width: '100%' },
        }),
        [width],
    );

    const isDisplay = (startDt: Date, endDt: Date) => {
        const now = dayjs();

        return dayjs(startDt).isBefore(now) && dayjs(endDt).isAfter(now);
    };

    return (
        <MainCategoryBannersWrapper>
            {width > 768 ? (
                <>
                    {banners.map(
                        ({
                            bannerNo,
                            imageUrl,
                            mouseOverImageUrl,
                            name,
                            landingUrl,
                            browerTargetType,
                            displayStartYmdt,
                            displayEndYmdt,
                        }) => {
                            return (
                                isDisplay(displayStartYmdt, displayEndYmdt) && (
                                    <MainCategory
                                        key={bannerNo}
                                        imageUrl={imageUrl}
                                        mouseOverImageUrl={mouseOverImageUrl}
                                        title={name}
                                        landingUrl={landingUrl}
                                        target={getLinkTarget(browerTargetType)}
                                    />
                                )
                            );
                        },
                    )}
                </>
            ) : (
                <>
                    <Swiper
                        {...settings}
                        onBeforeInit={(Swiper: SwiperClass) => {
                            if (!isBoolean(Swiper.params.navigation)) {
                                const navigation = Swiper.params.navigation;
                                if (navigation) {
                                    navigation.prevEl = prevElRef.current;
                                    navigation.nextEl = nextElRef.current;
                                }
                            }
                        }}
                        navigation={{
                            prevEl: prevElRef.current,
                            nextEl: nextElRef.current,
                        }}
                    >
                        {banners.map(
                            ({
                                bannerNo,
                                imageUrl,
                                mouseOverImageUrl,
                                name,
                                landingUrl,
                                browerTargetType,
                                displayStartYmdt,
                                displayEndYmdt,
                            }) => {
                                return (
                                    isDisplay(
                                        displayStartYmdt,
                                        displayEndYmdt,
                                    ) && (
                                        <SwiperSlide key={bannerNo}>
                                            <MainCategory
                                                imageUrl={imageUrl}
                                                mouseOverImageUrl={
                                                    mouseOverImageUrl
                                                }
                                                title={name}
                                                landingUrl={landingUrl}
                                                target={getLinkTarget(
                                                    browerTargetType,
                                                )}
                                            />
                                        </SwiperSlide>
                                    )
                                );
                            },
                        )}
                    </Swiper>
                    <StyledSlideButton slideButtonType='prev' ref={prevElRef} />
                    <StyledSlideButton slideButtonType='next' ref={nextElRef} />
                </>
            )}
        </MainCategoryBannersWrapper>
    );
};

export default MainCategoryBanners;
