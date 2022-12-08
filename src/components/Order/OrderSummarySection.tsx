import { HTMLAttributes } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import AngleRightGray from 'assets/icons/angle_right_black.svg';
import AngleRightBlackMiddle from 'assets/icons/angle_right_black_middle_2.svg';
import { OrderSummary } from 'models/order';

export interface OrderSummarySectionProps
    extends HTMLAttributes<HTMLDivElement> {
    orderSummary: OrderSummary;
    to?: string;
}

const OrderSummaryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    background: #f8f8fa 0% 0% no-repeat padding-box;
    border: 4px solid #f8f8fa;
    padding: 12px 15px;
`;

const OrderSummaryLeft = styled.div`
    flex: 1;
    border-right: 1px solid ${(props) => props.theme.line2};
`;

const OrderSummaryRight = styled.div`
    flex: 3;
    display: flex;
    padding: 15px 80px;
`;

const OrderSummaryTitle = styled(Link)`
    font-size: 20px;
    text-align: left;
    color: #191919;
    font-weight: bold;
    display: block;
    position: relative;
    svg {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const OrderStatusContainer = styled.div`
    flex: 1;
`;

const OrderCount = styled.p<{ isActive: boolean }>`
    text-align: center;
    font-size: 56px;
    letter-spacing: 0px;
    color: ${(props) => (props.isActive ? '#191919' : '#DBDBDB')};
    opacity: 1;
    height: 83px;
`;

const OrderStatus = styled.p`
    text-align: center;
    font-size: 12px;
    letter-spacing: 0px;
    color: #191919;
    opacity: 1;
    position: relative;

    & > svg {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const OrderSummarySection = ({
    orderSummary,
    to,
}: OrderSummarySectionProps) => {
    const isActive = (orderCount: number) => orderCount !== 0;

    return (
        <OrderSummaryContainer>
            <OrderSummaryLeft>
                <OrderSummaryTitle href={to ?? '#'}>
                    주문 / 배송조회 {to && <AngleRightBlackMiddle />}
                </OrderSummaryTitle>
            </OrderSummaryLeft>
            <OrderSummaryRight>
                <OrderStatusContainer>
                    {/* 입금대기 상태 주문수 */}
                    <OrderCount
                        isActive={isActive(orderSummary.depositWaitCnt)}
                    >
                        {orderSummary.depositWaitCnt}
                    </OrderCount>
                    <OrderStatus>
                        입금대기
                        <AngleRightGray />
                    </OrderStatus>
                </OrderStatusContainer>
                <OrderStatusContainer>
                    {/* 결제완료 - 상품준비중 사이의 상태 주문수 */}
                    <OrderCount isActive={isActive(orderSummary.payDoneCnt)}>
                        {orderSummary.payDoneCnt}
                    </OrderCount>
                    <OrderStatus>
                        결제완료 <AngleRightGray />
                    </OrderStatus>
                </OrderStatusContainer>
                <OrderStatusContainer>
                    {/* 상품준비중 - 배송준비중 사이의 상태 주문수 */}
                    <OrderCount
                        isActive={isActive(
                            orderSummary.productPrepareCnt +
                                orderSummary.deliveryPrepareCnt,
                        )}
                    >
                        {orderSummary.productPrepareCnt +
                            orderSummary.deliveryPrepareCnt}
                    </OrderCount>
                    <OrderStatus>
                        배송준비 <AngleRightGray />
                    </OrderStatus>
                </OrderStatusContainer>
                <OrderStatusContainer>
                    {/* 배송중 - 배송완료 사이의 상태 주문수 */}
                    <OrderCount
                        isActive={isActive(orderSummary.deliveryIngCnt)}
                    >
                        {orderSummary.deliveryIngCnt}
                    </OrderCount>
                    <OrderStatus>
                        배송중 <AngleRightGray />
                    </OrderStatus>
                </OrderStatusContainer>
                <OrderStatusContainer>
                    {/* 배송완료 - 구매확정 사이의 상태 주문수 */}
                    <OrderCount
                        isActive={isActive(
                            orderSummary.deliveryDoneCnt +
                                orderSummary.buyConfirmCnt,
                        )}
                    >
                        {orderSummary.deliveryDoneCnt +
                            orderSummary.buyConfirmCnt}
                    </OrderCount>
                    <OrderStatus>배송완료</OrderStatus>
                </OrderStatusContainer>
            </OrderSummaryRight>
        </OrderSummaryContainer>
    );
};

export default OrderSummarySection;
