import { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';

interface OrderInformationLayoutProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
}

const StyledSection = styled.section`
    margin-bottom: 24px;
`;

const Title = styled.h3`
    font-weight: bold;
    font-size: 24px;
    letter-spacing: -1.2px;
    color: #191919;
    margin-bottom: 24px;
    text-align: left;
`;

const OrderInformationLayout: FC<OrderInformationLayoutProps> = ({
    title,
    children,
    ...props
}) => {
    return (
        <StyledSection {...props}>
            {title && <Title>{title}</Title>}
            {children}
        </StyledSection>
    );
};

export default OrderInformationLayout;
