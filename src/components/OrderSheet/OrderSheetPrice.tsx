import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';

import media from 'utils/styles/media';
import { KRW } from 'utils/currency';

interface OrderSheetPriceProps {
    title: string;
    // 총 상품금액
    totalStandardAmt?: number;
    // 총 배송비
    totalDeliveryAmt?: number;
    // 총 할인금액 (고도몰에서는 쿠폰할인까지 포함하여주지만, 여기서는 분리해서 보여준다)
    totalDiscountAmt?: number;
    // 쿠폰할인
    totalCouponAmt?: number;
    // 적립금 결제
    usedAccumulationAmt?: number;
    // 총 결제금액
    totalPaymentAmt?: number;
}

const OrderSheetPriceContainer = styled.div`
    background: #f8f8fa;
    width: 100%;
    margin-bottom: 12px;
`;

const CartOrderPriceTitle = styled.div`
    text-align: center;
    padding: 30px 33.5px 20px;
    font-weight: bold;
    font-size: 24px;
    letter-spacing: -1.2px;
    height: 36px;
    box-sizing: content-box;
    color: #191919;
`;

const CartOrderPriceBox = styled.div`
    border-top: 1px solid #dbdbdb;
    border-bottom: 1px solid #dbdbdb;
    padding: 32px 0 30px;
    width: 83%;
    margin: 0 auto;
    color: #858585;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    > div {
        display: flex;
        justify-content: space-between;
    }
`;

const OrderPriceWrapper = styled.div`
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
`;

const CartOrderPaymentAmount = styled.div`
    margin: 0 auto;
    width: 83%;
    padding: 32px 0;
    display: flex;
    justify-content: space-between;
    span {
        color: #c00020;
        font-size: 24px;
        font-weight: bold;
    }
`;

const CartOrderSubTitle = styled.div`
    ${media.medium} {
        font-size: 1.125rem;
    }
    ${media.small} {
        font-size: 1.6rem;
    }
`;

const CartOrderPrice = styled.div`
    letter-spacing: 0px;
    ${media.medium} {
        font-size: 1.125rem;
    }
    ${media.small} {
        font-size: 1.6rem;
    }
`;

const OrderSheetPrice: FC<OrderSheetPriceProps> = ({
    title,
    totalStandardAmt = 0,
    totalDeliveryAmt = 0,
    totalDiscountAmt = 0,
    totalCouponAmt = 0,
    usedAccumulationAmt = 0,
    totalPaymentAmt = 0,
}) => {
    const { t: orderSheet } = useTranslation('orderSheet');

    return (
        <OrderSheetPriceContainer>
            <CartOrderPriceTitle>{title}</CartOrderPriceTitle>
            <CartOrderPriceBox>
                <OrderPriceWrapper>
                    <CartOrderSubTitle>
                        {orderSheet('price.totalStandardAmt')}
                    </CartOrderSubTitle>
                    <CartOrderPrice>
                        {KRW(totalStandardAmt).format()}
                    </CartOrderPrice>
                </OrderPriceWrapper>
                <OrderPriceWrapper>
                    <CartOrderSubTitle>
                        {orderSheet('price.totalDeliveryAmt')}
                    </CartOrderSubTitle>
                    <CartOrderPrice>
                        {KRW(totalDeliveryAmt).format()}
                    </CartOrderPrice>
                </OrderPriceWrapper>
                <OrderPriceWrapper>
                    <CartOrderSubTitle>
                        {orderSheet('price.totalDiscountAmt')}
                    </CartOrderSubTitle>
                    <CartOrderPrice>
                        {KRW(Math.abs(totalDiscountAmt) * -1).format()}
                    </CartOrderPrice>
                </OrderPriceWrapper>
                <OrderPriceWrapper>
                    <CartOrderSubTitle>
                        {orderSheet('price.totalCouponAmt')}
                    </CartOrderSubTitle>
                    <CartOrderPrice>
                        {KRW(Math.abs(totalCouponAmt) * -1).format()}
                    </CartOrderPrice>
                </OrderPriceWrapper>
                <OrderPriceWrapper>
                    <CartOrderSubTitle>
                        {orderSheet('price.usedAccumulationAmt')}
                    </CartOrderSubTitle>
                    <CartOrderPrice>
                        {KRW(Math.abs(usedAccumulationAmt) * -1).format()}
                    </CartOrderPrice>
                </OrderPriceWrapper>
            </CartOrderPriceBox>
            <CartOrderPaymentAmount>
                <CartOrderSubTitle>
                    {orderSheet('price.totalPaymentAmt')}
                </CartOrderSubTitle>
                <CartOrderPrice>
                    <span>
                        {KRW(totalPaymentAmt).format({
                            symbol: '',
                            precision: 0,
                        })}
                    </span>
                    &nbsp;&nbsp;원
                </CartOrderPrice>
            </CartOrderPaymentAmount>
        </OrderSheetPriceContainer>
    );
};

export default OrderSheetPrice;
