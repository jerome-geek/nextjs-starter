import { FC } from 'react';
import styled from 'styled-components';

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    color?: string;
    fontSize?: string;
    backgroundColor?: string;
}

const ButtonBlock = styled.button<ButtonProps>`
    cursor: pointer;
    white-space: nowrap;
    color: ${(props) => props.color};
    font-size: ${(props) => props.fontSize || '16px'};
    background-color: ${(props) => props.backgroundColor};
`;

const Button: FC<ButtonProps> = ({ children, ...args }: ButtonProps) => {
    const htmlProps = args as any;

    return <ButtonBlock {...htmlProps}>{children}</ButtonBlock>;
};

export default Button;
