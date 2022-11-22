import { forwardRef, InputHTMLAttributes, Ref } from 'react';
import styled from 'styled-components';

import CircleChecked from 'assets/icons/checkbox_circle_checked.svg';
import CircleUnChecked from 'assets/icons/checkbox_circle_uhchecked.svg';
import SquareUnChecked from 'assets/icons/checkbox_square_unchecked.svg';
import SquareChecked from 'assets/icons/checkbox_square_checked.svg';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    shape: 'square' | 'circle';
    label?: string;
}

const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
`;

const CheckboxLabel = styled.label`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HiddenCheckbox = styled.input.attrs<CheckboxProps>((props) => ({
    type: 'checkbox',
    shape: props.shape,
}))`
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

const Checkbox = forwardRef(
    (
        {
            shape = 'square',
            label,
            id,
            name,
            checked = false,
            children,
            ...props
        }: CheckboxProps,
        ref: Ref<HTMLInputElement>,
    ) => {
        return (
            <CheckboxContainer>
                <CheckboxLabel htmlFor={name}>
                    <HiddenCheckbox id={name} ref={ref} {...props} />
                    {shape === 'circle' && checked && <CircleChecked />}
                    {shape === 'circle' && !checked && <CircleUnChecked />}
                    {shape === 'square' && checked && <SquareChecked />}
                    {shape === 'square' && !checked && <SquareUnChecked />}
                    {children}
                </CheckboxLabel>
            </CheckboxContainer>
        );
    },
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
