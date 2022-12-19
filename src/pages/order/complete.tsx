import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useWindowSize } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import LayoutResponsive from 'components/shared/LayoutResponsive';
import OrderCompleteTopContent from 'components/OrderSheet/OrderCompleteTopContent';
import CartList from 'components/Cart/CartList';
import OrderProgress from 'components/OrderSheet/OrderProgress';
import DepositInfo from 'components/Order/DepositInfo';
import PaymentInfo from 'components/Order/PaymentInfo';
import DeliveryInfo from 'components/Order/DeliveryInfo';
import PATHS from 'const/paths';
import media from 'utils/styles/media';
import { isDesktop, isMobile } from 'utils/styles/responsive';
import { isBankInfoVisible } from 'utils/order';
import { guestOrder, myOrder } from 'api/order';
import { ORDER_REQUEST_TYPE, PAY_TYPE } from 'models';
import { OrderProductOption } from 'models/order';
import { useMember, useQueryString } from 'hooks';
import { HTTP_RESPONSE } from 'const/http';

const CompleteContainer = styled(LayoutResponsive)`
    max-width: 840px;
`;

const ButtonContainer = styled.div`
    margin-bottom: 90px;
    font-size: 16px;
    letter-spacing: -0.64px;
    line-height: 44px;
    display: flex;
    width: fit-content;
    margin: 0 auto;
    ${media.xlarge} {
        width: 100%;
        justify-content: space-between;
        > a {
            height: 54px;
            width: 48.94%;
            line-height: 54px;
            font-size: 1.143rem;
        }
    }
    ${media.medium} {
        > a {
            font-size: 1.333rem;
        }
    }
`;

const OrderListButton = styled(Link)`
    display: block;
    color: ${(props) => props.theme.text1};
    border: ${(props) => `1px solid ${props.theme.line2}`};
    width: 210px;
    height: 44px;
    margin-right: 21px;
    ${media.medium} {
        margin-right: 0;
    }
`;

const ContinueShoppingButton = styled(Link)`
    display: block;
    background: ${(props) => props.theme.secondary};
    color: #fff;
    width: 210px;
    height: 44px;
`;

const GoMainButton = styled(ContinueShoppingButton)`
    margin: 0 auto;
`;

const OrderProductListBox = styled.div`
    margin-top: 91px;
    border-top: 2px solid #222943;
    border-bottom: ${(props) => `2px solid ${props.theme.secondary}`};
`;

const OrderCategoryBox = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: ${(props) => `1px solid ${props.theme.secondary}`};
    > div {
        padding: 20px 0;
        text-align: center;
        color: ${(props) => props.theme.text1};
        font-weight: bold;
    }
`;

const OrderInformation = styled.div`
    width: 29%;
    display: flex;
    justify-content: space-around;
`;

const OrderCount = styled.div`
    width: 18%;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
        display: flex;
        justify-content: center;
        align-items: center;
        border: ${(props) => `1px solid ${props.theme.line2}`};
        width: 78px;
        > div {
            width: 26px;
            text-align: center;
            height: 30px;
            line-height: 30px;
        }
    }
`;

const OrderPrice = styled.div`
    width: 140px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > p {
        font-size: 16px;
        color: #191919;
        position: relative;
        > span {
            display: block;
            position: absolute;
            bottom: 100%;
            text-decoration: line-through;
            font-size: 12px;
            color: #ababab;
        }
    }
`;

const OrderDelivery = styled.div`
    width: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #191919;
    font: 16px;
`;

const OrderAmountPrice = styled.div`
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    > span {
        font-weight: 400;
    }
`;

const Complete = () => {
    const query = useQueryString();

    const [orderList, setOrderList] = useState<
        Array<
            OrderProductOption & {
                deliveryAmt: number;
                productName: string;
            }
        >
    >([]);

    const { width } = useWindowSize();

    const { t: orderComplete } = useTranslation('orderComplete');

    // TODO: https://shopby.works/guide/dev-cover/order#/pay-button, useQueryString
    const orderParam = useMemo(
        () => new URLSearchParams(window.location.search),
        [],
    );

    const { member } = useMember();
    const isLogin = useMemo(() => !!member, [member]);

    const router = useRouter();

    const { message, message_enc, orderSheetNo, result, orderNo } =
        router.query as {
            message: string;
            message_enc: string;
            orderSheetNo: string;
            result: string;
            orderNo: string;
        };

    // TODO 캐시타임 지정 후 stale 상태이면 refetch or redirect
    const { data: orderCompleteData } = useQuery(
        ['orderCompleteData', { member: member?.memberName }],
        async () =>
            await myOrder.getOrderDetail(orderParam.get('orderNo')!, {
                orderRequestTypes: ORDER_REQUEST_TYPE.ALL,
            }),
        {
            enabled: isLogin && !!orderParam.get('orderNo'),
            select: (res) => ({ ...res.data, status: res.status }),
            onSuccess: (data) => {
                if (data.status === HTTP_RESPONSE.HTTP_OK) {
                    data.orderOptionsGroupByPartner.forEach(
                        (partnerOptionGroup: any) => {
                            partnerOptionGroup.orderOptionsGroupByDelivery.forEach(
                                (deliveryOptionGroup: any) => {
                                    deliveryOptionGroup.orderOptions.forEach(
                                        ({
                                            accumulationAmt,
                                            optionNo,
                                            imageUrl,
                                            optionManagementCd,
                                            optionName,
                                            optionTitle,
                                            optionType,
                                            optionValue,
                                            orderCnt,
                                            price,
                                            productName,
                                            productNo,
                                            reservation,
                                            reservationDeliveryYmdt,
                                            setOptions,
                                            inputs,
                                            validInfo,
                                        }: any) => {
                                            setOrderList((prev) => [
                                                ...prev,
                                                {
                                                    accumulationAmtWhenBuyConfirm:
                                                        accumulationAmt,
                                                    cartNo: optionNo,
                                                    deliveryAmt:
                                                        deliveryOptionGroup.deliveryAmt,
                                                    imageUrl,
                                                    optionInputs: inputs,
                                                    optionManagementCd,
                                                    optionName,
                                                    optionNo,
                                                    optionTitle,
                                                    optionType,
                                                    optionValue,
                                                    orderCnt,
                                                    price,
                                                    productName,
                                                    productNo,
                                                    recurringDeliveryCycles:
                                                        null,
                                                    reservation,
                                                    reservationDeliveryYmdt,
                                                    setOptions,
                                                    validInfo,
                                                    soldOut: false, // TODO: check 필요
                                                    stockCnt: 999999, // TODO: check 필요
                                                },
                                            ]);
                                        },
                                    );
                                },
                            );
                        },
                    );
                }
            },
            onError: (error) => {
                console.log(
                    '🚀 ~ file: Complete.tsx ~ line 449 ~ Complete ~ error',
                    error,
                );
            },
        },
    );

    const { data: guestOrderCompleteData } = useQuery(
        ['guestOrderCompleteData'],
        async () =>
            guestOrder.getOrderDetail(
                orderParam.get('guestToken')!,
                orderParam.get('orderNo')!,
                {
                    orderRequestType: ORDER_REQUEST_TYPE.ALL,
                },
            ),
        {
            enabled: !isLogin && !!orderParam.get('orderNo'),
            select: (res) => ({ ...res.data, status: res.status }),
            onSuccess: (data) => {
                if (data.status === HTTP_RESPONSE.HTTP_OK) {
                    data.orderOptionsGroupByPartner.forEach(
                        (partnerOptionGroup: any) => {
                            partnerOptionGroup.orderOptionsGroupByDelivery.forEach(
                                (deliveryOptionGroup: any) => {
                                    deliveryOptionGroup.orderOptions.forEach(
                                        ({
                                            accumulationAmt,
                                            optionNo,
                                            imageUrl,
                                            optionManagementCd,
                                            optionName,
                                            orderOptionNo,
                                            optionTitle,
                                            optionType,
                                            optionValue,
                                            orderCnt,
                                            price,
                                            productName,
                                            productNo,
                                            reservation,
                                            reservationDeliveryYmdt,
                                            setOptions,
                                            inputs,
                                            validInfo,
                                        }: any) => {
                                            setOrderList([
                                                {
                                                    accumulationAmtWhenBuyConfirm:
                                                        accumulationAmt,
                                                    cartNo: optionNo,
                                                    deliveryAmt:
                                                        deliveryOptionGroup.deliveryAmt,
                                                    imageUrl,
                                                    optionInputs: inputs,
                                                    optionManagementCd,
                                                    optionName,
                                                    optionNo,
                                                    optionTitle,
                                                    optionType,
                                                    optionValue,
                                                    orderCnt,
                                                    price,
                                                    productName,
                                                    productNo,
                                                    recurringDeliveryCycles:
                                                        null,
                                                    reservation,
                                                    reservationDeliveryYmdt,
                                                    setOptions,
                                                    validInfo,
                                                    soldOut: false, // TODO: check 필요
                                                    stockCnt: 999999, // TODO: check 필요
                                                },
                                            ]);
                                        },
                                    );
                                },
                            );
                        },
                    );
                } else {
                    // TODO: 에러처리 및 타입 정의 필요
                    alert('에러가 발생했습니다.');
                    router.push(PATHS.MAIN);
                }
            },
            onError: (error) => {
                alert('에러가 발생했습니다.');
            },
        },
    );

    const orderInfo = useMemo(
        () => (isLogin ? orderCompleteData : guestOrderCompleteData),
        [isLogin, orderCompleteData, guestOrderCompleteData],
    );

    return (
        <>
            <NextSeo title={orderComplete('progress.now')!} />

            <CompleteContainer>
                {!isMobile(width) && (
                    <OrderProgress
                        type='complete'
                        style={{ marginBottom: '48px' }}
                    />
                )}

                {result && (
                    <OrderCompleteTopContent
                        result={result as 'SUCCESS' | 'FAIL'}
                        payType={orderInfo && (orderInfo.payType as PAY_TYPE)}
                        orderNo={orderNo && (orderNo as string)}
                        paymentExpirationYmdt={
                            orderInfo &&
                            orderInfo.payInfo?.bankInfo?.paymentExpirationYmdt
                        }
                        message={message as string}
                    />
                )}

                {orderInfo && (
                    <>
                        {isBankInfoVisible(orderInfo?.payType) && (
                            <DepositInfo
                                paymentAmt={orderInfo.payInfo.payAmt || 0}
                                bankName={orderInfo.payInfo.bankInfo.bankName}
                                account={orderInfo.payInfo.bankInfo.account}
                                remitterName={
                                    orderInfo.payInfo.bankInfo.remitterName
                                }
                                paymentExpirationYmdt={
                                    orderInfo.payInfo.bankInfo
                                        .paymentExpirationYmdt
                                }
                            />
                        )}

                        <PaymentInfo
                            payAmt={orderInfo.payInfo.payAmt || 0}
                            standardAmt={orderInfo.lastOrderAmount.standardAmt}
                            deliveryAmt={orderInfo.lastOrderAmount.deliveryAmt}
                            totalDiscountAmt={
                                orderInfo.lastOrderAmount.immediateDiscountAmt +
                                orderInfo.lastOrderAmount.additionalDiscountAmt
                            }
                            totalCouponAmt={
                                orderInfo.lastOrderAmount
                                    .cartCouponDiscountAmt +
                                orderInfo.lastOrderAmount
                                    .productCouponDiscountAmt +
                                orderInfo.lastOrderAmount
                                    .deliveryCouponDiscountAmt
                            }
                            subPayAmt={orderInfo.lastOrderAmount.subPayAmt}
                        />

                        <DeliveryInfo
                            receiverName={
                                orderInfo.shippingAddress.receiverName || ''
                            }
                            receiverAddress={
                                orderInfo.shippingAddress.receiverAddress || ''
                            }
                            receiverContact={
                                orderInfo.shippingAddress.receiverContact1 || ''
                            }
                        />
                    </>
                )}

                <ButtonContainer>
                    {result === 'SUCCESS' && (
                        <>
                            <OrderListButton
                                href={
                                    member
                                        ? PATHS.MY_ORDER_LIST
                                        : PATHS.GUEST_LOGIN
                                }
                            >
                                {orderComplete('etc.viewOrderList')}
                            </OrderListButton>
                            <ContinueShoppingButton href={PATHS.MAIN}>
                                {orderComplete('etc.keepShopping')}
                            </ContinueShoppingButton>
                        </>
                    )}
                    {result === 'FAIL' && (
                        <GoMainButton href={PATHS.MAIN}>
                            {orderComplete('etc.keepShopping')}
                        </GoMainButton>
                    )}
                </ButtonContainer>

                {orderList.length > 0 && (
                    <OrderProductListBox>
                        {isDesktop(width) && (
                            <OrderCategoryBox>
                                <OrderInformation>
                                    {orderComplete(
                                        'orderProductList.category.productInformation',
                                    )}
                                </OrderInformation>
                                <OrderCount>
                                    {orderComplete(
                                        'orderProductList.category.count',
                                    )}
                                </OrderCount>
                                <OrderPrice>
                                    {orderComplete(
                                        'orderProductList.category.price',
                                    )}
                                </OrderPrice>
                                <OrderDelivery>
                                    {orderComplete(
                                        'orderProductList.category.deliverPrice',
                                    )}
                                </OrderDelivery>
                                <OrderAmountPrice>
                                    {orderComplete(
                                        'orderProductList.category.totalPrice',
                                    )}
                                </OrderAmountPrice>
                            </OrderCategoryBox>
                        )}
                        {orderList?.map((orderData) => {
                            return (
                                <CartList
                                    cartData={orderData}
                                    key={orderData.optionNo}
                                    isModifiable={false}
                                />
                            );
                        })}
                    </OrderProductListBox>
                )}
            </CompleteContainer>
        </>
    );
};

export default Complete;

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!, [
                'orderComplete',
                'orderSheet',
            ])),
        },
    };
};
