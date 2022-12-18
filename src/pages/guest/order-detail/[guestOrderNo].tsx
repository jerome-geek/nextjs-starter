import styled from 'styled-components';

import LayoutResponsive from 'components/shared/LayoutResponsive';
import PrimaryButton from 'components/Button/PrimaryButton';
import SecondaryButton from 'components/Button/SecondaryButton';
import DepositInfo from 'components/Order/DepositInfo';
import PaymentInfo from 'components/Order/PaymentInfo';
import DeliveryInfo from 'components/Order/DeliveryInfo';
import OrderProductInfo from 'components/Order/OrderProductInfo';
import useGuestOrderDetail from 'hooks/queries/useGuestOrderDetail';
import { isBankInfoVisible } from 'utils/order';
import media from 'utils/styles/media';
import PATHS from 'const/paths';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const GuestOrderDetailContainer = styled(LayoutResponsive)`
    max-width: 840px;
`;

const ButtonContainer = styled.div`
    width: 100%;
    max-width: 440px;
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-between;

    ${media.medium} {
        max-width: 380px;
    }
`;

const CancelOrderButton = styled(SecondaryButton)`
    max-width: 200px;
    border: 1px solid #dbdbdb;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.64px;
    color: #000000;

    ${media.medium} {
        max-width: 186px;
        height: 54px;
    }
`;

const FaqButton = styled(PrimaryButton)`
    max-width: 200px;

    ${media.medium} {
        max-width: 186px;
        height: 54px;
    }
`;

// TODO: 주문번호가 유효하지 않거나 잘못된 주문번호일 경우 처리 필요
const GuestOrderDetail = () => {
    const router = useRouter();
    const { guestOrderNo } = router.query as { guestOrderNo: string };

    if (!guestOrderNo) {
        router.push(PATHS.GUEST_LOGIN);
    }

    // TODO: 주문 취소 처리 추가
    const onCancelOrderClick = () => {
        console.log(
            '주문취소 버튼은 입금대기 / 결제완료 상태인 경우에만 노출됩니다.',
        );
    };

    const onFaqButtonClick = () => {
        router.push(PATHS.FAQ);
    };

    const guestOrderData = useGuestOrderDetail({
        guestOrderNo,
        options: {
            onError: (error) => {
                alert(error?.response?.data?.message);
                router.push(PATHS.GUEST_LOGIN);
            },
        },
    });

    return (
        <>
            <GuestOrderDetailContainer>
                {guestOrderData.data && (
                    <>
                        <OrderProductInfo
                            key={guestOrderData.data.orderNo}
                            orderNo={guestOrderData.data.orderNo}
                            orderYmdt={guestOrderData.data.orderYmdt}
                            orderOptionsGroupByPartner={
                                guestOrderData.data.orderOptionsGroupByPartner
                            }
                        />

                        {isBankInfoVisible(guestOrderData.data?.payType) && (
                            <DepositInfo
                                paymentAmt={
                                    guestOrderData.data.payInfo.payAmt || 0
                                }
                                bankName={
                                    guestOrderData.data.payInfo.bankInfo
                                        .bankName
                                }
                                account={
                                    guestOrderData.data.payInfo.bankInfo.account
                                }
                                remitterName={
                                    guestOrderData.data.payInfo.bankInfo
                                        .remitterName
                                }
                                paymentExpirationYmdt={
                                    guestOrderData.data.payInfo.bankInfo
                                        .paymentExpirationYmdt
                                }
                            />
                        )}

                        <PaymentInfo
                            payAmt={guestOrderData.data.payInfo.payAmt || 0}
                            standardAmt={
                                guestOrderData.data.lastOrderAmount.standardAmt
                            }
                            deliveryAmt={
                                guestOrderData.data.lastOrderAmount.deliveryAmt
                            }
                            totalDiscountAmt={
                                guestOrderData.data.lastOrderAmount
                                    .immediateDiscountAmt +
                                guestOrderData.data.lastOrderAmount
                                    .additionalDiscountAmt
                            }
                            totalCouponAmt={
                                guestOrderData.data.lastOrderAmount
                                    .cartCouponDiscountAmt +
                                guestOrderData.data.lastOrderAmount
                                    .productCouponDiscountAmt +
                                guestOrderData.data.lastOrderAmount
                                    .deliveryCouponDiscountAmt
                            }
                            subPayAmt={
                                guestOrderData.data.lastOrderAmount.subPayAmt
                            }
                        />

                        <DeliveryInfo
                            receiverName={
                                guestOrderData.data.shippingAddress
                                    .receiverName || ''
                            }
                            receiverAddress={
                                guestOrderData.data.shippingAddress
                                    .receiverAddress || ''
                            }
                            receiverContact={
                                guestOrderData.data.shippingAddress
                                    .receiverContact1 || ''
                            }
                        />
                    </>
                )}

                <ButtonContainer>
                    {/* TODO: 주문취소 요건 확인 */}
                    <CancelOrderButton onClick={onCancelOrderClick}>
                        주문취소
                    </CancelOrderButton>

                    <FaqButton onClick={onFaqButtonClick}>
                        FAQ 바로가기
                    </FaqButton>
                </ButtonContainer>
            </GuestOrderDetailContainer>
        </>
    );
};

export default GuestOrderDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!)),
        },
    };
};
