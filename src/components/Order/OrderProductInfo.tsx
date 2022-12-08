import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import dayjs from 'dayjs';

import OrderInformationLayout from 'components/Layout/OrderInformationLayout';
import { KRW } from 'utils/currency';
import { flex } from 'utils/styles/mixin';
import PATHS from 'const/paths';
import { OrderOptionsGroupByPartner } from 'models/order';

interface OrderProductInfoProps {
    orderNo: string;
    orderYmdt: string;
    orderOptionsGroupByPartner: OrderOptionsGroupByPartner[];
}

const StyledLayout = styled(OrderInformationLayout)`
    margin-bottom: 60px;
`;

const OrderList = styled.ul`
    border-top: 1px solid #222943;
    border-bottom: 1px solid #222943;
`;

const OrderListItem = styled.li``;

const OrderTitleContainer = styled.div`
    padding: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #222943;
`;

const OrderNo = styled.h4`
    font-weight: bold;
    text-align: left;
    font-size: 16px;
    letter-spacing: 0px;
    color: #191919;
`;

const RegDt = styled.span`
    font-weight: light;
    font-size: 10px;
    color: #000000;
    letter-spacing: 0;
`;

const OrderProductList = styled.ul``;
const OrderProductListItem = styled.li`
    display: flex;
    padding: 24px 0;

    &:not(:last-of-type) {
        border-bottom: 1px solid #dbdbdb;
    }
`;
const OrderProductImage = styled.div`
    flex: 1;
    ${flex}
`;

const OrderProductContent = styled.div`
    flex: 3;
    text-align: left;
`;

const OrderProductTopContent = styled.div`
    border-bottom: 1px solid #dbdbdb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
`;

const OrderProductDownContent = styled.div`
    padding: 10px 0;
`;

const ProductName = styled.p`
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 0;
    color: #000000;
`;

const OptionName = styled.p`
    font-size: 10px;
    letter-spacing: 0;
    color: #a8a8a8;
    margin-bottom: 8px;
`;

const Price = styled.p`
    font-size: 16px;
    line-height: 24px;
`;

const OrderStatus = styled.p`
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 0;
    text-align: left;
`;

const DeliveryInfo = styled.span`
    font-weight: lighter;
    font-size: 12px;
    letter-spacing: 0px;
    color: #a8a8a8;
`;

const DeliveryInfoLink = styled(Link)`
    text-decoration: underline;
`;

const OrderProductInfo: FC<OrderProductInfoProps> = ({
    orderNo,
    orderYmdt,
    orderOptionsGroupByPartner,
}) => {
    console.log(
        '🚀 ~ file: OrderProductInfo.tsx ~ line 117 ~ orderOptionsGroupByPartner',
        orderOptionsGroupByPartner,
    );
    return (
        <StyledLayout title='주문 상세'>
            <OrderList>
                <OrderListItem>
                    <OrderTitleContainer>
                        <OrderNo>{orderNo}</OrderNo>
                        <RegDt>
                            {`(${dayjs(orderYmdt).format(
                                'YY-MM-DD HH:mm',
                            )} 주문)`}
                        </RegDt>
                    </OrderTitleContainer>

                    {orderOptionsGroupByPartner.map((a) => {
                        return a.orderOptionsGroupByDelivery.map((b) => {
                            return (
                                <OrderProductList key={b.partnerNo}>
                                    {b.orderOptions.map((c) => {
                                        return (
                                            <OrderProductListItem
                                                key={c.optionNo}
                                            >
                                                <OrderProductImage>
                                                    <Link
                                                        href={`${PATHS.PRODUCT_DETAIL}/${c.productNo}}`}
                                                    >
                                                        <img
                                                            src={c.imageUrl}
                                                            width='95'
                                                            height='95'
                                                            alt={c.productName}
                                                        />
                                                    </Link>
                                                </OrderProductImage>

                                                <OrderProductContent>
                                                    <OrderProductTopContent>
                                                        <OrderStatus>
                                                            {
                                                                c.orderStatusTypeLabel
                                                            }
                                                        </OrderStatus>
                                                        {c.delivery
                                                            .invoiceNo && (
                                                            <DeliveryInfo>
                                                                {
                                                                    c.delivery
                                                                        .deliveryCompanyTypeLabel
                                                                }
                                                                &nbsp;
                                                                {c.delivery
                                                                    .retrieveInvoiceUrl && (
                                                                    <DeliveryInfoLink
                                                                        href={
                                                                            c
                                                                                .delivery
                                                                                .retrieveInvoiceUrl
                                                                        }
                                                                    >
                                                                        {
                                                                            c
                                                                                .delivery
                                                                                .invoiceNo
                                                                        }
                                                                    </DeliveryInfoLink>
                                                                )}
                                                            </DeliveryInfo>
                                                        )}
                                                    </OrderProductTopContent>
                                                    <OrderProductDownContent>
                                                        <ProductName>
                                                            {c.productName}
                                                        </ProductName>
                                                        <OptionName>
                                                            {c.optionTitle}
                                                        </OptionName>
                                                        <Price
                                                            dangerouslySetInnerHTML={{
                                                                __html: KRW(
                                                                    '499,500',
                                                                ).format({
                                                                    symbol: '원',
                                                                    precision: 0,
                                                                    pattern: `<b>#</b> !`,
                                                                }),
                                                            }}
                                                        />
                                                    </OrderProductDownContent>
                                                </OrderProductContent>
                                            </OrderProductListItem>
                                        );
                                    })}
                                </OrderProductList>
                            );
                        });
                    })}
                </OrderListItem>
            </OrderList>
        </StyledLayout>
    );
};

export default OrderProductInfo;
