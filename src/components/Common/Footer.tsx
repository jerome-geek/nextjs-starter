import { useMemo } from 'react';
import { GetServerSideProps, GetStaticProps } from 'next';
import Link from 'next/link';
import { dehydrate, QueryClient } from 'react-query';
import styled from 'styled-components';
import { gt } from '@fxts/core';
import { useWindowSize } from 'usehooks-ts';

import FlexContainer from 'components/Common/FlexContainer';
import SocialMedia from 'components/Footer/SocialMedia';
import DropDown from 'components/Common/DropDown';
import media from 'utils/styles/media';
import { hideScrollbar } from 'utils/styles/mixin';
import PATHS from 'const/paths';
import BREAKPOINTS from 'const/breakpoints';
import YoutubeIcon from 'assets/icons/youtube.svg';
import FacebookIcon from 'assets/icons/facebook.svg';
import InstagramIcon from 'assets/icons/instagram.svg';
import BlogIcon from 'assets/icons/blog.svg';
import PinIcon from 'assets/icons/pin.svg';
import { useMall } from 'hooks/queries';
import mall from 'api/mall';

const FooterContainer = styled.footer`
    width: 100%;
    padding: 0 auto;
`;

const FooterTop = styled.div`
    background-color: #212121;
    padding-top: 60px;
    padding-bottom: 60px;

    ${media.small} {
        padding: 30px 24px;
    }
`;

const FooterTopContentsContainer = styled.div`
    color: #fff;
`;

const FooterTopMenuList = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 60px;
    width: 840px;
    margin-left: auto;
    margin-right: auto;
    line-height: 20px;

    ${media.medium} {
        width: 100%;
        padding-left: 24px;
        padding-right: 24px;
    }

    ${media.small} {
        margin-bottom: 30px;
        white-space: nowrap;
        overflow-x: scroll;
        width: 100%;
        padding-left: 0;
        margin-right: -24px;
        position: relative;
    }

    ${hideScrollbar}
`;

const FooterTopMenuListItem = styled.li`
    &:not(:last-child) {
        margin-right: 40px;
    }
`;

const FooterBottom = styled.div`
    background-color: #191919;
    color: #fff;
    padding: 60px 50px 18px 50px;

    ${media.small} {
        padding: 20px 24px;
    }
`;

const SocialMediaContainer = styled(FlexContainer)`
    flex-direction: row-reverse;

    ${media.small} {
        flex-direction: column;
    }
`;

const SocialMediaTitle = styled.span`
    font-size: 12px;
    line-height: 14px;
    color: #858585;
    text-align: center;
    margin-right: 20px;

    ${media.small} {
        margin: 0;
    }
`;

const LocationContainer = styled(FlexContainer)`
    justify-content: space-between;

    ${media.small} {
        flex-direction: column;
    }
`;

const Location = styled.p`
    font-size: 12px;
    line-height: 18px;

    & > span:not(:last-child) {
        color: #fff;
        margin-right: 20px;
    }
    & > span:last-child {
        color: #858585;
    }

    ${media.small} {
        margin-bottom: 0.83rem;
    }
`;
const MenuLink = styled(Link)`
    color: #fff;
`;

const CopyRight = styled.p`
    color: #858585;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0;
    text-align: right;
`;

const StyledLink = styled(Link)`
    font-size: 12px;
    line-height: 24px;
    letter-spacing: 0;
    text-align: left;
    color: #fff;
    text-decoration: underline;
`;

const StyledAnchor = styled.a`
    font-size: 12px;
    line-height: 24px;
    letter-spacing: 0;
    text-align: left;
    color: #fff;
    text-decoration: underline;
`;

const StyledPinIcon = styled(PinIcon)`
    margin-right: 20px;
`;

const FooterContents = styled.p`
    font-size: 12px;
    line-height: 24px;
    color: #858585;
`;

const Footer = () => {
    const { isSuccess, data: mallInfo, isLoading, isError, error } = useMall();

    const { width } = useWindowSize();

    const SocialMediaList = useMemo(
        () => [
            {
                name: 'youtube',
                url: '/',
                target: '_blank',
                icon: <YoutubeIcon />,
            },
            {
                name: 'facebook',
                url: '/',
                target: '_blank',
                icon: <FacebookIcon />,
            },
            {
                name: 'instagram',
                url: '/',
                target: '_blank',
                icon: <InstagramIcon />,
            },
            {
                name: 'blog',
                url: '/',
                target: '_blank',
                icon: <BlogIcon />,
            },
        ],
        [],
    );

    if (isLoading) return <div>Loading</div>;
    if (error) return <p>{'An error has occurred: ' + error?.message}</p>;

    return (
        <FooterContainer>
            <FooterTop>
                <FooterTopContentsContainer>
                    <FooterTopMenuList>
                        <FooterTopMenuListItem>
                            <DropDown
                                title='????????? ????????????'
                                menuList={[
                                    {
                                        title: '???????????? ????????????',
                                        url: '/',
                                    },
                                    {
                                        title: 'VSE ????????? ????????????',
                                        url: '/',
                                    },
                                ]}
                            />
                        </FooterTopMenuListItem>
                        <FooterTopMenuListItem>
                            <MenuLink href={{ pathname: '/' }}>
                                ???????????? ????????????
                            </MenuLink>
                        </FooterTopMenuListItem>
                        <FooterTopMenuListItem>
                            <DropDown
                                title='ABOUT US'
                                menuList={[
                                    { title: 'Brand Philosophy', url: '/' },
                                    { title: '????????? ??????', url: '/' },
                                ]}
                            />
                        </FooterTopMenuListItem>
                        <FooterTopMenuListItem>
                            <MenuLink href={{ pathname: '/' }}>
                                ????????????
                            </MenuLink>
                        </FooterTopMenuListItem>
                        <FooterTopMenuListItem>
                            <MenuLink href={{ pathname: PATHS.NOTICE }}>
                                ????????????
                            </MenuLink>
                        </FooterTopMenuListItem>
                    </FooterTopMenuList>
                    <div
                        style={{
                            marginBottom: '20px',
                            textAlign: 'center',
                        }}
                    >
                        <DropDown
                            title='FAMILY SITE'
                            menuList={[
                                { title: 'Brand Philosophy', url: '/' },
                                { title: '????????? ??????', url: '/' },
                            ]}
                            style={{
                                width: '232px',
                            }}
                            isBorder
                        />
                    </div>
                    <SocialMediaContainer>
                        <SocialMedia socialMedia={SocialMediaList} />

                        <SocialMediaTitle>Follow us</SocialMediaTitle>
                    </SocialMediaContainer>
                </FooterTopContentsContainer>
            </FooterTop>
            <FooterBottom>
                <div style={{ maxWidth: '840px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <FooterContents>
                            {`?????? ${mallInfo?.serviceBasicInfo.companyName} ?????? ${mallInfo?.serviceBasicInfo.representativeName} | Tel ${mallInfo?.serviceBasicInfo.representPhoneNo} FAX ${mallInfo?.serviceBasicInfo.faxNo}`}
                        </FooterContents>
                        {gt(width, BREAKPOINTS.SMALL) ? (
                            <>
                                <FooterContents>
                                    {`????????????????????? ${mallInfo?.serviceBasicInfo.onlineMarketingBusinessDeclarationNo} | ????????????????????? ${mallInfo?.serviceBasicInfo.businessRegistrationNo}`}
                                    <StyledAnchor
                                        href={`https://bizno.net/?query=${mallInfo?.serviceBasicInfo.businessRegistrationNo}`}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        ????????? ????????????
                                    </StyledAnchor>
                                </FooterContents>
                                <FooterContents>
                                    VSE ???????????? 1344-4667&nbsp;
                                    <StyledLink href={{ pathname: '/' }}>
                                        ???????????? ????????????
                                    </StyledLink>
                                    &nbsp;|&nbsp;
                                    {`??????????????? ???????????? ${mallInfo?.mall.serviceCenter.phoneNo} (??????2???)`}
                                </FooterContents>
                            </>
                        ) : (
                            <>
                                <FooterContents>
                                    {`????????????????????? ${mallInfo?.serviceBasicInfo.onlineMarketingBusinessDeclarationNo}`}
                                    <br />
                                    {`????????????????????? ${mallInfo?.serviceBasicInfo.businessRegistrationNo}`}
                                    &nbsp;
                                    <StyledAnchor
                                        href={`https://bizno.net/?query=${mallInfo?.serviceBasicInfo.businessRegistrationNo}`}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        ????????? ????????????
                                    </StyledAnchor>
                                </FooterContents>
                                <FooterContents>
                                    VSE ???????????? 1344-4667&nbsp;
                                    <StyledLink href={{ pathname: '/' }}>
                                        ???????????? ????????????
                                    </StyledLink>
                                    <br />
                                    ??????????????? ???????????? 1577-2862 (??????2???)
                                </FooterContents>
                            </>
                        )}
                    </div>
                    <div style={{ marginBottom: '60px' }}>
                        <FooterContents>
                            ?????? ??? ???????????? ????????? ????????? ????????? 145 ????????????
                            5???
                        </FooterContents>
                        <FooterContents>
                            ?????? ???????????? 1577-2862 (?????? 3???) ????????????
                            070-8290-5372
                        </FooterContents>
                        <StyledLink href={{ pathname: PATHS.FAQ }}>
                            FAQ ????????????
                        </StyledLink>
                    </div>
                </div>
                <LocationContainer>
                    <Location>
                        <StyledPinIcon />
                        {/* TODO: countryCode??? KR??? ???????????? ?????? ?????? */}
                        <span>
                            {mallInfo?.mall.countryCode === 'KR' && '????????????'}
                        </span>
                        <span>
                            {`${mallInfo?.serviceBasicInfo.address} ${mallInfo?.serviceBasicInfo.addressDetail}`}
                        </span>
                    </Location>
                    <CopyRight>
                        COPYRIGHT ?? 2022. voicecaddie. ALL RIGHTS RESERVED.
                    </CopyRight>
                </LocationContainer>
            </FooterBottom>
        </FooterContainer>
    );
};

export default Footer;
