import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { GetStaticPaths, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import Loader from 'components/shared/Loader';
import LayoutResponsive from 'components/Layout/LayoutResponsive';
import { board } from 'api/manage';
import { BoardDetail } from 'models/manage';
import { BOARD_DETAIL } from 'const/queryKeys';
import PATHS from 'const/paths';
import media from 'utils/styles/media';

const NoticeDetailContainer = styled(LayoutResponsive)`
    max-width: 840px;
    text-align: left;
`;

const NoticeDetailTitle = styled.h2`
    font-weight: bold;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: -1.2px;
    margin-bottom: 24px;

    ${media.medium} {
        font-size: 20px;
        line-height: 30px;
        letter-spacing: -1px;
        color: #191919;
    }
`;

const NoticeContentContainer = styled.div`
    border-top: 2px solid #222943;
    border-bottom: 2px solid #222943;
    margin-bottom: 40px;
`;

const NoticeContentTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #dbdbdb;
    letter-spacing: 0;
    color: #191919;

    > h3 {
        font-weight: medium;
        font-size: 16px;
        line-height: 24px;
    }

    > span {
        font-weight: lighter;
        font-size: 10px;
        line-height: 16px;
    }
`;

const NoticeContent = styled.div`
    padding: 30px 20px;
    line-height: 1.5rem;

    ${media.medium} {
        padding: 20px 10px;
    }
`;

const StyledLink = styled(Link)`
    border: 1px solid #dbdbdb;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    max-width: 440px;
    display: block;
    margin: 0 auto;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0px;

    ${media.medium} {
        padding-top: 15px;
        padding-bottom: 15px;
        font-weight: bold;
        letter-spacing: -0.64px;
    }
`;

const NoticeDetail = () => {
    const { t: notice } = useTranslation('notice');

    const [boardDetail, setBoardDetail] = useState<BoardDetail>();

    const router = useRouter();

    const { articleNo, boardNo } = router.query as {
        articleNo: string;
        boardNo: string;
    };

    useEffect(() => {
        if (!boardNo) {
            router.push(PATHS.MAIN);
        }
    }, [boardNo, router]);

    useQuery(
        [BOARD_DETAIL, articleNo, articleNo],
        async () => await board.getArticleDetail(boardNo, articleNo),
        {
            onSuccess: (response) => {
                setBoardDetail(response.data);
            },
        },
    );

    return (
        <>
            <NextSeo title={notice('notice') as string} />
            <NoticeDetailContainer>
                <NoticeDetailTitle>{notice('notice')}</NoticeDetailTitle>
                {boardDetail ? (
                    <NoticeContentContainer>
                        <NoticeContentTitleContainer>
                            <h3> {boardDetail.title}</h3>
                            <span>
                                {dayjs(boardDetail.registerYmdt).format(
                                    'YY-MM-DD',
                                )}
                            </span>
                        </NoticeContentTitleContainer>
                        <NoticeContent
                            dangerouslySetInnerHTML={{
                                __html: boardDetail.content,
                            }}
                        />
                    </NoticeContentContainer>
                ) : (
                    <Loader />
                )}

                <div style={{ textAlign: 'center' }}>
                    <StyledLink href={PATHS.NOTICE}>
                        {notice('goToList')}
                    </StyledLink>
                </div>
            </NoticeDetailContainer>
        </>
    );
};

export default NoticeDetail;

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking', //indicates the type of fallback
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!, ['notice'])),
        },
    };
};
