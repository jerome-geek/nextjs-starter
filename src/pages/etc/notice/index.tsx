import { useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import { map, pipe, filter, toArray, head } from '@fxts/core';
import { useWindowSize } from 'usehooks-ts';

import LayoutResponsive from 'components/Layout/LayoutResponsive';
import Paging from 'components/Common/Paging';
import { board } from 'api/manage';
import { ORDER_DIRECTION } from 'models';
import { BoardListItem } from 'models/manage';
import * as queryKeys from 'const/queryKeys';
import { isMobile } from 'utils/styles/responsive';
import media from 'utils/styles/media';
import PATHS from 'const/paths';
import BOARD from 'const/board';

const NoticeContainer = styled(LayoutResponsive)`
    text-align: left;
`;

const CommunicationSection = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2px solid #dbdbdb;
    border-bottom: 2px solid #dbdbdb;
    padding: 15px 20px;
    margin-bottom: 20px;

    > p {
        color: #191919;
        font-weight: medium;
        font-size: 16px;
        letter-spacing: 0;
        line-height: 24px;
    }

    ${media.medium} {
        border-top: 2px solid #222943;
        border-bottom: 2px solid #222943;
        padding: 22px 20px;

        > p {
            font-weight: bold;
            font-size: 14px;
            line-height: 20px;
        }
    }
`;

const NoticeTitle = styled.h2`
    font-weight: bold;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: -1.2px;
    color: #191919;
    margin-bottom: 24px;

    ${media.medium} {
        font-size: 20px;
        letter-spacing: -1px;
        line-height: 30px;
    }
`;

const NoticeCategoryList = styled.ul`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-top: 1px solid #dbdbdb;
    border-bottom: 1px solid #dbdbdb;
    margin-bottom: 20px;
`;

const NoticeCategoryListItem = styled.li<{ $isActive?: boolean }>`
    padding-top: 15px;
    padding-bottom: 15px;
    width: 100%;
    text-align: center;
    color: #8f8f8f;

    ${(props) =>
        props.$isActive &&
        css`
            background-color: #f8f8fa;
            color: #191919;
        `};
`;

const NoticeList = styled.ul`
    border-top: 2px solid #222943;
    border-bottom: 2px solid #222943;
    margin-bottom: 40px;

    ${media.medium} {
        margin-bottom: 24px;
    }
`;

const NoticeListItemTitle = styled.li`
    background-color: #f8f8fa;
    padding-top: 20px;
    padding-bottom: 20px;

    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0;
    color: #191919;

    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;

    & > p:nth-child(1) {
        flex: 1;
    }
    & > p:nth-child(2) {
        flex: 2;
    }
    & > p:nth-child(3) {
        flex: 1;
    }
`;

const NoticeListItem = styled.li`
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;

    &:not(:last-of-type) {
        border-bottom: 1px solid #dbdbdb;
    }

    & > p:nth-child(1) {
        flex: 1;
        font-size: 12px;
        line-height: 18px;
        letter-spacing: 0;
        color: #999999;
    }
    & > p:nth-child(2) {
        flex: 2;
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.64px;
        color: #858585;
    }
    & > p:nth-child(3) {
        flex: 1;
        font-size: 10px;
        line-height: 16px;
        letter-spacing: 0;
        color: #191919;
    }
`;

const Notice = () => {
    const { t: notice } = useTranslation('notice');

    const [boardListParams, setBoardListParams] = useState({
        pageNumber: 1,
        pageSize: 1,
        hasTotalCount: true,
        direction: ORDER_DIRECTION.ASC,
        categoryNo: 0,
    });
    const [totalPageNumber, setTotalPageNumber] = useState(1);
    const [boardCategoryList, setBoardCategoryList] = useState<
        {
            categoryNo: number;
            label: string;
            isActive: boolean;
        }[]
    >([]);
    const [boardList, setBoardList] = useState<BoardListItem[]>([]);

    useQuery(
        [queryKeys.BOARD_CATEGORY],
        async () => await board.getCategories(BOARD.NOTICE),
        {
            select: ({ data }) =>
                pipe(
                    data,
                    map((a) => ({
                        ...a,
                        isActive: data[0].categoryNo === a.categoryNo,
                    })),
                    toArray,
                ),
            onSuccess: (data) => {
                setBoardCategoryList(data);

                const activeCategory = pipe(
                    data,
                    filter((a) => a.isActive),
                    head,
                );

                if (activeCategory) {
                    setBoardListParams((prev) => ({
                        ...prev,
                        categoryNo: activeCategory.categoryNo,
                    }));
                }
            },
        },
    );

    useQuery(
        [queryKeys.BOARD_LIST, boardListParams],
        async () =>
            await board.getArticlesByBoardNo(BOARD.NOTICE, {
                ...boardListParams,
            }),
        {
            enabled: boardListParams.categoryNo !== 0,
            keepPreviousData: true,
            select: ({ data }) => data,
            onSuccess: (data) => {
                setBoardList(data.items);

                if (data.items.length > 0) {
                    setTotalPageNumber(
                        data.totalCount % boardListParams.pageSize === 0
                            ? data.totalCount / boardListParams.pageSize
                            : Math.floor(
                                  data.totalCount / boardListParams.pageSize,
                              ) + 1,
                    );
                }
            },
        },
    );

    const { width } = useWindowSize();

    const router = useRouter();

    const onNoticeCategoryListItemClick = (categoryNo: number) => {
        setBoardCategoryList((prev) =>
            pipe(
                prev,
                map((a) => ({
                    ...a,
                    isActive: a.categoryNo === categoryNo,
                })),
                toArray,
            ),
        );

        setBoardListParams((prev) => ({
            ...prev,
            categoryNo,
            pageNumber: 1,
        }));
        setTotalPageNumber(1);
    };

    return (
        <>
            <NextSeo title={notice('notice') as string} />
            <NoticeContainer>
                <NoticeTitle>{notice('notice')}</NoticeTitle>

                <NoticeCategoryList>
                    {boardCategoryList.map(
                        ({ label, categoryNo, isActive }) => (
                            <NoticeCategoryListItem
                                key={categoryNo}
                                $isActive={isActive}
                                onClick={() =>
                                    onNoticeCategoryListItemClick(categoryNo)
                                }
                            >
                                {label}
                            </NoticeCategoryListItem>
                        ),
                    )}
                </NoticeCategoryList>

                <CommunicationSection>
                    <p>
                        {isMobile(width)
                            ? notice('communication')
                            : `${notice('ir')} / ${notice('communication')}`}
                    </p>

                    <p
                        dangerouslySetInnerHTML={{
                            __html: isMobile(width)
                                ? '<b>소속</b> 경영기획팀 | <b>담당자</b> 이관형 팀장'
                                : '<b>소속</b> 경영기획팀 | <b>담당자</b> 이관형 팀장 | <b>연락처</b> 070-4820-2160 | <b>E-Mail</b> ghlee@vcinc.co.kr',
                        }}
                    />
                </CommunicationSection>

                <NoticeList>
                    <NoticeListItemTitle>
                        <p>{notice('no')}</p>
                        <p>{notice('title')}</p>
                        <p>{notice('regDt')}</p>
                    </NoticeListItemTitle>
                    {boardList.length > 0 ? (
                        boardList.map(({ articleNo, title, registerYmdt }) => (
                            <NoticeListItem
                                key={articleNo}
                                onClick={() =>
                                    router.push({
                                        pathname: `${PATHS.NOTICE}/${articleNo}`,
                                        query: {
                                            articleNo,
                                            boardNo: BOARD.NOTICE,
                                        },
                                    })
                                }
                            >
                                <p>{articleNo}</p>
                                <p>{title}</p>
                                <p>{dayjs(registerYmdt).format('YY-MM-DD')}</p>
                            </NoticeListItem>
                        ))
                    ) : (
                        <li
                            style={{
                                textAlign: 'center',
                                minHeight: '60px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <p>{notice('noContent')}</p>
                        </li>
                    )}
                </NoticeList>

                <Paging
                    currentPage={boardListParams.pageNumber}
                    totalPage={totalPageNumber}
                    onFirstClick={() =>
                        setBoardListParams((prev) => ({
                            ...prev,
                            pageNumber: 1,
                        }))
                    }
                    onBeforeClick={() =>
                        setBoardListParams((prev) => ({
                            ...prev,
                            pageNumber:
                                prev.pageNumber <= 1 ? 1 : prev.pageNumber--,
                        }))
                    }
                    onNextClick={() =>
                        setBoardListParams((prev) => ({
                            ...prev,
                            pageNumber:
                                prev.pageNumber >= totalPageNumber
                                    ? prev.pageNumber
                                    : prev.pageNumber++,
                        }))
                    }
                    onEndClick={() =>
                        setBoardListParams((prev) => ({
                            ...prev,
                            pageNumber: totalPageNumber,
                        }))
                    }
                />
            </NoticeContainer>
        </>
    );
};

export default Notice;

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!, ['notice'])),
        },
        revalidate: 10,
    };
};
