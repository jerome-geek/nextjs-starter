import { useMemo } from 'react';
import Select, { components, DropdownIndicatorProps } from 'react-select';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';
import { append, chunk, pipe, toArray, map, sum } from '@fxts/core';
import dayjs from 'dayjs';

import RoundAnalysisLayout from 'components/Layout/RoundAnalysisLayout';
import DropDownIcon from 'assets/icons/arrow_drop_down.svg';
import roundStats from 'mock/roundStats.json';

interface SelectOption {
    label: string;
    value: number;
}

const StyledSection = styled.section`
    margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
    font-size: 18px;
    letter-spacing: 0;
    color: #000000;
    font-weight: normal;
    margin-bottom: 18px;

    span {
        margin-left: 10px;
        font-weight: light;
        letter-spacing: -0.64px;
        font-size: 12px;
        color: #191919;
    }
`;

const ScoreSummaryContainer = styled.div`
    margin-bottom: 30px;
    background-color: #f8f8fa;
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
`;

const ScoreContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Score = styled.p`
    padding: 10px 12px;
    background-color: #fff;
    border-radius: 40%;
    margin-bottom: 10px;
    font-size: 28px;
    line-height: 40px;
    letter-spacing: 0;
    font-weight: bold;

    span {
        font-weight: normal;
        font-size: 16px;
        line-height: 24px;
    }
`;

const ScoreTitle = styled.p`
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0;
    color: #000000;
`;

const TableContainer = styled.div``;

const StyledTable = styled.table`
    width: 100%;
    text-align: center;
    border-top: 2px solid #222943;
    border-bottom: 1px solid #222943;
    margin-bottom: 20px;

    th {
        background-color: #f8f8fa;
        padding: 24px 0;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.64px;
        color: #767676;

        &:not(:last-of-type) {
            border-right: 1px solid #dbdbdb;
        }
    }

    tr {
        &:not(:last-of-type) {
            border-bottom: 1px solid #dbdbdb;
        }
    }

    td {
        padding: 12px 0;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.64px;
        color: #767676;

        &:not(:last-of-type) {
            border-right: 1px solid #dbdbdb;
        }
    }
`;

const SectionSubTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    p {
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.64px;
        color: #858585;
    }
`;

const SelectContainer = styled.div`
    max-width: 180px;
    height: 44px;
`;

const TrackingContainer = styled.div``;

const InfoDetail = () => {
    const [firstPar, secondPar] = pipe(
        roundStats.data.roundStatistics.roundInfo[0].par,
        chunk(9),
        map((a) => toArray(append(sum(a), a))),
        toArray,
    );

    const [firstScore, secondScore] = pipe(
        roundStats.data.roundStatistics.roundInfo[0].score,
        chunk(9),
        map((a) => toArray(append(sum(a), a))),
        toArray,
    );

    const [firstPutt, secondPutt] = pipe(
        roundStats.data.roundStatistics.roundInfo[0].putt,
        chunk(9),
        map((a) => toArray(append(sum(a), a))),
        toArray,
    );

    const options = useMemo(
        () => [
            { label: '1번 홀', value: 1 },
            { label: '2번 홀', value: 2 },
            { label: '3번 홀', value: 3 },
            { label: '4번 홀', value: 4 },
            { label: '5번 홀', value: 5 },
        ],
        [],
    );

    const router = useRouter();

    return (
        <>
            <RoundAnalysisLayout isShow={router.pathname.includes('info')}>
                <StyledSection>
                    <SectionTitle>
                        {roundStats.data.roundStatistics.roundInfo[0].clubname}
                        <span>
                            {dayjs(
                                roundStats.data.roundStatistics.roundInfo[0]
                                    .date,
                            ).format('YY-MM-DD')}
                        </span>
                    </SectionTitle>

                    <ScoreSummaryContainer>
                        <ScoreContainer>
                            <Score>
                                72<span>+30</span>
                            </Score>

                            <ScoreTitle>베스트 스코어</ScoreTitle>
                        </ScoreContainer>
                        <ScoreContainer>
                            <Score>
                                {
                                    roundStats.data.roundStatistics.roundInfo[0]
                                        .avgPutt
                                }
                            </Score>
                            <ScoreTitle>평균 퍼트 수</ScoreTitle>
                        </ScoreContainer>
                        <ScoreContainer>
                            <Score>{`${roundStats.data.roundStatistics.roundInfo[0].gir}%`}</Score>
                            <ScoreTitle>GIR</ScoreTitle>
                        </ScoreContainer>
                    </ScoreSummaryContainer>

                    <TableContainer>
                        <StyledTable>
                            <tbody>
                                <tr>
                                    <th colSpan={1}>Hole</th>
                                    <th colSpan={1}>1H</th>
                                    <th colSpan={1}>2H</th>
                                    <th colSpan={1}>3H</th>
                                    <th colSpan={1}>4H</th>
                                    <th colSpan={1}>5H</th>
                                    <th colSpan={1}>6H</th>
                                    <th colSpan={1}>7H</th>
                                    <th colSpan={1}>8H</th>
                                    <th colSpan={1}>9H</th>
                                    <th colSpan={1}>Out</th>
                                </tr>
                                <tr>
                                    <td>PAR</td>
                                    {firstPar.map((par, index) => (
                                        <td key={index}>{par}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>SCORE</td>
                                    {firstScore.map((score, index) => (
                                        <td key={index}>{score}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>PUTT</td>
                                    {firstPutt.map((putt, index) => (
                                        <td key={index}>{putt}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </StyledTable>
                        <StyledTable>
                            <tbody>
                                <tr>
                                    <th colSpan={1}>Hole</th>
                                    <th colSpan={1}>1H</th>
                                    <th colSpan={1}>2H</th>
                                    <th colSpan={1}>3H</th>
                                    <th colSpan={1}>4H</th>
                                    <th colSpan={1}>5H</th>
                                    <th colSpan={1}>6H</th>
                                    <th colSpan={1}>7H</th>
                                    <th colSpan={1}>8H</th>
                                    <th colSpan={1}>9H</th>
                                    <th colSpan={1}>Out</th>
                                </tr>
                                <tr>
                                    <td>PAR</td>
                                    {secondPar.map((par, index) => (
                                        <td key={index}>{par}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>SCORE</td>
                                    {secondScore.map((score, index) => (
                                        <td key={index}>{score}</td>
                                    ))}
                                </tr>
                                <tr>
                                    <td>PUTT</td>
                                    {secondPutt.map((putt, index) => (
                                        <td key={index}>{putt}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </StyledTable>
                    </TableContainer>
                </StyledSection>

                <StyledSection>
                    <SectionTitle>라운드 트렉킹</SectionTitle>

                    <SectionSubTitleContainer>
                        <p>
                            {
                                roundStats.data.roundStatistics.roundInfo[0]
                                    .clubname
                            }
                        </p>

                        <SelectContainer>
                            <Select
                                isSearchable={false}
                                options={options}
                                defaultValue={options[0]}
                                components={{
                                    DropdownIndicator: (
                                        props: DropdownIndicatorProps<SelectOption>,
                                    ) => (
                                        <components.DropdownIndicator
                                            {...props}
                                        >
                                            <DropDownIcon />
                                        </components.DropdownIndicator>
                                    ),
                                }}
                            />
                        </SelectContainer>
                    </SectionSubTitleContainer>

                    <TrackingContainer>
                        {/* TODO: 지도 표시 */}
                    </TrackingContainer>
                </StyledSection>
            </RoundAnalysisLayout>
        </>
    );
};

export default InfoDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!)),
        },
    };
};
