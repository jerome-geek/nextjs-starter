import { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { backgroundImage } from 'utils/styles/mixin';

interface ManagerTopContentProps {
    title?: string;
    description?: string;
    link?: string;
    imageUrl?: string;
}

const StyledContainer = styled.div<{ imageUrl?: string }>`
    min-height: 360px;
    ${(props) => props.imageUrl && backgroundImage(props.imageUrl)}
`;

const Title = styled.h2`
    font-weight: bold;
    font-size: 24px;
    line-height: 36px;
    letter-spacing: -1.2px;
    color: #fff;
    margin-bottom: 10px;
`;

const Description = styled.p`
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.64px;
    color: #ffffff;
    margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
    border: 1px solid #ffffff;
    font-size: 16px;
    color: #fff;
    padding: 8px;
`;

const ContentContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
    max-width: 1280px;
    min-height: 360px;
`;

const ManagerTopContent: FC<ManagerTopContentProps> = ({
    title = '',
    description = '',
    link = '',
    imageUrl = '',
}) => {
    const { t: manager } = useTranslation('manager');

    return (
        <StyledContainer imageUrl={imageUrl}>
            <ContentContainer>
                {title && <Title>{title}</Title>}

                {description && (
                    <Description
                        dangerouslySetInnerHTML={{
                            __html: description,
                        }}
                    />
                )}

                {link && (
                    <StyledLink href={link}>
                        <span>{manager('howToUse')}</span>
                    </StyledLink>
                )}
            </ContentContainer>
        </StyledContainer>
    );
};

export default ManagerTopContent;
