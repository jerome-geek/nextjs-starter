import { useState, useMemo } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { useWindowSize } from 'usehooks-ts';
import { pipe, concat, uniqBy, isEmpty, toArray, not } from '@fxts/core';
import dayjs from 'dayjs';

import { coupon } from 'api/promotion';
import PrimaryButton from 'components/Button/PrimaryButton';
import StyledInput from 'components/Input/StyledInput';
import Coupon from 'components/Coupon/Coupon';
import IssuableCoupon from 'components/Coupon/IssuableCoupon';
import media, { mediaQuery } from 'utils/styles/media';
import { isDesktop } from 'utils/styles/responsive';
import { HTTP_RESPONSE } from 'const/http';
import { useMember } from 'hooks';
import useCouponData from 'hooks/queries/useCouponData';
import useIssuableCouponsQuery from 'hooks/queries/useIssuableCouponsQuery';
import { Coupon as CouponInterface } from 'models/promotion';

const MypageLayout = styled.main`
    max-width: 840px;
    width: 100%;
    padding: 150px 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;

    ${media.large} {
        width: 840px;
    }
    /* ${media.medium} {
        width: calc(100% - 2rem);
    } */

    ${media.small} {
        width: 440px;
        padding-top: 44px;
        padding-bottom: 88px;
    }

    ${mediaQuery(450)} {
        width: calc(100% - 2rem);
    }

    ${media.xsmall} {
        width: calc(100% - 2.4rem);
    }
`;

const CouponList = styled.ul`
    border-top: 2px solid #222943;
    border-bottom: 1px solid #222943;
    min-height: 180px;
    display: flex;
    /* justify-content: center; */
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 40px;
    flex-wrap: wrap;
    padding: 20px;

    > p {
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.64px;
        color: #a8a8a8;
    }

    ${media.medium} {
        justify-content: center;
        padding: 10px 0;
    }
`;

const CouponListItem = styled.li`
    margin-bottom: 10px;
    flex: 1 50%;

    &:last-of-type {
        flex: 0 50%;
    }

    ${media.medium} {
        flex: 1;
        &:last-of-type {
            flex: 1;
        }
    }
`;

const IssuableCouponList = styled.ul`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;
const IssuableCouponListItem = styled.li`
    width: 33%;
    margin-bottom: 10px;

    ${media.large} {
        width: 50%;
    }

    ${media.medium} {
        width: 100%;
    }
`;

const RegisterCouponContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background-color: #f8f8fa;
    height: 84px;

    ${media.medium} {
        background-color: #fff;
        flex-direction: column;
        text-align: left;
    }
`;

const CouponRegisterInputTitle = styled.p`
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.64px;
    color: #000000;
    font-weight: normal;
    margin-right: 20px;

    ${media.medium} {
        text-align: left;
        margin-right: 0px;
    }
`;

const CouponRegisterInput = styled(StyledInput)`
    color: #191919;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.64px;
    border: 1px solid #dbdbdb;
    background-color: #fff;
    padding-left: 20px;
    margin-right: 16px;

    &::placeholder {
        color: #a8a8a8;
    }

    &:focus {
        border: 1px solid ${(props) => props.theme.secondary};
    }

    ${media.medium} {
        width: 100%;
        margin-right: 0;
        margin-bottom: 10px;
    }
`;

const RegisterButton = styled(PrimaryButton)`
    width: auto;
    padding: 10px 24px;

    ${media.medium} {
        width: 100%;
    }
`;

const CouponContentContainer = styled.div`
    margin-bottom: 40px;

    ${media.medium} {
        margin-bottom: 60px;
    }
`;

const CouponTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

const RegisterCouponTitle = styled.h2`
    font-size: 24px;
    line-height: 36px;
    font-weight: bold;
    letter-spacing: -1.2px;
    color: #191919;
    text-align: left;

    ${media.medium} {
        font-size: 18px;
        line-height: 28px;
        letter-spacing: -0.9px;
    }
`;

const RegisterCouponTitleDesc = styled.span`
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0;
    color: #999999;
    text-align: right;

    ${media.medium} {
        font-size: 16px;
        line-height: 24px;
        letter-spacing: 0px;
    }
`;

const RegisterCouponSubTitle = styled.h3`
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0;
    color: #191919;
    margin-bottom: 10px;
    text-align: left;
    font-weight: normal;

    ${media.medium} {
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.64px;
        margin-left: 10px;
        font-weight: bold;
    }
`;

const Coupons = () => {
    const { member } = useMember();

    const { width } = useWindowSize();

    const [promotionCode, setPromotionCode] = useState('');

    const issuableCoupons = useIssuableCouponsQuery();

    const isLogin = useMemo(() => !!member, [member]);

    const [couponDataParams, setCouponDataParams] = useState({
        startYmd: dayjs().subtract(1, 'year').format('YYYY-MM-DD'),
        endYmd: dayjs().format('YYYY-MM-DD'),
        pageNumber: 1,
        pageSize: 2,
        usable: true,
    });

    const [couponList, setCouponList] = useState<CouponInterface[]>([]);

    const couponData = useCouponData({
        memberNo: member?.memberNo,
        params: { ...couponDataParams },
        options: {
            enabled: isLogin,
            select: ({ data }) => data,
            onSuccess: (data) => {
                if (not(isEmpty(data.items))) {
                    setCouponList((prev) =>
                        pipe(
                            prev,
                            concat(data.items),
                            uniqBy((a) => a.couponIssueNo),
                            toArray,
                        ),
                    );
                }
            },
        },
    });

    const isMoreCouponData = useMemo(
        () => couponList.length !== couponData.data?.totalCount,
        [couponList, couponData.data?.totalCount],
    );

    const couponMutation = useMutation(
        async (promotionCode: string) =>
            await coupon.issueCouponByPromotionCode(promotionCode),
        {
            onSuccess: (res) => {
                if (res?.status === HTTP_RESPONSE.HTTP_NO_CONTENT) {
                    setPromotionCode('');
                    couponData.refetch();
                    alert('쿠폰이 발급되었습니다.');
                } else {
                    alert(res?.data?.message);
                }
            },
        },
    );

    const issueCouponMutation = useMutation(
        async (couponNo: string) =>
            await coupon.issueCoupon(couponNo, { channelType: '' }),
    );

    const onRegisterButtonClick = () => {
        if (isEmpty(promotionCode)) {
            alert('쿠폰 번호를 입력해주세요.');
            return;
        }
        couponMutation.mutate(promotionCode);
    };

    const onMoreButtonClick = () => {
        setCouponDataParams((prev) => ({
            ...prev,
            pageNumber: prev.pageNumber++,
        }));
    };

    const getUseEndYmdt = ({
        useDays,
        useEndYmdt,
    }: {
        useDays?: number;
        useEndYmdt?: Date | string;
    }) => {
        if (useDays) {
            return dayjs().add(useDays, 'day').format('YYYY-MM-DD');
        }
        if (useEndYmdt) {
            return dayjs(useEndYmdt).format('YYYY-MM-DD');
        }
    };

    return (
        <>
            <MypageLayout>
                <CouponContentContainer>
                    <CouponTitleContainer>
                        <RegisterCouponTitle>보유쿠폰</RegisterCouponTitle>
                        <RegisterCouponTitleDesc>
                            {`사용가능쿠폰 (${
                                couponData?.data?.totalCount || 0
                            })`}
                        </RegisterCouponTitleDesc>
                    </CouponTitleContainer>

                    <CouponList>
                        {isEmpty(couponList) ? (
                            <p>보유하신 쿠폰이 없습니다.</p>
                        ) : (
                            couponList.map(
                                ({
                                    couponIssueNo,
                                    discountAmt,
                                    discountRate,
                                    couponName,
                                    useEndYmdt,
                                }) => (
                                    <CouponListItem key={couponIssueNo}>
                                        <Coupon
                                            key={couponIssueNo}
                                            discountAmt={discountAmt}
                                            discountRate={discountRate}
                                            couponName={couponName}
                                            useEndYmdt={useEndYmdt}
                                        />
                                    </CouponListItem>
                                ),
                            )
                        )}
                    </CouponList>
                    {isMoreCouponData && (
                        <PrimaryButton onClick={onMoreButtonClick}>
                            더보기
                        </PrimaryButton>
                    )}
                </CouponContentContainer>

                <CouponContentContainer>
                    <RegisterCouponSubTitle>
                        발급 쿠폰 등록하기
                    </RegisterCouponSubTitle>

                    <RegisterCouponContainer>
                        <CouponRegisterInputTitle>
                            쿠폰 입력
                        </CouponRegisterInputTitle>
                        <CouponRegisterInput
                            placeholder='쿠폰 번호를 입력해주세요.'
                            value={promotionCode}
                            onChange={(e) => setPromotionCode(e.target.value)}
                        />
                        <RegisterButton onClick={onRegisterButtonClick}>
                            {isDesktop(width) ? '등록' : '쿠폰 등록'}
                        </RegisterButton>
                    </RegisterCouponContainer>
                </CouponContentContainer>

                {!isEmpty(issuableCoupons.data) && (
                    <CouponContentContainer>
                        <RegisterCouponSubTitle>
                            다운로드 가능 쿠폰
                        </RegisterCouponSubTitle>
                        <IssuableCouponList>
                            {issuableCoupons?.data?.map(
                                ({
                                    couponNo,
                                    couponName,
                                    downloadable,
                                    useConstraint,
                                    discountInfo,
                                }) => {
                                    return (
                                        <IssuableCouponListItem key={couponNo}>
                                            <IssuableCoupon
                                                isDownloadable={downloadable}
                                                discountAmt={
                                                    discountInfo.discountAmt
                                                }
                                                discountRate={
                                                    discountInfo.discountRate
                                                }
                                                couponName={couponName}
                                                fixedAmt={discountInfo.fixedAmt}
                                                useEndYmdt={getUseEndYmdt({
                                                    useDays:
                                                        useConstraint.useDays,
                                                    useEndYmdt:
                                                        useConstraint.useEndYmdt,
                                                })}
                                                onDownload={() =>
                                                    issueCouponMutation.mutate(
                                                        couponNo.toString(),
                                                    )
                                                }
                                            />
                                        </IssuableCouponListItem>
                                    );
                                },
                            )}
                        </IssuableCouponList>
                    </CouponContentContainer>
                )}
            </MypageLayout>
        </>
    );
};

export default Coupons;
