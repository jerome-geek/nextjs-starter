import { FC, HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import ArrowRightIcon from 'assets/icons/arrow_right.svg';

interface OrderProgressProps extends HTMLAttributes<HTMLDivElement> {
    type?: 'progress' | 'complete';
}

const OrderProgressContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: ${(props) => props.theme.text3};
    font-weight: bold;
    font-size: 1.5rem;

    &:nth-child(n) {
        margin-right: 10px;
    }
`;

const OrderProgressContent = styled.p<{ isProgress?: boolean }>`
    color: ${(props) =>
        props.isProgress ? props.theme.text1 : props.theme.text3};
`;

const OrderProgress: FC<OrderProgressProps> = ({ type, ...props }) => {
    const { t: sheet } = useTranslation('orderSheet');

    return (
        <OrderProgressContainer {...props}>
            <OrderProgressContent isProgress={type === 'progress'}>
                {sheet('progress.now')}
            </OrderProgressContent>
            <ArrowRightIcon color='#191919' />
            <OrderProgressContent isProgress={type === 'complete'}>
                {sheet('progress.next')}
            </OrderProgressContent>
        </OrderProgressContainer>
    );
};

export default OrderProgress;
