import { FC, useMemo, useRef } from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import { head, isBoolean } from '@fxts/core';
import { useWindowSize } from 'usehooks-ts';

import SlideButton from 'components/Button/SlideButton';
import { Product } from 'models/display';
import PATHS from 'const/paths';
import { KRW } from 'utils/currency';
import { ellipsis } from 'utils/styles/mixin';
import media from 'utils/styles/media';

interface NewReleasesProps {
    title: string;
    products?: Product[];
    settings: any;
}

const NewReleasesContainer = styled.div`
    position: relative;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    width: 100%;
    padding-bottom: 156px;

    ${media.xlarge} {
        margin-left: 24px;
        margin-right: 24px;
    }

    ${media.small} {
        width: 100%;
        margin-left: 24px;
        margin-right: 0;
        padding-bottom: 88px;
    }
`;

const NewReleasesTitle = styled.h3`
    color: #191919;
    font-size: 26px;
    line-height: 32px;
    letter-spacing: 0px;
    color: #191919;
    text-align: left;

    ${media.small} {
        font-size: 24px;
        line-height: 28px;
        margin-bottom: 10px;
    }
`;

const StyledSlideButton = styled(SlideButton)`
    ${(props) =>
        props.slideButtonType === 'prev' &&
        css`
            left: -60px;
        `}

    ${(props) =>
        props.slideButtonType === 'next' &&
        css`
            right: -60px;
        `}
`;

const NewReleasesCard = styled(Link)``;

const NewReleasesImageContainer = styled.div`
    padding-bottom: 100%;
    position: relative;
    margin-bottom: 10px;

    ${media.medium} {
        margin-bottom: 20px;
    }
`;

const NewReleasesImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    max-width: 420px;
    max-height: 420px;
`;

const NewReleasesCardTitle = styled.p`
    font-size: 20px;
    line-height: 24px;
    text-align: left;
    letter-spacing: 0px;
    color: #191919;
    font-weight: medium;
    margin-bottom: 5px;

    ${media.small} {
        font-size: 24px;
        font-weight: bold;
        color: #191919;
        letter-spacing: -0.96px;
        margin-bottom: 2px;
    }
`;

const NewReleasesCardDesc = styled.span`
    display: block;
    text-align: left;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.64px;
    color: #858585;
    margin-bottom: 5px;

    ${ellipsis(1)}

    ${media.small} {
        margin-bottom: 2px;
    }
`;

const NewReleasesCardPrice = styled.span`
    display: block;
    text-align: left;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.64px;
    color: #858585;
`;

const NewReleases: FC<NewReleasesProps> = ({ settings, title, products }) => {
    const prevElRef = useRef(null);
    const nextElRef = useRef(null);
    const { width } = useWindowSize();

    const newReleasesSettings = useMemo<SwiperProps>(
        () => ({
            ...settings,
            spaceBetween: 10,
            slidesPerView: 1.2,
            navigation: false,
            pagination: false,
            breakpoints: {
                768: {
                    slidesPerView: 2.2,
                },
                1024: {
                    slidesPerView: 3,
                    navigation: {
                        prevEl: prevElRef.current,
                        nextEl: nextElRef.current,
                    },
                },
            },
            onBeforeInit: (Swiper: SwiperClass) => {
                if (!isBoolean(Swiper.params.navigation)) {
                    const navigation = Swiper.params.navigation;
                    if (navigation) {
                        navigation.prevEl = prevElRef.current;
                        navigation.nextEl = nextElRef.current;
                    }
                }
            },
        }),
        [settings],
    );

    return (
        <NewReleasesContainer>
            <NewReleasesTitle>{title}</NewReleasesTitle>

            <Swiper {...newReleasesSettings}>
                {products?.map((product: any) => {
                    return (
                        <SwiperSlide key={product.productNo}>
                            <NewReleasesCard
                                href={{
                                    pathname: `${PATHS.PRODUCT_DETAIL}/${product.productNo}`,
                                }}
                            >
                                <NewReleasesImageContainer>
                                    <NewReleasesImage
                                        src={head(
                                            product.listImageUrls as string[],
                                        )}
                                    />
                                </NewReleasesImageContainer>
                                <NewReleasesCardTitle>
                                    {product.productName}
                                </NewReleasesCardTitle>
                                <NewReleasesCardDesc>
                                    {product.promotionText}
                                </NewReleasesCardDesc>

                                <NewReleasesCardPrice>
                                    {`${KRW(product.salePrice).format()}`}
                                </NewReleasesCardPrice>
                            </NewReleasesCard>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            <StyledSlideButton slideButtonType='prev' ref={prevElRef} />
            <StyledSlideButton slideButtonType='next' ref={nextElRef} />
        </NewReleasesContainer>
    );
};

export default NewReleases;
