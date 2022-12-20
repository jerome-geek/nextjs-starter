import { GetStaticProps } from 'next';
import React, {
    KeyboardEvent,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { useQueries } from 'react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useWindowSize } from 'usehooks-ts';
import styled from 'styled-components';
import {
    concat,
    filter,
    find,
    findIndex,
    map,
    pipe,
    some,
    toArray,
} from '@fxts/core';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SectionDropdown from 'components/SectionDropdown';
import Loader from 'components/shared/Loader';
import SearchIcon from 'assets/icons/search.svg';
import MobileSearchIcon from 'assets/icons/search_mobile.svg';
import BOARD from 'const/board';
import { BoardDetail } from 'models/manage';
import { isDesktop, isMobile } from 'utils/styles/responsive';
import media from 'utils/styles/media';
import { flex, hideScrollbar } from 'utils/styles/mixin';
import { board } from 'api/manage';
import PATHS from 'const/paths';
import { useMall } from 'hooks/queries';

const FaqContainer = styled.div`
    max-width: 1060px;
    width: 100%;
    padding: 20px;
    margin: 116px auto 153px;
    ${media.small} {
        margin: 0 auto 88px;
        overflow: hidden;
    }
`;

const Title = styled.h2`
    margin: 0 0 38px;
    color: ${(props) => props.theme.text1};
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: -1.2px;

    ${media.small} {
        font-size: 2rem;
    }
`;

const FaqSearchContainer = styled.div`
    width: 100%;
    background: ${(props) => props.theme.bg2};
    padding: 20px 0;
    ${media.small} {
        width: 100vw;
        margin-left: -20px;
        padding: 15px 24px;
    }
`;

const FaqSearchBox = styled.form`
    margin: 0 auto;
    width: 408px;
    height: 44px;
    background: #fff;
    border: ${(props) => `1px solid ${props.theme.line2}`};
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${media.small} {
        width: 100%;
        height: 54px;
    }
`;

const FaqSearchInput = styled.input.attrs({ type: 'text' })`
    width: 100%;
    padding: 8px 20px;
    &::placeholder {
        font-size: 1rem;
        letter-spacing: -0.64;
        color: ${(props) => props.theme.text3};
    }
    ${media.small} {
        width: 80%;
        font-size: 1.333rem;
        &::placeholder {
            font-size: 1.333rem;
        }
    }
`;

const FaqSearchButton = styled.button`
    width: auto;
    text-align: center;
    padding: 0 10px;
    ${media.small} {
        padding: 0 20px;
    }
`;

const FaqCategoryContainer = styled.ul`
    display: flex;
    justify-content: center;
    margin: 2rem 0;
    ${media.small} {
        width: 100vw;
        justify-content: left;
        overflow: scroll;
        ${hideScrollbar}
    }
`;

const MobileFaqCategoryContainer = styled.div`
    ${media.small} {
        width: 100%;
        justify-content: flex-start;
        overflow-x: visible;
    }
`;

const FaqCategoryBox = styled.li<{ isActive?: boolean }>`
    margin-left: 30px;
    text-align: center;
    cursor: pointer;
    letter-spacing: 0;
    color: ${(props) =>
        props.isActive ? props.theme.text1 : props.theme.text2};
    text-decoration: ${(props) => (props.isActive ? 'underline' : 'none')};
    :hover {
        color: ${(props) => props.theme.text1};
    }
    &:first-child {
        margin-left: 0;
    }
    ${media.medium} {
        margin-left: 20px;
    }
    ${media.small} {
        margin-left: 8px;
        font-size: 1.333rem;
        font-weight: 400;
        letter-spacing: -0.64px;
        padding: 15px 12px;
        line-height: 24px;
        border: ${(props) => `1px solid ${props.theme.line3}`};
        white-space: nowrap;
        color: ${(props) => (props.isActive ? '#fff' : '#8f8f8f')};
        background: ${(props) =>
            props.isActive ? props.theme.secondary : '#fff'};
        text-decoration: none;
        :hover {
            color: ${(props) => (props.isActive ? '#fff' : '#8f8f8f')};
        }
    }
`;

const FaqDetailContainer = styled.div`
    border-top: ${(props) => `2px solid ${props.theme.secondary}`};
    border-bottom: ${(props) => `1px solid ${props.theme.secondary}`};
    > div {
        padding: 20px 0;
        text-align: center;
        font-size: 1.25rem;
        color: ${(props) => props.theme.text1};
        font-weight: bold;
        letter-spacing: -0.8px;
        background: ${(props) => props.theme.bg2};
    }
    > p {
        text-align: center;
        padding: 80px 0;
        color: ${(props) => props.theme.text3};
        line-height: 24px;
    }
    ${media.small} {
        > div {
            font-size: 1.666rem;
        }
        > p {
            padding: 72px 0;
            font-size: 1.333rem;
        }
    }
`;

const FaqDetailList = styled.ul``;
const FaqDetailListItem = styled.li`
    display: flex;
    padding: 32px 20px;
    border-top: ${(props) => `1px solid ${props.theme.line2}`};
    letter-spacing: -0.8px;
    > div {
        p {
            font-size: 1.25rem;
        }
    }
    ${media.small} {
        padding: 16.5px 10px;
        letter-spacing: -0.64px;
        > div {
            p {
                font-size: 1.1666rem;
            }
        }
    }
`;

const FaqDetail = styled.p`
    > p {
        font-size: 1rem !important;
        ${media.small} {
            font-size: 1.1666rem !important;
        }
    }
`;

const FaqDetailLabel = styled.p`
    color: #999;
    letter-spacing: -0.48px;
    width: 162px;
    font-size: 0.75rem;
    line-height: 30px;
    ${media.small} {
        width: auto;
        font-size: 1rem;
        white-space: nowrap;
        padding-right: 33px;
        font-size: 1.333rem;
    }
`;

const MoreViewButton = styled.button`
    display: block;
    text-align: center;
    padding: 6px 12px;
    color: #fff;
    background: ${(props) => props.theme.secondary};
    font-weight: 500;
    margin: 15px auto;
`;

const InquiryContainer = styled.div`
    ${flex}
    font-size: 1rem;
    margin: 50px auto 0;
    letter-spacing: -0.64px;
    color: ${(props) => props.theme.text1};

    p {
        margin-right: 10px;
    }
    a {
        font-weight: bold;
        text-decoration: underline;
    }
    ${media.small} {
        font-size: 1.333rem;
    }
`;

interface FaqList {
    isSelected: boolean;
    totalCount: number;
    items: BoardDetail[];
    categoryNo: number;
}

interface PageNumberList {
    categoryNo: number;
    pageNumber: number;
}

const Faq = () => {
    const [faqList, setFaqList] = useState<FaqList[]>([]);
    const [keyword, setKeyword] = useState('');
    const [pageNumberList, setPageNumberList] = useState<PageNumberList[]>([]);

    const { width } = useWindowSize();

    const { data: mallInfo } = useMall();

    const { t: faq } = useTranslation('faq');

    const faqCategoryList = useMemo(() => {
        return (
            mallInfo?.boardsCategories &&
            find(
                (a) => a.boardNo === parseInt(BOARD.FAQ),
                mallInfo.boardsCategories,
            )?.categories
        );
    }, [mallInfo?.boardsCategories]);

    useEffect(() => {
        setPageNumberList(
            faqCategoryList?.map(({ categoryNo }) => ({
                categoryNo,
                pageNumber: 1,
            })) ?? [],
        );
    }, [faqCategoryList]);

    const selectedFaq = useMemo(() => {
        return find((a) => a.isSelected, faqList);
    }, [faqList]);

    const plusPageNumber = () =>
        setPageNumberList((prev) => {
            const addedPageNumberList = pipe(
                prev,
                map((a) =>
                    a.categoryNo === selectedFaq?.categoryNo
                        ? {
                              categoryNo: a.categoryNo,
                              pageNumber: a.pageNumber + 1,
                          }
                        : a,
                ),
                toArray,
            );
            return addedPageNumberList;
        });

    const resetPageNumberList = () =>
        setPageNumberList(
            faqCategoryList?.map(({ categoryNo }) => ({
                categoryNo,
                pageNumber: 1,
            })) ?? [],
        );

    const isPageNumberMoreThan1 = some((a) => a.pageNumber > 1, pageNumberList);

    const faqListUseQueries = useQueries(
        faqCategoryList?.map(({ categoryNo }, index) => {
            return {
                queryKey: [
                    'faqCategoryList',
                    {
                        categoryNo,
                        pageNumberList: find(
                            (a) => a.categoryNo === categoryNo,
                            pageNumberList,
                        ),
                    },
                ],
                queryFn: async () =>
                    await board.getArticlesByBoardNo(BOARD.FAQ, {
                        pageNumber:
                            find(
                                (a) => a.categoryNo === categoryNo,
                                pageNumberList,
                            )?.pageNumber ?? 1,
                        pageSize: 5,
                        hasTotalCount: true,
                        categoryNo,
                        keyword,
                    }),
                onSuccess: (res: any) => {
                    setFaqList((prev) => {
                        const originItems =
                            find((a) => a.categoryNo === categoryNo, prev)
                                ?.items ?? [];

                        const addedFaqListItem: FaqList = {
                            totalCount: res.data?.totalCount,
                            isSelected: selectedFaq
                                ? selectedFaq.categoryNo === categoryNo
                                : index === 0,
                            categoryNo,
                            items: [...originItems, ...res.data.items],
                        };

                        const addedFaqList = pipe(
                            prev,
                            filter(
                                (a) =>
                                    a.categoryNo !==
                                    addedFaqListItem.categoryNo,
                            ),
                            concat([addedFaqListItem]),
                            toArray,
                        );

                        return addedFaqList;
                    });
                },
                onError: (error: any) => {
                    if (error instanceof AxiosError) {
                        alert(error.response?.data.message);
                        return;
                    }
                    alert('알수 없는 에러가 발생했습니다.');
                },
            };
        }) ?? [],
    );

    const getNoticeDetailHandler = (articleNo: number) => async () => {
        if (
            !find((a) => a.articleNo === articleNo, selectedFaq?.items ?? [])
                ?.content
        ) {
            try {
                const noticeDetail = await board.getArticleDetail(
                    BOARD.FAQ,
                    articleNo.toString(),
                );
                setFaqList((prev) => {
                    const selectedCategory = findIndex(
                        (a) => a.categoryNo === selectedFaq?.categoryNo,
                        prev,
                    );

                    const addContentsCategory = pipe(
                        prev[selectedCategory].items,
                        map((a) => {
                            if (a.articleNo === articleNo) {
                                return noticeDetail.data;
                            }
                            return a;
                        }),
                        toArray,
                    );

                    const addedContentFaqList = pipe(
                        prev,
                        map((a) => {
                            if (a.categoryNo === selectedFaq?.categoryNo) {
                                return {
                                    ...a,
                                    items: addContentsCategory,
                                };
                            }
                            return a;
                        }),
                        toArray,
                    );
                    return addedContentFaqList;
                });
            } catch (err) {
                alert(err);
            }
        }
        return;
    };

    const handleCategoryClick = (categoryNo: number) => () => {
        setFaqList((prev) =>
            pipe(
                prev,
                map((a) => ({
                    ...a,
                    isSelected: a.categoryNo === categoryNo,
                })),
                toArray,
            ),
        );
    };

    const refetchAll = useCallback(() => {
        faqListUseQueries.forEach((result) => result.refetch());
    }, [faqListUseQueries]);

    const isLoading = faqListUseQueries.some((res) => res.isLoading);

    const isMoreFaq = selectedFaq?.items.length === selectedFaq?.totalCount;

    const searchKeyword = () => {
        if (isPageNumberMoreThan1) {
            resetPageNumberList();
        } else {
            refetchAll();
        }
    };

    return (
        <>
            <NextSeo
                title={faq('faq') as string}
                description='home description'
                canonical='https://example.com'
                openGraph={{
                    url: 'https://example.com',
                }}
            />

            <FaqContainer>
                <Title>{faq('faq')}</Title>

                <FaqSearchContainer>
                    <FaqSearchBox
                        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            setFaqList([]);
                            searchKeyword();
                        }}
                        onKeyUp={(e: KeyboardEvent<HTMLFormElement>) => {
                            e.preventDefault();
                            if (e.key === 'Enter') {
                                setFaqList([]);
                                searchKeyword();
                            }
                        }}
                    >
                        <FaqSearchInput
                            placeholder={faq('searchPlaceholder') as string}
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <FaqSearchButton>
                            {isMobile(width) ? (
                                <MobileSearchIcon />
                            ) : (
                                <SearchIcon />
                            )}
                        </FaqSearchButton>
                    </FaqSearchBox>
                </FaqSearchContainer>

                <MobileFaqCategoryContainer>
                    <FaqCategoryContainer>
                        {faqCategoryList?.map(({ categoryNo, label }) => {
                            return (
                                <FaqCategoryBox
                                    isActive={
                                        categoryNo === selectedFaq?.categoryNo
                                    }
                                    key={categoryNo}
                                    onClick={handleCategoryClick(categoryNo)}
                                >
                                    {`
                                    ${isDesktop(width) ? '#' : ''}
                                    ${label} (${
                                        find(
                                            (a) => a.categoryNo === categoryNo,
                                            faqList,
                                        )?.totalCount ?? 0
                                    })
                                    `}
                                </FaqCategoryBox>
                            );
                        })}
                    </FaqCategoryContainer>
                </MobileFaqCategoryContainer>

                {isLoading ? (
                    <Loader />
                ) : (
                    <FaqDetailContainer>
                        {selectedFaq && selectedFaq.totalCount > 0 ? (
                            <>
                                <div>
                                    {faqCategoryList &&
                                        find(
                                            (categoryItem) =>
                                                categoryItem.categoryNo ===
                                                selectedFaq.categoryNo,
                                            faqCategoryList,
                                        )?.label}
                                    ({selectedFaq.totalCount})
                                </div>
                                <FaqDetailList>
                                    {selectedFaq.items.map(
                                        ({
                                            articleNo,
                                            title,
                                            content,
                                            categoryLabel,
                                        }) => (
                                            <FaqDetailListItem
                                                onClick={getNoticeDetailHandler(
                                                    articleNo,
                                                )}
                                                key={articleNo}
                                            >
                                                <FaqDetailLabel>
                                                    {categoryLabel}
                                                </FaqDetailLabel>
                                                <SectionDropdown title={title}>
                                                    <FaqDetail
                                                        dangerouslySetInnerHTML={{
                                                            __html: content,
                                                        }}
                                                    />
                                                </SectionDropdown>
                                            </FaqDetailListItem>
                                        ),
                                    )}
                                </FaqDetailList>
                            </>
                        ) : (
                            <p>{faq('noContent')}</p>
                        )}
                    </FaqDetailContainer>
                )}
                {!isMoreFaq && (
                    <MoreViewButton onClick={() => plusPageNumber()}>
                        {faq('more')}
                    </MoreViewButton>
                )}

                <InquiryContainer>
                    <p>{faq('wantMoreFaq')}</p>
                    <Link href={PATHS.INQUIRY}>{faq('inquiry')}</Link>
                </InquiryContainer>
            </FaqContainer>
        </>
    );
};

export default Faq;

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!, ['faq'])),
        },
    };
};
