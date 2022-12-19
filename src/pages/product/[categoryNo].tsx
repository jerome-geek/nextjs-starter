import { useEffect, useState, useLayoutEffect } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import styled from 'styled-components';
import { useWindowSize } from 'usehooks-ts';
import { head, map, pipe, toArray, filter, concat, slice } from '@fxts/core';

import ProductSort from 'components/Product/ProductSort';
import ProductCard from 'components/Search/ProductCard';
import { useCategory, useProductList } from 'hooks/queries';
import media from 'utils/styles/media';
import PATHS from 'const/paths';
import { PRODUCT_BY, ORDER_DIRECTION } from 'models';
import { MultiLevelCategory } from 'models/display';
import { ProductItem } from 'models/product';
import { isMobile } from 'utils/styles/responsive';
import { category } from 'api/display';
import CATEGORY from 'const/category';

interface ProductCategory {
    categoryNo: string;
    title: string;
    isActive: boolean;
}

const ProductListContainer = styled.div`
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;

    ${media.xxlarge} {
        width: calc(100% - 48px);
    }

    ${media.medium} {
        width: calc(100% - 32px);
    }

    ${media.small} {
        /* width: 380px; */
        width: calc(100% - 24px);
        margin-top: 24px;
    }
`;

const ProductListTopContainer = styled.div`
    margin-top: 150px;
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 50px;

    ${media.medium} {
        margin: 24px 0;
    }
`;

const ProductListBannerContainer = styled.div`
    max-width: 100%;
    margin-bottom: 40px;
    text-align: center;

    & img {
        max-width: 100%;
    }
`;

const ProductListDownContainer = styled.section`
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    height: auto;
    overflow: auto;
    min-height: 400px;
    justify-content: space-between;
    ${media.small} {
        justify-content: center;
    }
`;

const EmptyProductCard = styled.div`
    width: 31%;
`;

const EmptyProductListContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
        font-weight: bold;
        font-size: 20px;
    }

    ${media.medium} {
        min-height: 200px;
    }
`;

const ProductListTitle = styled.h2`
    font-size: 1.5rem;
    letter-spacing: -1.2px;
    line-height: 36px;
    font-weight: bold;
    color: #191919;

    ${media.medium} {
        font-size: 20px;
        letter-spacing: -1px;
    }
`;

const ProductCategoryListContainer = styled.div`
    ${media.small} {
        overflow-x: scroll;
    }
`;

const ProductCategoryList = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ProductCategoryListItem = styled.li<{ isActive?: boolean }>`
    flex: 1;
    margin: 0 1%;
    text-align: center;
    white-space: nowrap;
    padding-top: 10px;
    padding-bottom: 10px;
    font-size: 16px;
    color: ${({ isActive }) => (isActive ? '#fff' : '#8F8F8F')};
    background-color: ${({ isActive }) => (isActive ? '#222943' : '#fff')};
    border: ${({ isActive }) => (isActive ? '' : '1px solid #DBDBDB')};

    &:first-child {
        margin-left: 0;
    }
    &:last-child {
        margin-right: 0;
    }

    ${media.medium} {
        line-height: 24px;
        padding: 14px;
    }
`;

const ProductList = () => {
    const router = useRouter();
    const categoryNo = router.query['categoryNo'] as string;
    const [categoryInfo, setCategoryInfo] = useState<MultiLevelCategory>();

    const [productCategory, setProductCategory] = useState<ProductCategory[]>([
        {
            categoryNo,
            title: '전체보기',
            isActive: true,
        },
    ]);

    const { width } = useWindowSize();

    useCategory({
        categoryNo,
        options: {
            onSuccess: (data) => {
                setCategoryInfo(
                    pipe(
                        data?.multiLevelCategories,
                        filter((a) => a.categoryNo.toString() === categoryNo),
                        head,
                    ),
                );
            },
        },
    });

    useLayoutEffect(() => {
        const multiLevelCategories = categoryInfo?.children ?? [];

        if (multiLevelCategories?.length >= 1) {
            setProductCategory((prev) =>
                pipe(
                    multiLevelCategories,
                    map((a) => ({
                        categoryNo: a.categoryNo.toString(),
                        title: a.label,
                        isActive: false,
                    })),
                    concat(prev),
                    toArray,
                ),
            );
        }

        return () => {
            setProductCategory([
                {
                    categoryNo: categoryNo,
                    title: '전체보기',
                    isActive: true,
                },
            ]);
        };
    }, [categoryNo, categoryInfo?.children]);

    const [productSort, setProductSort] = useState([
        {
            id: 'recent',
            title: '최신순',
            by: PRODUCT_BY.RECENT_PRODUCT,
            direction: ORDER_DIRECTION.DESC,
            isActive: true,
        },
        {
            id: 'manyOrders',
            title: '주문많은순',
            by: PRODUCT_BY.POPULAR,
            direction: ORDER_DIRECTION.DESC,
            isActive: false,
        },
        {
            id: 'lowPrice',
            title: '가격낮은순',
            by: PRODUCT_BY.DISCOUNTED_PRICE,
            direction: ORDER_DIRECTION.ASC,
            isActive: false,
        },
        {
            id: 'highPrice',
            title: '가격 높은순',
            by: PRODUCT_BY.DISCOUNTED_PRICE,
            direction: ORDER_DIRECTION.DESC,
            isActive: false,
        },
    ]);

    const onProductSortClick = (id: string) => {
        setProductSort((prev) =>
            pipe(
                prev,
                map((a) => ({ ...a, isActive: a.id === id })),
                toArray,
            ),
        );

        setSearchParams((prev) => {
            const selectedproductSort = pipe(
                productSort,
                filter((a) => a.id === id),
                toArray,
                head,
            );

            return Object.assign({}, prev, {
                order: {
                    by: selectedproductSort?.by,
                    direction: selectedproductSort?.direction,
                },
            });
        });
    };

    const [searchParams, setSearchParams] = useState({
        categoryNos: categoryNo,
        pageNumber: 1,
        pageSize: 10,
        order: {
            by: PRODUCT_BY.RECENT_PRODUCT,
            direction: ORDER_DIRECTION.DESC,
        },
        hasOptionValues: true,
    });

    useEffect(() => {
        setSearchParams((prev) => {
            return { ...prev, categoryNos: categoryNo };
        });
    }, [categoryNo]);

    const onProductCategoryClick = (categoryNo: string) => {
        setProductCategory((prev) =>
            pipe(
                prev,
                map((a) => ({
                    ...a,
                    isActive: a.categoryNo === categoryNo,
                })),
                toArray,
            ),
        );
        setSearchParams((prev) => ({ ...prev, categoryNos: categoryNo }));
    };

    const { data: productList, isFetching: isProductListFetching } =
        useProductList({ searchParams });

    const isProductCountMultipleOfThreePlus2 =
        productList?.items && productList.items.length % 3 === 2;

    return (
        <>
            <ProductListContainer>
                <ProductListTopContainer>
                    <ProductListTitle>{categoryInfo?.label}</ProductListTitle>

                    <ProductSort
                        productSort={productSort}
                        onProductSortClick={onProductSortClick}
                    />
                </ProductListTopContainer>
            </ProductListContainer>

            {categoryInfo?.content && (
                <ProductListBannerContainer
                    dangerouslySetInnerHTML={{ __html: categoryInfo?.content }}
                />
            )}

            <ProductListContainer>
                <ProductCategoryListContainer>
                    <ProductCategoryList>
                        {productCategory.length > 1 &&
                            productCategory.map(
                                ({ categoryNo, isActive, title }) => (
                                    <ProductCategoryListItem
                                        key={categoryNo}
                                        isActive={isActive}
                                        onClick={() =>
                                            onProductCategoryClick(categoryNo)
                                        }
                                    >
                                        {title}
                                    </ProductCategoryListItem>
                                ),
                            )}
                    </ProductCategoryList>
                </ProductCategoryListContainer>

                <ProductListDownContainer>
                    {isProductListFetching ? (
                        <div>로딩중</div>
                    ) : productList?.totalCount === 0 ? (
                        <EmptyProductListContainer>
                            <p>등록된 상품이 없습니다.</p>
                        </EmptyProductListContainer>
                    ) : (
                        <>
                            {productList?.items.map(
                                ({
                                    productNo,
                                    productName,
                                    salePrice,
                                    listImageUrls,
                                    promotionText,
                                    immediateDiscountAmt,
                                    stickerInfos,
                                }: ProductItem) => (
                                    <ProductCard
                                        onClick={() =>
                                            router.push(
                                                `${PATHS.PRODUCT_DETAIL}/${productNo}`,
                                            )
                                        }
                                        key={productNo}
                                        imgUrl={head(listImageUrls) || ''}
                                        productName={productName}
                                        promotionText={promotionText || ''}
                                        salePrice={salePrice}
                                        immediateDiscountAmt={
                                            immediateDiscountAmt
                                        }
                                        stickerInfos={pipe(
                                            stickerInfos,
                                            slice(0, 3),
                                            toArray,
                                        )}
                                    />
                                ),
                            )}
                            {!isMobile(width) &&
                                isProductCountMultipleOfThreePlus2 && (
                                    <EmptyProductCard />
                                )}
                        </>
                    )}
                </ProductListDownContainer>
            </ProductListContainer>
        </>
    );
};

export default ProductList;

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = pipe(
        Object.values(CATEGORY),
        map((a) => ({
            params: { categoryNo: a.toString() },
            locale: 'ko',
        })),
        toArray,
    );

    return {
        paths,
        fallback: false,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery(
            ['category_info'],
            async () =>
                await category.getCategory(params?.categoryNo as string),
        ),
        queryClient.prefetchQuery(
            ['productList'],
            async () =>
                await category.getCategory(params?.categoryNo as string),
        ),
    ]);

    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
    };
};
