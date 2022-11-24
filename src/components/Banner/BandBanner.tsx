import { FC, HTMLAttributes } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import media from 'utils/styles/media';
import CloseButtonIcon from 'assets/icons/gray_close_icon.svg';

interface BandBannerProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    url: string;
    onCloseClick: () => void;
}

const BandBannerWrapper = styled.div`
    background-color: #f0eff4;
    padding: 10px 0 8px 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 36px;
    position: relative;

    ${media.medium} {
        height: 44px;
    }
`;

const BannerTitle = styled.p`
    font-size: 12px;
    color: #191919;
    padding: 0 10px;
    font-weight: bold;
`;

const BannerDesc = styled(Link)`
    font-size: 10px;
    color: #191919;
    text-decoration: underline;
`;

const CloseButton = styled(CloseButtonIcon)`
    cursor: pointer;
    position: absolute;
    right: 80px;
    width: 24px;
    height: 24px;

    ${media.medium} {
        right: 24px;
        width: 12px;
        height: 12px;
    }
`;

const BandBanner: FC<BandBannerProps> = ({ title, url, onCloseClick }) => (
    <BandBannerWrapper>
        {title && <BannerTitle>{title}</BannerTitle>}
        {url && <BannerDesc href={{ pathname: url }}>자세히보기</BannerDesc>}
        <CloseButton onClick={onCloseClick} />
    </BandBannerWrapper>
);

export default BandBanner;
