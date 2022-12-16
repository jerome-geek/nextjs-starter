import { FC } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { identity, pipe, sum, take, toArray } from '@fxts/core';

import RoundAnalysisLayout from 'components/Layout/RoundAnalysisLayout';
import media from 'utils/styles/media';
import { flex } from 'utils/styles/mixin';
import roundStats from 'mock/roundStats.json';

interface InfoProps {
    isMainTab?: boolean;
}

const StyledContainer = styled.section``;

const SectionTitle = styled.h3`
    font-size: 18px;
    letter-spacing: 0;
    color: #000000;
    font-weight: normal;
    margin-bottom: 20px;

    span {
        font-weight: light;
        letter-spacing: -0.64px;
    }
`;

const RoundList = styled.ul`
    border-top: 2px solid #222943;
    border-bottom: 2px solid #222943;
    padding: 20px 0;
    min-height: 100px;
    ${flex}
    flex-wrap: wrap;
    justify-content: space-between;
`;

const RoundListItem = styled.li`
    background-color: #f8f8fa;
    box-shadow: 2px 2px 4px #0000001a;
    padding: 24px 45px;
    margin-bottom: 10px;
    width: 49%;
    height: 100%;

    &:nth-child(2n-1) {
        margin-right: 10px;
    }

    ${media.medium} {
        width: 100%;
        margin-right: 0;

        &:nth-child(2n-1) {
            margin-right: 0;
        }
    }
`;

const NoRoundListItem = styled.li`
    font-size: 16px;
    letter-spacing: 0;
    line-height: 24px;
    color: #a8a8a8;
`;

const RoundTitle = styled.div`
    font-weight: bolder;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.64px;
    color: #191919;

    display: flex;
    justify-content: space-between;
    margin-bottom: 14px;
`;

const RoundDescription = styled.div`
    display: flex;
    justify-content: space-between;

    &:first-child {
        color: #858585;
        font-size: 14px;
    }
    &:last-child {
        letter-spacing: 0px;
        color: #191919;
        font-size: 10px;
    }
`;

const Info: FC<InfoProps> = ({ isMainTab = true }) => {
    const router = useRouter();

    const roundInfoList = pipe(roundStats.data.roundStatistics.roundInfo, (a) =>
        isMainTab ? toArray(take(4, a)) : identity(a),
    );

    console.log(router.pathname.includes('info'));

    return (
        <RoundAnalysisLayout isShow={router.pathname.includes('info')}>
            <StyledContainer>
                <SectionTitle>라운드 내역</SectionTitle>
                <RoundList>
                    {roundInfoList.length > 0 ? (
                        <>
                            {roundInfoList.map(
                                ({ no, score, clubname, date, par }) => (
                                    <RoundListItem
                                        key={no}
                                        onClick={() =>
                                            router.push(
                                                `/mypage/round-analysis/info/${no}`,
                                            )
                                        }
                                    >
                                        <RoundTitle>
                                            <p>18 Hole</p>
                                            <p>{`${sum(par)}(${
                                                sum(score) - sum(par) > 0
                                                    ? '+'
                                                    : '-'
                                            }${sum(score) - sum(par)})`}</p>
                                        </RoundTitle>
                                        <RoundDescription>
                                            <p>{clubname}</p>
                                            <p>
                                                {dayjs(date).format('YY-MM-DD')}
                                            </p>
                                        </RoundDescription>
                                    </RoundListItem>
                                ),
                            )}
                        </>
                    ) : (
                        <NoRoundListItem>
                            최근 라운드 내역이 없습니다.
                        </NoRoundListItem>
                    )}
                </RoundList>
            </StyledContainer>
        </RoundAnalysisLayout>
    );
};

export default Info;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!)),
        },
    };
};
