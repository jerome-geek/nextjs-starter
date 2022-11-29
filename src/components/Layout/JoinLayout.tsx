import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

import media from 'utils/styles/media';
import VCLogo from 'assets/logo/vc.svg';

interface JoinLayoutProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
    isDesktop: boolean;
}

const JoinLayoutContainer = styled.div`
    width: 440px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding: 10rem 0;

    ${media.medium} {
        width: calc(100% - 4rem);
        padding: 44px 0 160px 0;
    }
`;

const JoinLayoutTitle = styled.h1`
    font-size: 2.25rem;
    line-height: 54px;
    letter-spacing: -1.8px;
    color: #191919;
    margin-bottom: 30px;

    ${media.medium} {
        text-align: left;
        line-height: 12px;
        margin-bottom: 22px;
    }
`;

const JoinLayoutDescription = styled.p`
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.64px;
    color: #858585;
    margin-bottom: 54px;

    ${media.medium} {
        color: #191919;
        letter-spacing: -1px;
        text-align: left;
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 62px;
    }
`;

const JoinLayout: FC<JoinLayoutProps> = ({
    title,
    description,
    isDesktop,
    children,
}) => {
    return (
        <JoinLayoutContainer>
            {title && (
                <JoinLayoutTitle>
                    {isDesktop ? title : <VCLogo />}
                </JoinLayoutTitle>
            )}

            {description && (
                <JoinLayoutDescription
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            )}
            {children}
        </JoinLayoutContainer>
    );
};

export default JoinLayout;
