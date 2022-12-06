import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import dayjs from 'dayjs';

import Loader from 'components/shared/Loader';
import LayoutResponsive from 'components/Layout/LayoutResponsive';
import { board } from 'api/manage';
import { BoardDetail, BoardDetailState } from 'models/manage';
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
    > p {
        line-height: 18px;
    }

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
    const [boardDetail, setBoardDetail] = useState<BoardDetail>();

    const router = useRouter();

    const { articleNo, boardNo } = router.query as unknown as BoardDetailState;

    useEffect(() => {
        if (!boardNo) {
            router.push(PATHS.MAIN);
        }
    }, [boardNo, router]);

    useQuery(
        [BOARD_DETAIL, articleNo],
        async () => await board.getArticleDetail(boardNo, articleNo),
        {
            onSuccess: (response) => {
                setBoardDetail(response.data);
            },
        },
    );

    return (
        <>
            <NoticeDetailContainer>
                <NoticeDetailTitle>공지사항</NoticeDetailTitle>
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
                        <NoticeContent>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: boardDetail.content,
                                }}
                            ></p>
                        </NoticeContent>
                    </NoticeContentContainer>
                ) : (
                    <Loader />
                )}

                <div style={{ textAlign: 'center' }}>
                    <StyledLink href={PATHS.NOTICE}>목록가기</StyledLink>
                </div>
            </NoticeDetailContainer>
        </>
    );
};

export default NoticeDetail;
