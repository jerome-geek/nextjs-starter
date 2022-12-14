import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { useLockedBody, useWindowSize } from 'usehooks-ts';

import MemberPopup from 'components/Member/MemberPopup';
import SearchLayer from 'components/Search/SearchLayer';
import HeaderNavigation from 'components/shared/HeaderNavigation';
import SideNavigation from 'components/shared/SideNavigation';
import { useCart, useMember } from 'hooks';
import { isDesktop } from 'utils/styles/responsive';
import media from 'utils/styles/media';
import PATHS from 'const/paths';
import CATEGORY from 'const/category';
import HeaderLogo from 'assets/logo/headerLogo.svg';
import MyPageIcon from 'assets/icons/person.svg';
import SearchIcon from 'assets/icons/search.svg';
import CartIcon from 'assets/icons/cart.svg';
import BarsIcon from 'assets/icons/bars.svg';
import { isLogin } from 'utils/users';

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

const Header = () => {
    const headerNavList = useMemo(
        () => [
            {
                name: '?????? ?????????',
                url: `${PATHS.PRODUCT_LIST}/${CATEGORY.RANGE_FINDER}`,
                children: [
                    {
                        name: '????????? ????????????',
                        url: `${PATHS.PRODUCT_LIST}/${CATEGORY.YARDAGE_BOOK}`,
                    },
                    {
                        name: '?????????',
                        url: `${PATHS.PRODUCT_LIST}/${CATEGORY.CLOCK_TYPE}`,
                    },
                    {
                        name: '????????????',
                        url: `${PATHS.PRODUCT_LIST}/${CATEGORY.LASER_TYPE}`,
                    },
                    {
                        name: '?????????',
                        url: `${PATHS.PRODUCT_LIST}/${CATEGORY.VOICE_TYPE}`,
                    },
                ],
            },
            {
                name: '?????? ?????????',
                url: `${PATHS.PRODUCT_LIST}/${CATEGORY.LAUNCH_MONITOR}`,
            },
            {
                name: '????????????',
                url: `${PATHS.PRODUCT_LIST}/${CATEGORY.ACCESSORY}`,
                children: [
                    {
                        name: '????????? ?????? ?????????',
                        url: `${PATHS.PRODUCT_LIST}/${CATEGORY.CLOCK_TYPE_CABLE}`,
                    },
                    {
                        name: '??????????????? ??????',
                        url: `${PATHS.PRODUCT_LIST}/${CATEGORY.VOICECADDIE_GOODS}`,
                    },
                    {
                        name: 'VSE ????????????',
                        url: `${PATHS.PRODUCT_LIST}/${CATEGORY.VSE_ACCESSORY}`,
                    },
                ],
            },
            {
                name: 'VSE',
                url: PATHS.MAIN,
            },
            {
                name: '?????? ?????????',
                url: PATHS.FAQ,
                children: [
                    { name: '??????????????? ?????????', url: PATHS.MANAGER },
                    { name: '?????????', url: PATHS.MANUAL_LIST },
                    {
                        name: '?????? ?????? ??????',
                        url: `${PATHS.GOLF_COURSE_LIST}/main`,
                    },
                    { name: '???????????? ??????', url: PATHS.FAQ },
                    { name: '????????????' },
                    { name: '1:1 ??????' },
                    { name: '????????????', url: PATHS.NOTICE },
                    { name: '????????? ?????? ??????' },
                ],
            },
        ],
        [],
    );

    const { width } = useWindowSize();

    const [_, setLocked] = useLockedBody();

    const [myPageToggle, setMyPageToggle] = useState(false);
    const [searchToggle, setSearchToggle] = useState(false);
    const [sideNavigationToggle, setSideNavigationToggle] = useState(false);
    const [headerNavigationToggle, setHeaderNavigationToggle] = useState(false);

    const router = useRouter();

    const { member, onLoginClick, onLogOutClick } = useMember();

    const { totalCount } = useCart();

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
            <SideNavigation
                onCloseButtonClick={onCloseButtonClick}
                sideNavigationToggle={sideNavigationToggle}
            />

            <HeaderContainer>
                <LogoContainer>
                    <Link href={PATHS.MAIN}>
                        <HeaderLogo />
                    </Link>
                </LogoContainer>

                {isDesktop(width) && (
                    <NavContainer
                        onMouseUp={() => {
                            setHeaderNavigationToggle(false);
                        }}
                        onMouseEnter={() => {
                            setHeaderNavigationToggle(true);
                        }}
                        onMouseLeave={() => {
                            setHeaderNavigationToggle(false);
                        }}
                    >
                        {headerNavList.map(({ url, name }) => (
                            <Link key={url} href={url}>
                                {name}
                            </Link>
                        ))}

                        <HeaderNavigation
                            headerNavigationToggle={headerNavigationToggle}
                        />
                    </NavContainer>
                )}

                <IconContainer>
                    {isDesktop(width) && isLogin() && (
                        <MemberName>{`${member?.memberName}???`}</MemberName>
                    )}
                    <div onClick={onMypageClick}>
                        <MyPageIcon />
                        {myPageToggle && (
                            <MemberPopup
                                isLogin={isLogin()}
                                onLoginClick={onLoginClick}
                                onLogOutClick={onLogOutClick}
                            />
                        )}
                    </div>

                    {isDesktop(width) && (
                        <div onClick={onSearchClick}>
                            <SearchIcon />
                        </div>
                    )}

                    <div onClick={() => router.push(PATHS.CART)}>
                        <CartIcon />
                        <CartCount>{totalCount}</CartCount>
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
};

export default Header;
