import styled from 'styled-components';

import Button, { ButtonProps } from 'components/Button/Button';

export interface SecondaryButtonProps extends ButtonProps {}

const SecondaryButton = styled(Button)<SecondaryButtonProps>`
    color: #000;
    background-color: #fff;
    border: 1px solid #000;
    width: 50%;
    padding: 10px;
`;

export default SecondaryButton;
