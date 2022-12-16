import { useState, useMemo, useLayoutEffect } from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { isEmpty, map, pipe, toArray } from '@fxts/core';
import styled from 'styled-components';

import Statistics from 'pages/mypage/round-analysis/statistics';
import RoundInfo from 'pages/mypage/round-analysis/info';
import PrimaryButton from 'components/Button/PrimaryButton';
import RoundAnalysisLayout from 'components/Layout/RoundAnalysisLayout';
import { flex } from 'utils/styles/mixin';

const Dimmed = styled.div`
    &:after {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        content: '';
        background-color: #191919;
        opacity: 0.2;
        z-index: 1000;
    }
`;

const ModalContainer = styled.div`
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
    border-radius: 11px;
    padding: 65px 110px;
    ${flex}
    flex-direction: column;
    width: 500px;
`;

const Main = () => {
    // TODO: 등록된 상품이 있는지 체크
    const hasProduct = useMemo(() => !!isEmpty([]), []);

    const [chartData, setChartData] = useState([
        { id: 'buddy', name: '버디', value: 100 },
        { id: 'par', name: '파', value: 0 },
        { id: 'bogey', name: '보기', value: 0 },
        { id: 'doubleBogey', name: '더블보기', value: 0 },
        { id: 'tripleBogey', name: '트리플보기', value: 0 },
    ]);

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

    return (
        <>
            <RoundAnalysisLayout isShow>
                {!hasProduct && (
                    <>
                        <Dimmed>
                            <ModalContainer>
                                <p
                                    style={{
                                        fontSize: '24px',
                                        fontWeight: 'bold',
                                        lineHeight: '36px',
                                        letterSpacing: '-1.2px',
                                        color: '#191919',
                                        textAlign: 'center',
                                        marginBottom: '30px',
                                    }}
                                >
                                    제품을 등록하고 다양한
                                    <br /> 통계 데이터를 확인해보세요 :)
                                </p>
                                <PrimaryButton style={{ width: '100%' }}>
                                    제품 등록하기
                                </PrimaryButton>
                            </ModalContainer>
                        </Dimmed>
                    </>
                )}

                {/* TODO: 메인탭인 경우 차트 요약만 보여준다 */}
                <Statistics isMainTab={true} />

                {/* TODO: 메인탭인 경우 최대 4개만 보여준다 */}
                <RoundInfo isMainTab={true} />
            </RoundAnalysisLayout>
        </>
    );
};

export default Main;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!)),
        },
    };
};
