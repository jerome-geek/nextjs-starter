import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { head, isBoolean } from '@fxts/core';
import styled from 'styled-components';

import { product } from 'api/product';
import { useQueries, useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { A11y, Navigation, Pagination } from 'swiper';
import ProductCard from 'components/Search/ProductCard';
import { KRW } from 'utils/currency';
import media from 'utils/styles/media';
import { ellipsis } from 'utils/styles/mixin';
import SlideButton from 'components/Button/SlideButton';
import PATHS from 'const/paths';
import Image from 'next/image';

interface RelatedProductProps {
    relatedProductNos: number[];
}

const RelatedProductContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* justify-content: left;
    overflow-y: hidden;
    overflow-x: auto;
    flex-wrap: nowrap;
    &::-webkit-scrollbar {
        display: block;
        background-color: #ddd;
        border-radius: 6px;
    }
    &::-webkit-scrollbar-thumb {
        display: block;
        background-color: #fff;
        border: 1px solid #aaa;
        border-radius: 6px;
    } */
`;

const Title = styled.h3`
    font-weight: bold;
    font-size: 36px;
    line-height: 54px;
    letter-spacing: 0px;
    color: #191919;
    margin-bottom: 65px;
`;

const RelatedProductBox = styled(SwiperSlide)`
    /* width: 20%; */
    margin-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 0 0 auto;
    > img {
        display: block;
        width: 100%;
    }
`;

const RelatedProductImage = styled.div`
    background: #f8f8fa;
    > img {
        width: 70%;
        padding: 15% 0;
        display: block;
        margin: 0 auto;
    }
`;

const RelatedProductDesc = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 19px;
    > div {
        > p {
            color: #858585;
            margin-bottom: 5px;
        }
        > p:first-child {
            color: #191919;
        }
    }
`;

const RelatedProductTitle = styled.div``;

const RelatedProductPrice = styled.div``;

const ProductCardContentsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: row;

    ${media.medium} {
        flex-direction: column;
    }
`;

const ProductInfoContainer = styled.div`
    ${media.medium} {
        margin-bottom: 10px;
    }
`;

const ProductName = styled.p`
    font-size: 16px;
    font-weight: medium;
    text-align: left;
    color: #191919;
    /* margin-bottom: 4px; */
    line-height: 22px;
`;

const ProductDescription = styled.p`
    font-size: 16px;
    font-weight: normal;
    text-align: left;
    color: #858585;
    letter-spacing: -0.6px;
    line-height: 22px;

    ${ellipsis(1)}

    ${media.medium} {
        font-size: 12px;
        letter-spacing: -0.48px;
    }
`;

const ProductPriceContainer = styled.div`
    display: flex;
    flex-direction: column;

    ${media.medium} {
        flex-direction: row;
    }
`;

const SalePrice = styled.p`
    letter-spacing: 0px;
    color: #191919;
    text-align: right;
    font-size: 16px;
    line-height: 22px;

    ${media.medium} {
        font-size: 14px;
        margin-right: 10px;
    }
`;

const ProductPrice = styled.p`
    color: #a8a8a8;
    text-align: right;
    text-decoration: line-through;
    font-size: 16px;
    line-height: 22px;

    ${media.medium} {
        font-size: 12px;
    }
`;

const RelatedProduct: FC<RelatedProductProps> = ({
    relatedProductNos = [],
}) => {
    const router = useRouter();

    const prevElRef = useRef(null);
    const nextElRef = useRef(null);

    const relatedProductInfoList = useQuery(
        ['relatedProducts', [...relatedProductNos]],
        async () =>
            await product.getProductsByProductNoList({
                productNos: relatedProductNos,
            }),
        {
            enabled: relatedProductNos.length > 0,
            select: ({ data }) => data,
            suspense: true,
        },
    );

    return (
        <RelatedProductContainer>
            <Title>같이 구매해보세요.</Title>

            <Swiper
                style={{ width: '100%' }}
                spaceBetween={50}
                slidesPerView={3}
                observer={true}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
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
                {relatedProductInfoList.data?.products?.length > 0 &&
                    relatedProductInfoList.data?.products?.map(
                        (relatedProduct: any) => {
                            return (
                                <SwiperSlide
                                    key={relatedProduct.baseInfo.productNo}
                                    onClick={() =>
                                        router.push(
                                            `${PATHS.PRODUCT_DETAIL}/${relatedProduct.data?.data.baseInfo.productNo}`,
                                        )
                                    }
                                >
                                    <div>
                                        <div>
                                            <img
                                                src={
                                                    head<string[]>(
                                                        relatedProduct.baseInfo
                                                            .listImageUrls,
                                                    ) || ''
                                                }
                                                alt={
                                                    relatedProduct.baseInfo
                                                        .productName
                                                }
                                            />
                                        </div>
                                    </div>
                                    <ProductCardContentsContainer>
                                        <ProductInfoContainer>
                                            <ProductName>
                                                {
                                                    relatedProduct.baseInfo
                                                        .productName
                                                }
                                            </ProductName>
                                            <ProductDescription>
                                                {
                                                    relatedProduct.baseInfo
                                                        .promotionText
                                                }
                                            </ProductDescription>
                                        </ProductInfoContainer>

                                        <ProductPriceContainer>
                                            <SalePrice>
                                                {KRW(
                                                    relatedProduct.price
                                                        .salePrice,
                                                )
                                                    .subtract(
                                                        relatedProduct.price
                                                            .immediateDiscountAmt,
                                                    )
                                                    .format()}
                                            </SalePrice>

                                            <ProductPrice>
                                                {KRW(
                                                    relatedProduct.price
                                                        .salePrice,
                                                ).format()}
                                            </ProductPrice>
                                        </ProductPriceContainer>
                                    </ProductCardContentsContainer>
                                </SwiperSlide>
                            );
                        },
                    )}

                <SlideButton slideButtonType='prev' ref={prevElRef} />
                <SlideButton slideButtonType='next' ref={nextElRef} />

                {/* {relatedProducts?.map((relatedProduct) => {
                    console.log(
                        '🚀 ~ file: RelatedProduct.tsx ~ line 219 ~ {relatedProducts?.map ~ relatedProduct',
                        relatedProduct,
                    );
                    return (
                        relatedProduct.data?.data && (
                            <SwiperSlide>
                                <RelatedProductBox
                                    key={
                                        relatedProduct.data?.data.baseInfo
                                            .productNo
                                    }
                                    onClick={() =>
                                        router(
                                            `/product/detail/${relatedProduct.data?.data.baseInfo.productNo}`,
                                        )
                                    }
                                >
                                    <RelatedProductImage>
                                        <img
                                            src={head(
                                                relatedProduct.data?.data
                                                    .baseInfo.imageUrls,
                                            )}
                                            alt={
                                                relatedProduct.data?.data
                                                    .baseInfo.productName
                                            }
                                        />
                                    </RelatedProductImage>
                                    <RelatedProductDesc>
                                        <RelatedProductTitle>
                                            <p>
                                                {
                                                    relatedProduct.data?.data
                                                        .baseInfo.productName
                                                }
                                            </p>
                                            <p>
                                                {
                                                    relatedProduct.data?.data
                                                        .baseInfo.promotionText
                                                }
                                            </p>
                                        </RelatedProductTitle>
                                        <RelatedProductPrice>
                                            <p>
                                                {
                                                    relatedProduct.data?.data
                                                        .price.salePrice
                                                }
                                            </p>
                                            <p>
                                                {relatedProduct.data?.data.price
                                                    .salePrice -
                                                    relatedProduct.data?.data
                                                        .price
                                                        .immediateDiscountAmt}
                                            </p>
                                        </RelatedProductPrice>
                                    </RelatedProductDesc>
                                </RelatedProductBox>
                            </SwiperSlide>
                        )
                    );
                })} */}
            </Swiper>
        </RelatedProductContainer>
    );
};

export default RelatedProduct;
