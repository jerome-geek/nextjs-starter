import { FC, useState, useLayoutEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useRouter } from 'next/router';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import { filter, head, isEmpty, map, pipe, toArray } from '@fxts/core';

import RoundAnalysisLayout from 'components/Layout/RoundAnalysisLayout';
import media from 'utils/styles/media';
import { flex } from 'utils/styles/mixin';
import roundStats from 'mock/roundStats.json';

interface StatisticsProps {
    isMainTab?: boolean;
}

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
);

const StyledContainer = styled.section`
    margin-bottom: 20px;

    ${media.medium} {
        margin-bottom: 60px;
    }
`;

const Title = styled.h3`
    font-size: 18px;
    letter-spacing: 0;
    color: #000000;
    font-weight: normal;
    margin-bottom: 20px;

    span {
        font-size: 16px;
        margin-left: 10px;
        font-weight: 200;
        letter-spacing: -0.64px;
    }
`;

const StatisticContainer = styled.div`
    background-color: #f8f8fa;
    display: flex;
    margin-bottom: 20px;

    ${media.medium} {
        flex-direction: column-reverse;
    }
`;

const StatisticSummary = styled.div`
    flex: 1 40%;
    ${flex}
    justify-content: space-between;
    padding: 100px 60px;
    text-align: center;

    ${media.medium} {
        padding: 24px 54px;
    }
`;

const Score = styled.p`
    font-weight: bold;
    font-size: 28px;
    line-height: 40px;
    letter-spacing: 0;
    color: #191919;
    margin-bottom: 20px;

    ${media.medium} {
        font-size: 24px;
        line-height: 36px;
    }
`;

const ScoreTitle = styled.p`
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0;
    color: #000000;
`;

const ChartContainer = styled.div`
    flex: 1 60%;
    max-height: 280px;
    position: relative;
`;

const SearchTabList = styled.ul`
    ${flex}
    justify-content: flex-start;
    margin-bottom: 10px;
`;

const SearchTabListItem = styled.li<{ isSelected?: boolean }>`
    margin-right: 10px;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: -0.48px;
    padding: 6px 0;
    width: 88px;
    text-align: center;

    ${(props) =>
        props.isSelected
            ? css`
                  background-color: #222943;
                  color: #fff;
              `
            : css`
                  background-color: #f0eff4;
                  color: #222943;
              `};
`;

const BestScore = styled.div`
    background-color: #f8f8fa;
    text-align: center;
    width: 100%;
    ${flex}
    flex-direction: column;

    p {
        font-size: 24px;
        line-height: 36px;
        letter-spacing: 0;
        padding: 20px;
        margin-bottom: 20px;
    }
`;

const ScoreFilterItem = styled.ul`
    ${flex}
    justify-content: flex-start;
    margin-bottom: 20px;
`;

const ScoreFilterItemList = styled.li<{ isSelected?: boolean }>`
    margin-right: 40px;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.64px;

    ${(props) =>
        props.isSelected
            ? css`
                  color: #191919;
                  text-decoration: underline;
              `
            : css`
                  color: #a8a8a8;
              `};
`;

const Statistics: FC<StatisticsProps> = ({ isMainTab = true }) => {
    const [searchCondition, setSearchCondition] = useState([
        { id: 'all', name: '전체', isSelected: true },
        { id: '5round', name: '5라운드', isSelected: false },
        { id: '10round', name: '10라운드', isSelected: false },
        { id: 'period', name: '기간선택', isSelected: false },
    ]);

    const [scoreFilter, setScoreFilter] = useState([
        { id: 'score', name: '스코어', isSelected: true },
        { id: 'gir', name: 'GIR', isSelected: false },
        { id: 'putt', name: '퍼트수', isSelected: false },
        { id: 'distance', name: '비거리', isSelected: false },
    ]);

    const [chartData, setChartData] = useState([
        { id: 'buddy', name: '버디', value: 100 },
        { id: 'par', name: '파', value: 0 },
        { id: 'bogey', name: '보기', value: 0 },
        { id: 'doubleBogey', name: '더블보기', value: 0 },
        { id: 'tripleBogey', name: '트리플보기', value: 0 },
    ]);

    const hasProduct = useMemo(() => !!isEmpty([]), []);

    useLayoutEffect(() => {
        if (hasProduct) {
            setChartData([
                { id: 'buddy', name: '버디', value: 5 },
                { id: 'par', name: '파', value: 20 },
                { id: 'bogey', name: '보기', value: 20 },
                { id: 'doubleBogey', name: '더블보기', value: 30 },
                { id: 'tripleBogey', name: '트리플보기', value: 20 },
            ]);
        }

        return () => {
            setChartData([
                { id: 'buddy', name: '버디', value: 100 },
                { id: 'par', name: '파', value: 0 },
                { id: 'bogey', name: '보기', value: 0 },
                { id: 'doubleBogey', name: '더블보기', value: 0 },
                { id: 'tripleBogey', name: '트리플보기', value: 0 },
            ]);
        };
    }, [hasProduct]);

    const scores = useMemo(
        () =>
            pipe(
                chartData,
                map((a) => a.value),
                toArray,
            ),
        [chartData],
    );

    const labels = useMemo(
        () =>
            pipe(
                chartData,
                map((a) =>
                    hasProduct ? `${a.name} ${a.value} %` : `${a.name} - %`,
                ),
                toArray,
            ),
        [chartData, hasProduct],
    );

    const selectedSearchCondition = useMemo(
        () =>
            pipe(
                searchCondition,
                filter((a) => a.isSelected),
                head,
            ),
        [searchCondition],
    );

    const onSearchTabClick = (name: string, id: string) => {
        if (name === 'searchCondition') {
            setSearchCondition((prev) =>
                pipe(
                    prev,
                    map((a) => ({ ...a, isSelected: a.id === id })),
                    toArray,
                ),
            );
        }

        if (name === 'scoreFilter') {
            setScoreFilter((prev) =>
                pipe(
                    prev,
                    map((a) => ({ ...a, isSelected: a.id === id })),
                    toArray,
                ),
            );
        }
    };

    const router = useRouter();

    return (
        <RoundAnalysisLayout isShow={router.pathname.includes('statistics')}>
            <StyledContainer>
                <Title>
                    통계
                    {/* TODO 메인 탭을 눌렀을 경우에도 해당 값이 true가 되어야함 */}
                    {isMainTab && (
                        <span>{`(최근 ${roundStats.data.roundStatistics.gameCount}라운드)`}</span>
                    )}
                </Title>

                {!isMainTab && (
                    <SearchTabList>
                        {searchCondition.map(({ id, name, isSelected }) => (
                            <SearchTabListItem
                                isSelected={isSelected}
                                onClick={() =>
                                    onSearchTabClick('searchCondition', id)
                                }
                                key={id}
                            >
                                {name}
                            </SearchTabListItem>
                        ))}
                        {selectedSearchCondition?.id === 'period' && (
                            <div>날짜선택</div>
                        )}
                    </SearchTabList>
                )}

                <StatisticContainer>
                    <StatisticSummary>
                        <div>
                            <Score>
                                {roundStats.data.roundStatistics.bestScore === 0
                                    ? '-'
                                    : roundStats.data.roundStatistics.bestScore}
                            </Score>
                            <ScoreTitle>베스트 스코어</ScoreTitle>
                        </div>
                        <div>
                            <Score>
                                {`${
                                    roundStats.data.roundStatistics
                                        .bestScoreInfo.avgDrivingDst === 0
                                        ? '-'
                                        : roundStats.data.roundStatistics
                                              .bestScoreInfo.avgDrivingDst
                                } m`}
                            </Score>
                            <ScoreTitle>평균 드라이버 비거리</ScoreTitle>
                        </div>
                    </StatisticSummary>
                    <ChartContainer>
                        <Doughnut
                            style={{ margin: '4px' }}
                            plugins={[
                                {
                                    id: 'custom_canvas_background_color',
                                    beforeDraw: (chart) => {
                                        const { ctx } = chart;
                                        ctx.save();
                                        ctx.globalCompositeOperation =
                                            'destination-over';
                                        ctx.fillStyle = '#fff';
                                        ctx.fillRect(
                                            0,
                                            0,
                                            chart.width,
                                            chart.height,
                                        );
                                        ctx.restore();
                                    },
                                },
                                {
                                    id: 'custom_title',
                                    beforeDraw: (chart) => {
                                        const {
                                            ctx,
                                            data,
                                            chartArea: {
                                                top,
                                                bottom,
                                                left,
                                                right,
                                                width,
                                                height,
                                            },
                                        } = chart;

                                        ctx.save();
                                        ctx.font = `normal 12px Arial`;
                                        ctx.textAlign = 'center';
                                        ctx.fillText(
                                            'AVG',
                                            width / 2,
                                            height / 2 + top / 2,
                                        );
                                        ctx.restore();

                                        ctx.save();
                                        ctx.font = 'bold 26px Arial';
                                        ctx.textAlign = 'center';
                                        ctx.fillText(
                                            '87',
                                            width / 2,
                                            height / 2 + top / 2 + 26,
                                        );
                                        ctx.restore();

                                        ctx.save();
                                        ctx.font = 'normal 12px Arial';
                                        ctx.textAlign = 'center';
                                        ctx.fillText(
                                            '+15',
                                            width / 2,
                                            height / 2 + top / 2 + 12 + 26,
                                        );
                                        ctx.restore();
                                    },
                                },
                            ]}
                            options={{
                                maintainAspectRatio: false,
                                layout: {
                                    autoPadding: true,
                                    // TODO: 모바일에서는 아래옵션으로 변경해주어야함
                                    // padding: 10,
                                },
                                plugins: {
                                    legend: {
                                        display: true,
                                        position: 'right',
                                        labels: {
                                            usePointStyle: true,
                                            pointStyle: 'circle',
                                            color: '#8F8F8F',
                                        },
                                    },
                                },
                            }}
                            data={{
                                labels,
                                datasets: [
                                    {
                                        label: 'Score Data',
                                        data: scores,
                                        backgroundColor: [
                                            '#191919',
                                            '#508CFE',
                                            '#42B3AB',
                                            '#FFA70F',
                                            '#FE5050',
                                        ],
                                        hoverOffset: 4,
                                    },
                                ],
                            }}
                        />
                    </ChartContainer>
                </StatisticContainer>

                {!isMainTab && (
                    <div>
                        <ScoreFilterItem>
                            {scoreFilter.map(({ id, name, isSelected }) => (
                                <ScoreFilterItemList
                                    key={id}
                                    isSelected={isSelected}
                                    onClick={() =>
                                        onSearchTabClick('scoreFilter', id)
                                    }
                                >
                                    {name}
                                </ScoreFilterItemList>
                            ))}
                        </ScoreFilterItem>

                        <BestScore>
                            {/* TODO: 다국어 처리(https://react.i18next.com/latest/trans-component 참고) */}
                            <p>
                                홍길동님의 최신 <b>베스트 스코어</b>는<br />
                                <b>22-07-14 동원 로얄 CC</b> 에서의{' '}
                                <b style={{ color: '#508CFE' }}>73</b> 입니다.
                            </p>
                            <div style={{ width: '100%' }}>
                                <Line
                                    options={{
                                        responsive: true,
                                        backgroundColor: '#fff',
                                        plugins: {
                                            legend: {
                                                display: false,
                                            },
                                        },
                                    }}
                                    data={{
                                        labels: [
                                            '07-01',
                                            '07-04',
                                            '07-05',
                                            '07-09',
                                            '07-14',
                                            '08-01',
                                            '09-01',
                                        ],
                                        datasets: [
                                            {
                                                label: 'My First Dataset',
                                                data: [
                                                    65, 59, 80, 81, 56, 55, 40,
                                                ],
                                                fill: false,
                                                borderColor: '#707070',
                                                tension: 0.1,
                                            },
                                        ],
                                    }}
                                />
                            </div>
                        </BestScore>
                    </div>
                )}
            </StyledContainer>
        </RoundAnalysisLayout>
    );
};

export default Statistics;
