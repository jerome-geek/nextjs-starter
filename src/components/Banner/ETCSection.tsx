import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';

import media from 'utils/styles/media';
import { getLinkTarget } from 'utils/html';
import { BannerInfo } from 'models/display';

interface ETCSectionProps {
    iconWidth?: number;
    iconHeight?: number;
    banners: BannerInfo[];
}

const ETCSectionContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    max-width: 840px;
    text-align: center;
    margin-left: auto;
    margin-right: auto;

    ${media.medium} {
        width: 380px;
    }

    ${media.small} {
        width: calc(100% - 2rem);
    }

    ${media.xsmall} {
        width: calc(100% - 2rem);
        padding: 0;
    }
`;

const StyledLink = styled(Link)<{ width: number; height: number }>`
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30px;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;

    ${media.medium} {
        margin-bottom: 10px;
    }
`;

const IconWrapper = styled.div`
    ${media.medium} {
        flex: 1 1 40%;
        margin-bottom: 50px;

        &:nth-child(3),
        &:nth-child(4) {
            margin-bottom: 0;
        }
    }
`;

const IconTitle = styled.p`
    font-size: 16px;
    line-height: 24px;
    color: #191919;

    ${media.medium} {
        font-size: 14px;
        line-height: 20px;
    }
`;

const ETCSection: FC<ETCSectionProps> = ({
    iconWidth = 50,
    iconHeight = 50,
    banners,
}) => {
    return (
        <ETCSectionContainer>
            {banners.map(
                ({
                    bannerNo,
                    landingUrl,
                    imageUrl,
                    name,
                    browerTargetType,
                }) => (
                    <IconWrapper key={bannerNo}>
                        <StyledLink
                            width={iconWidth}
                            height={iconHeight}
                            href={landingUrl}
                            target={getLinkTarget(browerTargetType)}
                        >
                            <Image
                                src={imageUrl}
                                loader={({ src }) => src}
                                alt={name}
                                width={iconWidth}
                                height={iconHeight}
                            />
                        </StyledLink>
                        <IconTitle>{name}</IconTitle>
                    </IconWrapper>
                ),
            )}
        </ETCSectionContainer>
    );
};

export default ETCSection;
