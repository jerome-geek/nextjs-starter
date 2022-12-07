import { FC, Ref, forwardRef, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import media from 'utils/styles/media';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {}

const RadioContainer = styled.label<{ checked: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    padding: 10px 30px;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.64px;
    min-height: 50px;

    background-color: ${(props) => (props.checked ? '#222943' : '#fff')};
    color: ${(props) => (props.checked ? '#fff' : '#a8a8a8')};

    ${media.small} {
        padding: 12px 1.5rem;
    }
`;

const HiddenRadioInput = styled.input.attrs<RadioProps>({ type: 'radio' })`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

const Radiobox: FC<RadioProps> = forwardRef(
    (
        { children, id, name, checked = false, ...props },
        ref: Ref<HTMLInputElement>,
    ) => {
        return (
            <RadioContainer checked={checked} htmlFor={id}>
                <HiddenRadioInput id={id} name={name} ref={ref} {...props} />
                {children}
            </RadioContainer>
        );
    },
);
export default Radiobox;

Radiobox.displayName = 'Radiobox';
