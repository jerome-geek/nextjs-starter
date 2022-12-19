import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { useScript, useWindowSize } from 'usehooks-ts';
import { useTranslation } from 'react-i18next';
import { every, pipe, toArray, map } from '@fxts/core';
import { DevTool } from '@hookform/devtools';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import CartList from 'components/Cart/CartList';
import OrdererInformation from 'components/OrderSheet/OrdererInformation';
import ShippingAddress from 'components/OrderSheet/ShippingAddress';
import DiscountApply from 'components/OrderSheet/DiscountApply';
import CommonPayment from 'components/OrderSheet/CommonPayment';
import OrderSheetPrice from 'components/OrderSheet/OrderSheetPrice';
import AdditionalInfo from 'components/OrderSheet/AdditionalInfo';
import GuestOrderPassword from 'components/OrderSheet/GuestOrderPassword';
import OrderTermsAgreement from 'components/OrderSheet/OrderTermsAgreement';
import OrderProgress from 'components/OrderSheet/OrderProgress';
import ShippingListModal from 'components/Modal/ShippingListModal';
import MobileShippingListModal from 'components/Modal/MobileShippingListModal';
import SearchAddressModal from 'components/Modal/SearchAddressModal';
import CouponListModal from 'components/Modal/CouponListModal';
import MobileCouponListModal from 'components/Modal/MobileCouponListModal';
import PaymentButton from 'components/Button/PaymentButton';
import Checked from 'assets/icons/checkbox_square_checked.svg';
import UnChecked from 'assets/icons/checkbox_square_unchecked.svg';
import {
    ADDRESS_TYPE,
    CHANNEL_TYPE,
    COUNTRY_CD,
    PAY_TYPE,
    PG_TYPE,
} from 'models';
import {
    CouponRequest,
    GetCalculatedOrderSheet,
    OrderProductOption,
    PaymentInfo,
    PaymentReserve,
} from 'models/order';
import { orderSheet } from 'api/order';
import media from 'utils/styles/media';
import { isMobile } from 'utils/styles/responsive';
import { useMall } from 'hooks/queries';
import { useMember } from 'hooks';
import PATHS from 'const/paths';
import { KRW } from 'utils/currency';
import payment from 'utils/payment';
import { HTTP_RESPONSE } from 'const/http';
import { isLogin } from 'utils/users';
import { useOrderSheet } from 'hooks/queries';

const OrderSheetContainer = styled.form`
    width: 1280px;
    margin: 118px auto;

    ${media.custom(1280)} {
        padding: 0 24px;
        margin-top: 35px;
        width: 100%;
    }
`;

const SheetMainContainer = styled.div`
    width: 1280px;
    display: flex;
    justify-content: space-between;
    position: relative;
    ${media.custom(1280)} {
        width: 100%;
    }
    ${media.medium} {
        margin-top: 25px;
        margin-bottom: 10px;
        flex-direction: column;
    }
`;

const SheetOrderWrapper = styled.div`
    width: 838px;
    ${media.custom(1280)} {
        width: 65.4%;
    }
    ${media.medium} {
        width: 100%;
    }
`;

const GuestLoginBox = styled.div`
    border: ${(props) => `1px solid ${props.theme.line2}`};
    text-align: left;
    padding: 18px 18px;
    font-size: 16px;
    color: #000;
    line-height: 28px;
    letter-spacing: -0.64px;
    > a {
        font-weight: bold;
        text-decoration: underline;
    }
`;

const SheetTitle = styled.div<{ marginTop?: string }>`
    position: relative;
    display: flex;
    align-items: center;
    margin: ${(props) =>
        props.marginTop
            ? `${props.marginTop} 0 20px 28px`
            : '60px 0 20px 28px'};
    > h3 {
        text-align: left;
        color: ${(props) => props.theme.text1};
        font-size: 1.5rem;
        font-weight: bold;
    }
    .shipping-info {
        color: #000;
        font-size: 0.75rem;
        border: ${(props) => `1px solid ${props.theme.line2}`};
        padding: 5px 11px;
        margin-left: 20px;
        cursor: pointer;
    }
    .order-info {
        position: absolute;
        right: 0;
        bottom: 0;
        color: #8f8f8f;
        > input {
            display: none;
        }
        > label {
            display: flex;
            align-items: center;
            cursor: pointer;
            > p {
                margin-left: 9px;
            }
        }
    }
    ${media.medium} {
        margin: ${(props) =>
            props.marginTop ? `${props.marginTop} 0 20px` : '44px 0 20px'};
        h3 {
            font-size: 1.25rem;
            letter-spacing: -0.72px;
        }
        .shipping-info {
            font-size: 0.75rem;
            letter-spacing: -0.4px;
        }
        .order-info {
            font-size: 1rem;
            letter-spacing: -0.56px;
        }
    }
    ${media.small} {
        h3 {
            font-size: 1.8rem;
            letter-spacing: -0.72px;
        }
        .shipping-info {
            font-size: 1rem;
            letter-spacing: -0.4px;
        }
        .order-info {
            font-size: 1.4rem;
            letter-spacing: -0.56px;
        }
    }
`;

const OrderProductListBox = styled.div`
    border-top: ${(props) => `2px solid ${props.theme.secondary}`};
    border-bottom: ${(props) => `2px solid ${props.theme.secondary}`};
`;

const CartCategoryBox = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #dbdbdb;
    > div {
        padding: 20px 0;
        text-align: center;
        color: #191919;
        font-size: 16px;
        font-weight: bold;
    }
`;

const CartInformation = styled.div`
    width: 29%;
    display: flex;
    justify-content: space-around;
`;

const CartCountBox = styled.div`
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

const CartPrice = styled.div`
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

const CartDelivery = styled.div`
    width: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #191919;
    font: 16px;
`;

const CartAmount = styled.div`
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    > span {
        font-weight: 400;
    }
`;

const SheetOrderPriceWrapper = styled.div`
    height: fit-content;
    position: sticky;
    right: 0;
    top: 84px;
    width: 400px;
    ${media.custom(1280)} {
        width: 31.25%;
    }
    ${media.medium} {
        width: 100%;
        margin-top: 44px;
    }
`;

const ncpPayScript = process.env.NEXT_PUBLIC_NCP_PAY_SCRIPT;
const payPlusScript = process.env.NEXT_PUBLIC_PAY_PLUS_SCRIPT;
const inisisPayScript = process.env.NEXT_PUBLIC_INISIS_PAY_SCRIPT;

const Sheet = () => {
    const router = useRouter();
    const { orderSheetNo } = router.query as { orderSheetNo: string };

    useScript(ncpPayScript!);
    useScript(payPlusScript!);
    useScript(inisisPayScript!);

    const { member } = useMember();

    const { width } = useWindowSize();

    const [orderList, setOrderList] = useState<
        Array<
            OrderProductOption & {
                deliveryAmt: number;
                productName: string;
            }
        >
    >([]);
    const [ordererInformation, setOrdererInformation] = useState(false);
    const [orderTerms, setOrderTerms] = useState<
        { id: string; url: ''; isChecked: boolean }[]
    >([
        { id: 'agreeOrderService', url: '', isChecked: false },
        {
            id: 'agreeOrderInformation',
            url: '',
            isChecked: false,
        },
        { id: 'agreePurchase', url: '', isChecked: false },
    ]);

    useEffect(() => {
        setOrderTerms(
            isLogin() || (!isLogin() && isMobile(width))
                ? [{ id: 'agreePurchase', url: '', isChecked: false }]
                : [
                      { id: 'agreeOrderService', url: '', isChecked: false },
                      {
                          id: 'agreeOrderInformation',
                          url: '',
                          isChecked: false,
                      },
                      { id: 'agreePurchase', url: '', isChecked: false },
                  ],
        );
    }, [width]);

    const [isShippingListModal, setIsShippingListModal] = useState(false);
    const [isSearchAddressModal, setIsSearchAddressModal] = useState(false);
    const [isCouponListModal, setIsCouponListModal] = useState(false);
    const [selectCoupon, setSelectCoupon] = useState<CouponRequest>();
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
        accumulationAmt: 0,
        accumulationAmtWhenBuyConfirm: 0,
        availableMaxAccumulationAmt: 0,
        cartAmt: 0,
        cartCouponAmt: 0,
        customsDuty: 0,
        deliveryAmt: 0,
        deliveryAmtOnDelivery: 0,
        deliveryCouponAmt: 0,
        isAvailableAccumulation: true,
        minAccumulationLimit: 0,
        minPriceLimit: 0,
        paymentAmt: 0,
        productAmt: 0,
        productCouponAmt: 0,
        remoteDeliveryAmt: 0,
        remoteDeliveryAmtOnDelivery: 0,
        salesTaxAmt: 0,
        totalAdditionalDiscountAmt: 0,
        totalImmediateDiscountAmt: 0,
        totalStandardAmt: 0,
        usedAccumulationAmt: 0,
    });

    const { data: mallInfo } = useMall();

    const { t: sheet } = useTranslation('orderSheet');

    const { data: orderData, refetch: orderRefetch } = useOrderSheet({
        orderSheetNo,
        options: {
            onSuccess: (data) => {
                setOrderList(() => {
                    const newOrderList: Array<
                        OrderProductOption & {
                            deliveryAmt: number;
                            productName: string;
                        }
                    > = [];
                    data?.deliveryGroups.forEach((deliveryGroup) => {
                        deliveryGroup.orderProducts.forEach((orderProduct) => {
                            orderProduct.orderProductOptions.forEach(
                                (productOption) => {
                                    newOrderList.push({
                                        ...productOption,
                                        deliveryAmt: deliveryGroup.deliveryAmt,
                                        productName: orderProduct.productName,
                                    });
                                },
                            );
                        });
                    });
                    return [...newOrderList];
                });
                setPaymentInfo(data?.paymentInfo);
            },
        },
    });

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        control,
        formState: { errors },
    } = useForm<PaymentReserve>({
        defaultValues: {
            orderSheetNo,
            orderTitle: '',
            pgType: PG_TYPE.INICIS,
            payType: PAY_TYPE.CREDIT_CARD,
            orderer: {
                ordererName: member?.memberName,
                ordererEmail: member?.email,
                ordererContact1: member?.mobileNo,
                ordererContact2: '',
            },
            shippingAddress: {
                addressNo: 0,
                receiverZipCd: '',
                receiverAddress: '',
                receiverJibunAddress: '',
                receiverDetailAddress: '',
                receiverName: '',
                addressName: '',
                requestShippingDate: '',
                receiverContact1: '',
                receiverContact2: '',
                countryCd: COUNTRY_CD.KR,
                shippingInfoLaterInputContact: '',
            },
            // orderTitle:
            //     orderData?.data.deliveryGroups[0]?.orderProducts[0]
            //         ?.productName,
            useDefaultAddress: false,
            deliveryMemo: '',
            member: isLogin(),
            // coupons: {
            //     productCoupons: null,
            //     cartCouponIssueNo: null,
            // },
            tempPassword: '', // TODO: 비회원용
            updateMember: false,
            subPayAmt: 0,
            inAppYn: 'N',
            // accumulationAmt: 0,  // TODO: schema 확인 필요
            // availableMaxAccumulationAmt: 0,  // TODO: schema 확인 필요
            // paymentAmt: 0, // TODO: schema 확인 필요
            // paymentAmt: orderData?.data.paymentInfo.paymentAmt,
            bankAccountToDeposit: {
                bankAccount: mallInfo?.bankAccountInfo.bankAccount,
                bankCode: mallInfo?.bankAccountInfo.bankName,
                bankDepositorName: mallInfo?.bankAccountInfo.bankDepositorName,
            },
        },
    });

    useEffect(() => {
        setValue(
            'bankAccountToDeposit.bankAccount',
            mallInfo?.bankAccountInfo.bankAccount || '',
        );
        setValue(
            'bankAccountToDeposit.bankCode',
            mallInfo?.bankAccountInfo.bankName || '',
        );
        setValue(
            'bankAccountToDeposit.bankDepositorName',
            mallInfo?.bankAccountInfo.bankDepositorName || '',
        );
        // ordererName: member?.memberName,
        // ordererEmail: member?.email,
        // ordererContact1: member?.mobileNo,
        setValue('orderer.ordererName', member?.memberName || '');
        setValue('orderer.ordererEmail', member?.email || '');
        setValue('orderer.ordererContact1', member?.mobileNo || '');
    }, [mallInfo, member, setValue]);

    const totalDeliveryAmt = useMemo(
        () => paymentInfo?.deliveryAmt + paymentInfo?.remoteDeliveryAmt,
        [paymentInfo?.deliveryAmt, paymentInfo?.remoteDeliveryAmt],
    );
    const totalDiscountAmt = useMemo(
        () =>
            paymentInfo?.totalImmediateDiscountAmt +
            paymentInfo?.totalAdditionalDiscountAmt,
        [
            paymentInfo?.totalImmediateDiscountAmt,
            paymentInfo?.totalAdditionalDiscountAmt,
        ],
    );
    const totalCouponAmt = useMemo(
        () =>
            paymentInfo?.cartCouponAmt +
            paymentInfo?.productCouponAmt +
            paymentInfo?.deliveryCouponAmt,
        [
            paymentInfo?.cartCouponAmt,
            paymentInfo?.productCouponAmt,
            paymentInfo?.deliveryCouponAmt,
        ],
    );
    const isAdditionalInfoVisible = useMemo(
        () => !!orderData?.requireCustomsIdNumber,
        [orderData?.requireCustomsIdNumber],
    );

    const { mutate: couponApplyMutate } = useMutation(
        async () =>
            await orderSheet.applyCoupon(orderSheetNo, {
                cartCouponIssueNo: selectCoupon?.cartCouponIssueNo,
                channelType: CHANNEL_TYPE.NAVER_EP,
                promotionCode: selectCoupon?.promotionCode,
                productCoupons: selectCoupon?.productCoupons,
            }),
        {
            onSuccess: () => {
                orderRefetch();
            },
        },
    );

    const isAllOrderTermsChecked = useMemo(
        () =>
            pipe(
                orderTerms,
                every((b) => b.isChecked),
            ),
        [orderTerms],
    );

    const agreeAllHandler = (checked: boolean) => {
        setOrderTerms((prev) =>
            pipe(
                prev,
                map((a) => ({ ...a, isChecked: checked })),
                toArray,
            ),
        );
    };

    const agreeHandler = (term: string) => {
        setOrderTerms((prev) =>
            pipe(
                prev,
                map((a) =>
                    a.id === term ? { ...a, isChecked: !a.isChecked } : a,
                ),
                toArray,
            ),
        );
    };

    const onOrderFormSubmit = handleSubmit(async (data) => {
        console.log(data);
        if (isAllOrderTermsChecked) {
            await payment.setConfiguration();
            await payment.reservation(data);
        } else {
            alert('필수약관에 동의해주세요.');
            return;
        }
    });

    const onCouponModalClick = () => {
        setIsCouponListModal((prev) => !prev);
    };

    const accumulationMutate = useMutation(
        async (data: GetCalculatedOrderSheet) =>
            await orderSheet.getCalculatedOrderSheet(orderSheetNo, data),
        {
            onSuccess: (response) => {
                if (response.status === HTTP_RESPONSE.HTTP_OK) {
                    setPaymentInfo(response.data.paymentInfo);
                }
            },
        },
    );

    const onAccumulationButtonClick = async () => {
        const data = {
            addressRequest: {
                receiverAddress: getValues('shippingAddress.receiverAddress'),
                receiverJibunAddress: getValues(
                    'shippingAddress.receiverJibunAddress',
                ),
                defaultYn: 'Y', // TODO: check
                addressType: ADDRESS_TYPE.BOOK,
                receiverName: getValues('shippingAddress.receiverName'),
                countryCd: getValues('shippingAddress.countryCd'),
                receiverZipCd: getValues('shippingAddress.receiverZipCd'),
                addressName: getValues('shippingAddress.addressName'),
                receiverDetailAddress: getValues(
                    'shippingAddress.receiverDetailAddress',
                ),
                receiverContact1: getValues('shippingAddress.receiverContact1'),
                receiverContact2: getValues('shippingAddress.receiverContact2'),
            },
            accumulationUseAmt: getValues('subPayAmt'),
            // shippingAddress,
        };

        accumulationMutate.mutateAsync(data);
    };

    return (
        <>
            <DevTool control={control} placement='top-right' />

            <NextSeo title={sheet('progress.now')!} />

            {isShippingListModal &&
                (isMobile(width) ? (
                    <MobileShippingListModal
                        onClickToggleModal={() =>
                            setIsShippingListModal(!isShippingListModal)
                        }
                        title={'배송지 정보'}
                        register={register}
                        setValue={setValue}
                        setIsShippingListModal={setIsShippingListModal}
                    />
                ) : (
                    <ShippingListModal
                        onClickToggleModal={() =>
                            setIsShippingListModal(!isShippingListModal)
                        }
                        width={'1080px'}
                        register={register}
                        setValue={setValue}
                        setIsShippingListModal={setIsShippingListModal}
                    />
                ))}
            {isSearchAddressModal && (
                <SearchAddressModal
                    onClickToggleModal={() =>
                        setIsSearchAddressModal((prev) => !prev)
                    }
                    width={isMobile(width) ? 'calc(100vw - 16px)' : '720px'}
                    height={isMobile(width) ? 'calc(80vh)' : '720px'}
                    register={register}
                    setValue={setValue}
                />
            )}
            {isCouponListModal &&
                (isMobile(width) ? (
                    <MobileCouponListModal
                        onClickToggleModal={() =>
                            setIsCouponListModal((prev) => !prev)
                        }
                        title={'쿠폰 선택'}
                        setIsCouponListModal={setIsCouponListModal}
                        setSelectCoupon={setSelectCoupon}
                        orderSheetNo={orderSheetNo}
                        couponApplyMutate={couponApplyMutate}
                    />
                ) : (
                    <CouponListModal
                        onClickToggleModal={() =>
                            setIsCouponListModal((prev) => !prev)
                        }
                        width={'700px'}
                        height={'696px'}
                        setIsCouponListModal={setIsCouponListModal}
                        setSelectCoupon={setSelectCoupon}
                        orderSheetNo={orderSheetNo}
                        couponApplyMutate={couponApplyMutate}
                    />
                ))}

            <OrderSheetContainer onSubmit={onOrderFormSubmit}>
                {!isMobile(width) && (
                    <OrderProgress
                        type='progress'
                        style={{ marginBottom: '60px' }}
                    />
                )}
                <SheetMainContainer>
                    <SheetOrderWrapper>
                        {!isLogin() && !isMobile(width) && (
                            <GuestLoginBox>
                                <p>{sheet('etc.inviteJoin')}</p>
                                <Link href={PATHS.JOIN_AGREEMENT}>
                                    {sheet('etc.joinMember')}
                                </Link>
                            </GuestLoginBox>
                        )}

                        <SheetTitle marginTop='30px'>
                            <h3>{sheet('orderProduct.title')}</h3>
                        </SheetTitle>

                        <OrderProductListBox>
                            {!isMobile(width) && (
                                <CartCategoryBox>
                                    <CartInformation>
                                        {sheet(
                                            'orderProduct.category.information',
                                        )}
                                    </CartInformation>
                                    <CartCountBox>
                                        {sheet('orderProduct.category.count')}
                                    </CartCountBox>
                                    <CartPrice>
                                        {sheet('orderProduct.category.price')}
                                    </CartPrice>
                                    <CartDelivery>
                                        {sheet(
                                            'orderProduct.category.deliveryPrice',
                                        )}
                                    </CartDelivery>
                                    <CartAmount>
                                        {sheet(
                                            'orderProduct.category.amountPrice',
                                        )}
                                    </CartAmount>
                                </CartCategoryBox>
                            )}
                            {orderList.map((orderData) => {
                                return (
                                    <CartList
                                        cartData={orderData}
                                        key={orderData.optionNo}
                                        isModifiable={false}
                                    />
                                );
                            })}
                        </OrderProductListBox>

                        <SheetTitle>
                            <h3>{sheet('ordererInformation.title')}</h3>
                        </SheetTitle>

                        <OrdererInformation
                            register={register}
                            setValue={setValue}
                            errors={errors}
                        />

                        <SheetTitle>
                            <h3>{sheet('shippingAddress.title')}</h3>
                            {member && (
                                <div
                                    className='shipping-info'
                                    onClick={() => setIsShippingListModal(true)}
                                >
                                    {sheet(
                                        'shippingAddress.addressInformation',
                                    )}
                                </div>
                            )}
                            <div className='order-info'>
                                <input
                                    type='checkbox'
                                    id='orderInfo'
                                    onChange={() =>
                                        setOrdererInformation((prev) => !prev)
                                    }
                                    checked={ordererInformation}
                                />
                                <label htmlFor='orderInfo'>
                                    {ordererInformation ? (
                                        <Checked />
                                    ) : (
                                        <UnChecked />
                                    )}
                                    {sheet(
                                        'shippingAddress.sameOrderInformation',
                                    )}
                                </label>
                            </div>
                        </SheetTitle>

                        <ShippingAddress
                            register={register}
                            setValue={setValue}
                            getValues={getValues}
                            isSame={ordererInformation}
                            ordererInformation={{
                                receiverName: getValues('orderer.ordererName'),
                                receiverContact1: getValues(
                                    'orderer.ordererContact1',
                                ),
                            }}
                            setIsSearchAddressModal={setIsSearchAddressModal}
                            errors={errors}
                        />

                        {isAdditionalInfoVisible && (
                            <AdditionalInfo
                                register={register}
                                errors={errors}
                                isRequireCustomsIdNumber={
                                    !!orderData?.requireCustomsIdNumber
                                }
                            />
                        )}

                        {isLogin() ? (
                            <DiscountApply
                                paymentInfo={paymentInfo}
                                setValue={setValue}
                                subPayAmt={watch('subPayAmt')}
                                onAccumulationButtonClick={
                                    onAccumulationButtonClick
                                }
                                onCouponModalClick={onCouponModalClick}
                            />
                        ) : null}

                        {orderData?.availablePayTypes && (
                            <CommonPayment
                                setValue={setValue}
                                payType={watch('payType')}
                                availablePayTypes={orderData?.availablePayTypes}
                            />
                        )}

                        {!isLogin() && (
                            <GuestOrderPassword
                                register={register}
                                errors={errors}
                            />
                        )}
                    </SheetOrderWrapper>

                    <SheetOrderPriceWrapper>
                        {paymentInfo && (
                            <OrderSheetPrice
                                title={sheet('paymentInformation.title')}
                                totalStandardAmt={paymentInfo.totalStandardAmt}
                                totalDeliveryAmt={totalDeliveryAmt}
                                totalDiscountAmt={totalDiscountAmt}
                                totalCouponAmt={totalCouponAmt}
                                usedAccumulationAmt={
                                    paymentInfo.usedAccumulationAmt
                                }
                                totalPaymentAmt={paymentInfo.paymentAmt}
                            />
                        )}

                        <OrderTermsAgreement
                            orderTerms={orderTerms}
                            isAllOrderTermsChecked={isAllOrderTermsChecked}
                            agreeHandler={agreeHandler}
                            agreeAllHandler={agreeAllHandler}
                        />

                        <PaymentButton type='submit'>
                            {isMobile(width)
                                ? `${KRW(
                                      paymentInfo.paymentAmt,
                                  ).format()} ${sheet('etc.payment')}`
                                : sheet('etc.payment')}
                        </PaymentButton>
                    </SheetOrderPriceWrapper>
                </SheetMainContainer>
            </OrderSheetContainer>
        </>
    );
};

export default Sheet;

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale!, ['orderSheet'])),
        },
    };
};
