import { FC, useRef } from 'react';
import ReactPlayer from 'react-player';
import styled, { css } from 'styled-components';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import { isBoolean } from '@fxts/core';

import SlideButton from 'components/Button/SlideButton';
import { BannerInfo } from 'models/display';

interface MainVideoBannerProps {
    title: string;
    settings: SwiperProps;
    banners: BannerInfo[];
}

const MainVideoBannerContainer = styled.div`
    background-color: #000000;
    padding-top: 70px;
    padding-bottom: 153px;
    position: relative;
    margin-bottom: 10rem;
`;

const PaginationContainer = styled.div`
    padding: 0 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    bottom: 68px !important;

    .main-swiper-pagination-bullets {
        background-color: transparent;
        > p {
            font-size: 16px;
            line-height: 24px;
            color: #ffffff;
            margin-bottom: 20px;
        }
        > div {
            display: block;
            width: 250px;
            border: 3px solid #ffffff;
            opacity: 1;
        }
    }
    .main-swiper-pagination-bullets:not(:last-child) {
        margin-right: 10px;
    }
    .swiper-pagination-bullet-active {
        > p {
            color: #c00020;
        }
        > div {
            display: block;
            width: 250px;
            border: 3px solid #c00020;
            opacity: 1;
        }
    }
`;

const ReactPlayerWrapper = styled.div`
    position: relative;
    padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */

    > div {
        position: absolute;
        top: 0;
        left: 0;
    }
`;

const MainVideoBannerTitle = styled.h3`
    font-size: 50px;
    line-height: 61px;
    color: ${(props) => props.color || '#fff'};
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
`;

const MainVideoBannerDesc = styled.p`
    font-size: 20px;
    line-height: 29px;
    color: ${(props) => props.color || '#fff'};
    text-align: center;
    margin-bottom: 57px;
`;

const StyledSlideButton = styled(SlideButton)`
    ${(props) =>
        props.slideButtonType === 'prev' &&
        css`
            left: 8.75rem;
        `}

    ${(props) =>
        props.slideButtonType === 'next' &&
        css`
            right: 8.75rem;
        `}
`;

const MainVideoBanner: FC<MainVideoBannerProps> = ({
    title,
    settings,
    banners,
}) => {
    const prevElRef = useRef(null);
    const nextElRef = useRef(null);
    const paginationRef = useRef(null);

    return (
        <MainVideoBannerContainer>
            <MainVideoBannerTitle>{title}</MainVideoBannerTitle>
            <MainVideoBannerDesc>
                세계 유일, 골프만을 위한 Voice Caddie만의 자체 기술
            </MainVideoBannerDesc>

            <div style={{ position: 'relative' }}>
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
                        renderBullet(index, className) {
                            return `<div class="${className}">
                                        <p>${banners[index].name}</p>
                                        <div></div>
                                    </div>`;
                        },
                    }}
                >
                    {banners.map(
                        ({
                            bannerNo,
                            name,
                            nameColor,
                            description,
                            descriptionColor,
                            videoUrl,
                        }) => {
                            return (
                                <SwiperSlide key={bannerNo}>
                                    <ReactPlayerWrapper>
                                        <ReactPlayer
                                            className='react-player'
                                            url={videoUrl} // 플레이어 url
                                            width='100%'
                                            height='100%'
                                            // width='100%' // 플레이어 크기 (가로)
                                            // height='100%' // 플레이어 크기 (세로)
                                            // playing={true} // 자동 재생 on
                                            // muted={true} // 자동 재생 on
                                            controls={true} // 플레이어 컨트롤 노출 여부
                                            light={false} // 플레이어 모드
                                            pip={true} // pip 모드 설정 여부
                                            poster={
                                                'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'
                                            } // 플레이어 초기 포스터 사진
                                            fallback={<div>loading...</div>}
                                            // https://developers.google.com/youtube/player_parameters.html?playerVersion=HTML5&hl=ko#showinfo
                                            config={{
                                                youtube: {
                                                    playerVars: {
                                                        // showinfo: 0,
                                                        fs: 0,
                                                    },
                                                },
                                            }}
                                        />
                                    </ReactPlayerWrapper>
                                </SwiperSlide>
                            );
                        },
                    )}
                </Swiper>
                <StyledSlideButton slideButtonType='prev' ref={prevElRef} />
                <StyledSlideButton slideButtonType='next' ref={nextElRef} />
            </div>
            <PaginationContainer
                className='swiper-pagination'
                ref={paginationRef}
            />
        </MainVideoBannerContainer>
    );
};

export default MainVideoBanner;
