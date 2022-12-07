import { Swiper as SwiperClass } from 'swiper/types';
import SlideButton from 'components/Button/SlideButton';
import { FC, useMemo } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { isBoolean } from '@fxts/core';
import { A11y, Navigation, Pagination } from 'swiper';

import 'swiper/css';
import media from 'utils/styles/media';

interface ProductImageSliderProps {
    imageList?: string[];
}

const Container = styled.div`
    width: 100%;
    max-width: 661px;
    background-color: ${(props) => props.theme.bg2};
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    ${media.medium} {
        margin-bottom: 60px;
    }
`;

const SwiperContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    bottom: 20px !important;
    position: absolute;

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
        border: 3px solid ${(props) => props.theme.main};
        opacity: 1;
    }
    .swiper-pagination-bullet-active:not(:last-child) {
        margin-right: 10px;
    }
`;

const ProductImageSlider: FC<ProductImageSliderProps> = ({
    imageList = [],
}) => {
    const settings = useMemo<SwiperProps>(
        () => ({
            modules: [Pagination, Navigation, A11y],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            navigation: {
                prevEl: '.prevEl',
                nextEl: '.nextEl',
            },
            pagination: {
                clickable: true,
                type: 'bullets',
                bulletClass: 'main-swiper-pagination-bullets',
                el: '.swiper-pagination',
                bulletActiveClass: 'swiper-pagination-bullet-active',
            },
            onBeforeInit: (Swiper: SwiperClass) => {
                if (!isBoolean(Swiper.params.pagination)) {
                    const pagination = Swiper.params.pagination;
                    if (pagination) {
                        pagination.el = '.swiper-pagination';
                    }
                }
            },
        }),
        [],
    );

    return (
        <Container>
            {imageList.length > 0 && (
                <Swiper {...settings}>
                    {imageList &&
                        imageList.map((image, index) => {
                            return (
                                <SwiperSlide
                                    key={index}
                                    style={{ width: '100%' }}
                                >
                                    <SwiperContent>
                                        <img src={image} />
                                    </SwiperContent>
                                </SwiperSlide>
                            );
                        })}
                </Swiper>
            )}

            <SlideButton slideButtonType='prev' className='prevEl' />
            <SlideButton slideButtonType='next' className='nextEl' />

            <PaginationContainer className='swiper-pagination' />
        </Container>
    );
};

export default ProductImageSlider;
