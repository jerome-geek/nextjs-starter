import { FC } from 'react';
import Link from 'next/link';
import styled, { css } from 'styled-components';

import CATEGORY from 'const/category';
import PATHS from 'const/paths';
import { fadeIn, fadeOut } from 'utils/styles/transitions';

interface HeaderNavigationProps {
    headerNavigationToggle: boolean;
}

const NavigationContainer = styled.div<{ headerNavigationToggle: boolean }>`
    background-color: #f8f8fa;
    margin: 0 auto;
    position: absolute;
    width: 100%;
    z-index: 5;
    padding: 30px 0;
    left: 0;
    top: 94.5px;
    visibility: ${(props) =>
        props.headerNavigationToggle ? 'visible' : 'hidden'};
    animation: ${(props) => (props.headerNavigationToggle ? fadeIn : fadeOut)}
        0.5s forwards;
    transition: visibility 0.25s ease-out;
`;

const ContentContainer = styled.div`
    width: 100%;
    max-width: 840px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const HeaderNavigationList = styled.ul``;

const HeaderNavigationListItem = styled.li<{ depth: number }>`
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.8px;
    ${(props) =>
        props.depth === 1 &&
        css`
            color: #191919;
        `}
    ${(props) =>
        props.depth === 2 &&
        css`
            color: #858585;
        `}
`;

const HeaderNavigation: FC<HeaderNavigationProps> = ({
    headerNavigationToggle,
}) => {
    return (
        <NavigationContainer headerNavigationToggle={headerNavigationToggle}>
            <ContentContainer>
                <HeaderNavigationList>
                    <HeaderNavigationListItem depth={1}>
                        <Link
                            href={{
                                pathname: `${PATHS.PRODUCT_LIST}/${CATEGORY.YARDAGE_BOOK}`,
                            }}
                        >
                            디지털 야디지북
                        </Link>
                    </HeaderNavigationListItem>
                    <HeaderNavigationListItem depth={1}>
                        <Link
                            href={{
                                pathname: `${PATHS.PRODUCT_LIST}/${CATEGORY.CLOCK_TYPE}`,
                            }}
                        >
                            시계형
                        </Link>
                    </HeaderNavigationListItem>
                    <HeaderNavigationListItem depth={1}>
                        <Link
                            href={{
                                pathname: `${PATHS.PRODUCT_LIST}/${CATEGORY.LASER_TYPE}`,
                            }}
                        >
                            레이저형
                        </Link>
                    </HeaderNavigationListItem>
                    <HeaderNavigationListItem depth={1}>
                        <Link
                            href={{
                                pathname: `${PATHS.PRODUCT_LIST}/${CATEGORY.VOICE_TYPE}`,
                            }}
                        >
                            음성형
                        </Link>
                    </HeaderNavigationListItem>
                </HeaderNavigationList>
                <HeaderNavigationList>
                    <HeaderNavigationListItem depth={1}>
                        <Link
                            href={{
                                pathname: `${PATHS.PRODUCT_LIST}/${CATEGORY.CLOCK_TYPE_CABLE}`,
                            }}
                        >
                            시계형 충전 케이블
                        </Link>
                    </HeaderNavigationListItem>
                    <HeaderNavigationListItem depth={1}>
                        <Link
                            href={{
                                pathname: `${PATHS.PRODUCT_LIST}/${CATEGORY.VOICECADDIE_GOODS}`,
                            }}
                        >
                            보이스캐디 굿즈
                        </Link>
                    </HeaderNavigationListItem>
                    <HeaderNavigationListItem depth={1}>
                        <Link
                            href={{
                                pathname: `${PATHS.PRODUCT_LIST}/${CATEGORY.ACCESSORY}`,
                            }}
                        >
                            VSE 액세서리
                        </Link>
                    </HeaderNavigationListItem>
                </HeaderNavigationList>
                <HeaderNavigationList>
                    <HeaderNavigationListItem depth={1}>
                        <Link href={{ pathname: PATHS.MANAGER }}>
                            보이스캐디 매니저
                        </Link>
                    </HeaderNavigationListItem>
                    <HeaderNavigationListItem depth={1}>
                        <Link href={{ pathname: PATHS.MANUAL_LIST }}>
                            매뉴얼
                        </Link>
                    </HeaderNavigationListItem>
                    <HeaderNavigationListItem depth={1}>
                        <Link href={{ pathname: PATHS.GOLF_COURSE_LIST }}>
                            지원 골프 코스
                        </Link>
                    </HeaderNavigationListItem>
                    <HeaderNavigationListItem depth={1}>
                        <Link href={{ pathname: PATHS.SERVICE_CENTER }}>
                            고객센터
                        </Link>
                    </HeaderNavigationListItem>
                    <HeaderNavigationListItem depth={1}>
                        <Link href={{ pathname: PATHS.FAQ }}>
                            자주하는 질문
                        </Link>
                    </HeaderNavigationListItem>
                    <HeaderNavigationList>
                        <HeaderNavigationListItem depth={2}>
                            <Link href={{ pathname: PATHS.SERVICE_CENTER }}>
                                고객 센터
                            </Link>
                        </HeaderNavigationListItem>
                        <HeaderNavigationListItem depth={2}>
                            <Link href={{ pathname: PATHS.INQUIRY }}>
                                1:1 문의
                            </Link>
                        </HeaderNavigationListItem>
                        <HeaderNavigationListItem depth={2}>
                            <Link href={{ pathname: PATHS.NOTICE }}>
                                공지사항
                            </Link>
                        </HeaderNavigationListItem>
                        <HeaderNavigationListItem depth={2}>
                            <Link href={{ pathname: '/' }}>
                                서비스 지원 정책
                            </Link>
                        </HeaderNavigationListItem>
                    </HeaderNavigationList>
                </HeaderNavigationList>
            </ContentContainer>
        </NavigationContainer>
    );
};

export default HeaderNavigation;
