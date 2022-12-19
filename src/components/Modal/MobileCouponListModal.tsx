import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    useMemo,
    useState,
} from 'react';
import styled from 'styled-components';
import { shallowEqual } from 'react-redux';
import { UseMutateFunction, useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import {
    flat,
    flatMap,
    pipe,
    pluck,
    reduce,
    size,
    toArray,
    uniqBy,
} from '@fxts/core';

import MobileModal, {
    MobileModalDefaultType,
} from 'components/Modal/MobileModal';
import Checked from 'assets/icons/checkbox_circle_checked.svg';
import UnChecked from 'assets/icons/checkbox_circle_uhchecked.svg';
import LogoBlack from 'assets/logo/headerLogo.svg';
import LogoWhite from 'assets/logo/headerLogo_white.svg';
import CouponBackgroundWhite from 'assets/images/coupon_background_white.svg';
import CouponBackgroundBlack from 'assets/images/coupon_background_black.svg';
import { orderSheet } from 'api/order';
import { CouponApplyResponse, CouponRequest } from 'models/order';
import { CHANNEL_TYPE } from 'models';
import { useTypedSelector } from 'state/store';

const CouponListContainer = styled.div`
    width: 100%;
    overflow-y: scroll;
    padding: 0 24px;
    height: 100%;
`;

const CouponTitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 24px 0 20px;
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: -0.9px;
    line-height: 27px;
    color: ${(props) => props.theme.text1};
`;

const CouponCount = styled.div`
    color: #999999;
    font-size: 1.333rem;
`;

const CouponListWrapper = styled.div`
    border-top: 2px solid #222943;
    border-bottom: 1px solid #222943;
    height: 100vh;
    height: calc(var(--vh) * 100 - 210px);
    overflow-y: scroll;
`;

const CouponListBox = styled.div`
    font-size: 1.333rem;
    font-weight: bold;
    color: ${(props) => props.theme.text1};
    padding: 8px 0;
`;

const CouponBox = styled.div`
    display: flex;
    margin: 12px 0;
    align-items: center;
    color: #121212;
    &:nth-child(2n) {
        color: #fff;
    }
    > svg {
        width: 20%;
    }
`;

const CouponFigure = styled.div<{ couponBackground: string }>`
    width: 380px;
    height: 143px;
    background: url(${(props) => props.couponBackground});
    position: relative;
`;

const CouponRate = styled.div`
    position: absolute;
    top: 23px;
    left: 20px;
    font-size: 35px;
    > span {
        font-size: 16px;
    }
`;

const CouponName = styled.div`
    position: absolute;
    top: 68px;
    left: 20px;
    font-size: 12px;
    letter-spacing: -0.48px;
`;

const CouponLogo = styled.div`
    position: absolute;
    top: 114px;
    left: 20px;
    > svg {
        width: 100px;
    }
`;

const CouponYmdt = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 10px;
    letter-spacing: -0.4px;
    font-weight: 400;
    color: #999999;
`;

const ApplyButton = styled.div`
    background: #222943;
    color: #fff;
    cursor: pointer;
    font-size: 1.333rem;
    letter-spacing: -0.8px;
    font-weight: bold;
    line-height: 24px;
    padding: 15px 0;
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    margin-left: -24px;
`;

const NoCouponMessage = styled.p`
    text-align: center;
    margin: 72px;
    color: ${(props) => props.theme.text3};
    font-size: 1.333rem;
    line-height: 24px;
`;

const MobileShippingListModal = ({
    onClickToggleModal,
    title,
    setSelectCoupon,
    setIsCouponListModal,
    orderSheetNo,
    couponApplyMutate,
}: PropsWithChildren<MobileModalDefaultType> & {
    setSelectCoupon: Dispatch<SetStateAction<CouponRequest | undefined>>;
    setIsCouponListModal: Dispatch<SetStateAction<boolean>>;
    orderSheetNo: string;
    couponApplyMutate: UseMutateFunction<
        AxiosResponse<CouponApplyResponse, any>,
        unknown,
        void,
        unknown
    >;
}) => {
    const [selectedCoupon, setSelectedCoupon] = useState<number>();

    const { member } = useTypedSelector(
        ({ member }) => ({
            member: member.data,
        }),
        shallowEqual,
    );

    const { data: couponData } = useQuery(
        ['couponList', { member: member?.memberName }],
        async () => await orderSheet.getCanApplyCoupon(orderSheetNo),
        {
            select: (res) => res.data,
            refetchOnWindowFocus: false,
        },
    );

    const totalCouponCount = useMemo(
        () =>
            (couponData && couponData.cartCoupons.length) ||
            // TODO 상품 쿠폰 개수 추가
            // pipe(
            //     couponData?.products,
            //     pluck('productCoupons'),
            //     flat,
            //     uniqBy((a) => a.couponNo),
            //     size,
            // ))
            0,
        [couponData],
    );

    return (
        <MobileModal title={title} onClickToggleModal={onClickToggleModal}>
            <CouponListContainer>
                <CouponTitleContainer>
                    <Title>쿠폰 선택</Title>
                    <CouponCount>
                        사용가능쿠폰&#40;
                        {totalCouponCount}
                        &#41;
                    </CouponCount>
                </CouponTitleContainer>
                <CouponListWrapper>
                    {totalCouponCount > 0 ? (
                        <CouponListBox>
                            <>
                                {couponData &&
                                    couponData.cartCoupons.map(
                                        (
                                            {
                                                couponNo,
                                                couponName,
                                                couponDiscountAmt,
                                                discountRate,
                                                useEndYmdt,
                                                couponIssueNo,
                                            },
                                            index,
                                        ) => {
                                            return (
                                                <CouponBox
                                                    key={couponIssueNo}
                                                    onClick={() => {
                                                        setSelectCoupon({
                                                            cartCouponIssueNo:
                                                                couponIssueNo,
                                                            channelType:
                                                                CHANNEL_TYPE.NAVER_EP,
                                                        });
                                                        setSelectedCoupon(
                                                            couponNo,
                                                        );
                                                    }}
                                                >
                                                    {selectedCoupon ===
                                                    couponNo ? (
                                                        <Checked />
                                                    ) : (
                                                        <UnChecked />
                                                    )}
                                                    <CouponFigure
                                                        couponBackground={
                                                            index % 2 === 0
                                                                ? CouponBackgroundWhite
                                                                : CouponBackgroundBlack
                                                        }
                                                    >
                                                        <CouponRate>
                                                            {discountRate
                                                                ? discountRate
                                                                : couponDiscountAmt}
                                                            {discountRate ? (
                                                                <span>
                                                                    &nbsp;%
                                                                </span>
                                                            ) : (
                                                                <span>
                                                                    &nbsp;원
                                                                </span>
                                                            )}
                                                        </CouponRate>
                                                        <CouponName>
                                                            {couponName}
                                                        </CouponName>
                                                        <CouponYmdt>
                                                            {
                                                                useEndYmdt.split(
                                                                    ' ',
                                                                )[0]
                                                            }{' '}
                                                            까지 사용가능
                                                        </CouponYmdt>
                                                        <CouponLogo>
                                                            {index % 2 === 0 ? (
                                                                <LogoBlack />
                                                            ) : (
                                                                <LogoWhite />
                                                            )}
                                                        </CouponLogo>
                                                    </CouponFigure>
                                                </CouponBox>
                                            );
                                        },
                                    )}
                                {/* TODO 상품 쿠폰 노출 추후 작성 */}
                                {/* {couponData.products.map(
                                    ({ productCoupons, productNo }) => {
                                        return productCoupons.map(
                                            (
                                                {
                                                    couponNo,
                                                    couponName,
                                                    couponDiscountAmt,
                                                    discountRate,
                                                    useEndYmdt,
                                                    couponIssueNo,
                                                },
                                                index,
                                            ) => {
                                                return (
                                                    <CouponBox
                                                        key={couponIssueNo}
                                                        onClick={() => {
                                                            setSelectCoupon({
                                                                channelType:
                                                                    CHANNEL_TYPE.NAVER_EP,
                                                                productCoupons:
                                                                    [
                                                                        {
                                                                            productNo,
                                                                            couponIssueNo:
                                                                                couponIssueNo,
                                                                        },
                                                                    ],
                                                            });
                                                            setSelectedCoupon(
                                                                couponNo,
                                                            );
                                                        }}
                                                    >
                                                        {selectedCoupon ===
                                                        couponNo ? (
                                                            <Checked />
                                                        ) : (
                                                            <UnChecked />
                                                        )}
                                                        <CouponFigure
                                                            couponBackground={
                                                                index % 2 === 0
                                                                    ? CouponBackgroundWhite
                                                                    : CouponBackgroundBlack
                                                            }
                                                        >
                                                            <CouponRate>
                                                                {discountRate
                                                                    ? discountRate
                                                                    : couponDiscountAmt}
                                                                {discountRate ? (
                                                                    <span>
                                                                        &nbsp;%
                                                                    </span>
                                                                ) : (
                                                                    <span>
                                                                        &nbsp;원
                                                                    </span>
                                                                )}
                                                            </CouponRate>
                                                            <CouponName>
                                                                {couponName}
                                                            </CouponName>
                                                            <CouponYmdt>
                                                                {
                                                                    useEndYmdt.split(
                                                                        ' ',
                                                                    )[0]
                                                                }{' '}
                                                                까지 사용가능
                                                            </CouponYmdt>
                                                            <CouponLogo>
                                                                {index % 2 ===
                                                                0 ? (
                                                                    <LogoBlack />
                                                                ) : (
                                                                    <LogoWhite />
                                                                )}
                                                            </CouponLogo>
                                                        </CouponFigure>
                                                    </CouponBox>
                                                );
                                            },
                                        );
                                    },
                                )} */}
                            </>
                        </CouponListBox>
                    ) : (
                        <NoCouponMessage>
                            보유하신 쿠폰이 없습니다.
                        </NoCouponMessage>
                    )}
                </CouponListWrapper>
                {totalCouponCount > 0 && (
                    <ApplyButton
                        onClick={() => {
                            couponApplyMutate();
                            setIsCouponListModal(false);
                        }}
                    >
                        적용하기
                    </ApplyButton>
                )}
            </CouponListContainer>
        </MobileModal>
    );
};

export default MobileShippingListModal;
