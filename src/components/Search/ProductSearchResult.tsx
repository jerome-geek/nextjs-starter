import { Dispatch, FC, SetStateAction, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { head } from '@fxts/core';

import SearchResultLayout from 'components/Layout/SearchResultLayout';
import ProductCard from 'components/Search/ProductCard';
import { ProductItem, ProductSearchParams } from 'models/product';

interface ProductSearchResultProps {
    productListTotalCount: number;
    productList: ProductItem[];
    productListSearchCondition: ProductSearchParams;
    setProductListSearchCondition: Dispatch<
        SetStateAction<ProductSearchParams>
    >;
}

const ProductListContainer = styled.section`
    margin: 40px 0;
    display: flex;
    flex-wrap: wrap;
    height: auto;
    overflow: auto;
    min-height: 400px;
`;

const ProductSearchResult: FC<ProductSearchResultProps> = ({
    productList,
    productListTotalCount,
    productListSearchCondition,
    setProductListSearchCondition,
}) => {
    const [totalPageNumber, setTotalPageNumber] = useState(0);

    useLayoutEffect(() => {
        if (productListSearchCondition?.pageSize) {
            setTotalPageNumber(
                productListTotalCount % productListSearchCondition.pageSize ===
                    0
                    ? productListTotalCount /
                          productListSearchCondition.pageSize
                    : Math.floor(
                          productListTotalCount /
                              productListSearchCondition.pageSize,
                      ) + 1,
            );
        }
    }, [productListTotalCount, productListSearchCondition?.pageSize]);

    return (
        <>
            {productListSearchCondition && (
                <SearchResultLayout
                    currentPage={productListSearchCondition?.pageNumber || 1}
                    totalPage={totalPageNumber}
                    onFirstClick={() =>
                        setProductListSearchCondition((prev) => ({
                            ...prev,
                            pageNumber: 1,
                        }))
                    }
                    onBeforeClick={() =>
                        setProductListSearchCondition((prev) => ({
                            ...prev,
                            pageNumber:
                                prev.pageNumber &&
                                (prev.pageNumber <= 1 ? 1 : prev.pageNumber--),
                        }))
                    }
                    onNextClick={() => {
                        setProductListSearchCondition((prev) => ({
                            ...prev,
                            pageNumber:
                                prev.pageNumber &&
                                (prev.pageNumber >= totalPageNumber
                                    ? prev.pageNumber
                                    : prev.pageNumber++),
                        }));
                    }}
                    onEndClick={() =>
                        setProductListSearchCondition((prev) => ({
                            ...prev,
                            pageNumber: totalPageNumber,
                        }))
                    }
                >
                    <ProductListContainer>
                        {productList?.length > 0 ? (
                            productList.map((product) => {
                                return (
                                    <ProductCard
                                        key={product.productNo}
                                        imgUrl={
                                            head(product.listImageUrls) || ''
                                        }
                                        productName={product.productName}
                                        promotionText={
                                            product.promotionText || ''
                                        }
                                        salePrice={product.salePrice}
                                        immediateDiscountAmt={
                                            product.immediateDiscountAmt
                                        }
                                    />
                                );
                            })
                        ) : (
                            <div
                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                    minHeight: '60px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <p>검색결과가 없습니다.</p>
                            </div>
                        )}
                    </ProductListContainer>
                </SearchResultLayout>
            )}
        </>
    );
};

export default ProductSearchResult;
