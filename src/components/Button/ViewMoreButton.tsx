import Link, { LinkProps } from 'next/link';
import { FC } from 'react';
import styled from 'styled-components';

import media from 'utils/styles/media';

interface ViewMoreButtonProps extends LinkProps {
    children?: React.ReactNode;
}

const StyledLink = styled.a`
    display: block;
    border-radius: 25px;
    background-color: #191919;
    color: #fff;
    height: 50px;
    font-size: 20px;
    padding: 10px 20px;
    width: 138px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    letter-spacing: 0;

    ${media.medium} {
        font-size: 16px;
        line-height: 24px;
        padding: 10px 28px;
    }
`;

const ViewMoreButton: FC<ViewMoreButtonProps> = ({
    href,
    children,
    ...props
}) => {
    return (
        <Link href={href} {...props}>
            <StyledLink>{children}</StyledLink>
        </Link>
    );
};

export default ViewMoreButton;
