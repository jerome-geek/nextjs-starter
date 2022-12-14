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

import Modal, { ModalDefaultType } from 'components/Modal/Modal';
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
    padding: 50px 50px;
`;

const Title = styled.h2`
    margin: 0 0 40px;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: -1.2px;
    color: ${(props) => props.theme.text1};
`;

const CouponCount = styled.div`
    color: #999999;
    text-align: right;
    width: 100%;
    font-size: 12px;
    margin: 12px 0 10px;
`;

const CouponListWrapper = styled.div`
    border-top: 2px solid #222943;
    border-bottom: 1px solid #222943;
`;

const CouponListBox = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: ${(props) => props.theme.text1};
    padding: 20px 0;
    height: 446px;
    overflow: auto;
`;

const CouponBox = styled.div`
    border-top: ${(props) => `1px solid ${props.theme.line2}`};
    display: flex;
    height: 223px;
    align-items: center;
    padding-left: 24px;
    color: #121212;
    &:first-child {
        border: none;
    }
    &:nth-child(2n) {
        color: #fff;
    }
`;

const CouponFigure = styled.div<{ couponBackground: string }>`
    margin-left: 57px;
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

const ButtonWrapper = styled.div`
    display: flex;
    margin-top: 40px;
    justify-content: center;
    text-align: center;
    > div {
        width: 210px;
        padding: 13px 0;
        font-size: 16px;
    }
`;

const CancelButton = styled.div`
    margin-right: 20px;
    border: 1px solid #dbdbdb;
    cursor: pointer;
`;

const ApplyButton = styled.div`
    background: #222943;
    color: #fff;
    cursor: pointer;
`;

const NoCouponMessage = styled.p`
    text-align: center;
    margin: 80px 0;
    color: ${(props) => props.theme.text3};
    line-height: 24px;
`;

const CouponListModal = ({
    onClickToggleModal,
    width,
    setSelectCoupon,
    setIsCouponListModal,
    orderSheetNo,
    couponApplyMutate,
}: PropsWithChildren<ModalDefaultType> & {
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
            // TODO ?????? ?????? ?????? ??????
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
        <Modal onClickToggleModal={onClickToggleModal} width={width}>
            <CouponListContainer>
                <Title>?????? ??????</Title>
                <CouponCount>
                    ??????????????????&#40;
                    {totalCouponCount}
                    &#41;
                </CouponCount>
                <CouponListWrapper>
                    {totalCouponCount > 0 ? (
                        <CouponListBox>
                            {couponData && (
                                <>
                                    {' '}
                                    {couponData.cartCoupons.map(
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
                                                                    &nbsp;???
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
                                                            ?????? ????????????
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
                                    {/* TODO ?????? ?????? ?????? ?????? ?????? */}
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
                                                                        &nbsp;???
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
                                                                ?????? ????????????
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
                            )}
                        </CouponListBox>
                    ) : (
                        <NoCouponMessage>
                            ???????????? ????????? ????????????.
                        </NoCouponMessage>
                    )}
                </CouponListWrapper>
                <ButtonWrapper>
                    {totalCouponCount > 0 && (
                        <>
                            <CancelButton
                                onClick={() => {
                                    setIsCouponListModal((prev) => !prev);
                                }}
                            >
                                ??????
                            </CancelButton>
                            <ApplyButton
                                onClick={() => {
                                    couponApplyMutate();
                                    setIsCouponListModal((prev) => !prev);
                                }}
                            >
                                ????????????
                            </ApplyButton>
                        </>
                    )}
                </ButtonWrapper>
            </CouponListContainer>
        </Modal>
    );
};

export default CouponListModal;
