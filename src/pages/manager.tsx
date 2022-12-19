import { useState, useMemo, useLayoutEffect } from 'react';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import { concat, head, map, omit, pipe, toArray } from '@fxts/core';
import { useWindowSize } from 'usehooks-ts';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import LayoutResponsive from 'components/Layout/LayoutResponsive';
import PrimaryButton from 'components/Button/PrimaryButton';
import ManualCard from 'components/Card/ManualCard';
import ManagerTopContent from 'components/VC/ManagerTopContent';
import CategoryList, { CategoryListItem } from 'components/VC/CategoryList';
import { useBanners, useCategories, useProductList } from 'hooks/queries';
import PATHS from 'const/paths';
import BANNER from 'const/banner';
import { isDesktop } from 'utils/styles/responsive';
import { ORDER_DIRECTION, PRODUCT_BY, PRODUCT_SALE_STATUS } from 'models';
import { ProductItem, ProductSearchParams } from 'models/product';
import MacIcon from 'assets/icons/mac.svg';
import WindowsIcon from 'assets/icons/windows.svg';

const MobileTitle = styled.h2`
    font-size: 20px;
    line-height: 30px;
    letter-spacing: -1px;
    color: #191919;
    text-align: center;
`;

const StyledLink = styled(Link)`
    width: 100%;
    font-weight: bold;
    font-size: 16px;
    white-space: nowrap;
    letter-spacing: -0.98px;
    color: #191919;
    border: 1px solid #dbdbdb;
    text-align: center;
    line-height: 54px;
    min-height: 54px;
    position: absolute;
    bottom: 0;
`;

const CategoriyListContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 40px;

    p {
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.64px;
        color: #858585;
    }
`;

const DownloadButton = styled(PrimaryButton)`
    svg {
        margin-right: 16px;
    }
`;

const Manager = () => {
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

    const { width } = useWindowSize();

    const isPageAvailable = useMemo(() => isDesktop(width), [width]);

    const { t: manager } = useTranslation('manager');
    const { t: vc } = useTranslation('vc');

    const onMacDownload = () => {
        if (isPageAvailable) {
            alert('맥 OS 다운로드입니다');
        }
    };

    const onWindowsDownload = () => {
        if (isPageAvailable) {
            alert('윈도우 OS 다운로드입니다');
        }
    };

    const banners = useBanners({ banners: [BANNER.VC_MANAGER] });

    const categories = useCategories({
        options: {
            enabled: isPageAvailable,
        },
    });

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

    return (
        <div style={{ marginTop: '150px' }}>
            {/* <SEOHelmet data={{ title: manager('managerTitle') }} /> */}
            <NextSeo title={vc('manager.title') as string} />

            {banners?.data?.[0].accounts[0].banners[0] && (
                <ManagerTopContent
                    title={banners?.data?.[0].accounts[0].banners[0].name}
                    description={
                        banners?.data?.[0].accounts[0].banners[0].description
                    }
                    link={banners?.data?.[0].accounts[0].banners[0].landingUrl}
                    imageUrl={
                        banners?.data?.[0].accounts[0].banners[0].imageUrl
                    }
                />
            )}

            <LayoutResponsive style={{ marginTop: '40px', padding: 0 }}>
                {isDesktop(width) ? (
                    <>
                        <CategoriyListContainer>
                            <CategoryList
                                list={categoryList}
                                onListClick={onCategoryClick}
                            />

                            <p>{vc('manager.onlyUsePc')}</p>
                        </CategoriyListContainer>

                        <div style={{ display: 'flex', marginTop: '2rem' }}>
                            <main style={{ flex: '1 1 0%' }}>
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
                                        productList.data.items.map(
                                            ({
                                                productNo,
                                                imageUrls,
                                                productName,
                                            }: ProductItem) => (
                                                <ManualCard
                                                    key={productNo}
                                                    title={productName}
                                                    imgUrl={head<string[]>(
                                                        imageUrls,
                                                    )}
                                                >
                                                    <div>
                                                        <DownloadButton
                                                            onClick={
                                                                onMacDownload
                                                            }
                                                        >
                                                            <MacIcon />
                                                            <span>
                                                                {vc(
                                                                    'manager.macDownload',
                                                                )}
                                                            </span>
                                                        </DownloadButton>
                                                        <DownloadButton
                                                            onClick={
                                                                onWindowsDownload
                                                            }
                                                        >
                                                            <WindowsIcon />
                                                            <span>
                                                                {vc(
                                                                    'manager.windowsDownload',
                                                                )}
                                                            </span>
                                                        </DownloadButton>
                                                    </div>
                                                </ManualCard>
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
                                            <p>{manager('noContents')}</p>
                                        </div>
                                    )}
                                </div>
                            </main>
                        </div>
                    </>
                ) : (
                    <div
                        style={{
                            whiteSpace: 'pre-line',
                            height: '60vh',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            position: 'relative',
                        }}
                    >
                        <MobileTitle>{vc('manager.onlyUsePc')}</MobileTitle>
                        <StyledLink href={{ pathname: PATHS.MAIN }}>
                            {manager('goToMain')}
                        </StyledLink>
                    </div>
                )}
            </LayoutResponsive>
        </div>
    );
};

export default Manager;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!, ['vc'])),
        },
    };
};
