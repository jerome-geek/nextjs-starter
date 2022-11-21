import { forwardRef, Ref, InputHTMLAttributes, HTMLAttributes } from 'react';
import styled from 'styled-components';

import StyledInput from 'components/Input/StyledInput';
import Button from 'components/Button/Button';
import SearchIcon from 'assets/icons/search.svg';

export interface InputWithIconProps
    extends InputHTMLAttributes<HTMLInputElement> {
    iconPosition?: 'left' | 'right';
    containerProps?: HTMLAttributes<HTMLDivElement>;
}

const InputWithIconContainer = styled.div`
    border: 1px solid ${(props) => props.theme.line2};
    display: flex;
    align-items: center;
    position: relative;

    &:focus-within {
        border: 1px solid ${(props) => props.theme.secondary};
    }
`;

const Input = styled(StyledInput)`
    border: none;
    outline: none;
    width: 100%;
    padding: 10px 20px;

    &:focus {
        border: none;
        outline: none;
    }
`;

const StyledButton = styled(Button).attrs({ type: 'submit' })`
    display: flex;
    justify-content: center;
    align-content: center;
    cursor: pointer;
`;

const InputWithIcon = forwardRef(
    (
        {
            iconPosition = 'right',
            containerProps,
            ...props
        }: InputWithIconProps,
        ref: Ref<HTMLInputElement>,
    ) => {
        return (
            <InputWithIconContainer {...containerProps}>
                {iconPosition === 'left' && (
                    <StyledButton>
                        <SearchIcon />
                    </StyledButton>
                )}
                <Input ref={ref} {...props} />
                {iconPosition === 'right' && (
                    <StyledButton>
                        <SearchIcon />
                    </StyledButton>
                )}
            </InputWithIconContainer>
        );
    },
);

InputWithIcon.displayName = 'InputWithIcon';

export default InputWithIcon;
