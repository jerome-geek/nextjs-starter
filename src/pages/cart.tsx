import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useQuery, useMutation } from 'react-query';
import {
    head,
    pipe,
    toArray,
    filter,
    map,
    every,
    isArray,
    pluck,
    isUndefined,
    isEmpty,
} from '@fxts/core';
import { useWindowSize } from 'usehooks-ts';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import SecondaryButton from 'components/Button/SecondaryButton';
import PaymentButton from 'components/Button/PaymentButton';
import CartList from 'components/Cart/CartList';
import OrderSheetPrice from 'components/OrderSheet/OrderSheetPrice';
import Checkbox from 'components/Input/Checkbox';
import FlexContainer from 'components/Common/FlexContainer';
// import MemberInduceModal from 'components/Modal/MemberInduceModal';
import { useAppDispatch } from 'state/reducers';
import { deleteCart, updateCart } from 'state/slices/cartSlice';
import { useCart, useMember } from 'hooks';
import { useOrderSheetMutation } from 'hooks/mutations';
import { cart, guestOrder } from 'api/order';
import { DeliveryGroup, OptionInputs, OrderProductOption } from 'models/order';
import { isDesktop, isMobile } from 'utils/styles/responsive';
import media from 'utils/styles/media';
import PATHS from 'const/paths';
import { isLogin } from 'utils/users';

export interface OrderPrice {
    [id: string]: { name: string; price: string | number };
}

const CartContainer = styled.div`
    width: 1280px;
    margin: 118px auto;
    display: flex;
    justify-content: space-between;
    ${media.custom(1280)} {
        width: 100%;
        padding: 0 24px;
    }
    ${media.medium} {
        margin-top: 25px;
        flex-direction: column;
    }
`;

const SelectAllContainer = styled(FlexContainer)``;

const CartListWrapper = styled.div`
    width: 65%;
    ${media.medium} {
        width: 100%;
    }
`;

const SelectWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${media.medium} {
        margin-bottom: 30px;
        padding-left: 9px;
    }
`;

const CheckCount = styled.div`
    color: #8f8f8f;
    > span {
        color: #191919;
        font-weight: bold;
    }
`;

const CartDeleteButton = styled(SecondaryButton)`
    width: 210px;
`;

const CartListContainer = styled.div`
    border-top: 2px solid #222943;
    border-bottom: 2px solid #222943;
    margin-bottom: 30px;

    ${media.medium} {
        margin-bottom: 24px;
    }
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

const NoProductMessage = styled.div`
    padding: 46px 0;
    text-align: center;
    color: #ababab;
    font-size: 16px;
    ${media.medium} {
        padding: 72px 0;
    }
`;

const CartInformation = styled.div`
    width: 240px;
    display: flex;
    justify-content: space-around;
`;

const CartCountBox = styled.div`
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #dbdbdb;
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

const CartCloseButton = styled.div`
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CartPriceContainer = styled.div`
    position: relative;
    width: 31%;
    ${media.medium} {
        position: unset;
    }
    ${media.medium} {
        width: 100%;
    }
`;

const CartPriceWrapper = styled.div`
    /* position: sticky;
    top: 175px; */
    ${media.medium} {
        top: auto;
        bottom: 0;
    }
`;

interface testInterface extends OrderProductOption {
    deliveryAmt: number;
    productName: string;
    isChecked: boolean;
}

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...(await serverSideTranslations(locale, ['common', 'orderSheet'])),
    },
});

const Cart = () => {
    const [cartList, setCartList] = useState<testInterface[]>([]);
    const [checkedPriceData, setCheckedPriceData] = useState({
        standardAmt: 0, // 총 주문금액
        totalDeliveryAmt: 0, // 총 배송비
        totalDiscountPrice: 0, // 총 할인금액
        totalCouponPrice: 0, // 쿠폰 할인
        totalAmt: 0, // 총 결제금액
    });

    const { member } = useMember();

    // const [isMemberInduceModal, setIsMemberInduceModal] = useState(false);

    const { width } = useWindowSize();

    const dispatch = useAppDispatch();

    const router = useRouter();

    const setCartHandler = (deliveryGroups: DeliveryGroup[]) => {
        const cartListTemp: any[] = [];

        deliveryGroups.forEach((deliveryGroup) => {
            deliveryGroup.orderProducts.forEach((orderProduct) => {
                orderProduct.orderProductOptions.forEach((productOption) => {
                    cartListTemp.push({
                        ...productOption,
                        deliveryAmt: deliveryGroup.deliveryAmt,
                        productName: orderProduct.productName,
                        isChecked: true,
                    });
                });
            });
        });

        return cartListTemp;
    };

    const { cartInfo, refetch } = useCart();

    useEffect(() => {
        if (cartInfo?.deliveryGroups) {
            setCartList(setCartHandler(cartInfo.deliveryGroups));
            setCheckedPriceData({
                standardAmt: cartInfo.price.standardAmt, // 총 주문금액
                totalDeliveryAmt: cartInfo.price.totalDeliveryAmt, // 총 배송비
                totalDiscountPrice: cartInfo.price.discountAmt, // 총 할인금액
                totalCouponPrice: 0, // 쿠폰 할인
                totalAmt: cartInfo.price.totalAmt, // 총 결제금액
            });
        }
    }, [cartInfo]);

    const checkedCartList = useMemo(
        () =>
            pipe(
                cartList,
                filter((a) => a.isChecked),
                map((b) => ({
                    cartNo: b.cartNo,
                    channelType: 'NAVER_EP',
                    optionInputs: b.optionInputs,
                    optionNo: b.optionNo,
                    orderCnt: b.orderCnt,
                    productNo: b.productNo,
                })),
                toArray,
            ),
        [cartList],
    );

    useQuery(
        ['guestCart', checkedCartList],
        async () =>
            await guestOrder.getCart(checkedCartList, {
                divideInvalidProducts: true,
            }),
        {
            enabled: !isLogin(),
            select: (response) => response.data,
            onSuccess: (data) => {
                setCheckedPriceData({
                    standardAmt: data.price.standardAmt, // 총 주문금액
                    totalDeliveryAmt: data.price.totalDeliveryAmt, // 총 배송비
                    totalDiscountPrice: data.price.discountAmt, // 총 할인금액
                    totalCouponPrice: 0, // 쿠폰 할인
                    totalAmt: data.price.totalAmt, // 총 결제금액
                });
            },
        },
    );

    useQuery(
        ['cartPrice', { member: member?.memberName, checkedCartList }],
        async () => {
            const checkedCartNoList = pipe(
                checkedCartList,
                pluck('cartNo'),
                toArray,
            );

            return await cart.getSelectedCartPrice({
                divideInvalidProducts: true,
                cartNo: isEmpty(checkedCartNoList) ? null : checkedCartNoList,
            });
        },
        {
            enabled: isLogin(),
            select: (res) => res.data,
            onSuccess: (data) => {
                setCheckedPriceData({
                    standardAmt: data.standardAmt, // 총 주문금액
                    totalDeliveryAmt: data.totalDeliveryAmt, // 총 배송비
                    totalDiscountPrice: data.discountAmt, // 총 할인금액
                    totalCouponPrice: 0, // 쿠폰 할인
                    totalAmt: data.totalAmt, // 총 결제금액
                });
            },
        },
    );

    const { mutate: updateCartMutate } = useMutation(
        async (updateCartData: {
            cartNo: number;
            orderCnt: number;
            optionInputs: OptionInputs[];
        }) => await cart.updateCart(updateCartData),
        {
            onSuccess: (res) => {
                refetch();
            },
        },
    );

    const { mutate: deleteCartMutate } = useMutation(
        async (deleteCartNos: { cartNo: number | number[] }) =>
            await cart.deleteCart(deleteCartNos),
        {
            onSuccess: () => refetch(),
            onError: () => {},
        },
    );

    const purchaseProducts = useMemo(
        () =>
            pipe(
                checkedCartList,
                map((a) => ({
                    channelType: '',
                    productNo: a.productNo,
                    optionNo: a.optionNo,
                    orderCnt: a.orderCnt,
                    optionInputs: a.optionInputs,
                })),
                toArray,
            ),
        [checkedCartList],
    );

    const purchaseCartNos = useMemo(
        () => pipe(checkedCartList, pluck('cartNo'), toArray),
        [checkedCartList],
    );

    const orderSheetMutation = useOrderSheetMutation();

    const purchaseHandler = async () => {
        orderSheetMutation.mutateAsync({
            products: purchaseProducts,
            productCoupons: [],
            cartNos: purchaseCartNos,
            trackingKey: '',
            channelType: '',
        });
    };

    const productCountHandler = (count: number, cartNo: number) => () => {
        const cartInfo = isLogin()
            ? pipe(
                  cartList,
                  filter((a) => a.cartNo === cartNo),
                  head,
              )
            : pipe(
                  cartList,
                  filter((a) => a.optionNo === cartNo),
                  head,
              );

        if (!isUndefined(cartInfo)) {
            if (cartInfo.orderCnt + count <= 0) {
                return;
            }

            if (isLogin()) {
                updateCartMutate({
                    cartNo: cartInfo.cartNo,
                    orderCnt: cartInfo.orderCnt + count,
                    optionInputs: cartInfo.optionInputs,
                });
            } else {
                dispatch(
                    updateCart({
                        optionNo: cartNo,
                        orderCnt: cartInfo.orderCnt + count,
                    }),
                );
            }
        }
    };

    const deleteCartList = (cartNo: number) => () => {
        if (isLogin()) {
            deleteCartMutate({ cartNo: [cartNo] });
        } else {
            dispatch(
                deleteCart({
                    deleteList: pipe(
                        cartList,
                        filter((a) => a.optionNo === cartNo),
                        map((b) => b.optionNo),
                        toArray,
                    ),
                }),
            );
        }
    };

    const deleteCheckedCartList = () => {
        const checkedCartNoList = pipe(
            checkedCartList,
            map((a) => a.cartNo),
            toArray,
        );

        if (isLogin()) {
            deleteCartMutate({ cartNo: checkedCartNoList });
        } else {
            dispatch(
                deleteCart({
                    deleteList: checkedCartNoList,
                }),
            );
        }
    };

    const agreeAllButton = (checked: boolean) => {
        setCartList((prev) =>
            pipe(
                prev,
                map((a) => ({ ...a, isChecked: checked })),
                toArray,
            ),
        );
    };

    const agreeButton = (optionNo: number) => {
        setCartList((prev) =>
            pipe(
                prev,
                map((a) =>
                    a.optionNo === optionNo
                        ? { ...a, isChecked: !a.isChecked }
                        : a,
                ),
                toArray,
            ),
        );
    };

    const isAllChecked = useMemo(
        () => every((a) => a.isChecked, cartList),
        [cartList],
    );

    const isCartListForResponsive = (
        device: 'desktop' | 'mobile' | 'mustShowDesktop',
    ) => {
        switch (device) {
            case 'desktop':
                return isDesktop(width) && Object.keys(cartList).length >= 1;

            case 'mobile':
                return !isDesktop(width) && Object.keys(cartList).length >= 1;

            case 'mustShowDesktop':
                return isDesktop(width) || Object.keys(cartList).length >= 1;

            default:
                return false;
        }
    };

    return (
        <>
            {/* {isMemberInduceModal && (
                <MemberInduceModal
                    width={'calc(100% - 24px)'}
                    onClickToggleModal={() =>
                        setIsMemberInduceModal((prev) => !prev)
                    }
                    products={purchaseProducts}
                    cartNos={purchaseCartNos}
                />
            )} */}
            <CartContainer>
                <CartListWrapper>
                    {isCartListForResponsive('mustShowDesktop') && (
                        <SelectWrapper>
                            <SelectAllContainer>
                                <Checkbox
                                    shape='square'
                                    onChange={(e) =>
                                        agreeAllButton(e.target.checked)
                                    }
                                    checked={isAllChecked}
                                >
                                    <p style={{ marginLeft: '10px' }}>
                                        전체 선택
                                    </p>
                                    <CheckCount>
                                        &nbsp;(
                                        <span>
                                            {isArray(checkedCartList)
                                                ? checkedCartList.length
                                                : 0}
                                        </span>
                                        /{cartList.length})
                                    </CheckCount>
                                </Checkbox>
                            </SelectAllContainer>
                            {!isDesktop(width) && (
                                <CartDeleteButton
                                    onClick={deleteCheckedCartList}
                                >
                                    선택 상품 삭제
                                </CartDeleteButton>
                            )}
                        </SelectWrapper>
                    )}

                    <CartListContainer>
                        {isDesktop(width) && (
                            <CartCategoryBox>
                                <CartInformation>상품 정보</CartInformation>
                                <CartCountBox>수량</CartCountBox>
                                <CartPrice>가격</CartPrice>
                                <CartDelivery>배송비</CartDelivery>
                                <CartAmount>총 상품 금액</CartAmount>
                                <CartCloseButton></CartCloseButton>
                            </CartCategoryBox>
                        )}
                        {cartList.length === 0 ? (
                            <NoProductMessage>
                                장바구니에 담긴 상품이 없습니다.
                            </NoProductMessage>
                        ) : (
                            cartList?.map((cartData: any) => {
                                return (
                                    <CartList
                                        key={cartData.optionNo}
                                        cartData={cartData}
                                        agreeButton={agreeButton}
                                        productCountHandler={
                                            productCountHandler
                                        }
                                        deleteCartList={deleteCartList}
                                        isLogin={isLogin()}
                                    />
                                );
                            })
                        )}
                    </CartListContainer>

                    {isDesktop(width) && (
                        <CartDeleteButton onClick={deleteCheckedCartList}>
                            선택 상품 삭제
                        </CartDeleteButton>
                    )}
                </CartListWrapper>

                <CartPriceContainer>
                    <CartPriceWrapper>
                        <OrderSheetPrice
                            title={'주문서'}
                            totalStandardAmt={checkedPriceData.standardAmt}
                            totalDeliveryAmt={checkedPriceData.totalDeliveryAmt}
                            totalDiscountAmt={
                                checkedPriceData.totalDiscountPrice
                            }
                            totalCouponAmt={0}
                            totalPaymentAmt={checkedPriceData.totalAmt}
                        />

                        <PaymentButton
                            onClick={
                                !isLogin() && isMobile(width)
                                    ? () => {
                                          //   setIsMemberInduceModal(
                                          //       (prev) => !prev,
                                          //   )
                                          console.log('setIsMemberInduceModal');
                                      }
                                    : checkedCartList.length === 0
                                    ? () => router.push(PATHS.MAIN)
                                    : purchaseHandler
                            }
                        >
                            {checkedCartList.length === 0
                                ? '쇼핑 계속하기'
                                : `${checkedCartList.length} 개 상품 바로구매 `}
                        </PaymentButton>
                    </CartPriceWrapper>
                </CartPriceContainer>
            </CartContainer>
        </>
    );
};

export default Cart;
