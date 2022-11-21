import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useLockedBody, useWindowSize } from 'usehooks-ts';

import media from 'utils/styles/media';
import PATHS from 'const/paths';
import { isDesktop } from 'utils/styles/responsive';
import SearchLayer from 'components/Search/SearchLayer';
import CATEGORY from 'const/category';
import HeaderLogo from 'assets/logo/headerLogo.svg';
import SearchIcon from 'assets/icons/search.svg';
import CartIcon from 'assets/icons/cart.svg';
import BarsIcon from 'assets/icons/bars.svg';
import PersonIcon from 'assets/icons/person.svg';

const HeaderContainer = styled.header`
    background-color: #fff;
    padding: 16px 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: relative;
    z-index: 1;

    ${media.small} {
        padding: 30px 24px;
    }
`;

const LogoContainer = styled.div``;

const NavContainer = styled.nav`
    & > a {
        padding: 34px 1.5em;
    }

    ${media.medium} {
        display: none;
    }
`;

const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
        cursor: pointer;
        position: relative;

        :not(:last-child) {
            margin-right: 1.5rem;
        }
    }
`;

const MemberName = styled.span`
    letter-spacing: 0px;
    color: #b6b6b6;
    font-size: 16px;
    line-height: 24px;
    margin-right: 10px;
    word-break: keep-all;
`;

const CartCount = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    background-color: #c00020;
    border-radius: 50%;
    width: 12px;
    height: 12px;
    line-height: 12px;
    font-size: 10px;
    text-align: center;
    color: #fff;
`;

export default function Header() {
    const headerNavList = useMemo(
        () => [
            {
                name: '거리 측정기',
                url: `${PATHS.PRODUCT_LIST}/${CATEGORY.RANGE_FINDER}`,
                children: [
                    {
                        name: '디지털 야디지북',
                        url: `${PATHS.PRODUCT_LIST}/${CATEGORY.YARDAGE_BOOK}`,
                    },
                    {
                        name: '시계형',
                        url: `${PATHS.PRODUCT_LIST}/${CATEGORY.CLOCK_TYPE}`,
                    },
                    {
                        name: '레이저형',
                        url: `${PATHS.PRODUCT_LIST}/${CATEGORY.LASER_TYPE}`,
                    },
                    {
                        name: '음성형',
                        url: `${PATHS.PRODUCT_LIST}/${CATEGORY.VOICE_TYPE}`,
                    },
                ],
            },
            {
                name: '론치 모니터',
                url: `${PATHS.PRODUCT_LIST}/${CATEGORY.LAUNCH_MONITOR}`,
            },
            {
                name: '액세서리',
                url: `${PATHS.PRODUCT_LIST}/${CATEGORY.ACCESSORY}`,
                children: [
                    {
                        name: '시계형 충전 케이블',
                        url: `${PATHS.PRODUCT_LIST}/${CATEGORY.CLOCK_TYPE_CABLE}`,
                    },
                    {
                        name: '보이스캐디 굿즈',
                        url: `${PATHS.PRODUCT_LIST}/${CATEGORY.VOICECADDIE_GOODS}`,
                    },
                    {
                        name: 'VSE 악세서리',
                        url: `${PATHS.PRODUCT_LIST}/${CATEGORY.VSE_ACCESSORY}`,
                    },
                ],
            },
            {
                name: 'VSE',
                url: PATHS.MAIN,
            },
            {
                name: '고객 서비스',
                url: PATHS.FAQ,
                children: [
                    { name: '보이스캐디 매니저', url: PATHS.MANAGER },
                    { name: '매뉴얼', url: PATHS.MANUAL_LIST },
                    {
                        name: '지원 골프 코스',
                        url: `${PATHS.GOLF_COURSE_LIST}/main`,
                    },
                    { name: '자주하는 질문', url: PATHS.FAQ },
                    { name: '고객센터' },
                    { name: '1:1 문의' },
                    { name: '공지사항', url: PATHS.NOTICE },
                    { name: '서비스 지원 정책' },
                ],
            },
        ],
        [],
    );

    const [myPageToggle, setMyPageToggle] = useState(false);
    const [searchToggle, setSearchToggle] = useState(false);
    const [sideNavigationToggle, setSideNavigationToggle] = useState(false);
    const [headerNavigationToggle, setHeaderNavigationToggle] = useState(false);

    const { width } = useWindowSize();
    const [_, setLocked] = useLockedBody();
    const router = useRouter();

    const onMypageClick = () => setMyPageToggle((prev) => !prev);
    const onSearchClick = () => setSearchToggle((prev) => !prev);
    const onSideNavigationClick = () => {
        setSideNavigationToggle(true);
        setLocked(true);
    };
    const onCloseButtonClick = () => {
        setSideNavigationToggle(false);
        setLocked(false);
    };

    return (
        <>
            <HeaderContainer>
                <LogoContainer>
                    <Link href={{ pathname: PATHS.MAIN }}>
                        <HeaderLogo />
                    </Link>
                </LogoContainer>

                {isDesktop(width) && (
                    <NavContainer
                    // onMouseUp={() => {
                    //     setHeaderNavigationToggle(false);
                    // }}
                    // onMouseEnter={() => {
                    //     setHeaderNavigationToggle(true);
                    // }}
                    // onMouseLeave={() => {
                    //     setHeaderNavigationToggle(false);
                    // }}
                    >
                        {headerNavList.map(({ url, name }, index) => (
                            <Link key={index} href={{ pathname: url }}>
                                {name}
                            </Link>
                        ))}

                        {/* <HeaderNavigation
                            headerNavigationToggle={headerNavigationToggle}
                        /> */}
                    </NavContainer>
                )}

                <IconContainer>
                    <div onClick={onMypageClick}>
                        <PersonIcon />
                        {/* {myPageToggle && (
                            <MemberPopup
                                isLogin={isLogin()}
                                onLoginClick={onLoginClick}
                                onLogOutClick={onLogOutClick}
                            />
                        )} */}
                    </div>

                    {isDesktop(width) && (
                        <div onClick={onSearchClick}>
                            <SearchIcon />
                        </div>
                    )}

                    <div onClick={() => router.push(PATHS.CART)}>
                        <CartIcon />
                        <CartCount>0</CartCount>
                    </div>

                    {!isDesktop(width) && (
                        <div onClick={onSideNavigationClick}>
                            <BarsIcon />
                        </div>
                    )}
                </IconContainer>
            </HeaderContainer>

            <SearchLayer
                searchToggle={searchToggle}
                setSearchToggle={setSearchToggle}
            />
        </>
    );
}
