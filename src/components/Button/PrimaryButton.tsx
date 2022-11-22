import styled from 'styled-components';

import Button, { ButtonProps } from 'components/Button/Button';

export interface PrimaryButtonProps extends ButtonProps {}

const PrimaryButton = styled(Button)<PrimaryButtonProps>`
    color: #fff;
    background-color: #222943;
    width: 50%;
    padding: 10px;
`;

export default PrimaryButton;
