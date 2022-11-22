import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

import media from 'utils/styles/media';

interface StyledErrorMessageProps
    extends HTMLAttributes<HTMLParagraphElement> {}

const StyledMessage = styled.p`
    font-size: 12px;
    line-height: 18px;
    color: ${(props) => props.theme.main};
    letter-spacing: 0;
    padding-top: 10px;
    text-align: left;

    ${media.small} {
        padding-top: 5px;
    }
`;

const StyledErrorMessage: FC<StyledErrorMessageProps> = ({
    children,
    ...props
}) => <StyledMessage {...props}>{children}</StyledMessage>;

export default StyledErrorMessage;
