import { Swiper as SwiperClass } from 'swiper/types';
import SlideButton from 'components/Button/SlideButton';
import { FC, useMemo, useRef } from 'react';
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
    const prevElRef = useRef(null);
    const nextElRef = useRef(null);
    const paginationRef = useRef(null);

    const settings = useMemo<SwiperProps>(
        () => ({
            modules: [Pagination, Navigation, A11y],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            navigation: {
                prevEl: prevElRef.current,
                nextEl: nextElRef.current,
            },
            pagination: {
                clickable: true,
                type: 'bullets',
                bulletClass: 'main-swiper-pagination-bullets',
                el: paginationRef.current,
            },
            onBeforeInit: (Swiper: SwiperClass) => {
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

            <SlideButton slideButtonType='prev' ref={prevElRef} />
            <SlideButton slideButtonType='next' ref={nextElRef} />

            <PaginationContainer
                className='swiper-pagination'
                ref={paginationRef}
            />
        </Container>
    );
};

export default ProductImageSlider;
