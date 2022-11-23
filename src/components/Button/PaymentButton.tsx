import { ButtonHTMLAttributes, FC } from 'react';
import styled from 'styled-components';

import PrimaryButton from 'components/Button/PrimaryButton';
import media from 'utils/styles/media';

interface PaymentButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const StyledButton = styled(PrimaryButton)`
    width: 100%;

    ${media.small} {
        position: fixed;
        bottom: 0;
        left: 0;
        height: 70px;
    }
`;

const PaymentButton: FC<PaymentButtonProps> = ({ children, ...props }) => {
    return <StyledButton {...props}>{children}</StyledButton>;
};

export default PaymentButton;
