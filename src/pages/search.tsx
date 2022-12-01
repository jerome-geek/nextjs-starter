import { useState, useMemo, useEffect, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useQueries } from 'react-query';
import { filter, head, map, pipe, some, toArray } from '@fxts/core';
import styled, { css } from 'styled-components';
import { useWindowSize } from 'usehooks-ts';

import LayoutResponsive from 'components/Layout/LayoutResponsive';
import FlexContainer from 'components/Common/FlexContainer';
import InputWithIcon from 'components/Input/InputWithIcon';
import ProductSearchResult from 'components/Search/ProductSearchResult';
// import ManualSearchResult from 'components/Search/ManualSearchResult';
// import NoticeSearchResult from 'components/Search/NoticeSearchResult';
// import GolfCourseSearchResult from 'components/Search/GolfCourseSearchResult';
import BOARD from 'const/board';
import BREAKPOINTS from 'const/breakpoints';
import { board } from 'api/manage';
import { product } from 'api/product';
import media from 'utils/styles/media';
import {
    ArticleParams,
    BoardListItem as BoardListItemModel,
} from 'models/manage';
import { ProductItem, ProductSearchParams } from 'models/product';
import { ORDER_DIRECTION } from 'models';
import { GetServerSideProps } from 'next';

const SearchContainer = styled(LayoutResponsive)``;

const SearchResultSummary = styled.form`
    width: 100%;
    background-color: #f8f8fa;
    padding: 60px 0;
    margin-bottom: 40px;

    ${media.small} {
        background-color: #fff;
    }
`;

const SearchResultTitle = styled.p`
    font-size: 32px;
    line-height: 48px;
    text-align: center;
    letter-spacing: 0px;
    margin-bottom: 40px;

    ${media.small} {
        font-size: 20px;
        line-height: 28px;
        text-align: left;
        letter-spacing: -1px;
    }
`;

const SearchResultkeywords = styled.span`
    font-weight: bold;
    color: #191919;
`;

const SearchResultCount = styled.span`
    color: #c00020;
`;

const SearchFilter = styled.ul`
    display: flex;
`;

const SearchFilterItem = styled.li<{ isActive: boolean }>`
    color: ${(props) => (props.isActive ? '#191919' : '#8F8F8F')};
    cursor: pointer;
    ${(props) =>
        props.isActive &&
        css`
            text-decoration: underline;
            font-weight: bold;
        `};
    :not(:last-child) {
        margin-right: 40px;
    }
`;

const SearchResultContainer = styled.div``;

const Search = () => {
    const router = useRouter();
    const { keywords } = router.query as { keywords: string };
    console.log(
        '🚀 ~ file: search.tsx ~ line 94 ~ Search ~ keywords',
        keywords,
    );

    const [query, setQuery] = useState('');
    const onInputChange = ({
        target: { value },
    }: ChangeEvent<HTMLInputElement>) => setQuery(value);

    const [productListTotalCount, setProductListTotalCount] = useState(0);
    const [productList, setProductList] = useState<ProductItem[]>([]);
    const [productListSearchCondition, setProductListSearchCondition] =
        useState<ProductSearchParams>({
            filter: {
                keywords: keywords,
            },
            order: {
                direction: ORDER_DIRECTION.DESC,
            },
            hasTotalCount: true,
            pageNumber: 1,
            pageSize: 10,
        });

    const [manualListTotalCount, setManualListTotalCount] = useState(0);
    const [manualList, setManualList] = useState<BoardListItemModel[]>([]);
    const [manualListSearchCondition, setManualListSearchCondition] =
        useState<ArticleParams>({
            keyword: keywords,
            direction: ORDER_DIRECTION.DESC,
            pageNumber: 1,
            pageSize: 10,
            hasTotalCount: true,
        });

    const [noticeListTotalCount, setNoticeListTotalCount] = useState(0);
    const [noticeList, setNoticeList] = useState<BoardListItemModel[]>([]);
    const [noticeSearchListCondition, setNoticeSearchListCondition] =
        useState<ArticleParams>({
            keyword: keywords,
            direction: ORDER_DIRECTION.DESC,
            pageNumber: 1,
            pageSize: 10,
            hasTotalCount: true,
        });

    const [golfCourseListTotalCount, setGolfCourseListTotalCount] = useState(0);
    const [golfCourseList, setGolfCourseList] = useState([]);

    const [searchTab, setSearchTab] = useState<Tab[]>([
        { key: 'product', name: '상품', isActive: true },
        { key: 'manual', name: '매뉴얼', isActive: false },
        { key: 'notice', name: '공지사항', isActive: false },
        { key: 'golfCourse', name: '지원골프코스', isActive: false },
    ]);

    const [orderTab, setOrderTab] = useState<Tab[]>([
        { key: ORDER_DIRECTION.DESC, name: '최신순', isActive: true },
        { key: ORDER_DIRECTION.ASC, name: '오래된 순', isActive: false },
    ]);

    useEffect(() => {
        setProductListSearchCondition((prev) => ({
            ...prev,
            filter: {
                keywords,
            },
        }));
        setManualListSearchCondition((prev) => ({
            ...prev,
            keyword: keywords,
        }));
        setNoticeSearchListCondition((prev) => ({
            ...prev,
            keyword: keywords,
        }));
    }, [keywords]);

    const activeTab = useMemo(() => {
        return pipe(
            searchTab,
            filter((a) => a.isActive),
            toArray,
            head,
        );
    }, [searchTab]);

    const onSearchTabClick = (key: string) => {
        setSearchTab((prev) =>
            pipe(
                prev,
                map((a) => ({ ...a, isActive: a.key === key })),
                toArray,
            ),
        );
    };

    const onOrderTabClick = (key: ORDER_DIRECTION) => {
        setOrderTab((prev) =>
            pipe(
                prev,
                map((a) => ({ ...a, isActive: a.key === key })),
                toArray,
            ),
        );

        if (activeTab?.key === 'product') {
            setProductListSearchCondition((prev) => ({
                ...prev,
                order: { direction: key },
            }));
        }
        if (activeTab?.key === 'manual') {
            setManualListSearchCondition((prev) => ({
                ...prev,
                direction: key,
            }));
        }
        if (activeTab?.key === 'notice') {
            setNoticeSearchListCondition((prev) => ({
                ...prev,
                direction: key,
            }));
        }
    };

    const results = useQueries([
        {
            queryKey: [
                'noticeList',
                {
                    ...noticeSearchListCondition,
                },
            ],
            keepPreviousData: true,
            queryFn: async () =>
                await board.getArticlesByBoardNo(BOARD.NOTICE, {
                    ...noticeSearchListCondition,
                }),
            onSuccess: (response: any) => {
                setNoticeListTotalCount(response.data.totalCount);
                setNoticeList(response.data.items);
            },
        },
        {
            queryKey: [
                'manualList',
                {
                    ...manualListSearchCondition,
                },
            ],
            keepPreviousData: true,
            queryFn: async () =>
                await board.getArticlesByBoardNo(BOARD.MANUAL, {
                    ...manualListSearchCondition,
                }),
            onSuccess: (response: any) => {
                setManualListTotalCount(response.data.totalCount);
                setManualList(response.data.items);
            },
        },
        {
            queryKey: ['productList', { ...productListSearchCondition }],
            queryFn: async () =>
                await product.searchProducts({
                    ...productListSearchCondition,
                }),
            keepPreviousData: true,
            onSuccess: (response: any) => {
                setProductListTotalCount(response.data.totalCount);
                setProductList(response.data.items);
            },
        },
    ]);

    const isLoading = useMemo(
        () => some((result) => result.isLoading, results),
        [results],
    );

    const getSearchListLength = (key?: string) => {
        switch (key) {
            case 'product':
                return productListTotalCount;
            case 'manual':
                return manualListTotalCount;
            case 'notice':
                return noticeListTotalCount;
            case 'golfCourse':
                return golfCourseListTotalCount;
            default:
                return (
                    productListTotalCount +
                    manualListTotalCount +
                    noticeListTotalCount +
                    golfCourseListTotalCount
                );
        }
    };

    const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setProductListSearchCondition((prev: ProductSearchParams) => ({
            ...prev,
            filter: { keywords: query },
        }));
        setManualListSearchCondition((prev) => ({
            ...prev,
            keyword: query,
        }));
        setNoticeSearchListCondition((prev) => ({
            ...prev,
            keyword: query,
        }));

        router.replace({
            pathname: `/search?keywords=${query}`,
        });
    };

    const { width } = useWindowSize();

    return (
        <>
            <SearchContainer>
                <SearchResultSummary onSubmit={onSubmitHandler}>
                    <SearchResultTitle>
                        <SearchResultkeywords>
                            {`'${keywords}'`}
                        </SearchResultkeywords>
                        에 대한&nbsp;
                        <SearchResultCount>
                            {getSearchListLength()}
                        </SearchResultCount>
                        개의
                        {width <= BREAKPOINTS.SMALL && <br />}통합
                        검색결과입니다.
                    </SearchResultTitle>
                    <InputWithIcon
                        placeholder='검색어를 입력해주세요.'
                        name='keywords'
                        containerProps={{
                            style: {
                                borderLeft: 0,
                                borderRight: 0,
                                borderTop: 0,
                                width: '60%',
                                margin: '0 auto',
                            },
                        }}
                        onChange={onInputChange}
                    />

                    <FlexContainer style={{ display: 'none' }}>
                        <SearchFilter>
                            {searchTab?.map(({ key, name, isActive }) => {
                                return (
                                    <SearchFilterItem
                                        key={key}
                                        onClick={() => onSearchTabClick(key)}
                                        isActive={isActive}
                                    >{`${name}(${getSearchListLength(
                                        key,
                                    )})`}</SearchFilterItem>
                                );
                            })}
                        </SearchFilter>
                        <SearchFilter>
                            {orderTab?.map(({ key, name, isActive }) => {
                                return (
                                    <SearchFilterItem
                                        key={key}
                                        onClick={() =>
                                            onOrderTabClick(
                                                key as ORDER_DIRECTION,
                                            )
                                        }
                                        isActive={isActive}
                                    >
                                        {name}
                                    </SearchFilterItem>
                                );
                            })}
                        </SearchFilter>
                    </FlexContainer>
                </SearchResultSummary>

                <SearchResultContainer>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <SearchFilter>
                                    {searchTab?.map(
                                        ({ key, name, isActive }) => {
                                            return (
                                                <SearchFilterItem
                                                    key={key}
                                                    onClick={() =>
                                                        onSearchTabClick(key)
                                                    }
                                                    isActive={isActive}
                                                >{`${name}(${getSearchListLength(
                                                    key,
                                                )})`}</SearchFilterItem>
                                            );
                                        },
                                    )}
                                </SearchFilter>
                                <SearchFilter>
                                    {orderTab?.map(
                                        ({ key, name, isActive }) => {
                                            return (
                                                <SearchFilterItem
                                                    key={key}
                                                    onClick={() =>
                                                        onOrderTabClick(
                                                            key as ORDER_DIRECTION,
                                                        )
                                                    }
                                                    isActive={isActive}
                                                >
                                                    {name}
                                                </SearchFilterItem>
                                            );
                                        },
                                    )}
                                </SearchFilter>
                            </div>

                            {activeTab?.key === 'product' && (
                                <ProductSearchResult
                                    productListTotalCount={
                                        productListTotalCount
                                    }
                                    productList={productList}
                                    productListSearchCondition={
                                        productListSearchCondition
                                    }
                                    setProductListSearchCondition={
                                        setProductListSearchCondition
                                    }
                                />
                            )}
                            {/* 
                            {activeTab?.key === 'manual' && (
                                <ManualSearchResult
                                    manualListTotalCount={manualListTotalCount}
                                    manualList={manualList}
                                    manualListSearchCondition={
                                        manualListSearchCondition
                                    }
                                    setManualListSearchCondition={
                                        setManualListSearchCondition
                                    }
                                />
                            )}
                            {activeTab?.key === 'notice' && (
                                <NoticeSearchResult
                                    noticeListTotalCount={noticeListTotalCount}
                                    noticeList={noticeList}
                                    noticeSearchListCondition={
                                        noticeSearchListCondition
                                    }
                                    setNoticeSearchListCondition={
                                        setNoticeSearchListCondition
                                    }
                                />
                            )}
                            {activeTab?.key === 'golfCourse' && (
                                <GolfCourseSearchResult
                                    golfCourseListTotalCount={
                                        golfCourseListTotalCount
                                    }
                                    golfCourseList={golfCourseList}
                                />
                            )} */}
                        </>
                    )}
                </SearchResultContainer>
            </SearchContainer>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    // Fetch data from external API
    const proto =
        context.req.headers['x-forwarded-proto'] ||
        context.req.connection.encrypted
            ? 'https'
            : 'http';
    console.log(
        '🚀 ~ file: search.tsx ~ line 485 ~ constgetServerSideProps:GetServerSideProps= ~ proto',
        proto,
    );

    // const reqUrl = context.req.headers['referer'];
    // const url = new URL(reqUrl);

    console.log('====================================');
    console.log(proto); // http
    console.log('====================================');

    // const res = await fetch(`${origin}/api/projets`)
    // const data = await res.json()

    // Pass data to the page via props
    return { props: { proto } };
};

export default Search;
