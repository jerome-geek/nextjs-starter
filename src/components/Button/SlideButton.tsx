import { ButtonHTMLAttributes, forwardRef, Ref } from 'react';
import styled, { css } from 'styled-components';

import PrevIcon from 'assets/icons/prev_button.svg';
import NextIcon from 'assets/icons/next_button.svg';

interface SlideButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    slideButtonType: 'prev' | 'next';
}

const StyledButton = styled.button<{ slideButtonType: 'prev' | 'next' }>`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    cursor: pointer;

    ${(props) =>
        props.slideButtonType === 'prev' &&
        css`
            left: 44.2px;
        `}

    ${(props) =>
        props.slideButtonType === 'next' &&
        css`
            right: 44.2px;
        `}
`;

const SlideButton = forwardRef(
    (
        { slideButtonType, ...props }: SlideButtonProps,
        ref: Ref<HTMLButtonElement>,
    ) => {
        return (
            <StyledButton
                ref={ref}
                slideButtonType={slideButtonType}
                {...props}
            >
                {slideButtonType === 'prev' && <PrevIcon />}
                {slideButtonType === 'next' && <NextIcon />}
            </StyledButton>
        );
    },
);

SlideButton.displayName = 'SlideButton'

export default SlideButton;
