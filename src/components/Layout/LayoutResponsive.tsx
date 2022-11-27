import { HTMLAttributes } from 'react';
import styled from 'styled-components';

import media from 'utils/styles/media';

export interface LayoutResponsiveProps extends HTMLAttributes<HTMLDivElement> {}

const Block = styled.main<LayoutResponsiveProps>`
    padding: 150px 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: calc(100% - 2rem);
    max-width: 1280px;

    ${media.xxlarge} {
        max-width: 1280px;
    }

    ${media.large} {
        max-width: 840px;
    }

    ${media.medium} {
        width: calc(100% - 2rem);
    }

    ${media.small} {
        max-width: 440px;
        padding-top: 44px;
        padding-bottom: 88px;
    }
`;

const LayoutResponsive = ({
    children,
    ...props
}: LayoutResponsiveProps) => {
    return (
        <Block {...props}>
            {children}
        </Block>
    );
};

export default LayoutResponsive;
