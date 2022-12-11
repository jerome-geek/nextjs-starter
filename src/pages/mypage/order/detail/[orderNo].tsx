import { useRouter } from 'next/router';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LayoutResponsive from 'components/shared/LayoutResponsive';
import OrderProductInfo from 'components/Order/OrderProductInfo';
import DepositInfo from 'components/Order/DepositInfo';
import PaymentInfo from 'components/Order/PaymentInfo';
import DeliveryInfo from 'components/Order/DeliveryInfo';
import useOrderDetail from 'hooks/queries/useOrderDetail';
import { isBankInfoVisible } from 'utils/order';

const OrderDetailContainer = styled(LayoutResponsive)`
    max-width: 840px;
`;

const OrderDetail = () => {
    const router = useRouter();

    const { orderNo } = router.query as { orderNo: string };

    const orderDetailData = useOrderDetail({ orderNo });

    return (
        <OrderDetailContainer>
            {orderDetailData.data && (
                <>
                    <OrderProductInfo
                        key={orderDetailData?.data?.orderNo}
                        orderNo={orderDetailData?.data?.orderNo}
                        orderYmdt={orderDetailData?.data?.orderYmdt}
                        orderOptionsGroupByPartner={
                            orderDetailData?.data?.orderOptionsGroupByPartner
                        }
                    />

                    {isBankInfoVisible(orderDetailData?.data?.payType) && (
                        <DepositInfo
                            paymentAmt={
                                orderDetailData?.data?.payInfo.payAmt || 0
                            }
                            bankName={
                                orderDetailData?.data?.payInfo.bankInfo.bankName
                            }
                            account={
                                orderDetailData?.data?.payInfo.bankInfo.account
                            }
                            remitterName={
                                orderDetailData?.data?.payInfo.bankInfo
                                    .remitterName
                            }
                            paymentExpirationYmdt={
                                orderDetailData?.data?.payInfo.bankInfo
                                    .paymentExpirationYmdt
                            }
                        />
                    )}

                    <PaymentInfo
                        payAmt={orderDetailData.data.payInfo.payAmt || 0}
                        standardAmt={
                            orderDetailData.data.lastOrderAmount.standardAmt
                        }
                        deliveryAmt={
                            orderDetailData.data.lastOrderAmount.deliveryAmt
                        }
                        totalDiscountAmt={
                            orderDetailData.data.lastOrderAmount
                                .immediateDiscountAmt +
                            orderDetailData.data.lastOrderAmount
                                .additionalDiscountAmt
                        }
                        totalCouponAmt={
                            orderDetailData.data.lastOrderAmount
                                .cartCouponDiscountAmt +
                            orderDetailData.data.lastOrderAmount
                                .productCouponDiscountAmt +
                            orderDetailData.data.lastOrderAmount
                                .deliveryCouponDiscountAmt
                        }
                        subPayAmt={
                            orderDetailData.data.lastOrderAmount.subPayAmt
                        }
                    />

                    <DeliveryInfo
                        receiverName={
                            orderDetailData.data.shippingAddress.receiverName ||
                            ''
                        }
                        receiverAddress={
                            orderDetailData.data.shippingAddress
                                .receiverAddress || ''
                        }
                        receiverContact={
                            orderDetailData.data.shippingAddress
                                .receiverContact1 || ''
                        }
                    />
                </>
            )}
        </OrderDetailContainer>
    );
};

export default OrderDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {},
    };
};
