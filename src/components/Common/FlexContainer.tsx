import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

interface FlexContainerProps extends HTMLAttributes<HTMLDivElement> {
    direction?: 'column' | 'row';
}

const StyledFlexContainer = styled.div<FlexContainerProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: ${(props) => props.direction && 'row'};
    flex-wrap: wrap;
`;

const FlexContainer: FC<FlexContainerProps> = ({
    direction = 'row',
    children,
    ...props
}) => {
    return (
        <StyledFlexContainer direction={direction} {...props}>
            {children}
        </StyledFlexContainer>
    );
};

export default FlexContainer;
