import { useState, useLayoutEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { concat, head, map, omit, pipe, toArray } from '@fxts/core';

import LayoutResponsive from 'components/shared/LayoutResponsive';
import InputWithIcon from 'components/Input/InputWithIcon';
import ManualCard from 'components/Card/ManualCard';
import ManagerTopContent from 'components/VC/ManagerTopContent';
import CategoryList, { CategoryListItem } from 'components/VC/CategoryList';
import { useBanners, useCategories, useProductList } from 'hooks/queries';
import { ORDER_DIRECTION, PRODUCT_BY, PRODUCT_SALE_STATUS } from 'models';
import { ProductSearchParams } from 'models/product';
import BANNER from 'const/banner';
import PATHS from 'const/paths';
import { flex } from 'utils/styles/mixin';

const CategoryListContainer = styled.form`
    ${flex}
    justify-content: space-between;
`;

const ManualList = () => {
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

    const categories = useCategories();

    const banners = useBanners({ banners: [BANNER.VC_MANUAL] });

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

    const { t: manual } = useTranslation('manual');
    const { t: vc } = useTranslation('vc');
    const router = useRouter();

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

    const keywords = useRef<HTMLInputElement>(null);

    const onSearchClick = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (keywords.current !== null) {
            setSearchParams((prev: ProductSearchParams) => ({
                ...prev,
                filter: {
                    keywords: keywords.current?.value,
                },
            }));
        }
    };

    return (
        <div style={{ marginTop: '150px' }}>
            <NextSeo title={manual('manualTitle')!} />

            {/* TODO: 보이스캐디 매뉴얼 배너 */}
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

            <LayoutResponsive
                style={{
                    marginTop: '40px',
                    marginBottom: '40px',
                    padding: 0,
                }}
            >
                <CategoryListContainer onSubmit={onSearchClick}>
                    <CategoryList
                        list={categoryList}
                        onListClick={onCategoryClick}
                    />

                    <InputWithIcon
                        placeholder={vc('manual.searchPlaceholder') as string}
                        ref={keywords}
                    />
                </CategoryListContainer>

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
                                                    `${PATHS.MANUAL_DETAIL}/${productNo}`,
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
                                    <p>{vc('manual.noContent')}</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </LayoutResponsive>
        </div>
    );
};

export default ManualList;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!, [
                'manual',
                'vc',
            ])),
        },
    };
};
