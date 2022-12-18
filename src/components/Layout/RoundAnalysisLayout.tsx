import { PropsWithChildren, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import { map, pipe, toArray } from '@fxts/core';

import LayoutResponsive from 'components/shared/LayoutResponsive';
import media from 'utils/styles/media';
import PATHS from 'const/paths';

const StyledLayout = styled(LayoutResponsive)`
    max-width: 840px;
    text-align: left;
`;

const RoundAnalysisContainer = styled.section`
    color: ${(props) => props.theme.text1};
    margin-bottom: 20px;

    ${media.medium} {
        margin-bottom: 60px;
    }
`;

const Title = styled.h2`
    font-size: 1.5rem;
    letter-spacing: -1.2px;
    font-weight: bold;
    margin-bottom: 20px;
    ${media.xlarge} {
        letter-spacing: -0.9px;
        margin-bottom: 25px;
    }
`;

const Description = styled.p`
    line-height: 24px;
    letter-spacing: 0;
    color: #767676;

    ${media.medium} {
        color: #a8a8a8;
        font-size: 1.1666rem;
    }
`;

const TabList = styled.ul`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const TabListItem = styled.li<{ isSelected: boolean }>`
    flex: 1;
    text-align: center;
    padding: 10px 0;
    letter-spacing: 0;
    cursor: pointer;
    &:not(:last-child) {
        margin-right: 10px;
    }

    ${(props) =>
        props.isSelected
            ? css`
                  background-color: ${props.theme.secondary};
                  color: #fff;
                  border: 1px solid ${props.theme.secondary};
                  font-weight: bold;
              `
            : css`
                  background-color: #fff;
                  color: ${props.theme.text3};
                  border: 1px solid ${props.theme.line2};
                  font-weight: 500;
              `}

    ${media.xlarge} {
        font-size: 1.141rem;
    }
    ${media.medium} {
        font-size: 1.333rem;
        letter-spacing: -0.64px;
        padding: 16px 0;

        &:not(:last-child) {
            margin-right: 10px;
        }
    }
`;

const RoundAnalysisLayout = ({
    children,
    isShow,
}: PropsWithChildren & {
    isShow?: boolean;
}) => {
    const [tab, setTab] = useState([
        {
            id: 'main',
            name: '메인',
            isSelected: true,
        },
        {
            id: 'info',
            name: '라운드 내역',
            isSelected: false,
        },
        {
            id: 'statistics',
            name: '통계',
            isSelected: false,
        },
    ]);

    const router = useRouter();

    const onTabClick = (id: string) => {
        setTab((prev) =>
            pipe(
                prev,
                map((a) => ({ ...a, isSelected: a.id === id })),
                toArray,
            ),
        );
        router.push(`${PATHS.MY_ROUND_ANALYSIS}/${id}`);
    };

    useEffect(() => {
        setTab((prev) =>
            pipe(
                prev,
                map((a) => ({
                    ...a,
                    isSelected: router.pathname.includes(a.id),
                })),
                toArray,
            ),
        );
    }, [router.pathname]);

    return isShow ? (
        <StyledLayout>
            <RoundAnalysisContainer>
                <Title>라운드 분석</Title>
                <Description>
                    보이스캐디에 등록한 제품을 통해
                    <br />
                    다양한 라운드 분석 내용을 확인할 수 있습니다.
                </Description>
                <TabList>
                    {tab.map(({ id, isSelected, name }) => (
                        <TabListItem
                            key={id}
                            isSelected={isSelected}
                            onClick={() => {
                                onTabClick(id);
                            }}
                        >
                            {name}
                        </TabListItem>
                    ))}
                </TabList>
            </RoundAnalysisContainer>

            <div style={{ position: 'relative' }}>{children}</div>
        </StyledLayout>
    ) : (
        <>{children}</>
    );
};

export default RoundAnalysisLayout;
