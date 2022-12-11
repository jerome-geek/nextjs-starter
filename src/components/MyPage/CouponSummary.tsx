import { FC, HTMLAttributes } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import ViewAllButton from 'components/Button/ViewAllButton';
import Coupon from 'components/Coupon/Coupon';
import { Coupon as CouponInterface } from 'models/promotion';
import AngleRightBlack from 'assets/icons/angle_right_black_middle.svg';
import PATHS from 'const/paths';

interface CouponSummaryProps extends HTMLAttributes<HTMLDivElement> {
    coupons: CouponInterface[];
}

const CouponTitle = styled.h2`
    font-size: 18px;
    color: #000000;
    text-align: left;
    letter-spacing: 0;
    cursor: pointer;
`;

const NoCouponContainer = styled.div`
    background: #f8f8fa 0% 0% no-repeat padding-box;
    border: 4px solid #f8f8fa;
    opacity: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-top: 50px;
    padding-bottom: 35px;

    & > p {
        font-size: 16px;
        margin-bottom: 16px;
        text-align: center;
        letter-spacing: 0px;
        color: #999999;
    }
`;

const NoCouponLink = styled(Link)`
    font-size: 12px;
    text-align: center;
    letter-spacing: 0px;
    color: #191919;
    text-decoration: underline;
`;

const CouponSummary: FC<CouponSummaryProps> = ({ coupons }) => {
    const router = useRouter();

    return (
        <div>
            <div style={{ marginBottom: '20px' }}>
                <CouponTitle onClick={() => router.push(PATHS.MY_COUPONS)}>
                    보유 쿠폰 <AngleRightBlack />
                </CouponTitle>
            </div>
            {coupons?.length > 0 ? (
                <div style={{ display: 'flex', textAlign: 'center' }}>
                    {coupons
                        .slice(0, 2)
                        .map(
                            ({
                                couponIssueNo,
                                discountAmt,
                                discountRate,
                                couponName,
                                useEndYmdt,
                            }: CouponInterface) => (
                                <Coupon
                                    key={couponIssueNo}
                                    discountAmt={discountAmt}
                                    discountRate={discountRate}
                                    couponName={couponName}
                                    useEndYmdt={useEndYmdt}
                                />
                            ),
                        )}
                    {coupons.length >= 2 && (
                        <ViewAllButton
                            onClick={() => router.push(PATHS.MY_COUPONS)}
                        />
                    )}
                </div>
            ) : (
                <NoCouponContainer>
                    <p>지금 바로 다운로드 가능한 쿠폰을 확인해보세요!</p>
                    <NoCouponLink href='/'>확인하러 가기</NoCouponLink>
                </NoCouponContainer>
            )}
        </div>
    );
};

export default CouponSummary;
