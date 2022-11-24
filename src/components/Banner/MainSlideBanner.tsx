import { FC, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import { isBoolean } from '@fxts/core';

import SlideButton from 'components/Button/SlideButton';
import { BannerInfo } from 'models/display';
import { getLinkTarget } from 'utils/html';
import media from 'utils/styles/media';
import Link from 'next/link';

interface MainSlideProps {
    settings: SwiperProps;
    banners: BannerInfo[];
}

const SlideWrapper = styled.div<{ imgUrl?: string }>`
    width: 100%;
    height: 100%;
    text-align: center;
    padding-top: 100px;
    padding-bottom: 120px;

    ${(props) =>
        props.imgUrl &&
        css`
            background-image: url('${props.imgUrl}');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
        `}
`;

const NewTitle = styled.span`
    display: block;
    font-size: 16px;
    line-height: 19px;
    color: ${(props) => props.theme.primary};
    letter-spacing: 0;
    margin-bottom: 28px;

    ${media.small} {
        margin-bottom: 16px;
    }
`;

const SlideBannerTitle = styled.h1<{ color: string }>`
    font-size: 26px;
    line-height: 32px;
    color: ${(props) => props.color || '#191919'};
    margin-bottom: 10px;
    font-weight: bold;
`;

const SlideBannerDesc = styled.p<{ color: string }>`
    font-size: 26px;
    line-height: 32px;
    letter-spacing: 0;
    color: ${(props) => props.color || '#191919'};
    margin-bottom: 20px;
`;

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    bottom: 120px !important;

    .main-swiper-pagination-bullets {
        display: block;
        width: 55px;
        border: 3px solid #ffffff;
        opacity: 1;
    }
    .main-swiper-pagination-bullets:not(:last-child) {
        margin-right: 10px;
    }
    .swiper-pagination-bullet-active {
        display: block;
        width: 55px;
        border: 3px solid #b12429;
        opacity: 1;
    }
    .swiper-pagination-bullet-active:not(:last-child) {
        margin-right: 10px;
    }
`;

const StyledLink = styled(Link)`
    display: block;
    border-radius: 25px;
    background-color: #191919;
    color: #fff;
    height: 50px;
    font-size: 20px;
    padding: 10px 20px;
    width: 138px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    letter-spacing: 0;

    ${media.medium} {
        font-size: 16px;
        line-height: 24px;
        padding: 10px 28px;
    }
`;

const MainSlideBanner: FC<MainSlideProps> = ({
    settings,
    banners,
}: MainSlideProps) => {
    const prevElRef = useRef(null);
    const nextElRef = useRef(null);
    const paginationRef = useRef(null);

    // TODO: 현재는 배너 등록일자가 1주일 이내인 것만 NEW 노출
    const isNew = useCallback((startDt: Date) => {
        const today = dayjs();

        return (
            dayjs(startDt).isBefore(today) &&
            dayjs(startDt).isAfter(today.subtract(1, 'week'))
        );
    }, []);

    return (
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

                if (!isBoolean(Swiper.params.pagination)) {
                    const pagination = Swiper.params.pagination;
                    if (pagination) {
                        pagination.el = paginationRef.current;
                    }
                }
            }}
            navigation={{
                prevEl: prevElRef.current,
                nextEl: nextElRef.current,
            }}
            pagination={{
                clickable: true,
                el: paginationRef.current,
                type: 'bullets',
                bulletClass: 'main-swiper-pagination-bullets',
            }}
        >
            {banners.map(
                ({
                    bannerNo,
                    imageUrl,
                    displayStartYmdt,
                    name,
                    nameColor,
                    description,
                    descriptionColor,
                    landingUrl,
                    browerTargetType,
                }: BannerInfo) => {
                    return (
                        <SwiperSlide key={bannerNo}>
                            <SlideWrapper imgUrl={imageUrl}>
                                {isNew(displayStartYmdt) && (
                                    <NewTitle>NEW</NewTitle>
                                )}

                                <SlideBannerTitle color={nameColor}>
                                    {name}
                                </SlideBannerTitle>
                                <SlideBannerDesc color={descriptionColor}>
                                    {description}
                                </SlideBannerDesc>
                                {landingUrl && (
                                    <StyledLink
                                        href={{ pathname: landingUrl }}
                                        target={getLinkTarget(browerTargetType)}
                                    >
                                        자세히 보기
                                    </StyledLink>
                                )}
                            </SlideWrapper>
                        </SwiperSlide>
                    );
                },
            )}
            <SlideButton slideButtonType='prev' ref={prevElRef} />
            <SlideButton slideButtonType='next' ref={nextElRef} />

            <PaginationWrapper
                className='swiper-pagination'
                ref={paginationRef}
            />
        </Swiper>
    );
};

export default MainSlideBanner;
