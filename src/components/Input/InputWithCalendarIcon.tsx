import { Ref, forwardRef, InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import StyledInput from './StyledInput';
import CalendarAfterIcon from 'assets/icons/calendar_after.svg';
import CalendarBeforeIcon from 'assets/icons/calendar_before.svg';

interface InputWithCalendarIconProps
    extends InputHTMLAttributes<HTMLInputElement> {
    type: 'before' | 'after';
}

const InputWithCalendarIconContainer = styled.div`
    max-height: 30px;
    border-bottom: 1px solid ${(props) => props.theme.line2};
    display: flex;
    align-items: center;
    position: relative;

    &:focus-within {
        border-bottom: 1px solid ${(props) => props.theme.secondary};
    }
`;

const Input = styled(StyledInput)`
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    min-height: 30px;
    font-size: 12px;
    letter-spacing: -0.48px;

    &:focus {
        border: none;
        outline: none;
    }
`;

const InputWithCalendarIcon = forwardRef(
    (props: InputWithCalendarIconProps, ref: Ref<HTMLInputElement>) => {
        return (
            <InputWithCalendarIconContainer>
                <Input ref={ref} {...props} />
                {props.type === 'before' && <CalendarBeforeIcon />}
                {props.type === 'after' && <CalendarAfterIcon />}
            </InputWithCalendarIconContainer>
        );
    },
);

InputWithCalendarIcon.displayName = 'InputWithCalendarIcon';

export default InputWithCalendarIcon;
