import { useState, useLayoutEffect } from 'react';
import { dehydrate, QueryClient } from 'react-query';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';
import { concat, head, map, omit, pipe, toArray } from '@fxts/core';

import LayoutResponsive from 'components/Layout/LayoutResponsive';
import CategoryList, { CategoryListItem } from 'components/VC/CategoryList';
import ManagerTopContent from 'components/VC/ManagerTopContent';
import ManualCard from 'components/Card/ManualCard';
import { ORDER_DIRECTION, PRODUCT_BY, PRODUCT_SALE_STATUS } from 'models';
import { ProductSearchParams } from 'models/product';
import BANNER from 'const/banner';
import PATHS from 'const/paths';
import { useBanners, useCategories, useProductList } from 'hooks/queries';
import { banner, category } from 'api/display';

const CategoriyListContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 40px 0;

    p {
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.64px;
        color: #858585;
    }
`;

const GolfCourseList = () => {
    const [categoryList, setCategoryList] = useState<CategoryListItem[]>([
        {
            categoryNo: 0,
            label: '전체보기',
            isSelected: true,
        },
    ]);

    const [searchParams, setSearchParams] = useState<ProductSearchParams>({
        pageNumber: 1,
        pageSize: 10,
        hasOptionValues: true,
        filter: {
            saleStatus: PRODUCT_SALE_STATUS.ALL_CONDITIONS,
            soldout: true,
        },
        order: {
            by: PRODUCT_BY.MD_RECOMMEND,
            direction: ORDER_DIRECTION.DESC,
        },
    });

    const { t: vc } = useTranslation('vc');

    const router = useRouter();

    const banners = useBanners({ banners: [BANNER.VC_MANUAL] });

    const categories = useCategories();

    const productList = useProductList({
        searchParams,
        options: {
            staleTime: 10000,
            cacheTime: 10000,
        },
    });

    const onCategoryClick = (categoryNo: number) => {
        setCategoryList((prev) =>
            pipe(
                prev,
                map((a) => ({ ...a, isSelected: a.categoryNo === categoryNo })),
                toArray,
            ),
        );

        setSearchParams((prev) =>
            categoryNo === 0
                ? omit(['categoryNos'] as const, prev)
                : {
                      ...prev,
                      categoryNos: categoryNo.toString(),
                  },
        );
    };

    useLayoutEffect(() => {
        if (categories.data) {
            setCategoryList((prev) =>
                pipe(
                    categories.data.multiLevelCategories,
                    map((a) => ({
                        categoryNo: a.categoryNo,
                        label: a.label,
                        isSelected: false,
                    })),
                    concat(prev),
                    toArray,
                ),
            );
        }

        return () => {
            setCategoryList([
                {
                    categoryNo: 0,
                    label: '전체보기',
                    isSelected: true,
                },
            ]);
        };
    }, [categories.data]);

    return (
        <div style={{ marginTop: '150px' }}>
            <NextSeo
                title={vc('golfCourse.request.title') as string}
                description={vc('golfCourse.request.title') as string}
            />

            {banners?.data?.[0].accounts[0].banners[0] && (
                <ManagerTopContent
                    title={banners?.data?.[0].accounts[0].banners[0].name}
                    description={
                        banners?.data?.[0].accounts[0].banners[0].description
                    }
                    imageUrl={
                        banners?.data?.[0].accounts[0].banners[0].imageUrl
                    }
                />
            )}

            <LayoutResponsive style={{ padding: 0 }}>
                <CategoriyListContainer>
                    <CategoryList
                        list={categoryList}
                        onListClick={onCategoryClick}
                    />

                    <p>{vc('golfCourse.description')}</p>
                </CategoriyListContainer>

                <div style={{ display: 'flex', marginTop: '2rem' }}>
                    <section style={{ flex: '1 1 0%' }}>
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                margin: '-1rem',
                            }}
                        >
                            {productList.data &&
                            productList?.data?.items?.length > 0 ? (
                                productList?.data.items?.map(
                                    ({ productNo, productName, imageUrls }) => (
                                        <ManualCard
                                            key={productNo}
                                            title={productName}
                                            imgUrl={head<string[]>(imageUrls)}
                                            onClick={() =>
                                                router.push(
                                                    `${PATHS.GOLF_COURSE_DETAIL}/${productNo}`,
                                                )
                                            }
                                        />
                                    ),
                                )
                            ) : (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '100%',
                                        padding: '100px',
                                    }}
                                >
                                    <p>상품이 없습니다</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </LayoutResponsive>
        </div>
    );
};

export default GolfCourseList;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(
        ['banners'],
        async () => await banner.getBanners([BANNER.VC_MANUAL]),
    );

    await queryClient.prefetchQuery(
        ['category_list'],
        async () => await category.getCategories(),
    );

    return {
        props: {
            //TODO dehydratedState: dehydrate(queryClient), 에러 수정
            ...(await serverSideTranslations(context.locale!, ['vc'])),
        },
    };
};
