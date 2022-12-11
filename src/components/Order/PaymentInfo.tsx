import { FC } from 'react';
import styled from 'styled-components';

import OrderInformationLayout from 'components/Layout/OrderInformationLayout';
import { KRW } from 'utils/currency';

interface PaymentInfoProps {
    // 총 결제금액
    payAmt?: number;
    // 상품가격
    standardAmt?: number;
    // 총 배송비
    deliveryAmt?: number;
    // 총 할인금액
    totalDiscountAmt?: number;
    // 쿠폰 할인 금액
    totalCouponAmt?: number;
    // 적립금 사용 금액
    subPayAmt?: number;
}

const OrderInformationList = styled.ul`
    border-top: 2px solid #222943;
    padding: 40px 10px;
`;

const OrderInformationListItem = styled.li`
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;

    font-size: 16px;
    line-height: 24px;
    color: #191919;

    & > p:first-child {
        letter-spacing: -0.64px;
        text-align: left;
    }

    & > p:last-child {
        letter-spacing: 0;
        text-align: right;
    }
`;

const PaymentInfo: FC<PaymentInfoProps> = ({
    payAmt = 0,
    standardAmt = 0,
    deliveryAmt = 0,
    totalDiscountAmt = 0,
    subPayAmt = 0,
    totalCouponAmt = 0,
}) => {
    return (
        <OrderInformationLayout title='결제정보'>
            <OrderInformationList>
                <OrderInformationListItem>
                    <p style={{ fontWeight: 'bold' }}>총 결제금액</p>
                    <p
                        style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#C00020',
                        }}
                    >
                        {KRW(payAmt).format()}
                    </p>
                </OrderInformationListItem>

                <OrderInformationListItem>
                    <p>상품가격</p>
                    <p>{KRW(standardAmt).format()}</p>
                </OrderInformationListItem>

                <OrderInformationListItem>
                    <p>배송비</p>
                    <p>{KRW(deliveryAmt).format()}</p>
                </OrderInformationListItem>

                <OrderInformationListItem>
                    <p>할인금액</p>
                    <p>{KRW(totalDiscountAmt).multiply(-1).format()}</p>
                </OrderInformationListItem>

                <OrderInformationListItem>
                    <p>쿠폰 할인</p>
                    <p>{KRW(totalCouponAmt).multiply(-1).format()}</p>
                </OrderInformationListItem>

                <OrderInformationListItem>
                    <p>적립금 사용</p>
                    <p>{KRW(subPayAmt).multiply(-1).format()}</p>
                </OrderInformationListItem>
            </OrderInformationList>
        </OrderInformationLayout>
    );
};

export default PaymentInfo;
