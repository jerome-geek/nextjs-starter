import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { useWindowSize } from 'usehooks-ts';

import ViewMoreButton from 'components/Button/ViewMoreButton';
import { breakWord } from 'utils/html';
import media from 'utils/styles/media';
import BREAKPOINTS from 'const/breakpoints';

interface MainBannerProps extends HTMLAttributes<HTMLDivElement> {
    imgUrl?: string;
    title: string;
    desc: string;
    url: string;
}

const MainBannerContainer = styled.div`
    margin-bottom: 156px;
    text-align: center;
    padding: 0;
`;

const MainBannerImageContainer = styled.div`
    margin-bottom: 36px;

    & > img {
        width: 100%;
        height: auto;
    }

    ${media.small} {
        margin-bottom: 24px;
    }
`;

const MainBannerContentsContainer = styled.div`
    text-align: center;

    ${media.medium} {
        text-align: left;
    }

    ${media.small} {
        padding: 0 2.5rem;
    }

    ${media.xsmall} {
        padding: 0;
    }
`;

const MainBannerTitle = styled.h3`
    font-size: 3.375rem;
    line-height: 80px;
    font-weight: bold;
    margin-bottom: 10px;

    ${media.small} {
        font-size: 2.5rem;
        line-height: 38px;
    }
`;

const MainBannerDesc = styled.p`
    font-size: 20px;
    line-height: 29px;
    margin-bottom: 30px;

    ${media.small} {
        font-size: 16px;
        line-height: 24px;
        margin-bottom: 20px;
    }
`;

const StyledVieMoreButton = styled(ViewMoreButton)`
    ${media.medium} {
        margin: 0;
    }
`;

const MainBanner: FC<MainBannerProps> = ({ imgUrl, title, desc, url }) => {
    const { width } = useWindowSize();

    return (
        <MainBannerContainer>
            <MainBannerImageContainer>
                <img src={imgUrl} alt={title} />
            </MainBannerImageContainer>

            <MainBannerContentsContainer>
                <MainBannerTitle
                    dangerouslySetInnerHTML={{
                        __html: breakWord(
                            title,
                            '/',
                            width > BREAKPOINTS.MEDIUM ? ' ' : '<br />',
                        ),
                    }}
                />
                <MainBannerDesc
                    dangerouslySetInnerHTML={{
                        __html: breakWord(
                            desc,
                            '/',
                            width > BREAKPOINTS.MEDIUM ? ' ' : '<br />',
                        ),
                    }}
                />
                <StyledVieMoreButton to={url}>자세히 보기</StyledVieMoreButton>
            </MainBannerContentsContainer>
        </MainBannerContainer>
    );
};

export default MainBanner;
