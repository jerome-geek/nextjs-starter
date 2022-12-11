import { useState } from 'react';
import { useQuery } from 'react-query';
import Link from 'next/link';
import dayjs from 'dayjs';
import styled from 'styled-components';

import GenuineRegisterModal from 'components/Modal/GenuineRegisterModal';
import LayoutResponsive from 'components/Layout/LayoutResponsive';
import OrderSummarySection from 'components/Order/OrderSummarySection';
import ShoppingSummary from 'components/Order/ShoppingSummary';
import CouponSummary from 'components/MyPage/CouponSummary';
import MyGoodsSummary from 'components/MyPage/MyGoodsSummary';
import { accumulation } from 'api/manage';
import { myOrder } from 'api/order';
import PATHS from 'const/paths';
import { useMember } from 'hooks';
import AngleRightGray from 'assets/icons/angle_right_gray.svg';
import useCouponData from 'hooks/queries/useCouponData';
import { isLogin } from 'utils/users';
import useOrderSummary from 'hooks/queries/useOrderSummary';
import { useAccumulationData } from 'hooks/queries';
import { PROFILE_ACCUMULATION, PROFILE_ORDER_SUMMARY } from 'const/queryKeys';

const MyPageSummaryContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 36px;
`;

const StyledLink = styled(Link)`
    font-size: 12px;
    letter-spacing: 0px;
    color: #999999;
    opacity: 1;
`;

const MyPageContainer = styled(LayoutResponsive)`
    max-width: 840px;
`;

const MyPageSection = styled.div`
    padding: 20px 0;
    border-bottom: 1px solid #dbdbdb;
`;

const MyPageTitle = styled.h1`
    font-size: 24px;
    font-weight: bold;
`;

const Index = () => {
    const [isGenuineRegisterModal, setIsGenuineRegisterModal] = useState(false);

    const { member, onLogOutClick } = useMember();

    const { data: accumulationData } = useAccumulationData({
        memberNo: member?.memberNo,
    });

    const { data: orderSummary } = useOrderSummary({
        memberNo: member?.memberNo,
    });

    const { data: couponData } = useCouponData({ memberNo: member?.memberNo });

    return (
        <MyPageContainer>
            <MyPageSection
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                }}
            >
                <MyPageTitle>마이페이지</MyPageTitle>
                <ul style={{ display: 'flex', fontSize: '12px' }}>
                    <li style={{ marginRight: '20px' }}>{member?.email}</li>
                    <li
                        style={{
                            textDecoration: 'underline',
                            cursor: 'pointer',
                        }}
                        onClick={onLogOutClick}
                    >
                        로그아웃
                    </li>
                </ul>
            </MyPageSection>

            <MyPageSection>
                <MyPageSummaryContainer>
                    <p style={{ fontSize: '30px' }}>
                        <strong style={{ fontWeight: 'bolder' }}>
                            {member?.memberName}
                        </strong>
                        님, 안녕하세요!
                    </p>

                    <StyledLink href={{ pathname: PATHS.MY_INFO }}>
                        정보수정 <AngleRightGray />
                    </StyledLink>
                </MyPageSummaryContainer>

                {accumulationData && couponData && (
                    <ShoppingSummary
                        myGoodsCount={0}
                        totalAvailableAmt={accumulationData.totalAvailableAmt}
                        couponCount={couponData?.totalCount}
                    />
                )}

                {orderSummary && (
                    <OrderSummarySection
                        orderSummary={orderSummary}
                        to={PATHS.MY_ORDER_LIST}
                    />
                )}
            </MyPageSection>

            <MyPageSection>
                <MyGoodsSummary
                    setIsGenuineRegisterModal={setIsGenuineRegisterModal}
                    myGoods={[1, 2, 3, 4]}
                />
            </MyPageSection>

            <MyPageSection style={{ border: 0 }}>
                {couponData && <CouponSummary coupons={couponData?.items} />}
            </MyPageSection>
        </MyPageContainer>
    );
};

export default Index;
