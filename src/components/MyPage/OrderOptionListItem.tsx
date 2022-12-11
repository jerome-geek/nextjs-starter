import { FC, HTMLAttributes } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import SecondaryButton from 'components/Button/SecondaryButton';
import PATHS from 'const/paths';
import { KRW } from 'utils/currency';
import { NextAction } from 'models/order';
import { CLAIM_STATUS_TYPE, ORDER_STATUS_TYPE } from 'models';
import { nextActionName } from 'utils/order';
import { flex } from 'utils/styles/mixin';

interface OrderOptionListItemProps extends HTMLAttributes<HTMLLIElement> {
    orderOptionNo: number;
    productNo: string | number;
    imageUrl: string;
    orderStatusTypeLabel: string;
    productName: string;
    optionName: string;
    orderCnt: number;
    price: any;
    invoiceNo: Nullable<string>;
    deliveryCompanyTypeLabel: string;
    nextActions: NextAction[];
    orderStatusType: ORDER_STATUS_TYPE;
    claimStatusType: Nullable<CLAIM_STATUS_TYPE>;
}

const OrderOptionListItemWrapper = styled.li`
    display: flex;
    justify-content: center;
    border-bottom: 1px solid #dbdbdb;
    padding: 20px;
`;

const OrderStatus = styled.p`
    font-size: 20px;
    color: #191919;
    letter-spacing: 0;
    font-weight: bold;
`;

const DeliveryInfo = styled.p`
    font-size: 12px;
    color: #a8a8a8;
`;

const InvoiceLink = styled.a`
    text-decoration: underline;
`;

const ProductName = styled.span`
    font-size: 16px;
    color: #191919;
    letter-spacing: 0;
`;

const OptionName = styled.span`
    font-size: 10px;
    color: #a8a8a8;
    letter-spacing: 0;
`;

const Price = styled.span`
    font-size: 16px;
    line-height: 24px;
`;

const ClaimButtonContainer = styled.div`
    ${flex}
`;

const ClaimButton = styled(SecondaryButton)`
    border: 1px solid #dbdbdb;
    font-size: 12px;
    letter-spacing: -0.48px;
    color: #191919;
    width: 100%;

    &:not(:last-of-type) {
        margin-right: 10px;
    }
`;

const OrderOptionListItem: FC<OrderOptionListItemProps> = ({
    orderOptionNo,
    productNo,
    imageUrl,
    orderStatusType,
    orderStatusTypeLabel,
    claimStatusType,
    productName,
    optionName,
    orderCnt,
    price,
    invoiceNo,
    deliveryCompanyTypeLabel,
    nextActions,
}) => {
    const router = useRouter();

    return (
        <OrderOptionListItemWrapper>
            <div style={{ flex: '1 1 25%' }}>
                <Link href={`${PATHS.PRODUCT_DETAIL}/${productNo}`}>
                    <img src={imageUrl} alt={productName} width='95' />
                </Link>
            </div>

            <div style={{ flex: '1 1 75%', textAlign: 'left' }}>
                <div
                    style={{
                        borderBottom: '1px solid #DBDBDB',
                        padding: '14px 0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <OrderStatus>{orderStatusTypeLabel}</OrderStatus>

                    {/* TODO: deliveryCompanyTypeLabel && InvoiceNo가 있을때만 보여주기 */}
                    {deliveryCompanyTypeLabel && invoiceNo && (
                        <DeliveryInfo>
                            {deliveryCompanyTypeLabel}&nbsp;
                            <InvoiceLink
                                href='/'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                {invoiceNo}
                            </InvoiceLink>
                        </DeliveryInfo>
                    )}
                </div>

                <div
                    style={{
                        padding: '10px 0',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            marginBottom: '5px',
                        }}
                    >
                        <ProductName>{productName}</ProductName>
                        <OptionName>{`${optionName} ${orderCnt}개`}</OptionName>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Price
                            dangerouslySetInnerHTML={{
                                __html: KRW(
                                    price.immediateDiscountedPrice,
                                ).format({
                                    symbol: '원',
                                    precision: 0,
                                    pattern: `<b>#</b> !`,
                                }),
                            }}
                        />
                        <ClaimButtonContainer>
                            <ClaimButton
                                onClick={() =>
                                    router.push({
                                        pathname: '/mypage/claim/inquiry',
                                        query: {
                                            orderOptionNo,
                                        },
                                    })
                                }
                            >
                                문의하기
                            </ClaimButton>
                            <ClaimButton
                                onClick={() =>
                                    router.push({
                                        pathname: '/mypage/claim/exchange',
                                        query: {
                                            orderOptionNo,
                                        },
                                    })
                                }
                            >
                                교환하기
                            </ClaimButton>
                            <ClaimButton
                                onClick={() =>
                                    router.push({
                                        pathname: '/mypage/claim/return',
                                        query: {
                                            orderOptionNo,
                                        },
                                    })
                                }
                            >
                                반품요청
                            </ClaimButton>
                            {/* <ClaimButton
                                onClick={() =>
                                    router.push('/mypage/claim/refund', {
                                        query: {
                                            productNo,
                                            orderOptionNo,
                                            imageUrl,
                                            productName,
                                            optionName,
                                            orderCnt,
                                        },
                                    })
                                }
                            >
                                취소요청
                            </ClaimButton> */}
                            {/* {nextActions?.map((action, index) => {
                                return (
                                    <ClaimButton key={index}>
                                        {nextActionName(
                                            orderStatusType,
                                            action.nextActionType,
                                            claimStatusType,
                                        )}
                                    </ClaimButton>
                                );
                            })} */}
                        </ClaimButtonContainer>
                    </div>
                </div>
            </div>
        </OrderOptionListItemWrapper>
    );
};

export default OrderOptionListItem;
