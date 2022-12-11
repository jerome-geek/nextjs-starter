import { useState } from 'react';
import styled from 'styled-components';
import { useWindowSize } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';

import KaKaoMap from 'components/shared/Map';
import ShareIcon from 'assets/icons/share.svg';
import ShareModal from 'components/Modal/ShareModal';
import media from 'utils/styles/media';
import { isMobile } from 'utils/styles/responsive';
import { NextSeo } from 'next-seo';
import { GetServerSideProps, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ServiceCenterContainer = styled.main`
    margin: 116px auto 154px;
    width: 1060px;
    color: ${(props) => props.theme.text1};
    ${media.custom(1108)} {
        width: 100%;
        padding: 0 24px;
    }
    ${media.xlarge} {
        margin: 64px auto 100px;
    }
    ${media.medium} {
        margin: 26px auto 88px;
    }
    overflow-x: hidden;
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: -1.2px;
    ${media.xlarge} {
        font-size: 1.428rem;
    }
    ${media.medium} {
        font-size: 1.666rem;
    }
`;

const SubTitle = styled.h3`
    font-size: 1.25rem;
    font-weight: bold;
    letter-spacing: -0.8px;
    ${media.xlarge} {
        line-height: 29px;
        font-size: 1.428rem;
    }
    ${media.medium} {
        font-size: 1.333rem;
    }
`;

const Description = styled.p`
    color: #767676;
    line-height: 24px;
    ${media.xlarge} {
        line-height: 29px;
        font-size: 1.141rem;
    }
    ${media.medium} {
        font-size: 1.333rem;
    }
`;

const ASNoticeContainer = styled.section`
    padding: 0 29px;
    margin: 60px 0;
    background: ${(props) => props.theme.bg2};
    border-top: ${(props) => `2px solid ${props.theme.secondary}`};
    border-bottom: ${(props) => `1px solid ${props.theme.secondary}`};
    ${media.medium} {
        margin: 26px 0 48px;
    }
`;

const ASNoticeContent = styled.div`
    padding: 40px 0;
    width: 100%;
    border-top: 1px dashed ${(props) => props.theme.line2};
    &:first-child {
        border-top: none;
    }
    > h3 {
        padding: 0 10px;
    }
`;

const ASNoticeListContainer = styled.ul`
    margin-top: 26px;
`;

const ASNoticeList = styled.li`
    margin-bottom: 24px;
    color: #767676;
    line-height: 28px;
    &:last-child {
        margin-bottom: 0;
    }
`;

const ASNoticeText = styled.p`
    display: flex;
    justify-content: left;
    ${media.xlarge} {
    }
    ${media.medium} {
        font-size: 1.1666rem;
    }
    > span {
        margin-right: 2px;
    }
`;

const AddressContainer = styled.section`
    margin-bottom: 24px;
    > div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 26px;
    }
    p {
        line-height: 24px;
    }
    ${media.medium} {
        margin-bottom: 48px;
    }
`;

const ShareButton = styled.button`
    margin: 0;
    padding: 2px 4px;
    border: ${(props) => `1px solid ${props.theme.line2}`};
    display: flex;
    align-items: center;
    font-size: 0.75rem;
    cursor: pointer;
    > span {
        margin-right: 2px;
    }
    ${media.xlarge} {
        font-size: 0.858rem;
    }
    ${media.medium} {
        font-size: 1rem;
        border: none;
        > span {
            display: none;
        }
        > svg {
            width: 20px;
        }
    }
`;

const MapBackground = styled.section`
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    background: ${(props) => props.theme.bg2};
`;

const MapContainer = styled.div`
    margin: 0 auto;
    width: 1060px;
    padding: 60px 0 83px;
    > h3 {
        margin-bottom: 14px;
    }
    ${media.custom(1108)} {
        width: 100%;
        padding: 48px 24px;
    }
    ${media.xlarge} {
        margin: 64px auto 100px;
    }
    ${media.medium} {
        padding: 20px 24px 0;
        margin: 26px auto 48px;
    }
`;

const MapViewer = styled.div`
    display: block;
    cursor: pointer;
    margin-top: 36px;
    width: 100%;
    height: 600px;
    > div {
        height: 100%;
    }
    ${media.medium} {
        width: 100vw;
        margin-left: calc(-50vw + 50%);
        margin-top: 22px;
        max-height: 70vh;
        height: 576px;
    }
`;

const WayContainer = styled.section`
    margin-top: 40px;
    display: flex;
    justify-content: space-between;
    ${media.xlarge} {
        font-size: 1.141rem;
    }
    ${media.medium} {
        flex-direction: column;
        font-size: 1.333rem;
    }
`;

const WayMethod = styled.div`
    width: 50%;
    ${media.medium} {
        width: 100%;
        margin-top: 20px;
        &:first-child {
            margin-top: 0;
        }
    }
`;

const WayMethodTitle = styled.p`
    font-weight: 500;
    margin-bottom: 14px;
`;

const ServiceCenter = () => {
    const [isShareModal, setIsShareModal] = useState(false);

    const { width } = useWindowSize();

    const { t: serviceCenter } = useTranslation('serviceCenter');

    const noticeList = serviceCenter('noticeList', {
        returnObjects: true,
    }) as string[];

    const checkList = serviceCenter('checkList', {
        returnObjects: true,
    }) as string[];

    return (
        <>
            {isShareModal && (
                <ShareModal
                    width={isMobile(width) ? 'calc(100% - 48px)' : '700px'}
                    onClickToggleModal={() => setIsShareModal(false)}
                ></ShareModal>
            )}
            <NextSeo
                title={serviceCenter('title')!}
                description={serviceCenter('description')!}
                openGraph={{
                    title: serviceCenter('title')!,
                    description: serviceCenter('description')!,
                }}
            />
            <ServiceCenterContainer>
                <Title>{serviceCenter('title')}</Title>
                {!isMobile(width) && (
                    <Description>{serviceCenter('description')}</Description>
                )}
                <ASNoticeContainer>
                    <ASNoticeContent>
                        <SubTitle>A/S유의사항</SubTitle>
                        <ASNoticeListContainer>
                            {noticeList.map((text) => {
                                return (
                                    <ASNoticeList key={text}>
                                        <ASNoticeText>
                                            <span>&#183;</span>
                                            {text}
                                        </ASNoticeText>
                                    </ASNoticeList>
                                );
                            })}
                        </ASNoticeListContainer>
                    </ASNoticeContent>
                    <ASNoticeContent>
                        <SubTitle>
                            {serviceCenter('CheckListBeforeAs')}
                        </SubTitle>
                        <ASNoticeListContainer>
                            {checkList.map((text, index) => {
                                return (
                                    <ASNoticeList key={text + index}>
                                        <ASNoticeText>
                                            <span>&#183;</span>
                                            {text}
                                        </ASNoticeText>
                                    </ASNoticeList>
                                );
                            })}
                        </ASNoticeListContainer>
                    </ASNoticeContent>
                </ASNoticeContainer>
                <AddressContainer>
                    <div>
                        <SubTitle>
                            {serviceCenter('serviceCenterAddress')}
                        </SubTitle>
                        <ShareButton onClick={() => setIsShareModal(true)}>
                            <span>{serviceCenter('share')}</span>
                            <ShareIcon />
                        </ShareButton>
                    </div>
                    <Description>
                        {serviceCenter('availableTime')}
                        <br />
                        {serviceCenter('address')}
                    </Description>
                </AddressContainer>
                <MapBackground>
                    <MapContainer>
                        <SubTitle>{serviceCenter('map')}</SubTitle>
                        <Description>{serviceCenter('address')}</Description>
                        <MapViewer>
                            <KaKaoMap />
                        </MapViewer>
                    </MapContainer>
                </MapBackground>
                <WayContainer>
                    <WayMethod>
                        <WayMethodTitle>
                            {serviceCenter('bySubway')}
                        </WayMethodTitle>
                        <Description
                            dangerouslySetInnerHTML={{
                                __html: serviceCenter('bySubwayMethod'),
                            }}
                        />
                    </WayMethod>
                    <WayMethod>
                        <WayMethodTitle>
                            {serviceCenter('bySubwayAndMetro')}
                        </WayMethodTitle>
                        <Description
                            dangerouslySetInnerHTML={{
                                __html: serviceCenter('bySubwayAndMetroMethod'),
                            }}
                        />
                    </WayMethod>
                </WayContainer>
            </ServiceCenterContainer>
        </>
    );
};

export default ServiceCenter;

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!, [
                'serviceCenter',
            ])),
        },
    };
};
